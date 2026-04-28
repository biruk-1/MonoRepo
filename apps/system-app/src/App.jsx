import { LoginFeature } from "@repo/feature-x";
import { DashboardFeature } from "@repo/feature-y";

export default function App() {
  return (
    <div
      style={{
        fontFamily: 'system-ui, "Segoe UI", sans-serif',
        background: "#f9fafb",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <a
        href="#main-content"
        style={{
          position: "absolute",
          left: "-9999px",
          zIndex: 999,
          padding: "0.5rem 1rem",
          background: "#111827",
          color: "#fff",
        }}
        onFocus={(e) => {
          e.target.style.left = "0.5rem";
          e.target.style.top = "0.5rem";
        }}
        onBlur={(e) => {
          e.target.style.left = "-9999px";
          e.target.style.top = "auto";
        }}
      >
        Skip to main content
      </a>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "#fff",
          borderBottom: "1px solid #e5e7eb",
          padding: "1rem 2rem",
          boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "1.25rem", color: "#111827" }}>
          System App
        </h1>
        <p style={{ margin: "0.25rem 0 0", fontSize: "0.875rem", color: "#6b7280" }}>
          Monorepo demo — login and dashboard features
        </p>
      </header>
      <main
        id="main-content"
        style={{
          padding: "2rem",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <LoginFeature />
        <DashboardFeature />
      </main>
      <footer
        style={{
          marginTop: "auto",
          padding: "1.25rem 2rem",
          borderTop: "1px solid #e5e7eb",
          background: "#fff",
          fontSize: "0.8rem",
          color: "#6b7280",
        }}
      >
        <div
          style={{
            maxWidth: 900,
            margin: "0 auto",
            display: "flex",
            flexWrap: "wrap",
            gap: "0.5rem 1.25rem",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>MonoRepo course demo — team delivery via workspace packages.</span>
          <a
            href="https://github.com/biruk-1/MonoRepo"
            style={{ color: "#2563eb" }}
          >
            View on GitHub
          </a>
        </div>
      </footer>
    </div>
  );
}
