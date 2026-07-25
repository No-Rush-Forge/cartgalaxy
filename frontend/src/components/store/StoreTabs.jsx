import { Store, Package, ShoppingBag, Settings2 } from "lucide-react";

const TABS = [
  { key: "information", label: "Store Information", icon: Store },
  { key: "products", label: "Products", icon: Package },
  { key: "orders", label: "Orders", icon: ShoppingBag },
  { key: "settings", label: "Settings", icon: Settings2 },
];

export function StoreTabs({ activeTab, onTabChange }) {
  return (
    <div className="flex gap-1.5 overflow-x-auto rounded-2xl border border-ink/8 bg-white/60 p-1.5 backdrop-blur-sm dark:border-paper/10 dark:bg-night-card/60 sm:inline-flex sm:w-fit">
      {TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;
        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
              isActive
                ? "bg-teal-500 text-white shadow-sm shadow-teal-700/20"
                : "text-ink/60 hover:bg-ink/5 dark:text-paper/60 dark:hover:bg-paper/10"
            }`}
          >
            <Icon className="h-4 w-4" strokeWidth={2.1} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
