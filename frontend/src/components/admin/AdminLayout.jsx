import { useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export function AdminLayout({ title, subtitle, children }) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper text-ink dark:bg-night dark:text-paper">
      <div className="mx-auto flex max-w-[1400px]">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-ink/8 bg-paper/60 px-5 py-6 dark:border-paper/10 dark:bg-night/60 lg:flex">
          <AdminSidebar />
        </aside>

        <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
          <SheetContent>
            <AdminSidebar onNavigate={() => setMobileNavOpen(false)} />
          </SheetContent>
        </Sheet>

        <main className="flex-1 px-5 py-8 sm:px-8 lg:px-10">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileNavOpen(true)}
                aria-label="Open menu"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition hover:bg-ink/5 dark:border-paper/10 dark:text-paper/70 dark:hover:bg-paper/10 lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-100">
                  Admin Panel
                </p>
                <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper sm:text-3xl">
                  {title}
                </h1>
                {subtitle && (
                  <p className="mt-1 text-sm text-ink-light dark:text-paper/65">{subtitle}</p>
                )}
              </div>
            </div>

            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
