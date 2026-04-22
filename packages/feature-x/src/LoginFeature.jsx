import { useState } from "react";
import { Button } from "@repo/ui-components";
import { apiHelper, formatDate, isValidEmail } from "@repo/utils";

export function LoginFeature() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const submittedOn = formatDate(new Date());

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    if (email && !isValidEmail(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      await apiHelper("https://jsonplaceholder.typicode.com/posts/1", {
        method: "GET",
      });
      setMessage(
        `Ready — checked API as ${email || "guest"} on ${submittedOn}`,
      );
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Request failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section style={{ marginBottom: "2rem" }}>
      <h2 style={{ marginTop: 0 }}>Login (Feature X)</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
          maxWidth: 320,
        }}
      >
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span>Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            style={{ padding: 8, borderRadius: 4, border: "1px solid #d1d5db" }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="current-password"
            style={{ padding: 8, borderRadius: 4, border: "1px solid #d1d5db" }}
          />
        </label>
        <Button type="submit" disabled={loading}>
          {loading ? "Working…" : "Sign in"}
        </Button>
      </form>
      {message ? (
        <p style={{ marginTop: 12, color: "#374151" }}>{message}</p>
      ) : null}
    </section>
  );
}
