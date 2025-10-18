export function eventStatus(startDate, endDate) {
  const now = new Date();
  const s = new Date(startDate);
  const e = endDate ? new Date(endDate) : s;
  if (now < s) return { text: "未開始", color: "bg-amber-600" };
  if (now >= s && now <= new Date(e.getTime() + 1000 * 60 * 60 * 24 - 1))
    return { text: "進行中", color: "bg-emerald-600" };
  return { text: "已結束", color: "bg-stone-600" };
}
