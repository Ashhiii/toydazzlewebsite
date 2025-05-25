  import React, { useState, useEffect } from "react";
  import { useNavigate } from "react-router-dom";
  import { supabase } from "../supabaseClient";
  import { toast } from "react-toastify";
  import { useForm } from "react-hook-form";
  import { BiShowAlt, BiSolidShow } from "react-icons/bi";

  const Signup = () => {
    const navigate = useNavigate();

    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
    } = useForm();

    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const isLoggedIn = JSON.parse(localStorage.getItem("users"));

    useEffect(() => {
      if (isLoggedIn) {
        navigate("/");
      }
    }, [navigate, isLoggedIn]);

    const onSubmit = async (data) => {
      try {
        console.log("Form data:", data); // Debug the data to check if password is present
    
        const { data: authData, error } = await supabase.auth.signUp({
          email: data.email,
          password: data.password,  // Make sure password is not null
        });
    
        if (error) throw error;
    
        const user = authData?.user;
        if (!user) throw new Error("Signup failed. No user returned.");
    
        const newUser = {
          first_name: data.firstName,
          last_name: data.lastName,
          username: data.username,
          email: user.email,
          uid: user.id,
          role: "user",
          time: new Date().toISOString(),
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };
    
        const { error: insertError } = await supabase.from("users").insert([newUser]);
        if (insertError) throw insertError;
    
        toast.success("Signup successful!");
        localStorage.setItem("users", JSON.stringify(user));
        navigate("/");
      } catch (error) {
        console.error("Signup error:", error);
        toast.error(error.message || "An error occurred during signup.");
      }
    };
    

    return (
      <main className="bg-[#FFD72D] lg:p-16 lg:py-20 xl:px-40">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="basis-1/2">
            <img src="/images/signup/pool.webp" alt="" width="800" loading="lazy" />
          </div>
          <div className="content__container py-5 pb-9 h-full basis-[50%] bg-white rounded-3xl lg:mb-20 mb-10">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-col gap-4 flex px-5 xl:px-20 2xl:px-35">
              <h1 className="fredoka font-semibold text-[#FA6A02] text-2xl text-center">SIGN UP</h1>

              {/* First Name */}
              <div>
                <input
                  type="text"
                  placeholder="First Name"
                  autoComplete="off"
                  className={`${
                    errors.firstName ? "border-[2px] border-red-500" : ""
                  } border border-[#FA6A02] rounded-2xl py-2 px-4 text-gray-600 font-semibold w-full`}
                  {...register("firstName", {
                    required: "First Name is required",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Only alphabets and spaces are allowed.",
                    },
                  })}
                />
                {errors.firstName && <div className="text-red-500 font-bold mt-2">{errors.firstName.message}</div>}
              </div>

              {/* Last Name */}
              <div>
                <input
                  type="text"
                  placeholder="Last Name"
                  autoComplete="off"
                  className={`${
                    errors.lastName ? "border-[2px] border-red-500" : ""
                  } border border-[#FA6A02] rounded-2xl py-2 px-4 text-gray-600 font-semibold w-full`}
                  {...register("lastName", {
                    required: "Last Name is required",
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Only alphabets and spaces are allowed.",
                    },
                  })}
                />
                {errors.lastName && <div className="text-red-500 font-bold mt-2">{errors.lastName.message}</div>}
              </div>

              {/* Username */}
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  autoComplete="off"
                  className={`${
                    errors.username ? "border-[2px] border-red-500" : ""
                  } border border-[#FA6A02] rounded-2xl py-2 px-4 text-gray-600 font-semibold w-full`}
                  {...register("username", { required: "Username is required" })}
                />
                {errors.username && <div className="text-red-500 font-bold mt-2">{errors.username.message}</div>}
              </div>

              {/* Email */}
              <div>
                <input
                  type="text"
                  placeholder="Email"
                  autoComplete="off"
                  className={`${
                    errors.email ? "border-[2px] border-red-500" : ""
                  } border border-[#FA6A02] rounded-2xl py-2 px-4 text-gray-600 font-semibold w-full`}
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Enter a valid email address.",
                    },
                  })}
                />
                {errors.email && <div className="text-red-500 font-bold mt-2">{errors.email.message}</div>}
              </div>

              {/* Password */}
              <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                autoComplete="off"
                className={`${
                  errors.password ? "border-[2px] border-red-500" : ""
                } border border-[#FA6A02] rounded-2xl py-2 px-4 text-gray-600 font-semibold w-full`}
                {...register("password", {
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                    message: "Password must be at least 6 characters with one capital letter, number, and special character.",
                  },
                })}
              />

                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2"
                >
                  {showPassword ? (
                    <BiShowAlt fontSize={24} className="cursor-pointer" />
                  ) : (
                    <BiSolidShow fontSize={24} className="cursor-pointer" />
                  )}
                </button>
                {errors.password && <div className="text-red-500 font-bold mt-2">{errors.password.message}</div>}
              </div>

              {/* Submit Button */}
              <button
                disabled={isSubmitting}
                type="submit"
                className="rounded-full mt-2 py-2 px-4 fredoka text-white bg-[#2BBD6E] font-semibold text-2 shadow-2xl border"
              >
                {isSubmitting ? "Creating..." : <span>Create Account</span>}
              </button>
            </form>
          </div>
        </div>
      </main>
    );
  };

  export default Signup;
