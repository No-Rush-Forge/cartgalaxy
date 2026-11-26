import { CheckCircle2, Clock, XCircle, IndianRupee } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTable";
import { SummaryCard } from "@/components/SummaryCard";
import { StatusBadge } from "@/components/StatusBadge";
import { mockSubscriptions, subscriptionStats } from "@/data/adminData";

export function AdminSubscriptions() {
  return (
    <AdminLayout title="Subscriptions" subtitle="All platform subscriptions across every store.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard icon={CheckCircle2} title="Active Subscriptions" value={subscriptionStats.active} />
        <SummaryCard icon={Clock} title="Trial Users" value={subscriptionStats.trial} tone="gold" />
        <SummaryCard icon={XCircle} title="Expired" value={subscriptionStats.expired} tone="gold" />
        <SummaryCard icon={IndianRupee} title="Monthly Revenue" value={subscriptionStats.monthlyRevenue} />
      </div>

      <AdminTable columns={["Store", "Owner", "Plan", "Status", "Start Date", "Renewal Date"]}>
        {mockSubscriptions.map((sub) => (
          <tr key={sub.id} className="transition-colors hover:bg-ink/[0.02] dark:hover:bg-paper/[0.03]">
            <td className="whitespace-nowrap px-5 py-3.5 font-medium text-ink dark:text-paper">{sub.store}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{sub.owner}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{sub.plan}</td>
            <td className="whitespace-nowrap px-5 py-3.5">
              <StatusBadge status={sub.status} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{sub.startDate}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{sub.renewalDate}</td>
          </tr>
        ))}
      </AdminTable>
    </AdminLayout>
  );
}
