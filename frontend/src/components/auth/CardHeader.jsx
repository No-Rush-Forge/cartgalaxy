export default function CardHeader({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-6">
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-100">
          {eyebrow}
        </p>
      )}
      <h1 className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper">
        {title}
      </h1>
      {subtitle && <p className="mt-1.5 text-sm text-ink-light dark:text-paper/65">{subtitle}</p>}
    </div>
  );
}
