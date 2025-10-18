import { memo } from "react";
import { LuCalendar, LuClock, LuMapPin, LuExternalLink } from "react-icons/lu";
import InfoRow from "./InfoRow";

function SummaryCard({ status, dateText, address, onOpenMap }) {
  return (
    <aside className="md:col-span-2 bg-[var(--secondary-color)]/70
                      border-t md:border-l md:border-t-0 border-black/10
                      p-5 sm:p-6">
      <h3 className="font-semibold mb-3">Summary</h3>
      <div className="space-y-4">
        <InfoRow
          icon={<span className={`inline-block w-2.5 h-2.5 rounded-full ${status.color}`} />}
          label="Status"
          value={
            <span className={`inline-flex px-2 py-0.5 text-xs rounded-full text-white ${status.color}`}>
              {status.text}
            </span>
          }
        />
        <InfoRow icon={<LuCalendar />} label="Date" value={dateText} />
        <InfoRow icon={<LuClock />} label="Timezone" value="GMT+8 (Taipei)" />
        {address && (
          <InfoRow
            icon={<LuMapPin />}
            label="Location"
            value={
              <button
                onClick={onOpenMap}
                className="flex text-start gap-2 underline-offset-4 hover:underline"
                aria-label={`Open in map: ${address}`}
              >
                {address} <LuExternalLink />
              </button>
            }
          />
        )}
      </div>
    </aside>
  );
}
export default memo(SummaryCard);
