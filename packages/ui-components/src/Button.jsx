const baseStyle = {
  padding: "0.5rem 1rem",
  borderRadius: "6px",
  border: "1px solid #1d4ed8",
  background: "#2563eb",
  color: "#fff",
  cursor: "pointer",
  fontSize: "0.95rem",
  fontWeight: 500,
};

export function Button({ children, onClick, type = "button", style, ...props }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{ ...baseStyle, ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
