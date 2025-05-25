import React from "react";

// Array containing voucher data
const vouchers = [
  {
    id: 1122,
    image: "/images/vouchers/1.png",
  },
  {
    id: 2131,
    image: "/images/vouchers/2.png",
  },
  {
    id: 3123,
    image: "/images/vouchers/3.png",
  },
];

const Voucher = () => {
  return (
    <div className="2xl:px-40 py-10 lg:px-16">
      <h1 className=" mb-6 fredoka text-[#FA6A02] text-[40px] font-semibold">
        Voucher
      </h1>
      <div className="flex items-center justify-between lg:gap-6">
        {/* Map over the vouchers array and render each voucher image */}
        {vouchers.map((voucher) => (
          <div key={voucher.id}>
            <img
              src={voucher.image}
              alt=""
              className="object-cover "
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Voucher;
