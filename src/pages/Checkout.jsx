import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { totalPrice } = useSelector((state) => state.cart);
  const location = useLocation();
  const mop = new URLSearchParams(location.search).get("mop");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [trackingInfo, setTrackingInfo] = useState(null);

  const toggleTracking = async (orderId) => {
    setIsTrackingOpen(!isTrackingOpen);

    if (!isTrackingOpen && orderId) {
      // Fetch tracking information for the specific order
      const { data, error } = await supabase
        .from("orders")
        .select("status, tracking_info,") // You can adjust the fields you need
        .eq("id", orderId)
        .single();

      if (error) {
        console.error("Error fetching tracking info:", error.message);
        setTrackingInfo(null);
      } else {
        setTrackingInfo(data);
      }
    }
  };

  const [currentDate, setCurrentDate] = useState("");
  const [currentTime, setCurrentTime] = useState("");

  const discountPercentage = 10;
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const subtotal = totalPrice - discountAmount;

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const dateOptions = { day: "numeric", month: "short" };
      const timeOptions = { hour: "2-digit", minute: "2-digit" };
      setCurrentDate(now.toLocaleDateString("en-US", dateOptions));
      setCurrentTime(now.toLocaleTimeString("en-US", timeOptions));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCheckout = async () => {
    try {
      const { data: authUser, error: authError } = await supabase.auth.getUser();
      if (authError || !authUser?.user?.id) {
        alert("You need to be logged in to checkout.");
        return;
      }
  
      const supabaseUid = authUser.user.id;
  
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("uid", supabaseUid)
        .single();
  
      if (userError || !userData?.id) {
        alert("Error fetching user data.");
        return;
      }
  
      const localUserId = userData.id;
  
      if (!totalPrice || totalPrice <= 0) {
        alert("Invalid total price.");
        return;
      }
  
      // Step 1: Insert into orders table
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert([
          {
            user_id: localUserId,
            total_price: subtotal,
            mode_of_payment: mop,
            status: "To Pay",
          },
        ])
        .select()
        .single();
  
      if (orderError || !orderData?.id) {
        alert("Error placing order.");
        return;
      }
  
      const orderId = orderData.id;
  
      // Step 2: Fetch product images from the products table
      const productIds = cartItems.map((item) => item.id);
      const { data: productData, error: productError } = await supabase
        .from("products")
        .select("id, image_url")
        .in("id", productIds);
  
      if (productError || !productData) {
        console.error("Error fetching product data:", productError?.message);
        alert("Failed to fetch product images.");
        return;
      }
  
      // Step 3: Insert each cart item into order_items with fetched image URL
      const orderItemsData = cartItems.map((item) => {
        const product = productData.find((p) => p.id === item.id);
        return {
          order_id: orderId,
          product_id: item.id,
          quantity: item.quantity,
          price: item.price,
          image_url: product?.image_url || null, 
        };
      });
  
      const { error: orderItemsError } = await supabase
        .from("order_items")
        .insert(orderItemsData);
  
      if (orderItemsError) {
        console.error("Error inserting order items:", orderItemsError.message);
        alert("Error placing order items.");
        return;
      }
  
      
      dispatch(clearCart());
      navigate("/order-confirmation");
  
    } catch (err) {
      console.error("Checkout failed:", err.message);
      alert("Failed to place order.");
    }
  };
  
  return (
    <div className="px-4 lg:px-8 xl:px-16 py-6 bg-gray-100">
      {cartItems.length > 0 ? (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div className="flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-sm text-gray-600">
                    Price:{" "}
                    <span className="text-[#FA6A02]">
                      {item.price?.toLocaleString("en-PH", {
                        style: "currency",
                        currency: "PHP",
                      })}
                    </span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Quantity: <span className="font-semibold">{item.quantity}</span>
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="lg:col-span-2 xl:col-span-3">
            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-xl font-bold text-[#2BBD6E] mb-4">ORDER SUMMARY</h2>

              <div className="flex flex-col gap-2">
                {/* Mode of Payment, Total, Discount, Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-lg">Mode of Payment:</span>
                  <span className="text-lg">{mop}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg">
                    Total Items ({cartItems.length}):
                  </span>
                  <span className="text-lg text-[#FA6A02]">
                    {totalPrice?.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </span>
                </div>
                {/* Discount Row */}
                <div className="flex items-center justify-between">
                  <span className="text-lg">Discount ({discountPercentage}%):</span>
                  <span className="text-lg text-[#F37335]">
                    -{discountAmount?.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </span>
                </div>
                <div className="border-b border-gray-400 w-full my-4"></div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold">Subtotal:</span>
                  <span className="text-lg text-[#FA6A02]">
                    {subtotal?.toLocaleString("en-PH", {
                      style: "currency",
                      currency: "PHP",
                    })}
                  </span>
                </div>
                <div className="border-b border-gray-400 w-full my-4"></div>
              </div>

              {/* Order Tracking info */}
              {isTrackingOpen && trackingInfo && (
                <div className="mt-4 p-4 bg-gray-50 rounded-md">
                  <h3 className="text-lg font-semibold">Tracking Info:</h3>
                  <p><strong>Status:</strong> {trackingInfo.status}</p>
                  <p><strong>Tracking Details:</strong> {trackingInfo.tracking_info}</p>
                </div>
              )}

              {/* Proceed to Purchases Button */}
              <button
                onClick={handleCheckout}
                className="block w-full text-center bg-[#2BBD6E] text-white font-semibold py-3 rounded-lg mt-4"
              >
                Place Order
              </button>

              {/* Cancel Order Button */}
              <Link
                to="/cart"
                className="block text-center bg-[#E0301E] text-white font-semibold py-3 rounded-lg mt-4"
              >
                Cancel Order
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center">
          <img
            src="/images/icons/emptycart.webp"
            alt="Empty Cart Icon"
            className="w-24 h-24"
          />
          <h1 className="text-3xl font-semibold mt-6">Your Cart is Empty</h1>
          <Link
            to="/"
            className="mt-4 px-6 py-3 bg-[#2BBD6E] text-white text-lg font-semibold rounded-full"
          >
            Shop Now
          </Link>
        </div>
      )}
    </div>
  );
};

export default Checkout;
