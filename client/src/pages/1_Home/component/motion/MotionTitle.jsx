import { memo } from "react";
import { motion, useTransform } from "framer-motion";

/**
 * MotionTitle
 * @param {MotionValue<number>} mv - framer motion scrollYProgress
 */
const MotionTitle = memo(function MotionTitle({
  mv,
  text = "Sustainable Chic Starts Here",
  className = "m-0 absolute left-1/2 -translate-x-1/2 top-1/4 w-auto h-10",
}) {
  const opacity = useTransform(mv, [0.6, 0.7], [0, 1]);

  return (
    <motion.div className={className} style={{ opacity }}>
  <h2 className="text-sm md:text-2xl xl:text-4xl font-bold text-center text-[var(--quaternary-color)] indie-flower-regular">
        {text}
      </h2>
    </motion.div>
  );
});

export default MotionTitle;
