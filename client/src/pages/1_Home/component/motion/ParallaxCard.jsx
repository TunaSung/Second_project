import { memo } from "react";
import { motion, useTransform } from "framer-motion";

/**
 * ParallaxCard
 * @param {string} img - image url
 * @param {MotionValue<number>} mv - framer motion scrollYProgress
 * @param {object} ranges - { scale:[s,e,from,to], x:[], y:[], h:[], w:[] }
 * @param {boolean} reduced - prefers-reduced-motion
 */
const ParallaxCard = memo(function ParallaxCard({
  img,
  mv,
  ranges = {},
  className = "rounded-2xl bg-cover-set will-change-transform",
  reduced = false,
}) {
  const mk = (arr) => (arr ? useTransform(mv, [arr[0], arr[1]], [arr[2], arr[3]]) : undefined);

  const style = reduced
    ? { backgroundImage: `url("${img}")`, opacity: 1, scale: 1 }
    : {
        backgroundImage: `url("${img}")`,
        scale: mk(ranges.scale),
        x: mk(ranges.x),
        y: mk(ranges.y),
        height: mk(ranges.h),
        width: mk(ranges.w),
      };

  return <motion.div className={className} style={style} aria-hidden="true" />;
});

export default ParallaxCard;
