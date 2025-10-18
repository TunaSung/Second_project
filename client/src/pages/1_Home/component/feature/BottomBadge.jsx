import { memo } from "react";

function BottomBadge() {
  return (
    <div className="absolute w-screen h-10 left-0 bottom-0 z-[500] pointer-events-none select-none">
      <svg
        width="100%"
        height="40"
        viewBox="0 0 100 10"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        focusable="false"
      >
        <path
          d="M0 0 A50 10 0 0 0 72.3 8"
          stroke="var(--quaternary-color)"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M90.5 7 A50 10 0 0 0 100 0"
          stroke="var(--quaternary-color)"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>

      <div
        className="absolute text-[var(--quaternary-color)] bg-[var(--secondary-color)]
                   text-xl lg:text-3xl right-[10%] top-[18px] lg:top-[10px] -rotate-3 exile-regular
                   px-2 rounded"
        aria-hidden="true"
      >
        NEW ARRIVALS
      </div>
      <h3 className="sr-only">New arrivals</h3>
    </div>
  );
}

export default memo(BottomBadge);
