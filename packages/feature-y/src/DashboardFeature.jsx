import { useMemo, useState } from "react";
import { Badge, Button, Card, Spinner, TextField } from "@repo/ui-components";
import { formatDate } from "@repo/utils";

const SAMPLE_ROWS = [
  { id: 1, name: "Alpha", value: 120, updatedAt: "2026-04-15T10:00:00Z" },
  { id: 2, name: "Beta", value: 87, updatedAt: "2026-04-18T14:30:00Z" },
  { id: 3, name: "Gamma", value: 204, updatedAt: "2026-04-20T09:15:00Z" },
];

export function DashboardFeature() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [statsRefreshing, setStatsRefreshing] = useState(false);

  const visibleRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = SAMPLE_ROWS.filter((row) =>
      q ? row.name.toLowerCase().includes(q) : true,
    );
    rows = [...rows].sort((a, b) => {
      if (sortBy === "value") {
        return b.value - a.value;
      }
      if (sortBy === "date") {
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      }
      return a.name.localeCompare(b.name);
    });
    return rows;
  }, [query, sortBy]);

  const stats = useMemo(() => {
    const count = visibleRows.length;
    const totalValue = visibleRows.reduce((acc, r) => acc + r.value, 0);
    return { count, totalValue };
  }, [visibleRows]);

  function handleRefreshStats() {
    setStatsRefreshing(true);
    window.setTimeout(() => setStatsRefreshing(false), 450);
  }

  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Dashboard (Feature Y)</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.75rem",
          marginBottom: "0.75rem",
        }}
      >
        <Button type="button" onClick={handleRefreshStats} disabled={statsRefreshing}>
          {statsRefreshing ? "Refreshing…" : "Refresh stats"}
        </Button>
        {statsRefreshing ? <Spinner label="Updating summary" /> : null}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <div style={{ flex: "1 1 140px", minWidth: 120 }}>
          <Card title="Visible rows">
            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
              {statsRefreshing ? "—" : stats.count}
            </p>
          </Card>
        </div>
        <div style={{ flex: "1 1 140px", minWidth: 120 }}>
          <Card title="Sum of values">
            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
              {statsRefreshing ? "—" : stats.totalValue}
            </p>
          </Card>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
          alignItems: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <div style={{ flex: "1 1 200px", maxWidth: 280 }}>
          <TextField
            label="Search by name"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Alpha"
            aria-label="Filter dashboard rows by name"
          />
        </div>
        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <span style={{ fontSize: "0.85rem", color: "#6b7280" }}>Sort:</span>
          <Button
            type="button"
            onClick={() => setSortBy("name")}
            style={{
              opacity: sortBy === "name" ? 1 : 0.85,
              background: sortBy === "name" ? "#1d4ed8" : "#64748b",
              borderColor: sortBy === "name" ? "#1e40af" : "#475569",
            }}
          >
            Name
          </Button>
          <Button
            type="button"
            onClick={() => setSortBy("value")}
            style={{
              opacity: sortBy === "value" ? 1 : 0.85,
              background: sortBy === "value" ? "#1d4ed8" : "#64748b",
              borderColor: sortBy === "value" ? "#1e40af" : "#475569",
            }}
          >
            Value
          </Button>
          <Button
            type="button"
            onClick={() => setSortBy("date")}
            style={{
              opacity: sortBy === "date" ? 1 : 0.85,
              background: sortBy === "date" ? "#1d4ed8" : "#64748b",
              borderColor: sortBy === "date" ? "#1e40af" : "#475569",
            }}
          >
            Date
          </Button>
        </div>
      </div>

      {visibleRows.length === 0 ? (
        <Card title="No results">
          <p style={{ margin: 0, color: "#6b7280" }}>
            No rows match “{query.trim()}”. Clear the search or try another
            name.
          </p>
        </Card>
      ) : (
        <div
          style={{
            display: "grid",
            gap: "1rem",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
          }}
        >
          {visibleRows.map((row) => {
            const tier =
              row.value >= 150 ? "high" : row.value >= 100 ? "mid" : "low";
            const variant =
              tier === "high"
                ? "success"
                : tier === "mid"
                  ? "accent"
                  : "default";
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
                <p
                  style={{ margin: 0, fontSize: "0.85rem", color: "#6b7280" }}
                >
                  Updated {formatDate(row.updatedAt)}
                </p>
              </Card>
            );
          })}
        </div>
      )}
    </section>
  );
}
