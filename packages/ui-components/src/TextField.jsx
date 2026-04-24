export function TextField({
  label,
  id,
  error,
  style: inputStyle,
  ...inputProps
}) {
  const inputId =
    id ??
    (label
      ? `tf-${String(label).replace(/\s+/g, "-").toLowerCase()}`
      : `tf-${Math.random().toString(36).slice(2, 9)}`);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label ? (
        <label
          htmlFor={inputId}
          style={{ fontSize: "0.9rem", color: "#374151" }}
        >
          {label}
        </label>
      ) : null}
      <input
        id={inputId}
        style={{
          padding: 8,
          borderRadius: 4,
          border: `1px solid ${error ? "#f87171" : "#d1d5db"}`,
          ...inputStyle,
        }}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${inputId}-err` : undefined}
        {...inputProps}
      />
      {error ? (
        <span
          id={`${inputId}-err`}
          role="alert"
          style={{ fontSize: "0.8rem", color: "#b91c1c" }}
        >
          {error}
        </span>
      ) : null}
    </div>
  );
}
