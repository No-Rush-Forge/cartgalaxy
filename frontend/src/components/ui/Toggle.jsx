function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ink dark:text-paper">{label}</p>
        {description && <p className="text-xs text-ink-light dark:text-paper/55">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-teal-500" : "bg-ink/15 dark:bg-paper/20"
          }`}
      >
        <span
          className={`absolute top-[2px] h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${checked ? "translate-x-[0px]" : "translate-x-[-20px]"
            }`}
        />
      </button>
    </div>
  );
}


export default Toggle