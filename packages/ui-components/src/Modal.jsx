import { useEffect, useId } from "react";

/**
 * Accessible overlay dialog. Closes on Escape or backdrop click.
 */
export function Modal({ open, title, children, onClose, ...props }) {
  const titleId = useId();

  useEffect(() => {
    if (!open) {
      return undefined;
    }
    function onKey(e) {
      if (e.key === "Escape") {
        onClose?.();
      }
    }
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return (
    <div
      role="presentation"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(17, 24, 39, 0.45)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}
      {...props}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        style={{
          background: "#fff",
          borderRadius: 12,
          maxWidth: 480,
          width: "100%",
          maxHeight: "90vh",
          overflow: "auto",
          padding: "1.25rem",
          boxShadow: "0 25px 50px rgba(0,0,0,0.2)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2
          id={titleId}
          style={{ margin: "0 0 1rem", fontSize: "1.15rem", color: "#111827" }}
        >
          {title}
        </h2>
        {children}
      </div>
    </div>
  );
}
