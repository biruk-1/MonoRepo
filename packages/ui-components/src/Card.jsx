export function Card({ title, children, ...props }) {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "1rem",
        background: "#fff",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.08)",
      }}
      {...props}
    >
      {title ? (
        <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.1rem" }}>{title}</h3>
      ) : null}
      {children}
    </div>
  );
}
