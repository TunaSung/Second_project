import { memo, useMemo } from "react";
import Hero from "../../../../components/Layout/Hero";
import EventCard from "../feature/EventCard";
import ProductCard from "../feature/ProductCard";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "../../../../style/Swiper.css";
import { EffectCoverflow } from "swiper/modules";

/** --------------------------------
 * Helpers & Constants
 * --------------------------------*/

// counts
const EVENT_SLIDE_COUNT = 7;
const PRODUCT_SLIDE_COUNT = 9;

// base swiper settings (no motion-specific bits here)
const BASE_SWIPER_SETTINGS = Object.freeze({
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  lazy: { loadOnTransitionStart: true, loadPrevNext: true },
  coverflowEffect: { depth: 180 }, // default rotate: 50, stretch: 0, slideShadows: true
  modules: [EffectCoverflow],
});

/** prefers-reduced-motion */
const usePrefersReducedMotion = () => {
  const reduced = useMemo(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);
  return reduced;
};

/** Decorations */
const TopBadge = memo(function TopBadge() {
  return (
    <div className="absolute w-screen h-10 left-0 top-0 z-500 pointer-events-none select-none">
      <svg
        width="100%"
        height="40"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 0 A50 10 0 0 0 9.5 6" stroke="#D2D0A0" strokeWidth={0.5} fill="none" />
        <path d="M24.8 8 A50 10 0 0 0 100 0" stroke="#D2D0A0" strokeWidth={0.5} fill="none" />
      </svg>
      <div className="absolute text-[#D2D0A0] bg-[#73946B] text-xl lg:text-3xl left-[10%] top-[16px] lg:top-[10px] rotate-3 exile-regular">
        NEW EVENTS
      </div>
    </div>
  );
});

const BottomBadge = memo(function BottomBadge() {
  return (
    <div className="absolute w-screen h-10 left-0 bottom-0 z-500 pointer-events-none select-none">
      <svg
        width="100%"
        height="40"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M0 0 A50 10 0 0 0 72.3 8" stroke="#D2D0A0" strokeWidth={0.5} fill="none" />
        <path d="M90.5 7 A50 10 0 0 0 100 0" stroke="#D2D0A0" strokeWidth={0.5} fill="none" />
      </svg>
      <div className="absolute text-[#D2D0A0] bg-[#73946B] text-xl lg:text-3xl right-[10%] top-[18px] lg:top-[10px] -rotate-3 exile-regular">
        NEW ARRIVALS
      </div>
    </div>
  );
});

/** Coverflow wrapper */
const Coverflow = memo(function Coverflow({ className, ariaLabel, effect = "coverflow", children }) {
  const settings = useMemo(
    () => ({
      ...BASE_SWIPER_SETTINGS,
      effect,
      className,
      "aria-label": ariaLabel,
    }),
    [ariaLabel, className, effect]
  );

  return (
    <Swiper
      {...settings}
      role="region"
      aria-roledescription="carousel"
      aria-live="off"
    >
      {children}
    </Swiper>
  );
});

function NewItemEvent() {
  const reduced = usePrefersReducedMotion();
  const carouselEffect = reduced ? "slide" : "coverflow";

  return (
    <Hero>
      {/* New events */}
      <section
        id="new-event"
        data-aos="fade-up"
        data-aos-offset="50"
        className="relative w-screen h-100 flex items-center justify-center overflow-hidden"
        aria-labelledby="section-events-title"
      >
        <h2 id="section-events-title" className="sr-only">
          New events
        </h2>
        <TopBadge />
        <Coverflow className="w-1/4 h-64 sm:h-83" ariaLabel="New events carousel" effect={carouselEffect}>
          {Array.from({ length: EVENT_SLIDE_COUNT }).map((_, i) => (
            <SwiperSlide key={`event-${i}`} className="w-auto">
              <EventCard />
            </SwiperSlide>
          ))}
        </Coverflow>
        <div className="absolute border-3 border-[#D2D0A0] bottom-[-10%] w-screen h-20 rounded-[50%]" />
      </section>

      {/* New arrivals */}
      <section
        id="new-item"
        data-aos="fade-up"
        data-aos-offset="150"
        className="relative w-screen h-98 -mt-10 flex items-center justify-center"
        aria-labelledby="section-arrivals-title"
      >
        <h2 id="section-arrivals-title" className="sr-only">
          New arrivals
        </h2>
        <Coverflow className="w-1/4 h-83 max-sm:h-64" ariaLabel="New arrivals carousel" effect={carouselEffect}>
          {Array.from({ length: PRODUCT_SLIDE_COUNT }).map((_, i) => (
            <SwiperSlide key={`product-${i}`} className="w-auto">
              <ProductCard />
            </SwiperSlide>
          ))}
        </Coverflow>
        <BottomBadge />
      </section>
    </Hero>
  );
}

export default memo(NewItemEvent);
