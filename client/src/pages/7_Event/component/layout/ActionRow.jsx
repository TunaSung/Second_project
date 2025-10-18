import { memo } from "react";
import { LuShare2 } from "react-icons/lu";

function ActionRow({ calendarHref, onShare }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2">
      <a
        href={calendarHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                   bg-[var(--quaternary-color)] text-[var(--primary-color)]
                   hover:translate-y-[-1px] active:translate-y-0 transition-transform"
      >
        Add to Google Calendar
      </a>
      <button
        onClick={onShare}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                   ring-1 ring-black/15 hover:bg-black/5"
      >
        <LuShare2 /> Share
      </button>
    </div>
  );
}
export default memo(ActionRow);
