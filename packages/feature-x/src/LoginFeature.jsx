import { useEffect, useState } from "react";
import { Button, TextField } from "@repo/ui-components";
import {
  apiHelper,
  formatDate,
  formatRelativeSince,
  getStorageJSON,
  isNonEmpty,
  isValidEmail,
  LAST_SIGNIN_AT_KEY,
  minLength,
  passwordStrengthLabel,
  REMEMBER_EMAIL_KEY,
  removeStorageItem,
  setStorageJSON,
  truncate,
} from "@repo/utils";

const PASSWORD_MIN = 6;

const strengthColor = {
  "—": "#9ca3af",
  weak: "#b91c1c",
  ok: "#b45309",
  strong: "#047857",
};

export function LoginFeature() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({
    email: "",
    password: "",
  });
  const [lastSignInAt, setLastSignInAt] = useState(null);
  const submittedOn = formatDate(new Date());
  const strength = passwordStrengthLabel(password);

  useEffect(() => {
    const saved = getStorageJSON(REMEMBER_EMAIL_KEY);
    if (typeof saved === "string" && saved.trim()) {
      setEmail(saved);
      setRememberMe(true);
    }
    const prevSignIn = getStorageJSON(LAST_SIGNIN_AT_KEY);
    if (typeof prevSignIn === "string" && prevSignIn.trim()) {
      setLastSignInAt(prevSignIn.trim());
    }
  }, []);

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
        retries: 1,
      });
      if (rememberMe) {
        setStorageJSON(REMEMBER_EMAIL_KEY, email.trim());
      } else {
        removeStorageItem(REMEMBER_EMAIL_KEY);
      }
      const signedInAt = new Date().toISOString();
      setStorageJSON(LAST_SIGNIN_AT_KEY, signedInAt);
      setLastSignInAt(signedInAt);
      setMessage(
        `Ready — checked API as ${truncate(email || "guest", 36)} on ${submittedOn}`,
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
      {lastSignInAt ? (
        <p
          style={{
            margin: "0 0 1rem",
            fontSize: "0.85rem",
            color: "#6b7280",
          }}
        >
          Last successful sign-in:{" "}
          <strong>{formatDate(lastSignInAt)}</strong>
          <span style={{ fontWeight: 400, color: "#9ca3af" }}>
            {" "}
            ({formatRelativeSince(lastSignInAt)})
          </span>
        </p>
      ) : (
        <p style={{ margin: "0 0 1rem", fontSize: "0.85rem", color: "#9ca3af" }}>
          No prior sign-in recorded on this device.
        </p>
      )}
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
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          error={fieldErrors.password}
        />
        {password ? (
          <p
            style={{
              margin: 0,
              fontSize: "0.8rem",
              color: strengthColor[strength] ?? "#6b7280",
            }}
          >
            Password strength: <strong>{strength}</strong>
          </p>
        ) : null}
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.875rem",
            color: "#374151",
          }}
        >
          <input
            type="checkbox"
            checked={showPassword}
            onChange={(e) => setShowPassword(e.target.checked)}
          />
          Show password
        </label>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.875rem",
            color: "#374151",
          }}
        >
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          Remember email on this device
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
