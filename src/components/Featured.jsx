import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// Define an array of slide objects with unique IDs and image paths
const slides = [
  {
    id: 1,
    image: "/images/slides/3.png",
  },
  {
    id: 2,
    image: "/images/slides/1.png",
  },
  {
    id: 3,
    image: "/images/slides/2.png",
  },
];

const Featured = () => {
  return (
    <Swiper
      style={{
        "--swiper-navigation-color": "#fff",
        "--swiper-pagination-color": "#fff",
      }}
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Autoplay, Pagination, Navigation]}
      className="mySwiper"
    >
      {/* Map through the slides array and render each slide */}
      {slides.map((slide, index) => (
        <SwiperSlide key={slide.id}>
          {/* Render an image for each slide with the specified source and attributes */}
          <img src={slide.image} alt="" className="w-full" loading="lazy" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Featured;
