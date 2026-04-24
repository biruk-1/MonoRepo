import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          role="alert"
          style={{
            padding: "1.5rem",
            margin: "1rem",
            border: "1px solid #fecaca",
            borderRadius: 8,
            background: "#fef2f2",
            color: "#991b1b",
            fontFamily: 'system-ui, "Segoe UI", sans-serif',
          }}
        >
          <strong>Something went wrong.</strong>
          <pre
            style={{
              marginTop: "0.75rem",
              fontSize: "0.85rem",
              whiteSpace: "pre-wrap",
            }}
          >
            {this.state.error.message}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
