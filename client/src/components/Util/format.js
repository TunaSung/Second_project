export const formatDate = (isoString) => {
  const date = new Date(isoString);
  return date
    .toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Taipei",
    })
    .replace(/\//g, "-"); // 年月日中橫線
};

export function formatDateRange(startDate, endDate) {
  if (!startDate) return "—";
  const tz = { timeZone: "Asia/Taipei" };
  const s = new Date(startDate);
  const e = endDate ? new Date(endDate) : s;

  const y = new Intl.DateTimeFormat("zh-TW", { year: "numeric", ...tz });
  const md = new Intl.DateTimeFormat("zh-TW", {
    month: "2-digit",
    day: "2-digit",
    ...tz,
  });

  const ys = y.format(s),
    ye = y.format(e);
  const ms = md.format(s),
    me = md.format(e);

  // 同天
  if (s.toDateString() === e.toDateString()) return `${ys}/${ms}`;
  // 同年
  if (ys === ye) return `${ys}/${ms} – ${me}`;
  // 跨年
  return `${ys}/${ms} – ${ye}/${me}`;
}

export function formatCurrency(n) {
  if (n == null) return "--";
  try {
    return new Intl.NumberFormat("zh-TW", {
      style: "currency",
      currency: "TWD",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `NT$ ${n}`;
  }
}
