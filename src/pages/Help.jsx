import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // FontAwesome Icons

const Help = () => {
  const [activeIndex, setActiveIndex] = useState(null); // To track which item is open

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle the selected FAQ
  };

  return (
    <div className="help-container p-8 max-w-4xl mx-auto bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-center text-[#007FFF]">Help Center</h1>

      {/* FAQ Section */}
      <div className="faq-section mt-6">
        <h2 className="text-2xl font-semibold text-[#007FFF]">Frequently Asked Questions</h2>
        <ul className="mt-4 space-y-4 text-lg">
          {[
            {
              question: "How do I reset my password?",
              answer:
                "You can reset your password from the login page by clicking the 'Forgot Password?' link.",
            },
            {
              question: "How can I track my order?",
              answer:
                "Once your order has shipped, you will receive an email with tracking details. You can also track it through our website by logging into your account.",
            },
            {
              question: "How do I contact customer support?",
              answer:
                "You can email us at support@example.com or use the live chat feature on our website. We are available 24/7 to assist you.",
            },
            {
              question: "What are the accepted payment methods?",
              answer:
                "We accept major credit cards, debit cards, PayPal, and other secure payment methods. Please refer to our payment page for more details.",
            },
            {
              question: "Can I change my shipping address after placing an order?",
              answer:
                "Once an order is confirmed, we may not be able to change the shipping address. Please contact customer support immediately if you need assistance.",
            },
          ].map((faq, index) => (
            <li key={index} className="transition-all duration-300 ease-in-out">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <strong className="text-[#007FFF]">{faq.question}</strong>
                <span className="text-[#007FFF] text-lg">
                  {activeIndex === index ? (
                    <FaChevronUp size={20} />
                  ) : (
                    <FaChevronDown size={20} />
                  )}
                </span>
              </div>
              {activeIndex === index && (
                <p className="mt-2 text-gray-700">{faq.answer}</p>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Contact Support Section */}
      <div className="contact-section mt-8">
        <h2 className="text-2xl font-semibold text-[#007FFF]">Contact Support</h2>
        <p className="mt-4 text-lg text-gray-700">
          If you have any issues, please reach out to us at{" "}
          <a href="mailto:support@example.com" className="text-[#007FFF]">
            support@example.com
          </a>
          .
        </p>
      </div>

      {/* Order Tracking Section */}
      <div className="order-tracking-section mt-8">
        <h2 className="text-2xl font-semibold text-[#007FFF]">Order Tracking</h2>
        <p className="mt-4 text-lg text-gray-700">
          Track your order status and updates on the{" "}
          <Link to="/order-tracking" className="text-[#007FFF] font-medium hover:underline">
            Order Tracking Page
          </Link>
          .
        </p>
      </div>

      {/* Additional Help Section */}
      <div className="additional-help mt-8">
        <h2 className="text-2xl font-semibold text-[#007FFF]">Need More Help?</h2>
        <p className="mt-4 text-lg text-gray-700">
          If you cannot find the information you're looking for, feel free to contact our support team directly at{" "}
          <a href="mailto:support@example.com" className="text-[#007FFF]">
            support@example.com
          </a>
          . We're happy to assist you with any queries you may have.
        </p>
      </div>
    </div>
  );
};

export default Help;
