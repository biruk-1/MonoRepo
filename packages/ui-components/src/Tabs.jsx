/**
 * Accessible tab buttons (pair with your own panel content).
 */
export function Tabs({ id, value, onChange, tabs }) {
  return (
    <div
      role="tablist"
      aria-label={id}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 4,
        marginBottom: "1rem",
        borderBottom: "1px solid #e5e7eb",
        paddingBottom: 4,
      }}
    >
      {tabs.map((tab) => {
        const selected = tab.id === value;
        return (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={selected}
            id={`${id}-tab-${tab.id}`}
            aria-controls={`${id}-panel-${tab.id}`}
            onClick={() => onChange(tab.id)}
            style={{
              padding: "0.45rem 0.85rem",
              fontSize: "0.9rem",
              fontWeight: selected ? 600 : 400,
              border: "1px solid",
              borderColor: selected ? "#2563eb" : "#e5e7eb",
              borderRadius: "6px 6px 0 0",
              background: selected ? "#eff6ff" : "#f9fafb",
              color: selected ? "#1e3a8a" : "#4b5563",
              cursor: "pointer",
              marginBottom: -1,
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
