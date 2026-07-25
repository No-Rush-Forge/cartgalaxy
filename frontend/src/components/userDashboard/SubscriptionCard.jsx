import { CreditCard } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function SubscriptionCard({ subscription, onViewPlans }) {
  const rows = [
    { label: "Current Plan", value: subscription.plan },
    { label: "Stores Allowed", value: subscription.storesAllowed },
    { label: "Products Allowed", value: subscription.productsAllowed },
    { label: "Status", value: subscription.status },
  ];

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
          <CreditCard className="h-4.5 w-4.5" strokeWidth={2.1} />
        </span>
        <h3 className="font-display text-lg font-semibold text-ink dark:text-paper">
          Subscription
        </h3>
      </div>

      <dl className="mt-5 divide-y divide-dashed divide-ink/10 dark:divide-paper/10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between py-2.5 text-sm">
            <dt className="text-ink-light dark:text-paper/60">{row.label}</dt>
            <dd className="font-semibold text-ink dark:text-paper">
              {row.label === "Status" ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-2.5 py-0.5 text-xs font-semibold text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
                  <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
                  {row.value}
                </span>
              ) : (
                row.value
              )}
            </dd>
          </div>
        ))}
      </dl>

      <Button variant="outline" className="mt-6 w-full" onClick={onViewPlans}>
        View Plans
      </Button>
    </Card>
  );
}
