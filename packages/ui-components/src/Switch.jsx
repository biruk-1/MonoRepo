/**
 * Accessible toggle switch (boolean).
 */
export function Switch({ id, checked, onChange, label }) {
  return (
    <label
      htmlFor={id}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        cursor: "pointer",
        fontSize: "0.875rem",
        color: "#374151",
        userSelect: "none",
      }}
    >
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        style={{
          position: "relative",
          width: 44,
          height: 24,
          borderRadius: 999,
          border: "1px solid",
          borderColor: checked ? "#2563eb" : "#d1d5db",
          background: checked ? "#3b82f6" : "#e5e7eb",
          padding: 2,
          cursor: "pointer",
          transition: "background 0.15s ease, border-color 0.15s ease",
        }}
      >
        <span
          aria-hidden
          style={{
            display: "block",
            width: 18,
            height: 18,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.15)",
            transform: checked ? "translateX(20px)" : "translateX(0)",
            transition: "transform 0.15s ease",
          }}
        />
      </button>
      {label ? <span>{label}</span> : null}
    </label>
  );
}
