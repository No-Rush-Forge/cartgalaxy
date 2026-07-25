import { useState } from "react";
import { Upload, Copy, QrCode, Download, Store as StoreIcon } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const EMPTY_STORE = {
  logoInitials: "",
  businessName: "",
  businessCategory: "",
  businessPhone: "",
  businessEmail: "",
  shortDescription: "",
  aboutBusiness: "",
  country: "",
  state: "",
  city: "",
  address: "",
  postalCode: "",
  customUrl: "",
};

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";

function Field({ label, required, className = "", children }) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50">
        {label} {required && <span className="text-teal-500">*</span>}
      </label>
      {children}
    </div>
  );
}

export function StoreInformation({ store, onSave, onCancel }) {
  const [form, setForm] = useState({ ...EMPTY_STORE, ...(store || {}) });
  const [copied, setCopied] = useState(false);

  const update = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const storeUrl = `yourdomain.com/store/${form.customUrl || "your-store"}`;

  const handleCopy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(`https://${storeUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>The essentials customers see first.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-50 text-teal-500 dark:bg-teal-500/10 dark:text-teal-100">
              {form.logoInitials ? (
                <span className="font-display text-lg font-semibold">{form.logoInitials}</span>
              ) : (
                <StoreIcon className="h-6 w-6" strokeWidth={1.75} />
              )}
            </div>
            <Button type="button" variant="outline" size="sm">
              <Upload className="h-3.5 w-3.5" /> Upload Logo
            </Button>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Business Name" required>
              <input
                className={inputClass}
                value={form.businessName}
                onChange={update("businessName")}
                placeholder="e.g. Meera's Home Store"
              />
            </Field>
            <Field label="Business Category" required>
              <input
                className={inputClass}
                value={form.businessCategory}
                onChange={update("businessCategory")}
                placeholder="e.g. Home Decor"
              />
            </Field>
            <Field label="Business Phone" required>
              <input
                className={inputClass}
                value={form.businessPhone}
                onChange={update("businessPhone")}
                placeholder="+91 00000 00000"
              />
            </Field>
            <Field label="Business Email">
              <input
                className={inputClass}
                type="email"
                value={form.businessEmail}
                onChange={update("businessEmail")}
                placeholder="you@business.com"
              />
            </Field>
          </div>

          <Field label="Short Description">
            <input
              className={inputClass}
              value={form.shortDescription}
              onChange={update("shortDescription")}
              placeholder="One line that sums up your store"
            />
          </Field>

          <Field label="About Business">
            <textarea
              className={`${inputClass} min-h-[110px] resize-y`}
              value={form.aboutBusiness}
              onChange={update("aboutBusiness")}
              placeholder="Tell customers about your business…"
            />
          </Field>
        </CardContent>
      </Card>

      {/* Business Address */}
      <Card>
        <CardHeader>
          <CardTitle>Business Address</CardTitle>
          <CardDescription>Address is optional — add it if customers may visit or need it for delivery.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 sm:grid-cols-2">
          <Field label="Country">
            <input className={inputClass} value={form.country} onChange={update("country")} placeholder="Country" />
          </Field>
          <Field label="State">
            <input className={inputClass} value={form.state} onChange={update("state")} placeholder="State" />
          </Field>
          <Field label="City">
            <input className={inputClass} value={form.city} onChange={update("city")} placeholder="City" />
          </Field>
          <Field label="Postal Code">
            <input className={inputClass} value={form.postalCode} onChange={update("postalCode")} placeholder="Postal code" />
          </Field>
          <Field label="Address" className="sm:col-span-2">
            <input
              className={inputClass}
              value={form.address}
              onChange={update("address")}
              placeholder="Street, area, landmark (optional)"
            />
          </Field>
        </CardContent>
      </Card>

      {/* Store URL */}
      <Card>
        <CardHeader>
          <CardTitle>Store URL</CardTitle>
          <CardDescription>Choose a short, memorable link for your store.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Field label="Custom Store URL">
            <input
              className={inputClass}
              value={form.customUrl}
              onChange={update("customUrl")}
              placeholder="abc-fashion"
            />
          </Field>
          <p className="rounded-xl border border-dashed border-ink/12 bg-ink/[0.03] px-3.5 py-2.5 font-mono text-xs text-ink-light dark:border-paper/15 dark:bg-paper/5 dark:text-paper/60">
            https://{storeUrl}
          </p>
        </CardContent>
      </Card>

      {/* Share Store */}
      <Card>
        <CardHeader>
          <CardTitle>Share Store</CardTitle>
          <CardDescription>Send this link anywhere, or let customers scan the QR code.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 sm:grid-cols-[1fr_auto]">
            <div className="space-y-3">
              <div className="flex items-center gap-2 rounded-xl border border-ink/10 px-3.5 py-2.5 dark:border-paper/15">
                <span className="flex-1 truncate font-mono text-xs text-ink-light dark:text-paper/60">
                  https://{storeUrl}
                </span>
                <Button type="button" size="sm" variant="ghost" onClick={handleCopy}>
                  <Copy className="h-3.5 w-3.5" /> {copied ? "Copied" : "Copy"}
                </Button>
              </div>
              <Button type="button" variant="outline" size="sm">
                <Download className="h-3.5 w-3.5" /> Download QR
              </Button>
            </div>
            <div className="flex h-28 w-28 items-center justify-center justify-self-center rounded-2xl border border-dashed border-ink/15 bg-ink/[0.03] text-ink/30 dark:border-paper/15 dark:bg-paper/5 dark:text-paper/25">
              <QrCode className="h-12 w-12" strokeWidth={1.25} />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => onSave?.(form)}>Save Store</Button>
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </div>
  );
}
