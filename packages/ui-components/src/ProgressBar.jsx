/**
 * Determinate progress for dashboards and forms (minimal inline styles).
 */
export function ProgressBar({ value, max, label }) {
  const safeMax = max > 0 ? max : 1;
  const pct = Math.min(100, Math.max(0, Math.round((value / safeMax) * 100)));
  return (
    <div>
      {label ? (
        <span
          style={{
            display: "block",
            fontSize: "0.75rem",
            color: "#6b7280",
            marginBottom: 4,
          }}
        >
          {label}
        </span>
      ) : null}
      <div
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={safeMax}
        aria-label={label ?? "Progress"}
        style={{
          height: 8,
          borderRadius: 999,
          background: "#e5e7eb",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            borderRadius: 999,
            background: "linear-gradient(90deg, #3b82f6, #2563eb)",
            transition: "width 0.25s ease-out",
          }}
        />
      </div>
    </div>
  );
}
