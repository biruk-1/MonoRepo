import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section>
      <h2 style={{ marginTop: 0 }}>Page not found</h2>
      <p style={{ color: "#4b5563", maxWidth: 480 }}>
        There is no route for this URL. Use the navigation links above or go back
        to the login page.
      </p>
      <p style={{ marginTop: "1rem" }}>
        <Link
          to="/"
          style={{
            color: "#2563eb",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          ← Back to login
        </Link>
      </p>
    </section>
  );
}
