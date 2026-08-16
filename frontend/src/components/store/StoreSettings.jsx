import { useState } from "react";
import { Image as ImageIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Toggle from "@/components/ui/Toggle";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const CURRENCIES = [
  { code: "INR", label: "₹ INR" },
  { code: "USD", label: "$ USD" },
  { code: "AED", label: "AED" },
];

const INITIAL_SETTINGS = {
  status: "Draft",
  isOpen: true,
  bannerTitle: "Handmade, with heart.",
  bannerSubtitle: "Home decor crafted by local artisans.",
  about: "We create handmade home decor pieces inspired by Indian craft traditions.",
  hours: DAYS.reduce((acc, day) => {
    acc[day] = { open: "09:00", close: "19:00", closed: day === "Sunday" };
    return acc;
  }, {}),
  deliveryAvailable: true,
  pickupAvailable: true,
  deliveryCharge: "50",
  deliveryNotes: "Free delivery on orders above ₹999.",
  currency: "INR",
  paymentMethods: { cash: true, upi: true, bankTransfer: false },
  contact: { whatsapp: "", instagram: "", facebook: "", website: "", youtube: "" },
  seoTitle: "",
  seoDescription: "",
};

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50";

function Field({ label, className = "", children }) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}


function SettingsCard({ title, description, children }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
    </Card>
  );
}

export function StoreSettings({ onSave }) {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);

  const set = (key, value) => setSettings((prev) => ({ ...prev, [key]: value }));
  const setNested = (group, key, value) =>
    setSettings((prev) => ({ ...prev, [group]: { ...prev[group], [key]: value } }));

  return (
    <div className="space-y-6">
      {/* Store Status */}
      <SettingsCard title="Store Status" description="Control whether your store is live and taking orders.">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex gap-2">
            {["Draft", "Published"].map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => set("status", option)}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${settings.status === option
                  ? "bg-teal-500 text-white shadow-sm shadow-teal-700/20"
                  : "border border-ink/10 text-ink/60 hover:bg-ink/5 dark:border-paper/15 dark:text-paper/60 dark:hover:bg-paper/10"
                  }`}
              >
                {option}
              </button>
            ))}
          </div>
          <Toggle
            checked={settings.isOpen}
            onChange={(val) => set("isOpen", val)}
            label={"Open for orders"}
          // label={settings.isOpen ? "Open for orders" : "Closed"}
          />
        </div>
      </SettingsCard>

      {/* Hero Section */}
      <SettingsCard title="Hero Section" description="The banner shown at the top of your public store.">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Banner Title">
            <input className={inputClass} value={settings.bannerTitle} onChange={(e) => set("bannerTitle", e.target.value)} />
          </Field>
          <Field label="Banner Subtitle">
            <input
              className={inputClass}
              value={settings.bannerSubtitle}
              onChange={(e) => set("bannerSubtitle", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Banner Image">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-32 items-center justify-center rounded-2xl border border-dashed border-ink/15 bg-ink/[0.03] text-ink/30 dark:border-paper/15 dark:bg-paper/5 dark:text-paper/25">
              <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
            </div>
            <Button type="button" variant="outline" size="sm">
              Upload Banner
            </Button>
          </div>
        </Field>
      </SettingsCard>

      {/* About */}
      <SettingsCard title="About Section">
        <textarea
          className={`${inputClass} min-h-[120px] resize-y`}
          value={settings.about}
          onChange={(e) => set("about", e.target.value)}
        />
      </SettingsCard>

      {/* Business Hours */}
      <SettingsCard title="Business Hours">
        <div className="space-y-2.5">
          {DAYS.map((day) => {
            const dayHours = settings.hours[day];
            return (
              <div
                key={day}
                className="flex flex-wrap items-center gap-3 rounded-xl border border-ink/8 px-4 py-3 dark:border-paper/10"
              >
                <span className="w-24 shrink-0 text-sm font-medium text-ink dark:text-paper">{day}</span>
                {dayHours.closed ? (
                  <span className="text-sm text-ink-light dark:text-paper/55">Closed</span>
                ) : (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      className={`${inputClass} w-auto`}
                      value={dayHours.open}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          hours: { ...prev.hours, [day]: { ...prev.hours[day], open: e.target.value } },
                        }))
                      }
                    />
                    <span className="text-ink-light dark:text-paper/55">to</span>
                    <input
                      type="time"
                      className={`${inputClass} w-auto`}
                      value={dayHours.close}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          hours: { ...prev.hours, [day]: { ...prev.hours[day], close: e.target.value } },
                        }))
                      }
                    />
                  </div>
                )}
                <label className="ml-auto flex items-center gap-2 text-xs text-ink-light dark:text-paper/55">
                  <input
                    type="checkbox"
                    checked={dayHours.closed}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        hours: { ...prev.hours, [day]: { ...prev.hours[day], closed: e.target.checked } },
                      }))
                    }
                    className="h-4 w-4 rounded border-ink/20 text-teal-500 focus:ring-teal-500 dark:border-paper/25"
                  />
                  Closed
                </label>
              </div>
            );
          })}
        </div>
      </SettingsCard>

      {/* Delivery */}
      <SettingsCard title="Delivery">
        <div className="flex flex-wrap gap-8">
          <Toggle
            checked={settings.deliveryAvailable}
            onChange={(val) => set("deliveryAvailable", val)}
            label="Delivery Available"
          />
          <Toggle
            checked={settings.pickupAvailable}
            onChange={(val) => set("pickupAvailable", val)}
            label="Pickup Available"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Delivery Charge">
            <input
              type="number"
              className={inputClass}
              value={settings.deliveryCharge}
              onChange={(e) => set("deliveryCharge", e.target.value)}
            />
          </Field>
          <Field label="Delivery Notes">
            <input
              className={inputClass}
              value={settings.deliveryNotes}
              onChange={(e) => set("deliveryNotes", e.target.value)}
            />
          </Field>
        </div>
      </SettingsCard>

      {/* Currency */}
      <SettingsCard title="Currency">
        <Field label="Store Currency" className="max-w-xs">
          <select className={inputClass} value={settings.currency} onChange={(e) => set("currency", e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
        </Field>
      </SettingsCard>

      {/* Payment Methods */}
      <SettingsCard title="Payment Methods" description="Payments are handled offline. No payment gateway integration.">
        <div className="flex flex-wrap gap-6">
          {[
            { key: "cash", label: "Cash" },
            { key: "upi", label: "UPI" },
            { key: "bankTransfer", label: "Bank Transfer" },
          ].map((method) => (
            <label key={method.key} className="flex items-center gap-2.5 text-sm font-medium text-ink dark:text-paper">
              <input
                type="checkbox"
                checked={settings.paymentMethods[method.key]}
                onChange={(e) => setNested("paymentMethods", method.key, e.target.checked)}
                className="h-4 w-4 rounded border-ink/20 text-teal-500 focus:ring-teal-500 dark:border-paper/25"
              />
              {method.label}
            </label>
          ))}
        </div>
      </SettingsCard>

      {/* Contact Links */}
      <SettingsCard title="Contact Links">
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="WhatsApp Number">
            <input
              className={inputClass}
              value={settings.contact.whatsapp}
              onChange={(e) => setNested("contact", "whatsapp", e.target.value)}
              placeholder="+91 00000 00000"
            />
          </Field>
          <Field label="Instagram">
            <input
              className={inputClass}
              value={settings.contact.instagram}
              onChange={(e) => setNested("contact", "instagram", e.target.value)}
              placeholder="instagram.com/yourstore"
            />
          </Field>
          <Field label="Facebook">
            <input
              className={inputClass}
              value={settings.contact.facebook}
              onChange={(e) => setNested("contact", "facebook", e.target.value)}
              placeholder="facebook.com/yourstore"
            />
          </Field>
          <Field label="Website">
            <input
              className={inputClass}
              value={settings.contact.website}
              onChange={(e) => setNested("contact", "website", e.target.value)}
              placeholder="www.yourstore.com"
            />
          </Field>
          <Field label="YouTube">
            <input
              className={inputClass}
              value={settings.contact.youtube}
              onChange={(e) => setNested("contact", "youtube", e.target.value)}
              placeholder="youtube.com/@yourstore"
            />
          </Field>
        </div>
      </SettingsCard>

      {/* SEO */}
      <SettingsCard title="SEO">
        <Field label="Store Title">
          <input className={inputClass} value={settings.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} />
        </Field>
        <Field label="Meta Description">
          <textarea
            className={`${inputClass} min-h-[80px] resize-y`}
            value={settings.seoDescription}
            onChange={(e) => set("seoDescription", e.target.value)}
          />
        </Field>
      </SettingsCard>

      <Button onClick={() => onSave?.(settings)}>Save Settings</Button>
    </div>
  );
}
