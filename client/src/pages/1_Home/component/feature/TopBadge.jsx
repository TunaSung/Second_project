import { memo } from "react";

function TopBadge() {
  return (
    <div className="absolute w-screen h-10 left-0 top-0 z-[500] pointer-events-none select-none">
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
          d="M0 0 A50 10 0 0 0 9.5 6"
          stroke="var(--quaternary-color)"
          strokeWidth="0.6"
          fill="none"
        />
        <path
          d="M24.8 8 A50 10 0 0 0 100 0"
          stroke="var(--quaternary-color)"
          strokeWidth="0.6"
          fill="none"
        />
      </svg>
      <div
        className="absolute text-[var(--quaternary-color)] bg-[var(--secondary-color)]
                   text-xl lg:text-3xl left-[10%] top-[16px] lg:top-[10px] rotate-3 exile-regular
                   px-2 rounded"
        aria-hidden="true"
      >
        NEW EVENTS
      </div>
      <h3 className="sr-only">New events</h3>
    </div>
  );
}

export default memo(TopBadge);
