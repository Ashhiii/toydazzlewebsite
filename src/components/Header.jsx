import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { RiShoppingCartLine } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import { BiShowAlt, BiSolidShow } from "react-icons/bi";
import { IoIosArrowRoundBack } from "react-icons/io";

import useCategories from "../hooks/useCategories";
import useProducts from "../hooks/useProducts";
import { Navlinks } from "../data/navLinks";
import { supabase } from "../supabaseClient"; // Ensure this is properly initialized

const Header = () => {
  const { categories } = useCategories();
  const { products, loading } = useProducts();

  const [loginNav, setLoginNav] = useState(false);
  const [showForgotPasswordContent, setShowForgotPasswordContent] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const cartItems = useSelector((state) => state.cart.cartItems);


  const filteredSearchData = products
    .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  useEffect(() => {
    const user = localStorage.getItem("users");
    setUserData(user ? JSON.parse(user) : null);
  }, [location]); // Triggers when the route changes or the page reloads
  

  const onSubmit = async (data) => {
    try {
      const { data: loginData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      const { data: userTableData, error: userTableError } = await supabase
      .from("users")
      .select("*")
      .eq("uid", loginData.user.id)
      .maybeSingle();
    
      if (!userTableData) {
        toast.error("No user data found for this account.");
        return;
      }
      

      localStorage.setItem("users", JSON.stringify(userTableData));
      setUserData(userTableData);
      setLoginNav(false);
      window.location.reload();
    } catch (error) {
      console.error("Login error:", error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem("users");
    setLoginNav(false);
    setUserData(null);
    window.location.reload();
  };

  const handleResetPasswordLinkSubmit = async (data) => {
    try {
      const { data: userExists, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", data.email);

      if (error) throw error;
      if (!userExists || userExists.length === 0) {
        toast.error("Email does not exist or is not valid.");
        return;
      }

      const { error: resetError } = await supabase.auth.resetPasswordForEmail(data.email, {
          redirectTo: 'http://localhost:5173/reset-password/',
      });
      if (resetError) throw resetError;

      toast.success("A password reset link has been sent to your email address.");
    } catch (error) {
      console.error("Reset password error:", error.message);
      toast.error("An error occurred while sending the password reset link.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) {
    return <div>Loading...</div>; 
  }


  return (
    <div className="sticky top-0 w-full z-30">
      <div className="nav__container bg-[#007FFF] flex justify-between items-center px-6 py-1 lg:px-16">
        <Link to="/" className="logo__container">
          <img src="/images/icons/Logo.png" alt="" width="150" loading="lazy" />
        </Link>

        {/* Wide Screen Search Bar */}
        <div className="hidden md:flex flex-grow items-center justify-center">
          <form className="flex items-center relative w-full md:w-[60%]">
            <input
              type="search"
              placeholder="Search"
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-10 flex-grow px-4 outline-none border border-[#007FFF]"
              value={searchQuery}
            />
            <button
              type="submit"
              className="h-10 bg-[#FA6A02] w-16 flex items-center justify-center"
            >
              <CiSearch size={22} color="white" />
            </button>
          </form>
          {searchQuery && (
            <div className="absolute top-12 md:top-[68px] w-full md:max-w-[49%] border-t border-[#007FFF] shadow-md bg-white z-20">
              {loading? (
                <div className="p-4 text-gray-500">Loading products...</div>
              ) : filteredSearchData.length > 0 ? (
                filteredSearchData.map((product) => (
                  <Link
                    to={`/product?id=${product.id}&name=${product.name}`}
                    key={product.id}
                    className="flex items-center gap-2 hover:bg-gray-200 p-4"
                    onClick={() => setSearchQuery("")}
                  >
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-10"
                    />
                    <h1 className="fredoka text-base">{product.name}</h1>
                  </Link>
                ))
              ) : (
                <div className="p-4 text-gray-500">
                  No matching products found.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart and Profile Icons */}
        <div className="cart-profile__container flex items-center gap-4">
          {/* Cart Icon */}
          <Link
            onClick={() => {
              window.scrollTo(0, 0);
            }}
            to="/cart"
            className="relative"
          >
            <RiShoppingCartLine size={26} color="white" />
            {cartItems.length > 0 && (
              <div className="absolute bg-[#FA6A02] text-white fredoka text-sm rounded-full w-[20px] h-[20px] flex items-center justify-center right-[-4px] top-[-7px]">
                {cartItems.length}
              </div>
            )}
          </Link>

          {/* Profile Icon and Dropdown */}
          <div className="relative">
            <div
              className="cursor-pointer"
              onClick={() => setLoginNav((prev) => !prev)}
            >
              <FaUserCircle size={26} color="white" />
            </div>
            {loginNav && (
              <div className="absolute z-10 border right-0 top-[40px] w-[200px] shadow-md bg-white">
                <div className="flex flex-col">
                  {userData ? (
                    <>
                    <Link
                      to="/profile"
                      onClick={() => setLoginNav(false)}
                      className="py-2 px-4 hover:bg-gray-200 outfit"
                    >
                      {userData?.first_name && userData?.last_name ? (
                        `${userData.first_name.charAt(0).toUpperCase() + userData.first_name.slice(1)} ${
                          userData.last_name.charAt(0).toUpperCase() + userData.last_name.slice(1)
                        }`
                      ) : (
                        "My Profile"
                      )}
                    </Link>

                      {userData?.role === "admin" && (
                        <>
                          <Link
                            to="/admin/dashboard"
                            onClick={() => setLoginNav(false)}
                            className="py-2 px-4 hover:bg-gray-200 outfit outfit  text-md "
                          >
                            Dashboard
                          </Link>
                        </>
                      )}

                      <Link
                        to="/purchase"
                        onClick={() => setLoginNav(false)}
                        className="py-2 px-4 hover:bg-gray-200 outfit"
                      >
                        Purchases
                      </Link>

                      <Link
                        to="/help"
                        onClick={() => setLoginNav(false)}
                        className="py-2 px-4 hover:bg-gray-200 outfit"
                      >
                        Help
                      </Link>
                    
                      <Link
                        className="py-2 px-4 hover:bg-gray-200 outfit"
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </>
                  ) : showForgotPasswordContent ? (
                    <div className="absolute z-10  border right-0 top-[56px] p-6 w-[400px] shadow-md bg-white">
                      <div className="flex items-center justify-between">
                        <IoIosArrowRoundBack
                          fontSize={24}
                          className="cursor-pointer"
                          onClick={() => setShowForgotPasswordContent(false)}
                        />

                        <h1 className="text-center fredoka font-semibold text-2xl">
                          Recover my Account
                        </h1>

                        <div className="invisible"></div>
                      </div>
                      <form
                        onSubmit={handleSubmit(handleResetPasswordLinkSubmit)}
                        className="flex flex-col gap-5 mt-4"
                      >
                        <div>
                          <input
                            type="email"
                            placeholder="Email"
                            className={`${
                              errors.email ? "border-[2px] border-red-500" : ""
                            } border w-full border-[#FA6A02] px-4 rounded-2xl py-3 `}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address.",
                              },
                            })}
                          />
                          {errors.email && (
                            <div className="text-red-500 font-bold mt-2">
                              {errors.email.message}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-center">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="bg-[#007FFF] px-4 h-[45px] border border-[#007FFF] shadow-md w-[200px] rounded-3xl font-bold text-[18px] text-white"
                          >
                            {isSubmitting ? (
                              <l-dot-pulse
                                size="38"
                                speed="1.3"
                                color="white"
                              ></l-dot-pulse>
                            ) : (
                              <span>Send Reset Link</span>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <div className="absolute z-50  border right-0 p-6 w-[310px] shadow-md bg-white">
                      <h1 className="text-center fredoka font-semibold text-2xl">
                        Login to my Account
                      </h1>
                      <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="flex flex-col gap-5 mt-6"
                      >
                        <div>
                          <input
                            type="email"
                            placeholder="Email"
                            className={`${
                              errors.email ? "border-[2px] border-red-500" : ""
                            } border w-full border-[#FA6A02] px-4 rounded-2xl py-3 `}
                            {...register("email", {
                              required: "Email is required",
                              pattern: {
                                value:
                                  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address.",
                              },
                            })}
                          />

                          {errors.email && (
                            <div className="text-red-500 font-bold mt-2">
                              {errors.email.message}
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="relative">
                            <input
                              type={showPassword ? "text" : "password"}
                              placeholder="Password"
                              className={`${
                                errors.password
                                  ? "border-[2px] border-red-500"
                                  : ""
                              } border w-full border-[#FA6A02] px-4 rounded-2xl py-3 `}
                              {...register("password", {
                                required: "Password is required",
                              })}
                            />
                            <div
                              className="absolute top-1/2 transform -translate-y-1/2 right-3"
                              onClick={togglePasswordVisibility}
                            >
                              {showPassword ? (
                                <BiShowAlt
                                  fontSize={24}
                                  className="cursor-pointer"
                                />
                              ) : (
                                <BiSolidShow
                                  fontSize={24}
                                  className="cursor-pointer"
                                />
                              )}
                            </div>
                          </div>

                          {errors.password && (
                            <div className="text-red-500 font-bold mt-2">
                              {errors.password.message}
                            </div>
                          )}
                        </div>
                        <div className="flex items-center justify-center">
                          <button
                            disabled={isSubmitting}
                            type="submit"
                            className="bg-[#007FFF] px-4 h-[45px] border border-[#007FFF] shadow-md w-[120px] rounded-3xl font-bold text-[18px] text-white"
                          >
                            {isSubmitting ? (
                              <l-dot-pulse
                                size="38"
                                speed="1.3"
                                color="white"
                              ></l-dot-pulse>
                            ) : (
                              <span>Log in</span>
                            )}
                          </button>
                        </div>
                      </form>
                      <div className="text-center flex flex-col gap-1 mt-6">
                        <h3 className="outfit font-semibold">
                          New customer?
                          <Link
                            to="/auth/register"
                            onClick={() => {
                              setLoginNav((prev) => !prev);
                            }}
                            className="text-[#FA6A02]"
                          >
                            {" "}
                            Create an Account
                          </Link>
                        </h3>
                        <h3
                          onClick={() =>
                            setShowForgotPasswordContent(
                              !showForgotPasswordContent
                            )
                          }
                          className="outfit font-semibold cursor-pointer"
                        >
                          Forgot Password?
                          <span className="text-[#FA6A02]">
                            {" "}
                            Recover Password
                          </span>
                        </h3>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle */}
          <div
            className="cursor-pointer md:hidden"
            onClick={() => setIsMobileNavOpen((prev) => !prev)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMobileNavOpen
                    ? "M4 6h16M4 12h16M4 18h16"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Toggle Visibility */}
      <div className="relative bg-[#007FFF] px-4 py-2 md:hidden">
        <form className="flex items-center">
          <input
            type="search"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-10 flex-grow px-4 outline-none border-r-0"
            value={searchQuery}
          />
          <button className="h-10 bg-[#FA6A02] w-16 flex items-center justify-center">
            <CiSearch size={22} color="white" />
          </button>
        </form>
        {searchQuery && (
          <div className="absolute border-t border w-full max-w-[90vw] shadow-md bg-white mt-1">
            {filteredSearchData.map((product) => (
              <Link
                to={`/product?id=${product.id}&name=${product.name}`}
                key={product.id}
                className="flex items-center gap-2 hover:bg-gray-200 p-2"
                onClick={() => setSearchQuery("")}
              >
                <img src={product.image_url} alt={product.name} className="w-10" />
                <h1 className="fredoka text-base">{product.name}</h1>
              </Link>
            ))}
            {filteredSearchData.length === 0 && (
              <div className="flex items-center p-2 gap-2">
                <CiSearch size={20} />
                <p className="font-bold text-base">
                  No results found. Try another search.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <NavLink
        to="/auth/register"
        onClick={() => {
          setIsMobileNavOpen(false);
        }}
        className="fredoka text-xl"
        activeclassname="text-[#007FFF]"
      ></NavLink>

      {/* Mobile Navigation Menu */}
      <div className="bg-white categories__container w-full shadow-md flex items-center justify-center gap-12 h-[50px]">
        {isMobileNavOpen && (
          <div className="flex flex-col items-center gap-4 py-4 absolute top-[100px] w-full left-0 bg-white shadow-md border">
            {loading
              ? Navlinks.map((link, index) => (
                  <NavLink
                    key={index}
                    to={link.to}
                    className={`cursor-pointer outfit font-semibold text-md hover:text-[#FA6A02] ${
                      location.pathname === link.to ? "text-[#FA6A02]" : ""
                    }`}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {link.navname}
                  </NavLink>
                ))
              : categories.map((cat) => (
                  <NavLink
                    key={cat.id}
                    to={`/categories/${cat.name.toLowerCase()}`}
                    className={`cursor-pointer outfit font-semibold text-md hover:text-[#FA6A02] ${
                      location.pathname ===
                      `/categories/${cat.name.toLowerCase()}`
                        ? "text-[#FA6A02]"
                        : ""
                    }`}
                    onClick={() => setIsMobileNavOpen(false)}
                  >
                    {cat.name}
                  </NavLink>
                ))}
          </div>
        )}

        {/* Desktop Navigation Menu - Hidden on Mobile */}
        <div className="hidden md:flex items-center gap-12 h-[50px]">
          {loading
            ? Navlinks.map((link, index) => (
                <NavLink
                  key={index}
                  to={link.to}
                  className={`cursor-pointer outfit font-semibold text-md hover:text-[#FA6A02] ${
                    location.pathname === link.to ? "text-[#FA6A02]" : ""
                  }`}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {link.navname}
                </NavLink>
              ))
            : categories.map((cat) => (
                <NavLink
                  key={cat.id}
                  to={`/categories/${cat.name.toLowerCase()}`}
                  className={`cursor-pointer outfit font-semibold text-md hover:text-[#FA6A02] ${
                    location.pathname ===
                    `/categories/${cat.name.toLowerCase()}`
                      ? "text-[#FA6A02]"
                      : ""
                  }`}
                  onClick={() => setIsMobileNavOpen(false)}
                >
                  {cat.name}
                </NavLink>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Header;
