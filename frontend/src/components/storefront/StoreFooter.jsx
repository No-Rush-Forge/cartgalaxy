import { Store } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
  { label: "Contact", href: "#contact" },
];

export function StoreFooter({ storeName }) {
  return (
    <footer className="bg-textured border-t border-ink/8 dark:border-paper/10">
      <div className="container py-12">
        <div className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <a
            href="#"
            className="flex items-center gap-2 font-display text-lg font-semibold text-ink dark:text-paper"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500 text-white">
              <Store className="h-4.5 w-4.5" strokeWidth={2.25} />
            </span>
            {storeName}
          </a>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {QUICK_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-ink-light transition-colors hover:text-ink dark:text-paper/65 dark:hover:text-paper"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 flex flex-col items-center gap-1.5 border-t border-dashed border-ink/10 pt-6 text-center dark:border-paper/10">
          <p className="text-xs text-ink-light dark:text-paper/55">
            © {new Date().getFullYear()} {storeName}. All rights reserved.
          </p>
          <p className="text-[11px] text-ink-light/70 dark:text-paper/40">
            Powered by CartGalaxy
          </p>
        </div>
      </div>
    </footer>
  );
}
