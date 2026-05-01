import { useState } from "react";

const BANNER_SESSION_KEY = "monorepo:demo-banner-dismissed";

/** One-session notice that dataset is synthetic; dismiss hides until new tab/session. */
export function SessionBanner() {
  const [dismissed, setDismissed] = useState(() => {
    try {
      return globalThis.sessionStorage?.getItem(BANNER_SESSION_KEY) === "1";
    } catch {
      return false;
    }
  });

  function dismiss() {
    try {
      globalThis.sessionStorage?.setItem(BANNER_SESSION_KEY, "1");
    } catch {
      /* private mode */
    }
    setDismissed(true);
  }

  if (dismissed) {
    return null;
  }

  return (
    <div
      role="region"
      aria-label="Demo notice"
      style={{
        background: "#fffbeb",
        borderBottom: "1px solid #fcd34d",
        padding: "0.5rem 2rem",
        fontSize: "0.85rem",
        color: "#78350f",
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.75rem",
        textAlign: "center",
      }}
    >
      <span>
        <strong>Demo data:</strong> metrics are in-memory samples for learning monorepo workflows—not
        production telemetry.
      </span>
      <button
        type="button"
        onClick={dismiss}
        style={{
          border: "1px solid #d97706",
          background: "#fff",
          borderRadius: 6,
          padding: "0.2rem 0.65rem",
          fontSize: "0.8rem",
          cursor: "pointer",
          color: "#92400e",
        }}
      >
        Dismiss for this session
      </button>
    </div>
  );
}
