import React from "react";
import { Link } from "react-router-dom";
import { addToCart } from "../redux/cartSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";

const ProductCard = ({ product }) => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // or 'auto' for instant scroll
    });
  };

  const dispatch = useDispatch(); // Initialize useDispatch hook to dispatch actions

  // Function to add item to cart
  const addCart = (item, quantity = 1) => {
    // Default quantity to 1 if not provided
    dispatch(
      addToCart({
        ...item,
        quantity,
      })
    );
    // Display success toast notification
    toast.success(`${quantity} ${item.name} added to cart`);
  };

  return (
    <div className="border pb-4 pt-0 lg:pb-8 lg:pt-0 xl:pb-8 xl:pt-0 2xl:pb-4 2xl:pt-0 px-4 flex flex-col gap-2 relative">
      <div className="absolute right-2 top-2 lg:right-4 lg:top-1">
        <img
          src="/images/icons/Logo.png"
          loading="lazy"
          alt=""
          className="w-16 lg:w-20"
        />
      </div>
      <Link
        className="w-full h-full"
        to={`/product?id=${product.id}&name=${product.name}`}
      >
        <div className="aspect-w-3 aspect-h-4">
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover w-full h-full cursor-pointer"
            onClick={handleClick}
          />
        </div>
      </Link>
      <div className="flex-grow flex flex-col justify-between">
        <Link to={`/product?id=${product.id}&name=${product.name}`}>
          <h1
            className="outfit title font-semibold text-base lg:text-lg"
            onClick={handleClick}
          >
            {product.name}
          </h1>
        </Link>

        <span className="text-[#FA6A02] font-semibold text-base lg:text-lg">
          {product.price.toLocaleString("en-PH", {
            style: "currency",
            currency: "PHP",
          })}
        </span>

        <button
          onClick={() => addCart(product)}
          className="fredoka text-base lg:text-lg bg-[#FA6A02] text-white h-10 lg:h-14 xl:h-14 2xl:h-10 mt-2 w-full"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
