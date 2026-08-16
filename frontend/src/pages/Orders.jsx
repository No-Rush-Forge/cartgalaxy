import { useMemo, useState } from "react";
import { Menu, ShoppingBag, Clock, PackageCheck, XCircle, Eye } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import Sidebar from "@/components/SideBar";
import { SummaryCard } from "@/components/SummaryCard";
import { SearchToolbar } from "@/components/orders/SearchToolbar";
import { StatusBadge } from "@/components/StatusBadge";
import { DetailDrawer } from "@/components/orders/DetailDrawer";
import { Card } from "@/components/ui/card";
import { ordersData, ORDER_STATUSES } from "@/data/ordersData";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";

export function Orders() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [orders, setOrders] = useState(ordersData);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [dateFilter, setDateFilter] = useState("");
  const [activeOrder, setActiveOrder] = useState(null);

  const summary = useMemo(
    () => ({
      total: orders.length,
      pending: orders.filter((o) => o.status === "Pending").length,
      delivered: orders.filter((o) => o.status === "Delivered").length,
      cancelled: orders.filter((o) => o.status === "Cancelled").length,
    }),
    [orders]
  );

  const filtered = orders.filter((order) => {
    const term = search.toLowerCase();
    const matchesSearch =
      order.id.toLowerCase().includes(term) || order.customer.name.toLowerCase().includes(term);
    const matchesStatus = statusFilter === "All Status" || order.status === statusFilter;
    const matchesDate = !dateFilter || order.date === formatDate(dateFilter);
    return matchesSearch && matchesStatus && matchesDate;
  });

  const updateOrderStatus = (id, status) => {
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    setActiveOrder((prev) => (prev && prev.id === id ? { ...prev, status } : prev));
  };

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-paper">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink/8 bg-paper/60 px-5 py-6 dark:border-paper/10 dark:bg-night/60 lg:flex">
          <Sidebar activeHref="/orders" />
        </aside>

        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent>
            <Sidebar activeHref="/orders" onNavigate={() => setMobileNavOpen(false)} />
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
                  Orders
                </h1>
                <p className="mt-1 text-sm text-ink-light dark:text-paper/65">
                  Track and manage every order placed on your store.
                </p>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <SummaryCard icon={ShoppingBag} title="Total Orders" value={summary.total} />
              <SummaryCard icon={Clock} title="Pending Orders" value={summary.pending} tone="gold" />
              <SummaryCard icon={PackageCheck} title="Delivered" value={summary.delivered} />
              <SummaryCard icon={XCircle} title="Cancelled" value={summary.cancelled} tone="gold" />
            </div>

            <SearchToolbar
              searchValue={search}
              onSearchChange={setSearch}
              searchPlaceholder="Search Order ID or Customer"
              filters={[
                {
                  label: "Status",
                  type: "select",
                  value: statusFilter,
                  onChange: setStatusFilter,
                  options: ["All Status", ...ORDER_STATUSES],
                },
                {
                  label: "Date Range",
                  type: "date",
                  value: dateFilter,
                  onChange: setDateFilter,
                },
              ]}
            />

            <Card className="overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-ink/45 dark:border-paper/10 dark:text-paper/45">
                      <th className="px-5 py-3.5 font-semibold">Order ID</th>
                      <th className="px-5 py-3.5 font-semibold">Customer</th>
                      <th className="px-5 py-3.5 font-semibold">Date</th>
                      <th className="px-5 py-3.5 font-semibold">Items</th>
                      <th className="px-5 py-3.5 font-semibold">Amount</th>
                      <th className="px-5 py-3.5 font-semibold">Payment</th>
                      <th className="px-5 py-3.5 font-semibold">Status</th>
                      <th className="px-5 py-3.5 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dashed divide-ink/8 dark:divide-paper/10">
                    {filtered.map((order) => (
                      <tr key={order.id} className="transition-colors hover:bg-ink/[0.02] dark:hover:bg-paper/[0.03]">
                        <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-ink-light dark:text-paper/60">
                          {order.id}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 font-medium text-ink dark:text-paper">
                          {order.customer.name}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">
                          {order.date}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">
                          {order.items.reduce((sum, item) => sum + item.quantity, 0)}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5 font-mono text-ink dark:text-paper">
                          ₹{order.amount.toLocaleString("en-IN")}
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <StatusBadge status={order.payment} />
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <StatusBadge status={order.status} />
                        </td>
                        <td className="whitespace-nowrap px-5 py-3.5">
                          <button
                            type="button"
                            onClick={() => setActiveOrder(order)}
                            className="flex items-center gap-1.5 rounded-full border border-ink/10 px-3 py-1.5 text-xs font-semibold text-ink/70 transition hover:border-teal-500/30 hover:bg-teal-50 hover:text-teal-600 dark:border-paper/15 dark:text-paper/70 dark:hover:bg-teal-500/10 dark:hover:text-teal-100"
                          >
                            <Eye className="h-3.5 w-3.5" /> View
                          </button>
                        </td>
                      </tr>
                    ))}
                    {filtered.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-5 py-10 text-center text-sm text-ink-light dark:text-paper/55">
                          No orders match your filters.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </main>
      </div>

      <DetailDrawer
        open={Boolean(activeOrder)}
        onOpenChange={(open) => !open && setActiveOrder(null)}
        title={activeOrder ? `Order ${activeOrder.id}` : ""}
      >
        {activeOrder && (
          <>
            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                Customer Information
              </h3>
              <div className="mt-2 space-y-1 text-sm text-ink dark:text-paper">
                <p className="font-medium">{activeOrder.customer.name}</p>
                <p className="text-ink-light dark:text-paper/65">{activeOrder.customer.email}</p>
                <p className="font-mono text-ink-light dark:text-paper/65">{activeOrder.customer.phone}</p>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                Products
              </h3>
              <div className="mt-2 divide-y divide-dashed divide-ink/10 dark:divide-paper/10">
                {activeOrder.items.map((item) => (
                  <div key={item.product} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                    <div>
                      <p className="font-medium text-ink dark:text-paper">{item.product}</p>
                      <p className="text-xs text-ink-light dark:text-paper/55">Qty {item.quantity}</p>
                    </div>
                    <p className="font-mono text-ink dark:text-paper">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-ink/10 pt-2.5 text-sm font-semibold text-ink dark:border-paper/10 dark:text-paper">
                <span>Subtotal</span>
                <span className="font-mono">₹{activeOrder.amount.toLocaleString("en-IN")}</span>
              </div>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                Shipping Address
              </h3>
              <p className="mt-2 text-sm text-ink-light dark:text-paper/65">{activeOrder.shippingAddress}</p>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                Payment
              </h3>
              <div className="mt-2 flex items-center justify-between text-sm">
                <span className="text-ink-light dark:text-paper/65">Method</span>
                <StatusBadge status={activeOrder.payment} />
              </div>
            </section>

            <section>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
                Order Status
              </h3>
              <select
                className={`${inputClass} mt-2`}
                value={activeOrder.status}
                onChange={(e) => updateOrderStatus(activeOrder.id, e.target.value)}
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </section>
          </>
        )}
      </DetailDrawer>
    </div>
  );
}

function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00`);
  return date.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}
