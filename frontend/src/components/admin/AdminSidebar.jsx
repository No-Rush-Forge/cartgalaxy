import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Store,
  CreditCard,
  Settings,
  Activity,
  LogOut,
  ArrowLeft,
} from "lucide-react";
import { AuthContext } from "@/context/AuthContext";

export const ADMIN_NAV_ITEMS = [
  { label: "Overview", icon: LayoutDashboard, href: "/admin" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Stores", icon: Store, href: "/admin/stores" },
  { label: "Subscriptions", icon: CreditCard, href: "/admin/subscriptions" },
  { label: "Activity", icon: Activity, href: "/admin/activity" },
  { label: "Settings", icon: Settings, href: "/admin/settings" },
];

export function AdminSidebar({ onNavigate }) {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  return (
    <div className="flex h-full flex-col">
      <Link to="/admin" className="flex items-center gap-2 px-1">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500 text-white">
          <Store className="h-4.5 w-4.5" strokeWidth={2.25} />
        </span>
        <span>
          <span className="block font-display text-lg font-semibold leading-tight tracking-tight text-ink dark:text-paper">
            CartGalaxy
          </span>
          <span className="block text-[11px] font-semibold uppercase tracking-wider text-teal-600 dark:text-teal-100">
            Admin Panel
          </span>
        </span>
      </Link>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {ADMIN_NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.label}
              to={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${isActive
                  ? "bg-teal-500 text-white shadow-sm shadow-teal-700/20"
                  : "text-ink/70 hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10"
                }`}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="flex flex-col gap-1 border-t border-dashed border-ink/10 pt-3 dark:border-paper/10">
        {/* Dev-only path back to the store-owner side of the app. Safe to remove
            once role-based navigation decides where "Admin Panel" links from. */}
        <Link
          to="/dashboard"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink dark:text-paper/60 dark:hover:bg-paper/10 dark:hover:text-paper"
        >
          <ArrowLeft className="h-4.5 w-4.5" strokeWidth={2.1} />
          Back to Store
        </Link>
        <button
          type="button"
          onClick={logout}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink dark:text-paper/60 dark:hover:bg-paper/10 dark:hover:text-paper"
        >
          <LogOut className="h-4.5 w-4.5" strokeWidth={2.1} />
          Logout
        </button>
      </div>
    </div>
  );
}
