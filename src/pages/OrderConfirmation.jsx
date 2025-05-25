import React from "react";
import { Link } from "react-router-dom";

const OrderConfirmation = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Animated Checkmark with Circle */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-24 h-24 mb-4 animate-checkmark"
      >
        {/* Circle around the checkmark */}
        <circle
          cx="12"
          cy="12"
          r="11"
          stroke="#2bbd6e"
          strokeWidth=""
          fill="none"
          className="circle-animation"
        />
        {/* Checkmark path */}
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M5 13l4 4L19 7"
        />
      </svg>

      <h1 className="text-2xl font-bold text-[#FF7F50] mb-2">
        Order Placed Successfully!
      </h1>
      <p className="text-center text-gray-700 max-w-md mb-6">
        Thank you for your purchase. Your order has been placed and is now
        being processed. You can track your order status in the Purchased page.
      </p>
      <Link
        to="/purchase"
        className="bg-[#FF7F50] text-white px-6 py-3 rounded-full font-semibold shadow-md"
      >
        Go to Purchased Page
      </Link>

      {/* CSS for Checkmark and Circle Animation */}
      <style jsx="true">{`
        @keyframes checkmarkAnimation {
          0% {
            stroke-dasharray: 0, 100;
          }
          100% {
            stroke-dasharray: 100, 0;
          }
        }

        @keyframes circleAnimation {
          0% {
            stroke-dasharray: 0, 62.83;
          }
          100% {
            stroke-dasharray: 62.83, 0;
          }
        }

        .animate-checkmark {
          stroke: #2bbd6e;
          stroke-width: 2;
          stroke-dasharray: 0, 100;
          animation: checkmarkAnimation 1s ease-out forwards;
          fill: none;
        }

        .circle-animation {
          stroke: #2bbd6e;
          stroke-width: 2;
          stroke-dasharray: 0, 62.83; /* Circumference of the circle (2πr) */
          animation: circleAnimation 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default OrderConfirmation;
