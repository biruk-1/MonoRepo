/** Small loading indicator for inline use (no extra deps). */
export function Spinner({ label = "Loading", ...props }) {
  return (
    <span
      role="status"
      aria-live="polite"
      aria-label={label}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontSize: "0.85rem",
        color: "#4b5563",
      }}
      {...props}
    >
      <span
        style={{
          width: 16,
          height: 16,
          border: "2px solid #e5e7eb",
          borderTopColor: "#2563eb",
          borderRadius: "50%",
          display: "inline-block",
          animation: "repo-spin 0.7s linear infinite",
        }}
      />
      {label}
      <style>{`@keyframes repo-spin { to { transform: rotate(360deg); } }`}</style>
    </span>
  );
}
