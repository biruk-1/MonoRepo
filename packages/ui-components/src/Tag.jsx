/**
 * Filter / status chip with optional dismiss (×).
 */
export function Tag({ children, onRemove, removeLabel = "Remove filter" }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: 999,
        fontSize: "0.8rem",
        background: "#eff6ff",
        border: "1px solid #bfdbfe",
        color: "#1e3a8a",
      }}
    >
      <span>{children}</span>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          aria-label={removeLabel}
          style={{
            border: "none",
            background: "none",
            padding: 0,
            margin: 0,
            cursor: "pointer",
            fontSize: "1rem",
            lineHeight: 1,
            color: "#1d4ed8",
          }}
        >
          ×
        </button>
      ) : null}
    </span>
  );
}
