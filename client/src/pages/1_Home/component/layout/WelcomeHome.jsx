import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Hero from "../../../../components/Layout/Hero";

function WelcomeHome() {
  const scrollRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start center", "end center"],
  });
  const useScrollTransform = (scrollStart, scrollEnd, moveStart, moveEnd) => {
    return useTransform(
      scrollYProgress,
      [scrollStart, scrollEnd],
      [moveStart, moveEnd]
    );
  };

  return (
    <Hero>
      <motion.div
        ref={scrollRef}
        className="mt-20 container-mid h-[708px] w-full max-w-[1528px] max-sm:w-[90%] max-sm:h-[260px] grid grid-cols-[6fr_5fr_4fr_3fr_2fr] [grid-template-rows:280px] max-sm:[grid-template-rows:120px] gap-2"
        style={{ y: useScrollTransform(0.1, 0.6, "0%", "50%") }}
      >
        <motion.div
          className="m-0 absolute left-1/2 -translate-x-1/2 top-1/4 w-auto h-10"
          loading="lazy"
          style={{ opacity: useScrollTransform(0.6, 0.7, 0, 1) }}
        >
          <h1 className="text-sm md:text-2xl xl:text-4xl font-bold text-center text-[#D2D0A0] indie-flower-regular">
            Sustainable Chic Starts Here
          </h1>
        </motion.div>
        <motion.div
          className="rounded-2xl bg-cover-set "
          loading="lazy"
          style={{
            backgroundImage: 'url("/imgs/kpop/bts-kpop-v-butter.webp")',
            scale: useScrollTransform(0.25, 0.5, 1, 0.6),
            y: useScrollTransform(0.23, 0.8, "0%", "50%"),
            x: useScrollTransform(0.23, 0.8, "0%", "-30%"),
          }}
        />
        <motion.div
          className="rounded-2xl bg-cover-set"
          loading="lazy"
          style={{
            backgroundImage: 'url("/imgs/kpop/tzuyu-twice-with-youth.webp")',
            scale: useScrollTransform(0.25, 0.48, 1, 0.5),
            y: useScrollTransform(0.23, 0.8, "0%", "-50%"),
            x: useScrollTransform(0.23, 0.83, "0%", "-30%"),
          }}
        />
        <motion.div
          className="rounded-2xl bg-cover-set"
          loading="lazy"
          style={{
            backgroundImage: 'url("/imgs/kpop/bts-butter-jungkook.webp")',
            scale: useScrollTransform(0.25, 0.5, 1, 0.6),
            y: useScrollTransform(0.23, 0.8, "0%", "70%"),
          }}
        />
        <motion.div
          className="rounded-2xl bg-cover-set"
          loading="lazy"
          style={{
            backgroundImage: 'url("/imgs/kpop/karina-aespa-dirty-work2.webp")',
            height: useScrollTransform(0.25, 0.7, '100%', '60%'),
            width: useScrollTransform(0.25, 0.5, '100%', '80%'),
            y: useScrollTransform(0.23, 0.8, "0%", "-32%"),
            x: useScrollTransform(0.23, 0.8, "0%", "20%"),
          }}
        />
        <motion.div
          className="rounded-2xl bg-cover-set"
          style={{
            backgroundImage: 'url("/imgs/kpop/bts-be-jimin.webp")',
            height: useScrollTransform(0.25, 0.7, '100%', '60%'),
            width: useScrollTransform(0.25, 0.5, '100%', '80%'),
            y: useScrollTransform(0.23, 0.8, "0%", "15%"),
            x: useScrollTransform(0.23, 0.8, "0%", "40%"),
          }}
        />
      </motion.div>
    </Hero>
  );
}

export default WelcomeHome;
