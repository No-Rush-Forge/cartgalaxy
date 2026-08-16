export function CategoryList({ categories, activeCategory, onSelect, id }) {
  return (
    <section id={id} className="py-4">
      <div className="container">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["All", ...categories].map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelect(category)}
                className={`shrink-0 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-teal-500 text-white shadow-sm shadow-teal-700/20"
                    : "border border-ink/10 text-ink/60 hover:bg-ink/5 dark:border-paper/15 dark:text-paper/60 dark:hover:bg-paper/10"
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
