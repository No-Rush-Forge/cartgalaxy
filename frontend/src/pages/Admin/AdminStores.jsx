import { useState } from "react";
import { Search, Eye, Ban, CheckCircle2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/StatusBadge";
import { mockStores } from "@/data/adminData";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";

export function AdminStores() {
  const [stores, setStores] = useState(mockStores);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");

  const filtered = stores.filter((store) => {
    const term = search.toLowerCase();
    const matchesSearch = store.name.toLowerCase().includes(term) || store.owner.toLowerCase().includes(term);
    const matchesStatus = statusFilter === "All Status" || store.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (id) =>
    setStores((prev) =>
      prev.map((store) =>
        store.id === id ? { ...store, status: store.status === "Active" ? "Suspended" : "Active" } : store
      )
    );

  return (
    <AdminLayout title="Stores" subtitle="Every store registered on CartGalaxy.">
      <div className="rounded-2xl border border-ink/8 bg-white/60 p-4 backdrop-blur-sm dark:border-paper/10 dark:bg-night-card/60">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 dark:text-paper/35" />
            <input
              className={`${inputClass} pl-10`}
              placeholder="Search by store or owner"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className={`${inputClass} w-auto`} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            {["All Status", "Active", "Suspended"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AdminTable
        columns={["Store Name", "Owner", "Status", "Subscription", "Created", "Actions"]}
        isEmpty={filtered.length === 0}
        emptyMessage="No stores match your search."
      >
        {filtered.map((store) => (
          <tr key={store.id} className="transition-colors hover:bg-ink/[0.02] dark:hover:bg-paper/[0.03]">
            <td className="whitespace-nowrap px-5 py-3.5 font-medium text-ink dark:text-paper">{store.name}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{store.owner}</td>
            <td className="whitespace-nowrap px-5 py-3.5">
              <StatusBadge status={store.status} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{store.subscription}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{store.created}</td>
            <td className="whitespace-nowrap px-5 py-3.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label={`View ${store.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5 hover:text-ink dark:text-paper/50 dark:hover:bg-paper/10 dark:hover:text-paper"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(store.id)}
                  aria-label={store.status === "Active" ? `Suspend ${store.name}` : `Activate ${store.name}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                    store.status === "Active"
                      ? "text-ink/50 hover:bg-red-50 hover:text-red-600 dark:text-paper/50 dark:hover:bg-red-500/10"
                      : "text-ink/50 hover:bg-teal-50 hover:text-teal-600 dark:text-paper/50 dark:hover:bg-teal-500/10"
                  }`}
                >
                  {store.status === "Active" ? <Ban className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </AdminLayout>
  );
}
