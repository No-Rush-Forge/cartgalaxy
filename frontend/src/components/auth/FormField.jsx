export default function FormField({ id, label, icon: Icon, placeholder, value, onChange, type = "text", autoComplete }) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50"
      >
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 dark:text-paper/35" />
        )}
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`w-full rounded-xl border border-ink/10 bg-transparent py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30 ${
            Icon ? "pl-10 pr-3.5" : "px-3.5"
          }`}
        />
      </div>
    </div>
  );
}
