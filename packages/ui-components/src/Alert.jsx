const VARIANTS = {
  info: { bg: "#eff6ff", border: "#bfdbfe", color: "#1e3a8a" },
  success: { bg: "#ecfdf5", border: "#6ee7b7", color: "#047857" },
  warning: { bg: "#fffbeb", border: "#fcd34d", color: "#92400e" },
};

export function Alert({ variant = "info", title, children, ...props }) {
  const v = VARIANTS[variant] ?? VARIANTS.info;
  return (
    <div
      role="status"
      style={{
        padding: "0.75rem 1rem",
        borderRadius: 8,
        border: `1px solid ${v.border}`,
        background: v.bg,
        color: v.color,
        fontSize: "0.9rem",
      }}
      {...props}
    >
      {title ? (
        <strong style={{ display: "block", marginBottom: children ? 6 : 0 }}>
          {title}
        </strong>
      ) : null}
      {children}
    </div>
  );
}
