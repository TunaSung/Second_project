import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import "../../../../style/Swiper.css"; // Custom styles for Swiper
import {
  Autoplay,
  Pagination,
  Navigation,
} from "swiper/modules";

function Jumbotron() {
    // useState
        const [search, setSearch] = useState("");
        const navigate = useNavigate()
    
        // Search input
        const toggleSearch = (e) => {
            setSearch(e.target.value);
        };
    
        const handleSubmit = (e) => {
            e.preventDefault();
            if (search.trim() === '') {
                navigate("/product");
            } else {
                navigate(`/product?keyword=${encodeURIComponent(search.trim())}`);
            }
        };
  return (
    <Swiper
      id="kpop-swiper"
      loop={true}
      slidesPerView={1}
      spaceBetween={0}
      centeredSlides={false}
      speed={600}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
      modules={[Autoplay, Pagination, Navigation]}
      className="w-screen h-screen"
    >
      {/* search bar */}
      <div className="absolute-mid w-9/10 sm:w-1/3 h-1/5 flex items-center justify-center bg-white/70 border z-50 p-5">
        <form
          onSubmit={handleSubmit}
          className="border w-full h-15 bg-white flex items-center justify-center"
        >
          <input
            value={search}
            onChange={toggleSearch}
            placeholder="Enter product name"
            className="h-full w-full px-2 text-xl focus:outline-0"
          />
          <button
            type="submit"
            className="h-full aspect-5/3 bg-[#D2D0A0] text-[#537D5D] flex items-center justify-center hover:text-white hover:text-lg transition-all duration-300"
          >
            <IoSearch />
            Search
          </button>
        </form>
      </div>

      {/* kpop slide */}
      <SwiperSlide className="w-full h-full">
        <div className='h-full w-full bg-cover-set bg-[url("/imgs/kpop/aespa-karina-hot-mess.webp")]' />
      </SwiperSlide>
      <SwiperSlide className="w-full h-full">
        <div className='h-full w-full bg-cover-set bg-[url("/imgs/kpop/aespa-winter-hot-mess.webp")]' />
      </SwiperSlide>
      <SwiperSlide className="w-full h-full">
        <div className='h-full w-full bg-cover-set bg-[url("/imgs/kpop/ningning-aespa-hot-mess.webp")]' />
      </SwiperSlide>
      <SwiperSlide className="w-full h-full">
        <div className='h-full w-full bg-cover-set bg-[url("/imgs/kpop/giselle-aespa-hot-mess.webp")]' />
      </SwiperSlide>
    </Swiper>
  );
}

export default Jumbotron;
