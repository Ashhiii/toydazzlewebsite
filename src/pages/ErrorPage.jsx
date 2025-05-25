import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="px-4 py-16 md:px-20 md:pb-20">
      <div className="flex flex-col justify-center gap-2 md:items-center md:gap-4 ">
        {" "}
        <h1 className="text-9xl font-extrabold">404</h1>
        <h1 className="font-bold  text-lg">
          Ooops! This page could not be found
        </h1>
        <p className="text-md font-medium md:w-1/2 md:text-center lg:w-1/3">
          Sorry, but the page you are looking for does not exist, has been
          removed, name changed, or temporarily unavailable.
        </p>
        <Link
          to="/"
          className=" fredoka text-lg bg-[#FA6A02] text-white w-[200px] flex items-center justify-center h-[45px] mt-2"
        >
          GO TO HOMEPAGE
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
