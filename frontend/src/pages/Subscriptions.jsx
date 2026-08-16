import { useState } from "react";
import { Menu, Package, ShoppingBag, HardDrive, Users, FileDown, Sparkles } from "lucide-react";
import { Sheet, SheetContent } from "../components/ui/sheet";
import Sidebar from "../components/SideBar";
import { SummaryCard } from "../components/SummaryCard";
import { PricingCard } from "../components/subscription/PricingCard";
import { StatusBadge } from "../components/StatusBadge";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { plansData, billingData, usageData, currentSubscription } from "../data/plansData";

const USAGE_ICONS = [Package, ShoppingBag, HardDrive, Users];

export function Subscriptions() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const handlePlanAction = (plan) => {
    if (plan.id === "enterprise") console.log("Contact sales");
    else console.log("Upgrade to", plan.name);
  };

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-paper">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink/8 bg-paper/60 px-5 py-6 dark:border-paper/10 dark:bg-night/60 lg:flex">
          <Sidebar activeHref="/subscriptions" />
        </aside>

        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent>
            <Sidebar activeHref="/subscriptions" onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition hover:bg-ink/5 dark:border-paper/10 dark:text-paper/70 dark:hover:bg-paper/10 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper sm:text-3xl">
                  Subscriptions
                </h1>
                <p className="mt-1 text-sm text-ink-light dark:text-paper/65">
                  Manage your plan, usage, and billing history.
                </p>
              </div>
            </div>

            {/* Current Plan */}
            <Card className="overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-5 bg-teal-500 px-6 py-6 text-white">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="h-3.5 w-3.5" /> Current Plan
                  </span>
                  <p className="mt-3 font-display text-2xl font-semibold">{currentSubscription.plan}</p>
                  <p className="text-sm text-white/80">{currentSubscription.price}</p>
                </div>
                <Button variant="gold" onClick={() => console.log("Upgrade plan")}>
                  Upgrade Plan
                </Button>
              </div>
              <div className="flex flex-wrap gap-8 px-6 py-5">
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-light dark:text-paper/55">Status</p>
                  <div className="mt-1.5">
                    <StatusBadge status={currentSubscription.status} />
                  </div>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-ink-light dark:text-paper/55">Renewal Date</p>
                  <p className="mt-1.5 text-sm font-semibold text-ink dark:text-paper">
                    {currentSubscription.renewalDate}
                  </p>
                </div>
              </div>
            </Card>

            {/* Usage */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {usageData.map((usage, i) => (
                <SummaryCard key={usage.label} icon={USAGE_ICONS[i]} title={usage.label} value={usage.value} />
              ))}
            </div>

            {/* Pricing */}
            <div>
              <h2 className="font-display text-lg font-semibold text-ink dark:text-paper">Plans</h2>
              <div className="mt-4 grid gap-5 md:grid-cols-3">
                {plansData.map((plan) => (
                  <PricingCard
                    key={plan.id}
                    name={plan.name}
                    price={plan.price}
                    period={plan.period}
                    features={plan.features}
                    highlighted={plan.highlighted}
                    buttonLabel={
                      plan.id === "enterprise" ? "Contact" : plan.name === currentSubscription.plan.split(" ")[0] ? "Current Plan" : "Upgrade"
                    }
                    onAction={() => handlePlanAction(plan)}
                  />
                ))}
              </div>
            </div>

            {/* Billing History */}
            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-ink/45 dark:border-paper/10 dark:text-paper/45">
                      <th className="px-5 py-3.5 font-semibold">Invoice</th>
                      <th className="px-5 py-3.5 font-semibold">Date</th>
                      <th className="px-5 py-3.5 font-semibold">Amount</th>
                      <th className="px-5 py-3.5 font-semibold">Status</th>
                      <th className="px-5 py-3.5 font-semibold">Download</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dashed divide-ink/8 dark:divide-paper/10">
                    {billingData.map((invoice) => (
                      <tr key={invoice.invoice} className="transition-colors hover:bg-ink/[0.02] dark:hover:bg-paper/[0.03]">
                        <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-light dark:text-paper/60">
                          {invoice.invoice}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">
                          {invoice.date}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 font-mono text-ink dark:text-paper">
                          {invoice.amount}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <StatusBadge status={invoice.status} />
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <button
                            type="button"
                            onClick={() => console.log("Download", invoice.invoice)}
                            className="flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold text-ink/70 transition hover:border-teal-500/30 hover:bg-teal-50 hover:text-teal-600 dark:border-paper/15 dark:text-paper/70 dark:hover:bg-teal-500/10 dark:hover:text-teal-100"
                          >
                            <FileDown className="h-3.5 w-3.5" /> PDF
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
