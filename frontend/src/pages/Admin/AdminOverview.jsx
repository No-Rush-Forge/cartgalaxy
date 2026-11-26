import { Users, Store, CreditCard, IndianRupee } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminActivityList } from "@/components/admin/AdminActivityList";
import { SummaryCard } from "@/components/SummaryCard";
import { SectionCard } from "@/components/SectionCard";
import { StatusBadge } from "@/components/StatusBadge";
import { mockUsers, mockStores, mockAdminActivity, platformStats } from "@/data/adminData";

export function AdminOverview() {
  const recentUsers = [...mockUsers]
    .sort((a, b) => new Date(b.joined) - new Date(a.joined))
    .slice(0, 4);

  const activeStores = mockStores.filter((s) => s.status === "Active").length;
  const suspendedStores = mockStores.filter((s) => s.status === "Suspended").length;

  return (
    <AdminLayout title="Overview" subtitle="What's happening across CartGalaxy right now.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard icon={Users} title="Total Users" value={platformStats.totalUsers} />
        <SummaryCard icon={Store} title="Total Stores" value={platformStats.totalStores} />
        <SummaryCard icon={CreditCard} title="Active Subscriptions" value={platformStats.activeSubscriptions} tone="gold" />
        <SummaryCard icon={IndianRupee} title="Platform Revenue" value={platformStats.platformRevenue} />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminActivityList items={mockAdminActivity} title="Recent Platform Activity" />
        </div>

        <div className="space-y-6">
          <SectionCard title="Recent Users" description="Newest sign-ups across the platform.">
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between gap-3 text-sm">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-ink dark:text-paper">{user.name}</p>
                    <p className="truncate text-xs text-ink-light dark:text-paper/55">{user.joined}</p>
                  </div>
                  <StatusBadge status={user.status} />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Store Overview" description="Store status across the platform.">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-light dark:text-paper/60">Active Stores</span>
                <span className="font-mono font-semibold text-ink dark:text-paper">{activeStores}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-ink-light dark:text-paper/60">Suspended Stores</span>
                <span className="font-mono font-semibold text-ink dark:text-paper">{suspendedStores}</span>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </AdminLayout>
  );
}
