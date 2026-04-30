/**
 * Horizontal rule with optional centered label (uses flex + line pseudovisual).
 */
export function Divider({ label }) {
  if (!label) {
    return (
      <hr
        style={{
          border: 0,
          borderTop: "1px solid #e5e7eb",
          margin: "1rem 0",
        }}
      />
    );
  }
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        margin: "1rem 0",
        color: "#6b7280",
        fontSize: "0.8rem",
        textTransform: "uppercase",
        letterSpacing: "0.04em",
      }}
    >
      <span style={{ flex: 1, borderTop: "1px solid #e5e7eb" }} />
      <span style={{ whiteSpace: "nowrap" }}>{label}</span>
      <span style={{ flex: 1, borderTop: "1px solid #e5e7eb" }} />
    </div>
  );
}
