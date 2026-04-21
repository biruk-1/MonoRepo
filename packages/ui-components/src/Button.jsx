export function Button({ children, onClick, type = "button", ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        padding: "0.5rem 1rem",
        borderRadius: "6px",
        border: "1px solid #1d4ed8",
        background: "#2563eb",
        color: "#fff",
        cursor: "pointer",
        fontSize: "0.95rem",
        fontWeight: 500,
      }}
      {...props}
    >
      {children}
    </button>
  );
}
