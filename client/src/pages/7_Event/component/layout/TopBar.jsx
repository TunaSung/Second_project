import { memo } from "react";
import { LuChevronLeft } from "react-icons/lu";

function TopBar({ onBack }) {
  return (
    <div className="container-mid px-4 py-4">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm px-3 py-1.5 rounded-full
                   ring-1 ring-black/15 hover:bg-black/5"
        aria-label="Go back"
      >
        <LuChevronLeft /> Back
      </button>
    </div>
  );
}
export default memo(TopBar);
