export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function formatCapacity(mw: number) {
  return mw >= 1000 ? `${(mw / 1000).toFixed(1)} GW` : `${mw} MW`;
}

export function stationNumber(index: number) {
  return String(index + 1).padStart(2, "0");
}

/** Schedule variance in days: negative is early, positive is late. */
export function formatVariance(days: number) {
  if (days === 0) return "On date";
  return days < 0 ? `${Math.abs(days)} days early` : `${days} days late`;
}
