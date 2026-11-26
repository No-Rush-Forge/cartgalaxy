import { useState } from "react";
import { Search, Eye, Ban, CheckCircle2 } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/StatusBadge";
import { mockUsers } from "@/data/adminData";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";

export function AdminUsers() {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const filtered = users.filter((user) => {
    const term = search.toLowerCase();
    const matchesSearch = user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term);
    const matchesRole = roleFilter === "All Roles" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const toggleStatus = (id) =>
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, status: user.status === "Active" ? "Suspended" : "Active" } : user
      )
    );

  return (
    <AdminLayout title="Users" subtitle="Manage and monitor CartGalaxy users.">
      <div className="rounded-2xl border border-ink/8 bg-white/60 p-4 backdrop-blur-sm dark:border-paper/10 dark:bg-night-card/60">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative min-w-[220px] flex-1">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 dark:text-paper/35" />
            <input
              className={`${inputClass} pl-10`}
              placeholder="Search by name or email"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <select className={`${inputClass} w-auto`} value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
            {["All Roles", "Admin", "Store Owner"].map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AdminTable
        columns={["Name", "Email", "Role", "Status", "Joined", "Actions"]}
        isEmpty={filtered.length === 0}
        emptyMessage="No users match your search."
      >
        {filtered.map((user) => (
          <tr key={user.id} className="transition-colors hover:bg-ink/[0.02] dark:hover:bg-paper/[0.03]">
            <td className="whitespace-nowrap px-5 py-3.5 font-medium text-ink dark:text-paper">{user.name}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{user.email}</td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{user.role}</td>
            <td className="whitespace-nowrap px-5 py-3.5">
              <StatusBadge status={user.status} />
            </td>
            <td className="whitespace-nowrap px-5 py-3.5 text-ink-light dark:text-paper/60">{user.joined}</td>
            <td className="whitespace-nowrap px-5 py-3.5">
              <div className="flex gap-2">
                <button
                  type="button"
                  aria-label={`View ${user.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 transition hover:bg-ink/5 hover:text-ink dark:text-paper/50 dark:hover:bg-paper/10 dark:hover:text-paper"
                >
                  <Eye className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => toggleStatus(user.id)}
                  aria-label={user.status === "Active" ? `Suspend ${user.name}` : `Activate ${user.name}`}
                  className={`flex h-8 w-8 items-center justify-center rounded-full transition ${
                    user.status === "Active"
                      ? "text-ink/50 hover:bg-red-50 hover:text-red-600 dark:text-paper/50 dark:hover:bg-red-500/10"
                      : "text-ink/50 hover:bg-teal-50 hover:text-teal-600 dark:text-paper/50 dark:hover:bg-teal-500/10"
                  }`}
                >
                  {user.status === "Active" ? <Ban className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4" />}
                </button>
              </div>
            </td>
          </tr>
        ))}
      </AdminTable>
    </AdminLayout>
  );
}
