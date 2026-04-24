import { useState } from "react";
import { Button, TextField } from "@repo/ui-components";
import {
  apiHelper,
  formatDate,
  isNonEmpty,
  isValidEmail,
  minLength,
} from "@repo/utils";

const PASSWORD_MIN = 6;

export function LoginFeature() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const submittedOn = formatDate(new Date());

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    const nextErrors = { email: "", password: "" };
    if (!isNonEmpty(email)) {
      nextErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (!isNonEmpty(password)) {
      nextErrors.password = "Password is required.";
    } else if (!minLength(password, PASSWORD_MIN)) {
      nextErrors.password = `Password must be at least ${PASSWORD_MIN} characters.`;
    }
    setFieldErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) {
      return;
    }

    setLoading(true);
    try {
      await apiHelper("https://jsonplaceholder.typicode.com/posts/1", {
        method: "GET",
        timeoutMs: 15000,
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
        <TextField
          label="Email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
          error={fieldErrors.email}
        />
        <TextField
          label="Password"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          error={fieldErrors.password}
        />
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
