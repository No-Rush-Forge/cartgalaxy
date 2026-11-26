
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Menu } from "lucide-react";

import { Sheet, SheetContent } from "@/components/ui/sheet";
import { StoreTabs } from "@/components/store/StoreTabs";
import { StoreInformation } from "@/components/store/StoreInformation";
import { ProductsManager } from "@/components/store/ProductsManager";
import { OrdersManager } from "@/components/store/OrdersManager";
import { StoreSettings } from "@/components/store/StoreSettings";
import Sidebar from "../components/SideBar";
import { AuthContext } from "@/context/AuthContext";

const StoreManagementPage = () => {
  const { backendUrl, token } = useContext(AuthContext);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("information");

  const [store, setStore] = useState(null);
  const [storeId, setStoreId] = useState(null);
  const [storeStatus, setStoreStatus] = useState("Draft");

  const [storeSettings, setStoreSettings] = useState(null);
  const [settingsLoading, setSettingsLoading] = useState(false);

  const [loading, setLoading] = useState(true);

  // Convert backend store fields to the frontend form format.
  const formatStoreData = (data) => ({
    logoInitials: data.business_name
      ? data.business_name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
      : "",
    businessName: data.business_name || "",
    businessCategory: data.business_category || "",
    businessPhone: data.phone || "",
    businessEmail: data.email || "",
    shortDescription: data.short_description || "",
    aboutBusiness: data.about || "",
    country: data.country || "",
    state: data.state || "",
    city: data.city || "",
    address: data.address || "",
    postalCode: data.postal_code || "",
    customUrl: data.store_slug || "",
  });

  // Fetch the logged-in owner's stores.
  const fetchMyStore = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${backendUrl}/api/store/my-stores`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const stores = response.data.stores || [];

      if (stores.length > 0) {
        // Current Store Information UI displays one store.
        const currentStore = stores[0];

        setStoreId(currentStore.store_id);
        setStore(formatStoreData(currentStore));
        setStoreStatus(currentStore.status);
      } else {
        setStoreId(null);
        setStore(null);
        setStoreStatus("Draft");
      }
    } catch (error) {
      console.error("Fetch Store Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to load your store."
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch the logged-in owner's store settings.
  const fetchStoreSettings = async (currentStoreId = storeId) => {
    if (!currentStoreId || !backendUrl || !token) {
      setStoreSettings(null);
      return;
    }

    try {
      setSettingsLoading(true);

      const response = await axios.get(
        `${backendUrl}/api/store/${currentStoreId}/settings`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStoreSettings(response.data.settings);
    } catch (error) {
      console.error("Fetch Store Settings Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to load store settings."
      );
    } finally {
      setSettingsLoading(false);
    }
  };

  // Save store settings to the backend.
  const handleSaveStoreSettings = async (settings) => {
    if (!storeId) {
      toast.error("Please save your store information first.");
      return;
    }

    try {
      const paymentMethods = Object.entries(
        settings.paymentMethods || {}
      )
        .filter(([key, enabled]) => enabled)
        .map(([key]) => key);

      const payload = {
        status: settings.status,
        about: settings.about || "",
        isOpen: settings.isOpen,
        bannerTitle: settings.bannerTitle,
        bannerSubtitle: settings.bannerSubtitle,
        hours: settings.hours,
        deliveryAvailable: settings.deliveryAvailable,
        pickupAvailable: settings.pickupAvailable,
        deliveryCharge: settings.deliveryCharge,
        deliveryNotes: settings.deliveryNotes,
        currency: settings.currency,
        paymentMethods,
        contact: settings.contact,
        seoTitle: settings.seoTitle,
        seoDescription: settings.seoDescription,
      };

      const response = await axios.put(
        `${backendUrl}/api/store/${storeId}/settings`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStoreStatus(settings.status);

      await fetchStoreSettings(storeId);

      toast.success(
        response.data.message || "Store settings saved successfully."
      );
    } catch (error) {
      console.error("Save Store Settings Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to save store settings."
      );
    }
  };

  useEffect(() => {
    if (backendUrl && token) {
      fetchMyStore();
    }
  }, [backendUrl, token]);

  // Fetch store settings whenever the store ID is available.
  useEffect(() => {
    if (storeId && backendUrl && token) {
      fetchStoreSettings(storeId);
    } else {
      setStoreSettings(null);
    }
  }, [storeId, backendUrl, token]);

  // Create a new store or update the existing store.
  const handleSaveStore = async (form) => {
    try {
      const payload = {
        business_name: form.businessName.trim(),
        business_category: form.businessCategory.trim(),
        phone: form.businessPhone.trim(),
        email: form.businessEmail.trim(),
        short_description: form.shortDescription.trim(),
        about: form.aboutBusiness.trim(),
        country: form.country.trim(),
        state: form.state.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        postal_code: form.postalCode.trim(),
        store_slug: form.customUrl.trim().toLowerCase(),
      };

      let response;

      if (storeId) {
        // Update existing store.
        response = await axios.put(
          `${backendUrl}/api/store/${storeId}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } else {
        // Create a new store.
        response = await axios.post(
          `${backendUrl}/api/store`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      const savedStore = response.data.store;

      setStoreId(savedStore.store_id);
      setStore(formatStoreData(savedStore));
      setStoreStatus(savedStore.status);

      toast.success(response.data.message);
    } catch (error) {
      console.error("Save Store Error:", error);

      toast.error(
        error.response?.data?.message ||
        "Unable to save your store."
      );
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-paper">
      <div className="mx-auto flex max-w-[1400px]">

        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink/8 bg-paper/60 px-5 py-6 dark:border-paper/10 dark:bg-night/60 lg:flex">
          <Sidebar />
        </aside>

        {/* Mobile / tablet sidebar */}
        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent>
            <Sidebar onNavigate={() => setMobileNavOpen(false)} />
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
                className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold uppercase tracking-wider ${storeStatus === "Published"
                  ? "border-teal-500/20 bg-teal-50 text-teal-600 dark:border-teal-500/20 dark:bg-teal-500/10 dark:text-teal-100"
                  : "border-gold-500/20 bg-gold-100 text-gold-600 dark:border-gold-500/20 dark:bg-gold-500/10 dark:text-gold-400"
                  }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${storeStatus === "Published"
                    ? "bg-teal-500"
                    : "bg-gold-500"
                    }`}
                />
                {storeStatus}
              </span>
            </div>

            <StoreTabs
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />

            {activeTab === "information" && (
              loading ? (
                <div className="py-10 text-center text-sm text-ink-light dark:text-paper/60">
                  Loading store information...
                </div>
              ) : (
                <StoreInformation
                  store={store}
                  onSave={handleSaveStore}
                  onCancel={() => fetchMyStore()}
                />
              )
            )}

            {activeTab === "products" && <ProductsManager />}

            {activeTab === "orders" && <OrdersManager />}

            {activeTab === "settings" && (
  loading || settingsLoading ? (
    <div className="py-10 text-center text-sm text-ink-light dark:text-paper/60">
      Loading store settings...
    </div>
  ) : !storeId ? (
    <div className="py-10 text-center text-sm text-ink-light dark:text-paper/60">
      Please save your store information first to configure store settings.
    </div>
  ) : (
    <StoreSettings
      initialSettings={storeSettings}
      onSave={handleSaveStoreSettings}
    />
  )
)}

          </div>
        </main>
      </div>
    </div>
  );
};

export default StoreManagementPage;
