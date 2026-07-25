import { Store, ExternalLink, Pencil, Package, ShoppingBag, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StoreCard({ store }) {
  if (!store) {
    return (
      <Card className="flex flex-col items-center justify-center gap-5 px-6 py-16 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-teal-50 text-teal-500 dark:bg-teal-500/10 dark:text-teal-100">
          <Store className="h-9 w-9" strokeWidth={1.75} />
        </div>
        <div>
          <p className="font-display text-lg font-semibold text-ink dark:text-paper">
            You haven't created your first store.
          </p>
          <p className="mx-auto mt-1.5 max-w-xs text-sm text-ink-light dark:text-paper/60">
            Set up your storefront in minutes and start sharing it with customers.
          </p>
        </div>
        <Button size="lg" onClick={() => (window.location.href = "/create-store")}>
          Create Store
        </Button>
      </Card>
    );
  }

  const stats = [
    { icon: Package, label: "Products", value: store.productsCount },
    { icon: ShoppingBag, label: "Orders", value: store.ordersCount },
    { icon: Users, label: "Visitors", value: store.visitorsCount },
  ];

  return (
    <Card className="p-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-teal-500 font-display text-lg font-semibold text-white">
            {store.logoInitials}
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-ink dark:text-paper">
              {store.name}
            </p>
            <p className="font-mono text-xs text-ink-light dark:text-paper/55">{store.url}</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
          {store.status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="rounded-2xl border border-dashed border-ink/10 px-4 py-4 text-center dark:border-paper/10"
            >
              <Icon className="mx-auto h-4.5 w-4.5 text-teal-500" strokeWidth={2} />
              <p className="mt-2 font-mono text-xl font-semibold text-ink dark:text-paper">
                {stat.value}
              </p>
              <p className="text-xs text-ink-light dark:text-paper/55">{stat.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button className="flex-1" onClick={() => window.open(`https://${store.url}`, "_blank")}>
          <ExternalLink className="h-4 w-4" /> Open Store
        </Button>
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => (window.location.href = "/edit-store")}
        >
          <Pencil className="h-4 w-4" /> Edit Store
        </Button>
      </div>
    </Card>
  );
}
