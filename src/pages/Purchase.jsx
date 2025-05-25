import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  FaTruck,
  FaCheckCircle,
  FaCreditCard,
  FaBoxOpen,
  FaTimesCircle,
} from "react-icons/fa";

const Purchases = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filter, setFilter] = useState("All");
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelPrompt, setShowCancelPrompt] = useState(false);

  const steps = [
    { name: "To Pay", icon: <FaCreditCard />, color: "blue" },
    { name: "To Ship", icon: <FaTruck />, color: "blue" },
    { name: "To Receive", icon: <FaBoxOpen />, color: "blue" },
    { name: "Completed", icon: <FaCheckCircle />, color: "blue" },
    { name: "Cancelled", icon: <FaTimesCircle />, color: "red" },
  ];

  const colorMap = {
    blue: { text: "text-blue-600", bg: "bg-blue-600" },
    yellow: { text: "text-yellow-600", bg: "bg-yellow-500" },
    orange: { text: "text-orange-600", bg: "bg-orange-500" },
    green: { text: "text-green-600", bg: "bg-green-600" },
    red: { text: "text-red-600", bg: "bg-red-600" },
  };

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("users"));

      if (!user?.id) {
        setError("User not logged in.");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            products (
              name,
              image_url
            )
          )
        `)
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Fetch error:", error);
        setError("Failed to fetch orders.");
      } else {
        setOrders(data);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    setSelectedOrder(order);
  };

  const closeModal = () => {
    setSelectedOrder(null);
  };

  const handleCancelOrder = async (orderId, reason) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: "Cancelled", cancel_reason: reason })
      .eq("id", orderId);

    if (error) {
      alert("Failed to cancel order.");
    } else {
      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId
            ? { ...order, status: "Cancelled", cancel_reason: reason }
            : order
        )
      );
      setCancelReason("");
      setShowCancelPrompt(false);
      setSelectedOrder(null);
    }
  };

  const filteredOrders =
    filter === "All"
      ? orders
      : orders.filter(
          (order) => order.status.toLowerCase() === filter.toLowerCase()
        );

  if (loading)
    return <div className="text-center text-xl font-semibold">Loading your orders...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-600">Your Purchases</h1>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {["All", "To Pay", "To Ship", "To Receive", "Completed", "Cancelled"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-full font-semibold transition ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-blue-100"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-center text-lg">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {filteredOrders.map((order) => (
            <li
              key={order.id}
              className="bg-white rounded-lg shadow-lg p-5 border-l-4 border-blue-500 transition duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              onClick={() => handleOrderClick(order)}
            >
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-lg font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">
                    Placed on: {new Date(order.created_at).toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-lg font-semibold">
                  {steps.map((step) => {
                    if (step.name === order.status) {
                      return (
                        <React.Fragment key={step.name}>
                          {React.cloneElement(step.icon, {
                            className: `text-${step.color}-500 text-2xl`,
                          })}
                          <span className={colorMap[step.color]?.text}>{step.name}</span>
                        </React.Fragment>
                      );
                    }
                    return null;
                  })}
                </div>
              </div>

              <p className="text-xl font-bold text-[#FF7F50]">
                Total: {order.total_price.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}
              </p>
            </li>
          ))}
        </ul>
      )}

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 sm:w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Order Details - {selectedOrder.id}
            </h2>

            {selectedOrder.status !== "Cancelled" ? (
              <>
                <p><strong>Status:</strong> {selectedOrder.status}</p>
                <p><strong>Payment:</strong> {selectedOrder.mode_of_payment}</p>
                <p><strong>Total:</strong> {selectedOrder.total_price.toLocaleString("en-PH", { style: "currency", currency: "PHP" })}</p>
                <p><strong>Placed on:</strong> {new Date(selectedOrder.created_at).toLocaleString()}</p>
              </>
            ) : (
              <div className="text-center">
                <p className="text-red-600 font-bold">Order has been cancelled.</p>
                <p className="text-sm">Reason: {selectedOrder.cancel_reason}</p>
                <button
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full"
                  onClick={() => alert("Redirecting to buy again...")}
                >
                  Buy Again
                </button>
              </div>
            )}

            <div className="flex items-center justify-between relative mt-6">
              {steps.map((step, index) => {
                const currentStepIndex = steps.findIndex(
                  (s) => s.name.toLowerCase() === selectedOrder.status.toLowerCase()
                );
                const isDone = index <= currentStepIndex;
                const stepColor = colorMap[step.color];

                return (
                  <div key={step.name} className="flex-1 relative flex flex-col items-center">
                    {index !== 0 && (
                      <div
                        className={`absolute top-5 left-0 -translate-x-1/2 h-1 w-full ${
                          index <= currentStepIndex ? stepColor.bg : "bg-gray-300"
                        }`}
                        style={{ zIndex: 0 }}
                      ></div>
                    )}

                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center z-10 text-lg ${
                        isDone ? `${stepColor.bg} text-white` : "bg-gray-300 text-gray-600"
                      }`}
                    >
                      {step.icon}
                    </div>
                    <p className={`mt-2 text-sm text-center ${isDone ? stepColor.text : "text-gray-500"}`}>
                      {step.name}
                    </p>
                  </div>
                );
              })}
            </div>

            {selectedOrder.status === "To Pay" && (
              <div className="mt-6">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold"
                  onClick={() => setShowCancelPrompt(true)}
                >
                  Cancel Order
                </button>
              </div>
            )}

            {showCancelPrompt && (
              <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                <div className="bg-white rounded-lg p-6 w-11/12 sm:w-1/2">
                  <h2 className="text-xl font-bold mb-4 text-red-600">Cancel Order</h2>
                  <p className="mb-2">Please select a reason for cancellation:</p>
                  <select
                    className="w-full border border-gray-300 rounded-md p-2 mb-4"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  >
                    <option value="">-- Select Reason --</option>
                    <option value="Changed my mind">Changed my mind</option>
                    <option value="Ordered by mistake">Ordered by mistake</option>
                    <option value="Found a better price">Found a better price</option>
                    <option value="Shipping time is too long">Shipping time is too long</option>
                    <option value="Others">Others</option>
                  </select>

                  <div className="flex justify-end gap-2">
                    <button
                      className="bg-gray-300 px-4 py-2 rounded-full"
                      onClick={() => {
                        setShowCancelPrompt(false);
                        setCancelReason("");
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-full"
                      onClick={() => handleCancelOrder(selectedOrder.id, cancelReason)}
                    >
                      Confirm Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold"
                onClick={closeModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Purchases;
