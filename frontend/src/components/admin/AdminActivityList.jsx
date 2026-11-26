import { UserPlus, Store, CreditCard, ShoppingBag, UserCog, CircleDot } from "lucide-react";
import { Card } from "@/components/ui/card";

const ICONS = {
  user: UserPlus,
  store: Store,
  subscription: CreditCard,
  order: ShoppingBag,
  account: UserCog,
};

export function AdminActivityList({ items, title = "Recent Activity" }) {
  return (
    <Card className="p-6">
      <h3 className="font-display text-lg font-semibold text-ink dark:text-paper">{title}</h3>
      <ol className="mt-5">
        {items.map((item, i) => {
          const Icon = ICONS[item.type] || CircleDot;
          const isLast = i === items.length - 1;
          return (
            <li key={item.id} className="relative flex gap-4 pb-6 last:pb-0">
              {!isLast && (
                <span className="absolute left-[15px] top-8 bottom-0 w-px border-l border-dashed border-ink/15 dark:border-paper/15" />
              )}
              <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
                <Icon className="h-4 w-4" strokeWidth={2.1} />
              </span>
              <div className="pt-0.5">
                <p className="text-sm font-medium text-ink dark:text-paper">{item.title}</p>
                <p className="text-xs text-ink-light dark:text-paper/55">{item.description}</p>
                <p className="mt-0.5 text-[11px] text-ink-light/80 dark:text-paper/40">{item.time}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
