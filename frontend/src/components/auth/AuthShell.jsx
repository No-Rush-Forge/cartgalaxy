import { Store } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuthShell({ topLinkLabel, topLinkAction, children }) {
  return (
    <div className="flex min-h-screen flex-col bg-textured text-ink dark:bg-night dark:text-paper">
      <header className="container flex h-16 items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500 text-white">
            <Store className="h-4.5 w-4.5" strokeWidth={2.25} />
          </span>
          CartGalaxy
        </a>
        {topLinkLabel && (
          <Button variant="ghost" size="sm" onClick={topLinkAction}>
            {topLinkLabel}
          </Button>
        )}
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">{children}</div>
      </main>
    </div>
  );
}
