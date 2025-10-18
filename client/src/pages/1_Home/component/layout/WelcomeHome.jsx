import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../../../../components/Layout/Hero";
import ParallaxCard from "../motion/ParallaxCard";
import MotionTitle from "../motion/MotionTitle";
import usePrefersReducedMotion from "../hook/usePrefersReducedMotion";
import { CARDS } from "../data/home";

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
