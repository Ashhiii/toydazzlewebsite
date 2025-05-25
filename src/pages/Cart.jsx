import React, { useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  toggleEditQuantity,
} from "../redux/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { toast } from "react-toastify";
import { supabase } from "../supabaseClient";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems);
  const [selectedOption, setSelectedOption] = useState("");

  // Calculate prices
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price, 0);
  }, [cartItems]);
  
  const shippingPrice = subtotal > 1000 ? 0 : 100; // match redux logic
  const totalPrice = subtotal - 0 + shippingPrice; // include discount if applicable
  

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart({ id }));
  };

  const increaseQuantityHandler = (id) => {
    dispatch(increaseQuantity({ id }));
  };

  const decreaseQuantityHandler = (id) => {
    dispatch(decreaseQuantity({ id }));
  };

  const toggleEditQuantityHandler = (id) => {
    dispatch(toggleEditQuantity({ id }));
  };

  const handleCheckoutHandler = async () => {
    if (!selectedOption) {
      return toast.error("Please select payment option");
    }

    try {
      for (const item of cartItems) {
        const { data, error } = await supabase
          .from("products")
          .select("stock")
          .eq("id", item.id)
          .single();

        if (error) throw error;

        if (item.quantity > data.stock) {
          toast.error(`Not enough stock for ${item.name}`);
          return;
        }

        const { error: updateError } = await supabase
          .from("products")
          .update({ stock: data.stock - item.quantity })
          .eq("id", item.id);

        if (updateError) throw updateError;
      }

      navigate(`/checkout?mop=${selectedOption}`);
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Something went wrong during checkout.");
    }
  };

  return (
    <div>
      {cartItems.length > 0 ? (
        <div className="px-4 lg:px-16 2xl:px-40 py-10 flex flex-col lg:flex-row gap-8 bg-gray-200">
          <div className="cartItems flex flex-col gap-8 basis-full lg:basis-[70%]">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex flex-col lg:flex-row items-center gap-8 bg-white rounded-2xl px-6 py-4"
              >
                <div className="img__container w-full lg:w-1/3">
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-full h-auto object-cover rounded-lg"
                    loading="lazy"
                  />
                </div>
                <div className="content w-full lg:w-2/3">
                  <h1 className="fredoka text-xl font-semibold">{item.name}</h1>

                  <div className="mt-4">
                    <div className="flex items-center gap-4 outfit font-bold">
                      <span className="text-lg font-semibold w-1/3">Price:</span>
                      <h3 className="text-lg text-[#FA6A02]">
                        {item.price.toLocaleString("en-PH", {
                          style: "currency",
                          currency: "PHP",
                        })}
                      </h3>
                    </div>
                    <div className="outfit font-bold mt-4">
                      {item.isEditing ? (
                        <div className="flex items-center">
                          <span className="text-lg font-semibold w-1/3">Quantity:</span>
                          <button
                            onClick={() => decreaseQuantityHandler(item.id)}
                            className="border text-[#fa6a02] border-[#FA6A02] w-[40px] h-[40px] font-semibold flex items-center justify-center rounded-tl-2xl rounded-bl-2xl"
                          >
                            <FaMinus />
                          </button>
                          <span className="border-[#FA6A02] border w-[50px] h-[40px] flex items-center justify-center border-r-0 border-l-0 font-semibold text-xl">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => increaseQuantityHandler(item.id)}
                            className="border flex items-center justify-center text-[#fa6a02] border-[#FA6A02] w-[40px] h-[40px] font-semibold rounded-tr-2xl rounded-br-2xl"
                          >
                            <FaPlus />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-4 outfit font-bold">
                          <span className="text-lg font-semibold w-1/3">Quantity:</span>
                          <h1 className="text-lg">{item.quantity}</h1>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col mt-4 items-start">
                      <button
                        onClick={() => toggleEditQuantityHandler(item.id)}
                        className="text-[#49B449] text-lg font-bold"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => removeFromCartHandler(item.id)}
                        className="text-[#E0301E] text-lg font-bold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout Summary */}
          <div className="checkout w-full lg:w-1/3 bg-white shadow-md py-6 px-4 lg:px-8 rounded-2xl">
            <h1 className="fredoka text-xl font-semibold">How you'll pay</h1>
            <div className="flex flex-col gap-2 mt-2">
              <label className="flex items-center gap-2 fredoka">
                <input
                  type="radio"
                  value="Cash on delivery"
                  name="paymentOption"
                  checked={selectedOption === "Cash on delivery"}
                  onChange={handleOptionChange}
                />
                Cash on Delivery
              </label>
            </div>

            <div className="total-payment__container mt-4">
              <div className="flex items-center gap-4 outfit font-bold">
                <span className="text-lg w-1/2">Item/s Price Total:</span>
                <h3 className="text-lg">
                  {subtotal.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h3>
              </div>

              <div className="border my-4 border-gray-400" />

              <div className="flex items-center gap-4 outfit font-bold">
                <span className="text-lg w-1/2">Subtotal:</span>
                <h3 className="text-lg">
                  {subtotal.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h3>
              </div>

              <div className="flex items-center gap-4 outfit font-bold">
  <span className="text-lg w-1/2">Shipping Fee:</span>
  <h3 className="text-lg">
    {(100).toLocaleString("en-PH", {
      style: "currency",
      currency: "PHP",
    })}
  </h3>
</div>


              <div className="flex items-center gap-4 outfit font-bold">
                <span className="text-lg w-1/2">
                  Total Item({cartItems.length}):
                </span>
                <h3 className="text-lg text-[#FA6A02]">
                  {totalPrice.toLocaleString("en-PH", {
                    style: "currency",
                    currency: "PHP",
                  })}
                </h3>
              </div>

              <button
                onClick={handleCheckoutHandler}
                className="bg-[#FA6A02] text-lg font-semibold h-[55px] rounded-full fredoka text-white mt-4 w-full"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <img src="/images/icons/emptycart.webp" alt="" loading="lazy" />
          <h1 className="outfit text-3xl mt-6 font-semibold">
            Your Cart is Empty
          </h1>
          <Link
            to="/"
            className="w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 fredoka mt-8 text-3xl font-medium bg-[#FA6A02] text-white h-[60px] flex items-center justify-center"
          >
            Shop our Products Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
