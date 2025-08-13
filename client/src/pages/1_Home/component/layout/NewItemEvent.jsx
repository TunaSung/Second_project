import Hero from "../../../../components/Layout/Hero";
import EventCard from "../feature/EventCard"
import ProductCard from "../feature/ProductCard"
// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';    
import 'swiper/css/pagination';         
import 'swiper/css/effect-coverflow';
import '../../../../style/Swiper.css'; // Custom styles for Swiper
import { EffectCoverflow } from 'swiper/modules';

function NewItemEvent() {
  return (
    <Hero>
      {/* start new event swiper */}
      <div
        id="new-item"
        data-aos="fade-up"
        data-aos-offset="50"
        className="w-screen h-100 flex items-center justify-center overflow-hidden"
      >
        <div className="absolute w-screen h-10 left-0 top-0 z-500">
          <svg
            width="100%"
            height="40"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0 A50 10 0 0 0 9.5 6"
              stroke="#D2D0A0"
              strokeWidth={0.5}
              fill="none"
            />
            <path
              d="M24.8 8 A50 10 0 0 0 100 0"
              stroke="#D2D0A0"
              strokeWidth={0.5}
              fill="none"
            />
          </svg>
          <div className="absolute text-[#D2D0A0] text-3xl left-[10%] top-[10px] exile-regular">
            NEW EVENTS
          </div>
        </div>
        <Swiper
          effect={"coverflow"}
          loop={true}
          loopedSlides={3}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{ depth: 150 }} //預設值rotate: 50, stretch: 0, depth: 100, slideShadows: true }}
          lazy="true"
          modules={[EffectCoverflow]}
          className=" w-1/4 h-83 max-sm:h-64"
        >
          <SwiperSlide className="w-auto">
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <EventCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <EventCard />
          </SwiperSlide>
        </Swiper>
        <div className="absolute border-3 border-[#D2D0A0] bottom-[-10%] w-screen h-20 rounded-[50%]" />
      </div>
      {/* end new event swiper */}

      {/* start new arrival swiper */}
      <div
        id="new-item"
        data-aos="fade-up"
        data-aos-offset="150"
        className="w-screen h-98 -mt-10 flex items-center justify-center "
      >
        <Swiper
          effect={"coverflow"}
          loop={true}
          loopedSlides={3}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 150,
            modifier: 1,
            slideShadows: true,
          }}
          lazy={{ loadOnTransitionStart: true, loadPrevNext: true }}
          modules={[EffectCoverflow]}
          className=" w-1/4 h-83 max-sm:h-64"
        >
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
          <SwiperSlide className="w-auto">
            <ProductCard />
          </SwiperSlide>
        </Swiper>
        <div className="absolute w-screen h-10 left-0 bottom-0 z-500">
          <svg
            width="100%"
            height="40"
            viewBox="0 0 100 10"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 0 A50 10 0 0 0 72.3 8"
              stroke="#D2D0A0"
              strokeWidth={0.5}
              fill="none"
            />
            <path
              d="M90.5 7 A50 10 0 0 0 100 0"
              stroke="#D2D0A0"
              strokeWidth={0.5}
              fill="none"
            />
          </svg>
          <div className="absolute text-[#D2D0A0] text-3xl right-[10%] top-[10px] exile-regular">
            NEW ARRIVALS
          </div>
        </div>
      </div>
      {/* end new arrival swiper */}
    </Hero>
  );
}

export default NewItemEvent;
