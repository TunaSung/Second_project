import { useCallback, useMemo, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../../../../style/Swiper.css";
import { Autoplay, Pagination } from "swiper/modules";

/** --------------------------------
 * Helpers & Constants
 * --------------------------------*/
const SLIDE_IMAGES = [
  "/imgs/kpop/aespa-karina-hot-mess.webp",
  "/imgs/kpop/aespa-winter-hot-mess.webp",
  "/imgs/kpop/ningning-aespa-hot-mess.webp",
  "/imgs/kpop/giselle-aespa-hot-mess.webp",
];

// detect prefers-reduced-motion
const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (m) {
      const update = () => setReduced(!!m.matches);
      update();
      m.addEventListener?.("change", update);
      return () => m.removeEventListener?.("change", update);
    }
  }, []);
  return reduced;
};

function Jumbotron() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const prefersReducedMotion = usePrefersReducedMotion();

  // handlers
  const onChange = useCallback((e) => setSearch(e.target.value), []);
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const q = search.trim();
      navigate(q ? `/product?keyword=${encodeURIComponent(q)}` : "/product");
    },
    [navigate, search]
  );

  // Swiper settings (memoized)
  const SWIPER_SETTINGS = useMemo(
    () => ({
      id: "kpop-swiper",
      loop: true,
      slidesPerView: 1,
      spaceBetween: 0,
      centeredSlides: false,
      speed: 600,
      autoplay: prefersReducedMotion
        ? false
        : { delay: 5000, disableOnInteraction: false },
      pagination: { clickable: true },
      preloadImages: false,
      lazy: { loadOnTransitionStart: true, loadPrevNext: true },
      modules: [Autoplay, Pagination],
      className: "w-screen h-screen",
      "aria-label": "Hero carousel",
    }),
    [prefersReducedMotion]
  );

  return (
    <section className="relative">
      {/* carousel */}
      <Swiper {...SWIPER_SETTINGS}>
        {SLIDE_IMAGES.map((src, i) => (
          <SwiperSlide key={i} className="w-full h-full">
            <div
              className="h-full w-full bg-cover-set"
              style={{ backgroundImage: `url(${src})` }}
              role="img"
              aria-label="Promotional slide"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* search overlay */}
      <div className="absolute-mid w-9/10 sm:w-1/3 h-1/5 z-50 p-5">
        <form
          role="search"
          aria-label="Search products"
          onSubmit={handleSubmit}
          className="border w-full h-15 bg-white/90 backdrop-blur flex items-center justify-center rounded-md"
        >
          <label htmlFor="hero-search" className="sr-only">
            Enter product name
          </label>
          <input
            id="hero-search"
            type="search"
            name="keyword"
            value={search}
            onChange={onChange}
            placeholder="Enter product name"
            inputMode="search"
            autoCapitalize="none"
            autoComplete="off"
            className="h-full w-full px-3 text-xl bg-transparent focus:outline-0"
            aria-label="Product keyword"
          />
          <button
            type="submit"
            className="h-full aspect-5/3 bg-[#D2D0A0] text-[#537D5D] flex items-center justify-center hover:text-white hover:text-lg transition-all duration-300"
          >
            <IoSearch aria-hidden="true" />
            <span>Search</span>
          </button>
        </form>
      </div>
    </section>
  );
}

export default Jumbotron;
