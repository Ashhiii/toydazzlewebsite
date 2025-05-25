import React from "react";
import { shopBrands } from "../data/shopBrands";

const ShopBrands = () => {
  return (
    <div className="2xl:px-40 py-10 lg:px-16">
      <h1 className=" mb-4 fredoka text-[#E0301E] text-[40px] font-semibold">
        Shop Brands
      </h1>
      <div className="grid grid-cols-6  gap-4">
        {/* Map over the shopBrands data and render each brand logo */}
        {shopBrands.map((brand) => (
          <div key={brand.id}>
            <img src={brand.image} alt="" className="w-full" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopBrands;
