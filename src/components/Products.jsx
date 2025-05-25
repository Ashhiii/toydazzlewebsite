// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import ProductCard from "./ProductCard";

const Products = ({ title, data }) => {
  return (
    <div className="2xl:px-40 py-10 lg:px-16">
      <h1
        className={` ${
          title === "Best Selling" ? "text-[#49B449] " : "text-[#FFB423]"
        } mb-6 fredoka text-[40px] font-semibold`}
      >
        {title}
      </h1>
      <Swiper
        style={{
          "--swiper-navigation-color": "#fff",
          "--swiper-pagination-color": "#fff",
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 4,
            slidesPerGroup: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            slidesPerGroup: 1,
          },
          1366: {
            slidesPerView: 4,
            slidesPerGroup: 1,
          },
          1440: {
            slidesPerView: 4,
            slidesPerGroup: 1,
          },
          2560: {
            slidesPerView: 4,
            slidesPerGroup: 1,
          },
        }}
      >
        {/* Map over the data array and render each product as a SwiperSlide */}
        {data.map((product) => (
          <SwiperSlide key={product.id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Products;
