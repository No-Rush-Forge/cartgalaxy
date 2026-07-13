import React from "react";

/* ------------------------------------------------------------------
   Shell: logo + eyebrow + top-right nav link
------------------------------------------------------------------- */
const AuthShell = ({ children, topLinkLabel, topLinkAction }) => (
  <div className="auth-root">
    <div className="auth-grid" />
    <div style={{ position: "absolute", top: 24, left: 28, display: "flex", alignItems: "center", gap: 10, zIndex: 2 }}>
      <div className="logo-mark">A</div>
      <span className="eyebrow" style={{ color: "var(--ink-1)" }}>Acme Cloud</span>
    </div>
    {topLinkLabel && (
      <button
        onClick={topLinkAction}
        className="top-link mono"
        style={{
          position: "absolute",
          top: 26,
          right: 28,
          zIndex: 2,
          fontSize: 13,
          background: "none",
          border: "1px solid var(--line)",
          borderRadius: 7,
          padding: "7px 14px",
          cursor: "pointer",
        }}
      >
        {topLinkLabel}
      </button>
    )}
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "88px 20px 40px",
        position: "relative",
        zIndex: 1,
      }}
    >
      <div style={{ width: "100%", maxWidth: 408 }} className="page-transition">
        {children}
      </div>
    </div>
  </div>
);

export default AuthShell;
