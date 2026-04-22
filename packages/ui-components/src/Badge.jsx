const VARIANTS = {
  default: { bg: "#e5e7eb", color: "#374151" },
  success: { bg: "#d1fae5", color: "#065f46" },
  accent: { bg: "#dbeafe", color: "#1e40af" },
};

export function Badge({ children, variant = "default", style, ...props }) {
  const { bg, color } = VARIANTS[variant] ?? VARIANTS.default;
  return (
    <span
      style={{
        display: "inline-block",
        fontSize: "0.7rem",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.04em",
        padding: "0.2rem 0.5rem",
        borderRadius: 9999,
        background: bg,
        color,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
}
