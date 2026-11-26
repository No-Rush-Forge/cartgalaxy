import { useState, useContext, useEffect, useRef } from "react";
import { Menu, Pencil, Upload, Trash2, LogOut, UserX } from "lucide-react";
import { Sheet, SheetContent } from "../components/ui/sheet";
import Sidebar from "../components/SideBar";
import { SectionCard } from "../components/SectionCard";
import { Button } from "../components/ui/button";
import Toggle from "../components/ui/Toggle";
import { useTheme } from "../hooks/useTheme";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const inputClass =
  "w-full rounded-xl border border-ink/10 bg-transparent px-3.5 py-2.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30";
const labelClass =
  "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink/50 dark:text-paper/50";

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
  const {
    user,
    getProfile,
    updateProfile,
    changePassword,
    uploadProfilePicture,
    removeProfilePicture,
    getUserPreferences,
    updateUserPreferences,
    deleteAccount,
    logout,
    loading,
  } = useContext(AuthContext);

  console.log(user);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const {
    theme,
    themeMode,
    setThemeMode,
    accentColor,
    setAccentColor,
  } = useTheme();

  const [personalInfo, setPersonalInfo] = useState({
    full_name: "",
    email: "",
    phone: "",
    date_of_birth: "",
    gender: "",
  });
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });


  // Profile picture states
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  const [isDeletingAccount, setIsDeletingAccount] = useState(false);

  // Validate and preview selected image
  const handleImageSelection = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
    ];

    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG and WEBP images are allowed.");
      e.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image size must not exceed 2 MB.");
      e.target.value = "";
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  // Upload selected image
  const handleUploadPicture = async () => {
    if (!selectedFile) {
      toast.error("Please select an image first.");
      return;
    }

    const success = await uploadProfilePicture(selectedFile);

    if (success) {
      setSelectedFile(null);
      setPreviewUrl(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Remove existing image
  const handleRemovePicture = async () => {
    const success = await removeProfilePicture();

    if (success) {
      setSelectedFile(null);
      setPreviewUrl(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Release temporary preview URLs
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);



  const handleUpdatePassword = async () => {
    // Validate current password
    if (!passwords.current.trim()) {
      toast.error("Current password is required.");
      return;
    }

    // Validate new password
    if (!passwords.next) {
      toast.error("New password is required.");
      return;
    }

    // Minimum password length
    if (passwords.next.length < 6) {
      toast.error("New password must contain at least 6 characters.");
      return;
    }

    // Prevent using the same password
    if (passwords.current === passwords.next) {
      toast.error("New password must be different from your current password.");
      return;
    }

    // Confirm new password
    if (passwords.next !== passwords.confirm) {
      toast.error("New password and confirm password do not match.");
      return;
    }

    // Call backend API
    const success = await changePassword(
      passwords.current,
      passwords.next
    );

    // Clear fields only after successful update
    if (success) {
      setPasswords({
        current: "",
        next: "",
        confirm: "",
      });
    }
  };

  const [language, setLanguage] = useState("English");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
  });
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const profile = await getProfile();

      if (profile) {
        setPersonalInfo({
          full_name: profile.full_name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          date_of_birth: profile.date_of_birth
            ? profile.date_of_birth.split("T")[0]
            : "",
          gender: profile.gender || "",
        });
      }
    };

    loadProfile();
  }, []);

  // Load saved user preferences from database
  useEffect(() => {
    let isMounted = true;

    const loadPreferences = async () => {
      const preferences = await getUserPreferences();

      if (!isMounted) return;

      if (preferences) {
        setThemeMode(preferences.theme_mode || "system");

        setAccentColor(
          preferences.accent_color || "Blue"
        );

        setLanguage(
          preferences.language || "English"
        );

        setNotifications({
          email: preferences.email_notifications ?? true,
          push: preferences.push_notifications ?? true,
          marketing: preferences.marketing_notifications ?? false,
        });
      }

      setPreferencesLoaded(true);
    };

    loadPreferences();

    return () => {
      isMounted = false;
    };
  }, []);

  // Automatically save preferences whenever they change
  useEffect(() => {
    if (!preferencesLoaded) return;

    const savePreferences = async () => {
      await updateUserPreferences({
        theme_mode: themeMode,
        accent_color: accentColor,
        language: language,

        email_notifications: notifications.email,
        push_notifications: notifications.push,
        marketing_notifications: notifications.marketing,
      });
    };

    savePreferences();
  }, [
    preferencesLoaded,
    themeMode,
    accentColor,
    language,
    notifications,
  ]);

  const handleSaveProfile = async () => {
    await updateProfile({
      full_name: personalInfo.full_name,
      phone: personalInfo.phone,
      date_of_birth: personalInfo.date_of_birth,
      gender: personalInfo.gender,
    });
  };

  const handleDeleteAccount = () => {
    setDeletePassword("");
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDeleteAccount = async () => {
    if (!deletePassword.trim()) {
      toast.warning("Please enter your current password.");
      return;
    }

    setIsDeletingAccount(true);

    try {
      const result = await deleteAccount(deletePassword);

      if (result.success) {
        setIsDeleteDialogOpen(false);
        setDeletePassword("");
      }
    } finally {
      setIsDeletingAccount(false);
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-paper">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink/8 bg-paper/60 px-5 py-6 dark:border-paper/10 dark:bg-night/60 lg:flex">
          <Sidebar activeHref="/profile" />
        </aside>

        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent>
            <Sidebar
              activeHref="/profile"
              onNavigate={() => setMobileNavOpen(false)}
            />
          </SheetContent>
        </Sheet>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-6">
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
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-teal-500">
                  {user?.profile_picture_url ? (
                    <img
                      src={user.profile_picture_url}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-lg font-semibold text-white">
                      {user?.full_name
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-display text-lg font-semibold text-ink dark:text-paper">
                    {user?.full_name}
                  </p>
                  <p className="text-sm text-ink-light dark:text-paper/60">
                    {user?.role}
                  </p>
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
              footer={
                <Button onClick={handleSaveProfile} disabled={loading}>
                  {loading ? "Saving..." : "Save Changes"}
                </Button>
              }
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name">
                  <input
                    className={inputClass}
                    value={personalInfo?.full_name}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        full_name: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    className={`${inputClass} cursor-not-allowed opacity-70`}
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    readOnly
                  />
                </Field>
                <Field label="Phone Number">
                  <input
                    className={inputClass}
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Date of Birth">
                  <input
                    type="date"
                    className={inputClass}
                    value={personalInfo.date_of_birth}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        date_of_birth: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Gender">
                  <select
                    className={inputClass}
                    value={personalInfo.gender}
                    onChange={(e) =>
                      setPersonalInfo((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    {["Male", "Female", "Other", "Prefer not to say"].map(
                      (g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ),
                    )}
                  </select>
                </Field>
              </div>
            </SectionCard>

            {/* Security */}
            <SectionCard
              title="Security"
              description="Update your password regularly to keep your account secure."
              footer={
                <Button onClick={handleUpdatePassword} disabled={loading}>
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              }
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Current Password" className="sm:col-span-2">
                  <input
                    type="password"
                    className={inputClass}
                    value={passwords.current}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        current: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="New Password">
                  <input
                    type="password"
                    className={inputClass}
                    value={passwords.next}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        next: e.target.value,
                      }))
                    }
                  />
                </Field>
                <Field label="Confirm Password">
                  <input
                    type="password"
                    className={inputClass}
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        confirm: e.target.value,
                      }))
                    }
                  />
                </Field>
              </div>
            </SectionCard>


            {/* Profile Picture */}
            <SectionCard title="Profile Picture">
              <div className="flex flex-wrap items-center gap-5">

                {/* Image Preview */}
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-teal-500">
                  {previewUrl || user?.profile_picture_url ? (
                    <img
                      src={previewUrl || user.profile_picture_url}
                      alt="Profile Preview"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center font-display text-xl font-semibold text-white">
                      {user?.full_name
                        ?.split(" ")
                        .map((name) => name[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-3">

                  {/* Hidden File Input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={handleImageSelection}
                  />

                  {/* Select Image */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={loading}
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Choose Photo
                  </Button>

                  {/* Upload Image */}
                  {selectedFile && (
                    <Button
                      size="sm"
                      onClick={handleUploadPicture}
                      disabled={loading}
                    >
                      {loading ? "Uploading..." : "Upload Photo"}
                    </Button>
                  )}

                  {/* Remove Image */}
                  {!selectedFile && user?.profile_picture_url && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleRemovePicture}
                      disabled={loading}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Remove
                    </Button>
                  )}

                </div>
              </div>

              <p className="mt-3 text-xs text-ink-light dark:text-paper/50">
                Supported formats: JPG, PNG and WEBP. Maximum size: 2 MB.
              </p>
            </SectionCard>


            {/* Account Information */}
            <SectionCard
              title="Account Information"
              description="Read-only details tied to your account."
            >
              <dl className="grid gap-x-6 gap-y-3 sm:grid-cols-2">
                {[
                  { label: "User ID", value: user?.user_id },
                  { label: "Role", value: user?.role },
                  {
                    label: "Created Date",
                    value: user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : "-",
                  },
                  {
                    label: "Last Login",
                    value: user?.last_login
                      ? new Date(user.last_login).toLocaleString()
                      : "-",
                  },
                ].map((row) => (
                  <div
                    key={row.label}
                    className="flex items-center justify-between rounded-xl border border-dashed border-ink/10 px-4 py-2.5 text-sm dark:border-paper/15"
                  >
                    <dt className="text-ink-light dark:text-paper/60">
                      {row.label}
                    </dt>
                    <dd className="font-mono text-xs text-ink dark:text-paper">
                      {row.value}
                    </dd>
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
                      className={`rounded-xl px-4 py-2 text-sm font-semibold capitalize transition-colors ${themeMode === mode
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
                      className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform hover:scale-105 ${accentColor === color.name
                        ? "ring-2 ring-offset-2 ring-offset-paper dark:ring-offset-night"
                        : ""
                        }`}
                      style={{
                        backgroundColor: color.value,
                        "--tw-ring-color": color.value,
                      }}
                    />
                  ))}
                </div>
              </Field>
            </SectionCard>

            {/* Language */}
            <SectionCard title="Language">
              <Field label="Display Language" className="max-w-xs">
                <select
                  className={inputClass}
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
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
                onChange={(val) =>
                  setNotifications((prev) => ({ ...prev, email: val }))
                }
                label="Email Notifications"
                description="Order updates and account alerts."
              />
              <Toggle
                checked={notifications.push}
                onChange={(val) =>
                  setNotifications((prev) => ({ ...prev, push: val }))
                }
                label="Push Notifications"
                description="Real-time alerts on your device."
              />
              <Toggle
                checked={notifications.marketing}
                onChange={(val) =>
                  setNotifications((prev) => ({ ...prev, marketing: val }))
                }
                label="Marketing Emails"
                description="Tips, offers, and product news."
              />
            </SectionCard>

            {/* Danger Zone */}
            <SectionCard
              title="Danger Zone"
              description="These actions are permanent — proceed with care."
            >
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" onClick={logout}>
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

            {isDeleteDialogOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
                <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-900">

                  <div className="mb-4 flex items-center gap-3">
                    <div className="rounded-full bg-red-100 p-3 dark:bg-red-500/10">
                      <UserX className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                        Delete Account
                      </h2>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Permanent account deletion
                      </p>
                    </div>
                  </div>

                  <p className="mb-4 text-sm leading-6 text-gray-600 dark:text-gray-300">
                    Are you sure you want to permanently delete your CartGalaxy account?
                    Your profile, preferences, and profile picture will be deleted.
                    This action cannot be undone.
                  </p>

                  <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Enter your current password
                  </label>

                  <input
                    type="password"
                    value={deletePassword}
                    onChange={(e) => setDeletePassword(e.target.value)}
                    placeholder="Enter current password"
                    autoComplete="current-password"
                    disabled={isDeletingAccount}
                    className="mb-5 w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
                  />

                  <div className="flex justify-end gap-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                      disabled={isDeletingAccount}
                    >
                      Cancel
                    </Button>

                    <Button
                      onClick={handleConfirmDeleteAccount}
                      disabled={isDeletingAccount || !deletePassword.trim()}
                      className="bg-red-600 text-white hover:bg-red-700"
                    >
                      {isDeletingAccount ? "Deleting..." : "Permanently Delete"}
                    </Button>
                  </div>

                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
