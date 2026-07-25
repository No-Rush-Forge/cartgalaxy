import { Menu, Sparkles } from "lucide-react";

export function DashboardHeader({ userName, plan = "FREE", onMenuClick }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          aria-label="Open menu"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/10 text-ink/70 transition hover:bg-ink/5 dark:border-paper/10 dark:text-paper/70 dark:hover:bg-paper/10 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-balance font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper sm:text-3xl">
            Welcome back, {userName}
          </h1>
          <p className="mt-1 text-sm text-ink-light dark:text-paper/65">
            Manage your profile and grow your online store.
          </p>
        </div>
      </div>

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-gold-500/20 bg-gold-100 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-gold-600 dark:border-gold-500/20 dark:bg-gold-500/10 dark:text-gold-400">
        <Sparkles className="h-3.5 w-3.5" />
        {plan} Plan
      </span>
    </div>
  );
}
