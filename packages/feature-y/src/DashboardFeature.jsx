import { Badge, Card } from "@repo/ui-components";
import { formatDate } from "@repo/utils";

const SAMPLE_ROWS = [
  { id: 1, name: "Alpha", value: 120, updatedAt: "2026-04-15T10:00:00Z" },
  { id: 2, name: "Beta", value: 87, updatedAt: "2026-04-18T14:30:00Z" },
  { id: 3, name: "Gamma", value: 204, updatedAt: "2026-04-20T09:15:00Z" },
];

export function DashboardFeature() {
  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Dashboard (Feature Y)</h2>
      <div
        style={{
          display: "grid",
          gap: "1rem",
          gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        }}
      >
        {SAMPLE_ROWS.map((row) => {
          const tier =
            row.value >= 150 ? "high" : row.value >= 100 ? "mid" : "low";
          const variant =
            tier === "high" ? "success" : tier === "mid" ? "accent" : "default";
          const label =
            tier === "high" ? "High" : tier === "mid" ? "Mid" : "Standard";
          return (
            <Card key={row.id} title={row.name}>
              <p style={{ margin: "0 0 0.5rem" }}>
                <Badge variant={variant} style={{ marginRight: 8 }}>
                  {label}
                </Badge>
                Value: <strong>{row.value}</strong>
              </p>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#6b7280" }}>
                Updated {formatDate(row.updatedAt)}
              </p>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
