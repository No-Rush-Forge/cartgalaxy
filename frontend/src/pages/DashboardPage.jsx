import { useState } from "react";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  CreditCard,
  User,
  LogOut,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { DashboardHeader } from "@/components/userDashboard/DashboardHeader";
import { ProfileCard } from "@/components/userDashboard/ProfileCard";
import { SubscriptionCard } from "@/components/userDashboard/SubscriptionCard";
import { StoreCard } from "@/components/userDashboard/StoreCard";
import { QuickActions } from "@/components/userDashboard/QuickActions";
import { ActivityCard } from "@/components/userDashboard/ActivityCard";

// ---- Mock data (no backend / no API in this version) ----

const MOCK_USER = {
  fullName: "Ayesha Khan",
  email: "ayesha@ownstore.app",
  phone: "",
  country: "India",
  state: "Delhi",
  city: "",
  businessCategory: "",
};

const MOCK_SUBSCRIPTION = {
  plan: "FREE",
  storesAllowed: 1,
  productsAllowed: 100,
  status: "Active",
};

// Set MOCK_STORE to `null` below to preview the "no store yet" empty state.
const MOCK_STORE = {
  name: "Meera's Home Store",
  url: "ownstore.link/meera",
  status: "Live",
  logoInitials: "MH",
  productsCount: 24,
  ordersCount: 132,
  visitorsCount: "2.4k",
};

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard", active: true },
  { label: "My Store", icon: Store, href: "/store" },
  { label: "Orders", icon: ShoppingBag, href: "/orders" },
  { label: "Subscription", icon: CreditCard, href: "/subscription" },
  { label: "Profile", icon: User, href: "/profile" },
];

function SidebarContent({ onNavigate }) {
  return (
    <div className="flex h-full flex-col">
      <a
        href="/"
        className="flex items-center gap-2 px-1 font-display text-lg font-semibold tracking-tight text-ink dark:text-paper"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500 text-white">
          <Store className="h-4.5 w-4.5" strokeWidth={2.25} />
        </span>
        OwnStore
      </a>

      <nav className="mt-8 flex flex-1 flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${item.active
                ? "bg-teal-500 text-white shadow-sm shadow-teal-700/20"
                : "text-ink/70 hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10"
                }`}
            >
              <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
              {item.label}
            </a>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => console.log("Logout")}
        className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink dark:text-paper/60 dark:hover:bg-paper/10 dark:hover:text-paper"
      >
        <LogOut className="h-4.5 w-4.5" strokeWidth={2.1} />
        Logout
      </button>
    </div>
  );
}

const DashboardPage = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const hasStore = Boolean(MOCK_STORE);

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-paper">
      <div className="mx-auto flex max-w-[1400px]">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink/8 bg-paper/60 px-5 py-6 dark:border-paper/10 dark:bg-night/60 lg:flex">
          <SidebarContent />
        </aside>

        {/* Mobile / tablet sidebar */}
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent>
            <SidebarContent onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Content */}
        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <DashboardHeader
              userName={MOCK_USER.fullName}
              plan={MOCK_SUBSCRIPTION.plan}
              onMenuClick={() => setMobileNavOpen(true)}
            />

            <div className="grid gap-6 lg:grid-cols-3">
              <div className="space-y-6 lg:col-span-2">
                <StoreCard store={MOCK_STORE} />
                <QuickActions hasStore={hasStore} />
                <ActivityCard />
              </div>

              <div className="space-y-6">
                <ProfileCard
                  profile={MOCK_USER}
                  onCompleteProfile={() => (window.location.href = "/profile")}
                />
                <SubscriptionCard
                  subscription={MOCK_SUBSCRIPTION}
                  onViewPlans={() => console.log("View plans")}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}


export default DashboardPage