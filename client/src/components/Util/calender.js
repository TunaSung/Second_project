export function isSameDay(a, b) {
  const A = new Date(a), B = new Date(b);
  return (
    A.getUTCFullYear() === B.getUTCFullYear() &&
    A.getUTCMonth() === B.getUTCMonth() &&
    A.getUTCDate() === B.getUTCDate()
  );
}
function toYmdUTC(dateLike) {
  const d = new Date(dateLike);
  const y = `${d.getUTCFullYear()}`.padStart(4, "0");
  const m = `${d.getUTCMonth() + 1}`.padStart(2, "0");
  const day = `${d.getUTCDate()}`.padStart(2, "0");
  return `${y}${m}${day}`;
}
function addDaysUTC(dateLike, days) {
  const d = new Date(dateLike);
  d.setUTCDate(d.getUTCDate() + days);
  return d;
}
export function buildGCalUrl({ title, startDate, endDate, details = "", location = "" }) {
  if (!startDate) return "#";
  const s = toYmdUTC(startDate);
  const e = endDate && !isSameDay(startDate, endDate)
    ? toYmdUTC(endDate)
    : toYmdUTC(addDaysUTC(startDate, 1)); // exclusive end for all-day
  const qs = new URLSearchParams({
    action: "TEMPLATE",
    text: title || "Event",
    dates: `${s}/${e}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/render?${qs.toString()}`;
}