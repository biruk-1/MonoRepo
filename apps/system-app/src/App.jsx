import { LoginFeature } from "@repo/feature-x";
import { DashboardFeature } from "@repo/feature-y";

export default function App() {
  return (
    <main
      style={{
        fontFamily: 'system-ui, "Segoe UI", sans-serif',
        padding: "2rem",
        maxWidth: 900,
        margin: "0 auto",
        background: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginTop: 0, color: "#111827" }}>System App</h1>
      <LoginFeature />
      <DashboardFeature />
    </main>
  );
}
