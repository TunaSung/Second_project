import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../../../../components/Layout/Hero";
import ParallaxCard from "../motion/ParallaxCard";
import MotionTitle from "../motion/MotionTitle";
import usePrefersReducedMotion from "../hook/usePrefersReducedMotion";

/** --------------------------------
 * Helpers & Constants
 * --------------------------------*/
const IMG = {
  v: "/imgs/kpop/bts-kpop-v-butter.webp",
  tzuyu: "/imgs/kpop/tzuyu-twice-with-youth.webp",
  jungkook: "/imgs/kpop/bts-butter-jungkook.webp",
  karina: "/imgs/kpop/karina-aespa-dirty-work2.webp",
  jimin: "/imgs/kpop/bts-be-jimin.webp",
};

// system prefers-reduced-motion
const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function WelcomeHome() {
  const reduced = usePrefersReducedMotion();
  const scrollRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end center"],
  });

  // container parallax
  const containerY = prefersReducedMotion
    ? undefined
    : useTransform(scrollYProgress, [0.1, 0.6], ["0%", "50%"]);

  // cards
  const CARDS = [
    {
      key: "v",
      img: IMG.v,
      ranges: {
        scale: [0.25, 0.5, 1, 0.6],
        y: [0.23, 0.8, "0%", "50%"],
        x: [0.23, 0.8, "0%", "-30%"],
      },
    },
    {
      key: "tzuyu",
      img: IMG.tzuyu,
      ranges: {
        scale: [0.25, 0.48, 1, 0.5],
        y: [0.23, 0.8, "0%", "-50%"],
        x: [0.23, 0.83, "0%", "-30%"],
      },
    },
    {
      key: "jungkook",
      img: IMG.jungkook,
      ranges: { scale: [0.25, 0.5, 1, 0.6], y: [0.23, 0.8, "0%", "70%"] },
    },
    {
      key: "karina",
      img: IMG.karina,
      ranges: {
        h: [0.25, 0.7, "100%", "60%"],
        w: [0.25, 0.5, "100%", "80%"],
        y: [0.23, 0.8, "0%", "-32%"],
        x: [0.23, 0.8, "0%", "20%"],
      },
    },
    {
      key: "jimin",
      img: IMG.jimin,
      ranges: {
        h: [0.25, 0.7, "100%", "60%"],
        w: [0.25, 0.5, "100%", "80%"],
        y: [0.23, 0.8, "0%", "15%"],
        x: [0.23, 0.8, "0%", "40%"],
      },
    },
  ];

  return (
    <Hero>
      <motion.section
        ref={scrollRef}
        className="mt-20 container-mid relative h-[708px] w-full max-w-[1528px] max-sm:w-[90%] max-sm:h-[260px] grid grid-cols-[6fr_5fr_4fr_3fr_2fr] [grid-template-rows:280px] max-sm:[grid-template-rows:120px] gap-2"
        style={{ y: containerY }}
        aria-label="Welcome parallax gallery"
      >
        <MotionTitle mv={scrollYProgress} />

        {CARDS.map((c) => (
          <ParallaxCard
            key={c.key}
            img={c.img}
            mv={scrollYProgress}
            ranges={c.ranges}
            reduced={reduced}
          />
        ))}
      </motion.section>
    </Hero>
  );
}

export default WelcomeHome;
