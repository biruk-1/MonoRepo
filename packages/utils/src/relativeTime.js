/**
 * Human-friendly relative time (e.g. "3 hours ago") using Intl.RelativeTimeFormat.
 * @param {string | Date} isoOrDate
 * @param {Date} [now]
 */
export function formatRelativeSince(isoOrDate, now = new Date()) {
  const d = typeof isoOrDate === "string" ? new Date(isoOrDate) : isoOrDate;
  if (Number.isNaN(d.getTime())) {
    return "—";
  }

  const elapsedMs = now.getTime() - d.getTime();
  const past = elapsedMs >= 0;
  const abs = Math.abs(elapsedMs);

  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  /** @type {Intl.RelativeTimeFormatUnit} */
  let unit = "second";
  let amount = abs / 1000;

  if (abs >= year) {
    unit = "year";
    amount = abs / year;
  } else if (abs >= month) {
    unit = "month";
    amount = abs / month;
  } else if (abs >= week) {
    unit = "week";
    amount = abs / week;
  } else if (abs >= day) {
    unit = "day";
    amount = abs / day;
  } else if (abs >= hour) {
    unit = "hour";
    amount = abs / hour;
  } else if (abs >= minute) {
    unit = "minute";
    amount = abs / minute;
  }

  const rounded = Math.round(amount) * (past ? -1 : 1);
  return rtf.format(rounded, unit);
}
