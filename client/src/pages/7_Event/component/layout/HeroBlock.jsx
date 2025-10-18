import { memo } from "react";

function HeroBlock({ imageUrl, title }) {
  return (
    <div className="relative h-[36vh] md:h-[48vh] lg:h-[56vh]">
      <img
        src={imageUrl}
        alt={title}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-black/0" />
    </div>
  );
}
export default memo(HeroBlock);
