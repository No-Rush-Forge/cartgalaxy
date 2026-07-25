import { useState } from "react";
import {
  LayoutDashboard,
  Store,
  ShoppingBag,
  CreditCard,
  User,
  LogOut,
  Menu,
} from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { StoreTabs } from "@/components/store/StoreTabs";
import { StoreInformation } from "@/components/store/StoreInformation";
import { ProductsManager } from "@/components/store/ProductsManager";
import { OrdersManager } from "@/components/store/OrdersManager";
import { StoreSettings } from "@/components/store/StoreSettings";

// Set to `null` to simulate a brand-new store (Store Information tab renders empty fields).
const MOCK_STORE_DATA = {
  logoInitials: "MH",
  businessName: "Meera's Home Store",
  businessCategory: "Home Decor",
  businessPhone: "+91 98765 43210",
  businessEmail: "meera@ownstore.app",
  shortDescription: "Handcrafted home decor, made with love.",
  aboutBusiness:
    "We create handmade home decor pieces inspired by Indian craft traditions, made by local artisans.",
  country: "India",
  state: "Delhi",
  city: "New Delhi",
  address: "",
  postalCode: "110001",
  customUrl: "meera-home-store",
};

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "My Store", icon: Store, href: "/dashboard/store", active: true },
  { label: "Orders", icon: ShoppingBag, href: "/orders" },
  { label: "Subscription", icon: CreditCard, href: "/subscription" },
  { label: "Profile", icon: User, href: "/profile" },
];

const SidebarContent = ({ onNavigate }) => {
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
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                item.active
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

 const StoreManagementPage = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("information");
  const [storeStatus, setStoreStatus] = useState("Draft");

  const handleSaveStore = (form) => {
    console.log("Save store", form);
    setStoreStatus("Published");
  };

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
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
                    Store Management
                  </h1>
                  <p className="mt-1 text-sm text-ink-light dark:text-paper/65">
                    Manage your online store, products and customer orders.
                  </p>
                </div>
              </div>

              <span
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${
                  storeStatus === "Published"
                    ? "border-teal-500/20 bg-teal-50 text-teal-600 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-100"
                    : "border-gold-500/20 bg-gold-100 text-gold-600 dark:border-gold-500/20 dark:bg-gold-500/10 dark:text-gold-400"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    storeStatus === "Published" ? "bg-teal-500" : "bg-gold-500"
                  }`}
                />
                {storeStatus}
              </span>
            </div>

            <StoreTabs activeTab={activeTab} onTabChange={setActiveTab} />

            {activeTab === "information" && (
              <StoreInformation
                store={MOCK_STORE_DATA}
                onSave={handleSaveStore}
                onCancel={() => console.log("Cancel")}
              />
            )}
            {activeTab === "products" && <ProductsManager />}
            {activeTab === "orders" && <OrdersManager />}
            {activeTab === "settings" && (
              <StoreSettings onSave={(settings) => console.log("Save settings", settings)} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
export default StoreManagementPage;