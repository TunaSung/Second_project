import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuCalendar, LuMapPin } from "react-icons/lu";

import TopBar from "./component/layout/TopBar";
import HeroBlock from "./component/layout/HeroBlock";
import SummaryCard from "./component/layout/SummaryCard";
import ActionRow from "./component/layout/ActionRow";

import { formatDateRange } from "../../components/util/format";
import { eventStatus } from "../../components/Util/status";
import { buildGCalUrl } from "../../components/Util/calender";
import { buildMapUrl } from "../../components/Util/map";
import { shareCurrentUrl } from "../../components/Util/share";

function Event() {
  const { state } = useLocation();
  const nav = useNavigate();

  const event = state?.event || null;

  if (!event) {
    return (
      <main className="min-h-[70vh] grid place-items-center bg-[var(--primary-color)] text-[var(--quaternary-color)]">
        <div className="text-center space-y-4">
          <p className="text-lg">No event data found (this page expects Link state).</p>
          <button
            onClick={() => nav(-1)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full ring-1 ring-black/15 hover:bg-black/5"
          >
            Back
          </button>
        </div>
      </main>
    );
  }

  const {
    title = "Untitled Event",
    description = "",
    imageUrl = "/images/events/placeholder.jpg",
    startDate,
    endDate,
    address = "",
  } = event;

  const dateText = useMemo(() => formatDateRange(startDate, endDate), [startDate, endDate]);
  const status = useMemo(() => eventStatus(startDate, endDate), [startDate, endDate]);
  const calendarHref = useMemo(
    () => buildGCalUrl({ title, startDate, endDate, details: description, location: address }),
    [title, startDate, endDate, description, address]
  );

  const onOpenMap = () => {
    if (!address) return;
    window.open(buildMapUrl(address), "_blank", "noreferrer");
  };

  const onShare = async () => {
    const r = await shareCurrentUrl({ title, text: description });
    if (!r.ok) alert("Share failed.");
    if (r.method === "clipboard") alert("Link copied to clipboard!");
  };

  return (
    <main className="min-h-[100dvh] bg-[var(--primary-color)] text-[var(--quaternary-color)]">
      <TopBar onBack={() => nav(-1)} />

      {/* Hero */}
      <section className="relative">
        <HeroBlock imageUrl={imageUrl} title={title} />

        {/* Card */}
        <div className="container-mid px-4">
          <div className="relative -mt-16 md:-mt-20 lg:-mt-24
                          bg-[var(--secondary-color)] rounded-2xl
                          shadow-[0_18px_50px_rgba(0,0,0,.2)]
                          ring-1 ring-black/10 overflow-hidden">
            <div className="grid md:grid-cols-5">
              {/* Left: title / date / CTA */}
              <div className="md:col-span-3 p-5 sm:p-6 lg:p-8">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 text-xs rounded-full text-white ${status.color}`}>
                    {status.text}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight">
                  {title}
                </h1>
                <p className="mt-3 text-sm sm:text-base opacity-80 flex items-center gap-2">
                  <LuCalendar aria-hidden /> {dateText}
                </p>
                {address && (
                  <button
                    onClick={onOpenMap}
                    className="mt-2 text-sm inline-flex items-center gap-2 underline-offset-4 hover:underline"
                    aria-label={`Open in map: ${address}`}
                  >
                    <LuMapPin /> {address}
                  </button>
                )}

                <ActionRow calendarHref={calendarHref} onShare={onShare} />
              </div>

              {/* Right: summary column */}
              <SummaryCard status={status} dateText={dateText} address={address} onOpenMap={onOpenMap} />
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="container-mid px-4 py-10">
        <article className="bg-[var(--secondary-color)] rounded-2xl p-6 ring-1 ring-black/10">
          <h2 className="text-xl font-semibold mb-4">About this event</h2>
          <p className="leading-relaxed text-[var(--quaternary-color)]/85">
            {description || "No additional description was provided."}
          </p>
        </article>
      </section>
    </main>
  );
}

export default Event