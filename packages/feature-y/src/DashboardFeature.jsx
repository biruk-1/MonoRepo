import { useEffect, useMemo, useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  Divider,
  Modal,
  ProgressBar,
  Select,
  Spinner,
  Tabs,
  TextField,
} from "@repo/ui-components";
import { formatDate } from "@repo/utils";

function formatInt(n) {
  return Number(n).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

const SAMPLE_ROWS = [
  {
    id: 1,
    name: "Alpha",
    value: 120,
    region: "North",
    updatedAt: "2026-04-15T10:00:00Z",
  },
  {
    id: 2,
    name: "Beta",
    value: 87,
    region: "South",
    updatedAt: "2026-04-18T14:30:00Z",
  },
  {
    id: 3,
    name: "Gamma",
    value: 204,
    region: "West",
    updatedAt: "2026-04-20T09:15:00Z",
  },
  {
    id: 4,
    name: "Delta Ops",
    value: 142,
    region: "North",
    updatedAt: "2026-04-21T16:00:00Z",
  },
];

function rowTier(row) {
  if (row.value >= 150) {
    return "high";
  }
  if (row.value >= 100) {
    return "mid";
  }
  return "low";
}

function tierBadgeProps(tier) {
  if (tier === "high") {
    return { variant: "success", label: "High" };
  }
  if (tier === "mid") {
    return { variant: "accent", label: "Mid" };
  }
  return { variant: "default", label: "Standard" };
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function DashboardFeature() {
  const [query, setQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [regionFilter, setRegionFilter] = useState("all");
  const [sortBy, setSortBy] = useState("name");
  const [viewMode, setViewMode] = useState("grid");
  const [statsRefreshing, setStatsRefreshing] = useState(false);
  const [detailRow, setDetailRow] = useState(null);
  const [exportNotice, setExportNotice] = useState(null);

  useEffect(() => {
    if (!exportNotice) {
      return undefined;
    }
    const t = window.setTimeout(() => setExportNotice(null), 3200);
    return () => window.clearTimeout(t);
  }, [exportNotice]);

  const visibleRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let rows = SAMPLE_ROWS.filter((row) =>
      q ? row.name.toLowerCase().includes(q) : true,
    );
    if (tierFilter !== "all") {
      rows = rows.filter((row) => rowTier(row) === tierFilter);
    }
    if (regionFilter !== "all") {
      rows = rows.filter((row) => row.region === regionFilter);
    }
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
  }, [query, sortBy, tierFilter, regionFilter]);

  const stats = useMemo(() => {
    const count = visibleRows.length;
    const totalValue = visibleRows.reduce((acc, r) => acc + r.value, 0);
    const byRegion = visibleRows.reduce((acc, r) => {
      acc[r.region] = (acc[r.region] ?? 0) + 1;
      return acc;
    }, {});
    return { count, totalValue, byRegion };
  }, [visibleRows]);

  const maxVisibleValue = useMemo(
    () => Math.max(1, ...visibleRows.map((r) => r.value)),
    [visibleRows],
  );

  function handleRefreshStats() {
    setStatsRefreshing(true);
    window.setTimeout(() => setStatsRefreshing(false), 450);
  }

  function handleExport() {
    downloadJson("dashboard-export.json", {
      exportedAt: new Date().toISOString(),
      rowCount: visibleRows.length,
      rows: visibleRows,
    });
    setExportNotice({
      variant: "success",
      title: "Export started",
      body: `Downloaded ${visibleRows.length} visible row(s) as JSON.`,
    });
  }

  function resetFilters() {
    setQuery("");
    setTierFilter("all");
    setRegionFilter("all");
    setSortBy("name");
  }

  const filtersActive =
    query.trim() !== "" ||
    tierFilter !== "all" ||
    regionFilter !== "all" ||
    sortBy !== "name";

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
        <Button
          type="button"
          onClick={handleExport}
          style={{
            background: "#059669",
            borderColor: "#047857",
          }}
        >
          Export visible as JSON
        </Button>
        <Button type="button" onClick={resetFilters} disabled={!filtersActive}>
          Reset filters
        </Button>
        {statsRefreshing ? <Spinner label="Updating summary" /> : null}
      </div>

      {exportNotice ? (
        <div style={{ marginBottom: "0.75rem" }}>
          <Alert variant={exportNotice.variant} title={exportNotice.title}>
            {exportNotice.body}
          </Alert>
        </div>
      ) : null}

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
              {statsRefreshing ? "—" : formatInt(stats.count)}
            </p>
          </Card>
        </div>
        <div style={{ flex: "1 1 140px", minWidth: 120 }}>
          <Card title="Sum of values">
            <p style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>
              {statsRefreshing ? "—" : formatInt(stats.totalValue)}
            </p>
          </Card>
        </div>
        <div style={{ flex: "1 1 220px", minWidth: 180 }}>
          <Card title="By region">
            <ul style={{ margin: 0, paddingLeft: "1.1rem", fontSize: "0.9rem" }}>
              {Object.keys(stats.byRegion).length === 0 ? (
                <li style={{ color: "#6b7280" }}>No rows</li>
              ) : (
                Object.entries(stats.byRegion).map(([region, n]) => (
                  <li key={region}>
                    {region}: <strong>{formatInt(n)}</strong>
                  </li>
                ))
              )}
            </ul>
          </Card>
        </div>
      </div>

      <Divider label="Filters & view" />

      <Tabs
        id="dashboard-view"
        value={viewMode}
        onChange={setViewMode}
        tabs={[
          { id: "grid", label: "Card grid" },
          { id: "table", label: "Table" },
        ]}
      />
      <div
        id={`dashboard-view-panel-${viewMode}`}
        role="tabpanel"
        aria-labelledby={`dashboard-view-tab-${viewMode}`}
      >
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
          <div style={{ flex: "1 1 160px", maxWidth: 220 }}>
            <Select
              label="Tier filter"
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              options={[
                { value: "all", label: "All tiers" },
                { value: "high", label: "High" },
                { value: "mid", label: "Mid" },
                { value: "low", label: "Standard" },
              ]}
            />
          </div>
          <div style={{ flex: "1 1 160px", maxWidth: 220 }}>
            <Select
              label="Region"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
              options={[
                { value: "all", label: "All regions" },
                { value: "North", label: "North" },
                { value: "South", label: "South" },
                { value: "West", label: "West" },
              ]}
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
              No rows match your filters. Try clearing search, region, or tier.
            </p>
          </Card>
        ) : viewMode === "grid" ? (
          <div
            style={{
              display: "grid",
              gap: "1rem",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            }}
          >
            {visibleRows.map((row) => {
              const tier = rowTier(row);
              const { variant, label } = tierBadgeProps(tier);
              return (
                <Card key={row.id} title={row.name}>
                  <p style={{ margin: "0 0 0.5rem" }}>
                    <Badge variant={variant} style={{ marginRight: 8 }}>
                      {label}
                    </Badge>
                    Value: <strong>{formatInt(row.value)}</strong>
                  </p>
                  <p style={{ margin: "0 0 0.35rem", fontSize: "0.85rem", color: "#6b7280" }}>
                    Region: {row.region}
                  </p>
                  <p
                    style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", color: "#6b7280" }}
                  >
                    Updated {formatDate(row.updatedAt)}
                  </p>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <ProgressBar
                      label="Share of highest visible value"
                      value={row.value}
                      max={maxVisibleValue}
                    />
                  </div>
                  <Button type="button" onClick={() => setDetailRow(row)}>
                    View details
                  </Button>
                </Card>
              );
            })}
          </div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.9rem",
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 8,
              }}
            >
              <thead>
                <tr style={{ background: "#f9fafb", textAlign: "left" }}>
                  <th style={{ padding: "0.65rem 0.75rem", borderBottom: "1px solid #e5e7eb" }}>
                    Name
                  </th>
                  <th style={{ padding: "0.65rem 0.75rem", borderBottom: "1px solid #e5e7eb" }}>
                    Tier
                  </th>
                  <th style={{ padding: "0.65rem 0.75rem", borderBottom: "1px solid #e5e7eb" }}>
                    Value
                  </th>
                  <th style={{ padding: "0.65rem 0.75rem", borderBottom: "1px solid #e5e7eb" }}>
                    Region
                  </th>
                  <th style={{ padding: "0.65rem 0.75rem", borderBottom: "1px solid #e5e7eb" }}>
                    Updated
                  </th>
                  <th style={{ padding: "0.65rem 0.75rem", borderBottom: "1px solid #e5e7eb" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {visibleRows.map((row) => {
                  const tier = rowTier(row);
                  const { variant, label } = tierBadgeProps(tier);
                  return (
                    <tr key={row.id}>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #f3f4f6" }}>
                        {row.name}
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #f3f4f6" }}>
                        <Badge variant={variant}>{label}</Badge>
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #f3f4f6" }}>
                        {formatInt(row.value)}
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #f3f4f6" }}>
                        {row.region}
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #f3f4f6" }}>
                        {formatDate(row.updatedAt)}
                      </td>
                      <td style={{ padding: "0.6rem 0.75rem", borderBottom: "1px solid #f3f4f6" }}>
                        <Button type="button" onClick={() => setDetailRow(row)}>
                          Details
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal
        open={detailRow != null}
        title={detailRow ? `Record — ${detailRow.name}` : ""}
        onClose={() => setDetailRow(null)}
      >
        {detailRow ? (
          <div>
            <pre
              style={{
                margin: "0 0 1rem",
                padding: "0.75rem",
                background: "#f3f4f6",
                borderRadius: 8,
                fontSize: "0.8rem",
                overflow: "auto",
                maxHeight: 240,
              }}
            >
              {JSON.stringify(detailRow, null, 2)}
            </pre>
            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
              <Button type="button" onClick={() => setDetailRow(null)}>
                Close
              </Button>
              <Button
                type="button"
                onClick={() => downloadJson(`row-${detailRow.id}.json`, detailRow)}
                style={{
                  background: "#059669",
                  borderColor: "#047857",
                }}
              >
                Download row JSON
              </Button>
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}
