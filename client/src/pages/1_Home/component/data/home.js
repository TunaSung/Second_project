import { EffectCoverflow, A11y, Keyboard } from "swiper/modules";

export const SLIDE_IMAGES = Object.freeze([
  "/imgs/home/jumbotron3.webp",
  "/imgs/home/jumbotron2.webp",
  "/imgs/home/jumbotron4.webp",
  "/imgs/home/jumbotron1.webp",
]);

const IMG = {
  cloth: "/imgs/category/cloth.webp",
  pants: "/imgs/category/pants.webp",
  outerwear: "/imgs/category/outerwear.webp",
  accessories: "/imgs/category/accessories.webp",
  underwear: "/imgs/category/underwear.webp",
};

export const CARDS = Object.freeze([
  {
    key: "cloth",
    img: IMG.cloth,
    ranges: {
      scale: [0.25, 0.5, 1, 0.6],
      y: [0.23, 0.8, "0%", "50%"],
      x: [0.23, 0.8, "0%", "-30%"],
    },
  },
  {
    key: "pants",
    img: IMG.pants,
    ranges: {
      scale: [0.25, 0.48, 1, 0.5],
      y: [0.23, 0.8, "0%", "-50%"],
      x: [0.23, 0.83, "0%", "-30%"],
    },
  },
  {
    key: "outerwear",
    img: IMG.outerwear,
    ranges: { scale: [0.25, 0.5, 1, 0.6], y: [0.23, 0.8, "0%", "70%"] },
  },
  {
    key: "accessories",
    img: IMG.accessories,
    ranges: {
      h: [0.25, 0.7, "100%", "60%"],
      w: [0.25, 0.5, "100%", "80%"],
      y: [0.23, 0.8, "0%", "-32%"],
      x: [0.23, 0.8, "0%", "20%"],
    },
  },
  {
    key: "underwear",
    img: IMG.underwear,
    ranges: {
      h: [0.25, 0.7, "100%", "60%"],
      w: [0.25, 0.5, "100%", "80%"],
      y: [0.23, 0.8, "0%", "15%"],
      x: [0.23, 0.8, "0%", "40%"],
    },
  },
]);

// swiper settings
export const BASE_SWIPER_SETTINGS = Object.freeze({
  modules: [EffectCoverflow, A11y, Keyboard],
  loop: true,
  grabCursor: true,
  centeredSlides: true,
  slidesPerView: "auto",
  slideToClickedSlide: true,
  watchSlidesProgress: true,
  speed: 550,
  preloadImages: false,
  lazy: { loadOnTransitionStart: true, loadPrevNext: true, checkInView: true },
  keyboard: { enabled: true, onlyInViewport: true },
  a11y: { enabled: false },

  effect: "coverflow",
  coverflowEffect: {
    depth: 180,
    rotate: 72,
    stretch: 0,
    scale: 0.96,
    slideShadows: false,
    modifier: 1,
  },

  breakpoints: {
    0:    { coverflowEffect: { depth: 140, rotate: 50,  scale: 0.95 } },
    768:  { coverflowEffect: { depth: 180, rotate: 68,  scale: 0.96 } },
    1024: { coverflowEffect: { depth: 220, rotate: 80,  scale: 0.98 } },
  },
});
