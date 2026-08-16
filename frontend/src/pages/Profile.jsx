import { useState } from "react";
import { Menu, Pencil, Upload, Trash2, LogOut, UserX } from "lucide-react";
import { Sheet, SheetContent } from "../components/ui/sheet";
import Sidebar from "../components/SideBar";
import { SectionCard } from "../components/profile/SectionCard";
import { Button } from "../components/ui/button";
import Toggle from "../components/ui/Toggle";
import { useTheme } from "../hooks/useTheme";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";
const labelClass = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50";

const ACCENT_COLORS = [
  { name: "Blue", value: "#3B82F6" },
  { name: "Purple", value: "#8B5CF6" },
  { name: "Orange", value: "#F97316" },
  { name: "Green", value: "#22C55E" },
];

function Field({ label, className = "", children }) {
  return (
    <div className={className}>
      <label className={labelClass}>{label}</label>
      {children}
    </div>
  );
}



export function Profile() {
  const { user } = useContext(AuthContext)

  console.log(user);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [personalInfo, setPersonalInfo] = useState({
    full_name: user?.full_name,
    email: user?.email,
    phone: user?.phone,
    dateOfBirth: user?.dateOfBirth,
    gender: user?.gender,
  });
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [accentColor, setAccentColor] = useState("Blue");
  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });

  const setThemeMode = (mode) => {
    if (mode === "system") {
      localStorage.removeItem("ownstore-theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if ((prefersDark && theme !== "dark") || (!prefersDark && theme !== "light")) toggleTheme();
      return;
    }
    if (mode !== theme) toggleTheme();
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Delete your account? This cannot be undone. (Frontend only — no account will actually be deleted.)"
    );
    if (confirmed) console.log("Delete account confirmed");
  };

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-paper">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink/8 bg-paper/60 px-5 py-6 dark:border-paper/10 dark:bg-night/60 lg:flex">
          <Sidebar activeHref="/profile" />
        </aside>

        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent>
            <Sidebar activeHref="/profile" onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-3xl space-y-6">
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
                  Profile
                </h1>
                <p className="mt-1 text-sm text-ink-light dark:text-paper/65">
                  Manage your personal information and preferences.
                </p>
              </div>
            </div>

            {/* Profile Header */}
            <div className="flex flex-wrap items-center justify-between gap-5 rounded-3xl border border-ink/8 bg-white/70 p-6 backdrop-blur-sm dark:border-paper/10 dark:bg-night-card/70">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-500 font-display text-lg font-semibold text-white">
                  {user?.avatarInitials}
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-ink dark:text-paper">
                    {user?.full_name}
                  </p>
                  <p className="text-sm text-ink-light dark:text-paper/60">{user?.role}</p>
                  <p className="text-xs text-ink-light dark:text-paper/50">
                    Joined {user?.joinedDate}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </Button>
            </div>

            {/* Personal Information */}
            <SectionCard
              title="Personal Information"
              footer={<Button onClick={() => console.log("Save personal info", personalInfo)}>Save Changes</Button>}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <input
                    className={inputClass}
                    value={personalInfo?.full_name}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, full_name: e.target.value }))}
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    className={inputClass}
                    value={personalInfo.email}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, email: e.target.value }))}
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    className={inputClass}
                    value={personalInfo.phone}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, phone: e.target.value }))}
                  />
                </Field>
                <Field label="Date of Birth">
                  <input
                    type="date"
                    className={inputClass}
                    value={personalInfo.dateOfBirth}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, dateOfBirth: e.target.value }))}
                  />
                </Field>
                <Field label="Gender">
                  <select
                    className={inputClass}
                    value={personalInfo.gender}
                    onChange={(e) => setPersonalInfo((prev) => ({ ...prev, gender: e.target.value }))}
                  >
                    {["Male", "Female", "Other", "Prefer not to say"].map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>
            </SectionCard>

            {/* Security */}
            <SectionCard
              title="Security"
              description="Update your password regularly to keep your account secure."
              footer={<Button onClick={() => console.log("Update password")}>Update Password</Button>}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Current Password" className="sm:col-span-2">
                  <input
                    type="password"
                    className={inputClass}
                    value={passwords.current}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, current: e.target.value }))}
                  />
                </Field>
                <Field label="New Password">
                  <input
                    type="password"
                    className={inputClass}
                    value={passwords.next}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, next: e.target.value }))}
                  />
                </Field>
                <Field label="Confirm Password">
                  <input
                    type="password"
                    className={inputClass}
                    value={passwords.confirm}
                    onChange={(e) => setPasswords((prev) => ({ ...prev, confirm: e.target.value }))}
                  />
                </Field>
              </div>
            </SectionCard>

            {/* Profile Picture */}
            <SectionCard title="Profile Picture">
              <div className="flex items-center gap-5">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-teal-500 font-display text-lg font-semibold text-white">
                  {user?.avatarInitials}
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" size="sm">
                    <Upload className="h-3.5 w-3.5" /> Upload New Photo
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Trash2 className="h-3.5 w-3.5" /> Remove
                  </Button>
                </div>
              </div>
            </SectionCard>

            {/* Account Information */}
            <SectionCard title="Account Information" description="Read-only details tied to your account.">
              <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  { label: "User ID", value: user?.id },
                  { label: "Role", value: user?.role },
                  { label: "Created Date", value: user?.createdDate },
                  { label: "Last Login", value: user?.lastLogin },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between rounded-xl border border-dashed border-ink/10 px-4 py-2.5 text-sm dark:border-paper/15">
                    <dt className="text-ink-light dark:text-paper/60">{row.label}</dt>
                    <dd className="font-mono text-xs text-ink dark:text-paper">{row.value}</dd>
                  </div>
                ))}
              </dl>
            </SectionCard>

            {/* Appearance */}
            <SectionCard title="Appearance">
              <Field label="Theme">
                <div className="flex flex-wrap gap-2">
                  {["light", "dark", "system"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setThemeMode(mode)}
                      className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-colors ${theme === mode
                        ? "bg-teal-500 text-white shadow-sm shadow-teal-700/20"
                        : "border border-ink/10 text-ink/60 hover:bg-ink/5 dark:border-paper/15 dark:text-paper/60 dark:hover:bg-paper/10"
                        }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </Field>
              <Field label="Accent Color">
                <div className="flex flex-wrap gap-3">
                  {ACCENT_COLORS.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setAccentColor(color.name)}
                      aria-label={color.name}
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 ${accentColor === color.name ? "ring-2 ring-offset-2 ring-offset-paper dark:ring-offset-night" : ""
                        }`}
                      style={{ backgroundColor: color.value, "--tw-ring-color": color.value }}
                    />
                  ))}
                </div>
              </Field>
            </SectionCard>

            {/* Language */}
            <SectionCard title="Language">
              <Field label="Display Language" className="max-w-xs">
                <select className={inputClass} value={language} onChange={(e) => setLanguage(e.target.value)}>
                  {["English", "Tamil", "Hindi"].map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </Field>
            </SectionCard>

            {/* Notifications */}
            <SectionCard title="Notifications">
              <Toggle
                checked={notifications.email}
                onChange={(val) => setNotifications((prev) => ({ ...prev, email: val }))}
                label="Email Notifications"
                description="Order updates and account alerts."
              />
              <Toggle
                checked={notifications.push}
                onChange={(val) => setNotifications((prev) => ({ ...prev, push: val }))}
                label="Push Notifications"
                description="Real-time alerts on your device."
              />
              <Toggle
                checked={notifications.marketing}
                onChange={(val) => setNotifications((prev) => ({ ...prev, marketing: val }))}
                label="Marketing Emails"
                description="Tips, offers, and product news."
              />
            </SectionCard>

            {/* Danger Zone */}
            <SectionCard title="Danger Zone" description="These actions are permanent — proceed with care.">
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={() => console.log("Logout")}>
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
                <Button
                  variant="outline"
                  className="border-red-300 text-red-600 hover:border-red-400 hover:bg-red-50 hover:text-red-700 dark:border-red-500/30 dark:text-red-400 dark:hover:bg-red-500/10"
                  onClick={handleDeleteAccount}
                >
                  <UserX className="h-4 w-4" /> Delete Account
                </Button>
              </div>
            </SectionCard>
          </div>
        </main>
      </div>
    </div>
  );
}
