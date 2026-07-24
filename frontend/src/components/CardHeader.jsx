

const CardHeader = ({ eyebrow, title, subtitle }) => (
  <div style={{ marginBottom: 26 }}>
    <div className="eyebrow" style={{ marginBottom: 10 }}>{eyebrow}</div>
    <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.01em", color: "var(--ink-0)" }}>
      {title}
    </h1>
    {subtitle && (
      <p style={{ fontSize: 13.5, color: "var(--ink-1)", margin: "8px 0 0", lineHeight: 1.5 }}>{subtitle}</p>
    )}
  </div>
);

export default CardHeader;
