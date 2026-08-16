import { Search } from "lucide-react";
import { Card } from "@/components/ui/card";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";

export function SearchToolbar({ searchValue, onSearchChange, searchPlaceholder = "Search…", filters = [] }) {
  return (
    <Card className="p-4">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[220px] flex-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 dark:text-paper/35" />
          <input
            className={`${inputClass} pl-10`}
            placeholder={searchPlaceholder}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {filters.map((filter) =>
          filter.type === "date" ? (
            <input
              key={filter.label}
              type="date"
              aria-label={filter.label}
              className={`${inputClass} w-auto`}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
            />
          ) : (
            <select
              key={filter.label}
              aria-label={filter.label}
              className={`${inputClass} w-auto`}
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
            >
              {filter.options.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )
        )}
      </div>
    </Card>
  );
}
