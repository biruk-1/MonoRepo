/** @param {unknown} n */
export function formatInteger(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) {
    return "—";
  }
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0,
  }).format(num);
}

/** Compact notation for large counts (e.g. 1.2K). */
export function formatCompact(n) {
  const num = Number(n);
  if (!Number.isFinite(num)) {
    return "—";
  }
  return new Intl.NumberFormat(undefined, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(num);
}
