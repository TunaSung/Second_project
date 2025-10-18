import { LuCalendar, LuChevronRight } from "react-icons/lu";
import { formatDateRange } from "../../../../components/Util/format";
import { memo } from "react";
import { Link } from "react-router-dom";

function EventCard({ event = {} }) {
  const {
    id,
    title = "Untitled Event",
    imageUrl = "/images/events/placeholder.jpg",
    startDate,
    endDate,
  } = event;

  const dateText = formatDateRange(startDate, endDate);

  return (
    <article
      className="
      group relative w-[15rem] aspect-square sm:w-[18rem]
      bg-[var(--secondary-color)] rounded-2xl
      shadow-[0_10px_30px_rgba(0,0,0,0.18)] ring-1 ring-black/10 overflow-hidden
      focus-within:ring-2 focus-within:ring-black/40"
      tabIndex={0}
      aria-label={`${title}, ${dateText}`}
    >
      {/* start Polaroid */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-3 rounded-xl bg-[var(--tertiary-color)]/18" />
      </div>
      {/* end Polaroid */}

      {/* start img */}
      <div className="relative m-3 mb-1 rounded-xl overflow-hidden h-[62%] bg-[var(--primary-color)]">
        <img
          src={imageUrl}
          alt={title}
          loading="lazy"
          className="block absolute inset-0 w-full h-full object-cover"
        />
        <span
          className="absolute left-3 top-3 px-2 py-0.5 text-xs tracking-wide rounded-full
                         bg-[var(--quaternary-color)] text-[var(--primary-color)]"
        >
          EVENT
        </span>
      </div>
      {/* end img */}

      {/* start title */}
      <div className="px-4 pt-2 pb-3 space-y-1.5">
        <h3 className="font-semibold text-[var(--quaternary-color)]/90 line-clamp-1">
          {title}
        </h3>
        <p className="text-sm text-black/70 flex items-center gap-2">
          <LuCalendar aria-hidden />
          {dateText}
        </p>
      </div>
      {/* end title */}

      {/* start CTA */}
      <div className="absolute right-3 bottom-3">
        <Link
          to={`/event/${id}`}
          state={{ event }}
          className="inline-flex items-center gap-1 px-3 py-1.5 text-sm rounded-full
                      bg-[var(--quaternary-color)] text-[var(--primary-color)]
                      group-hover:translate-x-0.5 transition-transform"
        >
          Details <LuChevronRight />
        </Link>
      </div>
      {/* end CTA */}
    </article>
  );
}

export default memo(EventCard);
