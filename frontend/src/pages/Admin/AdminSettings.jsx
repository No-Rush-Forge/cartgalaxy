import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { SectionCard } from "@/components/SectionCard";
import { Button } from "@/components/ui/button";
// import { currentUser } from "@/data/userData";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";
const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50";

function Field({ label, className = "", children }) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-ink dark:text-paper">{label}</p>
        {description && (
          <p className="text-xs text-ink-light dark:text-paper/55">
            {description}
          </p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200 ${
          checked ? "bg-teal-500" : "bg-ink/15 dark:bg-paper/20"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform duration-200 ${
            checked ? "translate-x-[22px]" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}

export function AdminSettings() {
  const [general, setGeneral] = useState({
    platformName: "CartGalaxy",
    supportEmail: "support@cartgalaxy.app",
    platformStatus: "Operational",
  });

  const [platform, setPlatform] = useState({
    allowRegistrations: true,
    allowNewStores: true,
    maintenanceMode: false,
  });

  return (
    <AdminLayout
      title="Platform Settings"
      subtitle="Basic platform-wide controls for CartGalaxy."
    >
      <SectionCard
        title="General"
        footer={
          <Button onClick={() => console.log("Save general settings", general)}>
            Save Changes
          </Button>
        }
      >
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Platform Name">
            <input
              className={inputClass}
              value={general.platformName}
              onChange={(e) =>
                setGeneral((prev) => ({
                  ...prev,
                  platformName: e.target.value,
                }))
              }
            />
          </Field>
          <Field label="Support Email">
            <input
              type="email"
              className={inputClass}
              value={general.supportEmail}
              onChange={(e) =>
                setGeneral((prev) => ({
                  ...prev,
                  supportEmail: e.target.value,
                }))
              }
            />
          </Field>
          <Field label="Platform Status" className="sm:col-span-2 max-w-xs">
            <select
              className={inputClass}
              value={general.platformStatus}
              onChange={(e) =>
                setGeneral((prev) => ({
                  ...prev,
                  platformStatus: e.target.value,
                }))
              }
            >
              {["Operational", "Degraded", "Under Maintenance"].map(
                (status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ),
              )}
            </select>
          </Field>
        </div>
      </SectionCard>

      <SectionCard
        title="Account & Security"
        description="Your admin account and session information."
      >
        <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
          {[
            { label: "User ID", value: "" },
            { label: "Role", value: "" },
            { label: "Created Date", value: "" },
            { label: "Last Login", value: "" },
          ].map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between rounded-xl border border-dashed border-ink/10 px-4 py-2.5 text-sm dark:border-paper/15"
            >
              <dt className="text-ink-light dark:text-paper/60">{row.label}</dt>
              <dd className="font-mono text-xs text-ink dark:text-paper">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>
        <div className="flex items-center gap-3 rounded-xl bg-teal-50 px-4 py-3.5 text-sm text-teal-700 dark:bg-teal-500/10 dark:text-teal-100">
          <ShieldCheck className="h-4 w-4 shrink-0" />
          <span>This is the only active session for your account.</span>
        </div>
        <Button
          variant="outline"
          onClick={() => console.log("Log out other sessions")}
        >
          Log Out Other Sessions
        </Button>
      </SectionCard>

      <SectionCard
        title="Platform"
        description="Control what's currently possible on CartGalaxy."
        footer={
          <Button
            onClick={() => console.log("Save platform settings", platform)}
          >
            Save Changes
          </Button>
        }
      >
        <Toggle
          checked={platform.allowRegistrations}
          onChange={(val) =>
            setPlatform((prev) => ({ ...prev, allowRegistrations: val }))
          }
          label="Allow New Registrations"
          description="Let new users sign up for CartGalaxy."
        />
        <Toggle
          checked={platform.allowNewStores}
          onChange={(val) =>
            setPlatform((prev) => ({ ...prev, allowNewStores: val }))
          }
          label="Allow New Stores"
          description="Let store owners create additional stores."
        />
        <Toggle
          checked={platform.maintenanceMode}
          onChange={(val) =>
            setPlatform((prev) => ({ ...prev, maintenanceMode: val }))
          }
          label="Maintenance Mode"
          description="Temporarily take storefronts offline for maintenance."
        />
      </SectionCard>
    </AdminLayout>
  );
}
