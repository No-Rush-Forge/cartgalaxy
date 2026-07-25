import { useState } from "react";
import { Search, Mail, MessageCircle, Eye } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const MOCK_ORDERS = [
  { id: "#0842", customer: "Rahul Sharma", phone: "+91 98765 43210", date: "24 Jul 2026", items: 3, status: "New" },
  { id: "#0841", customer: "Priya Nair", phone: "+91 91234 56780", date: "23 Jul 2026", items: 1, status: "Contacted" },
  { id: "#0840", customer: "Aman Gupta", phone: "+91 99887 76655", date: "22 Jul 2026", items: 2, status: "Completed" },
  { id: "#0839", customer: "Sneha Iyer", phone: "+91 90000 11122", date: "21 Jul 2026", items: 4, status: "Completed" },
  { id: "#0838", customer: "Vikram Rao", phone: "+91 98111 22334", date: "20 Jul 2026", items: 1, status: "New" },
];

const STATUS_STYLES = {
  New: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100",
  Contacted: "bg-gold-100 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400",
  Completed: "bg-ink/5 text-ink/55 dark:bg-paper/10 dark:text-paper/55",
};

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";

export function OrdersManager() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");

  const filtered = MOCK_ORDERS.filter((order) => {
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = status === "All" || order.status === status;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="space-y-4 lg:col-span-2">
        <Card className="p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 dark:text-paper/35" />
              <input
                className={`${inputClass} pl-10`}
                placeholder="Search by customer or order ID…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <select className={`${inputClass} w-auto`} value={status} onChange={(e) => setStatus(e.target.value)}>
              {["All", "New", "Contacted", "Completed"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        </Card>

        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-ink/45 dark:border-paper/10 dark:text-paper/45">
                  <th className="px-5 py-3.5 font-semibold">Order ID</th>
                  <th className="px-5 py-3.5 font-semibold">Customer</th>
                  <th className="px-5 py-3.5 font-semibold">Phone</th>
                  <th className="px-5 py-3.5 font-semibold">Date</th>
                  <th className="px-5 py-3.5 font-semibold">Items</th>
                  <th className="px-5 py-3.5 font-semibold">Status</th>
                  <th className="px-5 py-3.5 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-ink/8 dark:divide-paper/10">
                {filtered.map((order) => (
                  <tr key={order.id} className="transition-colors hover:bg-ink/[0.02] dark:hover:bg-paper/[0.03]">
                    <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-light dark:text-paper/60">
                      {order.id}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 font-medium text-ink dark:text-paper">
                      {order.customer}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-light dark:text-paper/60">
                      {order.phone}
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{order.date}</td>
                    <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{order.items}</td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${STATUS_STYLES[order.status]}`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-5 py-3.5">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5 hover:text-ink dark:text-paper/50 dark:hover:bg-paper/10 dark:hover:text-paper"
                        aria-label={`View order ${order.id}`}
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-10 text-center text-sm text-ink-light dark:text-paper/55">
                      No orders match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Receiving Orders</CardTitle>
          <CardDescription>
            Customers place orders straight from your public store page, and you're notified
            immediately.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-3 rounded-xl border border-ink/10 px-4 py-3 dark:border-paper/15">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
              <Mail className="h-4 w-4" strokeWidth={2.1} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-paper">Email</p>
              <p className="text-xs text-ink-light dark:text-paper/55">Active for every order</p>
            </div>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-dashed border-ink/10 px-4 py-3 opacity-70 dark:border-paper/15">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-ink/5 text-ink/40 dark:bg-paper/10 dark:text-paper/40">
              <MessageCircle className="h-4 w-4" strokeWidth={2.1} />
            </span>
            <div>
              <p className="text-sm font-semibold text-ink dark:text-paper">WhatsApp</p>
              <p className="text-xs text-ink-light dark:text-paper/55">Coming Soon</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
