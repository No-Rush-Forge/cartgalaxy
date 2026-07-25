import { PlusCircle, Package, ShoppingBag, CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";

export function QuickActions({ hasStore }) {
  const actions = [
    { icon: PlusCircle, label: "Create Store", href: "/create-store", disabled: false },
    { icon: Package, label: "Manage Products", href: "/products", disabled: !hasStore },
    { icon: ShoppingBag, label: "Orders", href: "/orders", disabled: !hasStore },
    { icon: CreditCard, label: "Subscription", href: "/subscription", disabled: false },
  ];

  return (
    <Card className="p-6">
      <h3 className="font-display text-lg font-semibold text-ink dark:text-paper">
        Quick Actions
      </h3>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              type="button"
              disabled={action.disabled}
              onClick={() => !action.disabled && (window.location.href = action.href)}
              className={`group flex items-center gap-3 rounded-2xl border border-ink/8 px-4 py-3.5 text-left transition-all duration-200 dark:border-paper/10 ${
                action.disabled
                  ? "cursor-not-allowed opacity-40"
                  : "hover:-translate-y-0.5 hover:border-teal-500/30 hover:shadow-md hover:shadow-teal-900/5"
              }`}
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-500 group-hover:text-white dark:bg-teal-500/10 dark:text-teal-100">
                <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
              </span>
              <span className="text-sm font-semibold text-ink dark:text-paper">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
