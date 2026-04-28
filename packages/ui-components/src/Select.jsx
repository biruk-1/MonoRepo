import { useId } from "react";

/**
 * Labeled native select for forms and filters.
 */
export function Select({ label, id, options, value, onChange, ...selectProps }) {
  const autoId = useId();
  const sid = id ?? `select-${autoId}`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      {label ? (
        <label
          htmlFor={sid}
          style={{ fontSize: "0.9rem", color: "#374151" }}
        >
          {label}
        </label>
      ) : null}
      <select
        id={sid}
        value={value}
        onChange={onChange}
        style={{
          padding: "0.5rem 0.6rem",
          borderRadius: 6,
          border: "1px solid #d1d5db",
          background: "#fff",
          fontSize: "0.95rem",
        }}
        {...selectProps}
      >
        {options.map((opt) => (
          <option key={String(opt.value)} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
