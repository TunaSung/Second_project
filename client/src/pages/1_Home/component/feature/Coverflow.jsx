import { memo, useMemo } from "react";
import { Swiper } from "swiper/react";
import { BASE_SWIPER_SETTINGS } from "../data/home";

function Coverflow({ className, ariaLabel, effect = "coverflow", children }) {
  const settings = useMemo(
    () => ({
      ...BASE_SWIPER_SETTINGS,
      effect,
      className: `coverflow-swiper ${className}`,
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
}

export default memo(Coverflow);
