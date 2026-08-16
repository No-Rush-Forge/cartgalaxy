import { useEffect, useState } from "react";
import { Menu, Moon, Search, ShoppingCart, Store, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTheme } from "@/hooks/useTheme";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Products", href: "#products" },
  { label: "Categories", href: "#categories" },
];

export function StoreHeader({
  storeName,
  searchValue,
  onSearchChange,
  cartCount,
  onCartClick,
}) {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-ink/8 bg-paper/80 backdrop-blur-md dark:border-paper/10 dark:bg-night/80"
          : "border-b border-transparent bg-paper dark:bg-night"
      }`}
    >
      <div className="container flex h-16 items-center justify-between gap-4">
        <a
          href="#"
          className="flex min-w-0 items-center gap-2 font-display text-lg font-semibold tracking-tight text-ink dark:text-paper"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-teal-500 text-white">
            <Store className="h-4.5 w-4.5" strokeWidth={2.25} />
          </span>
          <span className="truncate">{storeName}</span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink/70 transition-colors hover:text-ink dark:text-paper/70 dark:hover:text-paper"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden min-w-0 max-w-xs flex-1 items-center md:flex">
          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 dark:text-paper/35" />
            <input
              value={searchValue}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search products…"
              className="w-full rounded-full border border-ink/10 bg-transparent py-2 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink/35 transition focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper dark:placeholder:text-paper/30"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hidden h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10 sm:flex"
          >
            {theme === "dark" ? (
              <Sun className="h-4.5 w-4.5" />
            ) : (
              <Moon className="h-4.5 w-4.5" />
            )}
          </button>

          <button
            onClick={onCartClick}
            aria-label="Open cart"
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition hover:bg-ink/5 dark:text-paper/70 dark:hover:bg-paper/10"
          >
            <ShoppingCart className="h-4.5 w-4.5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-teal-500 font-mono text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink/70 dark:text-paper/70 md:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35 dark:text-paper/35" />
                  <input
                    value={searchValue}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search products…"
                    className="w-full rounded-full border border-ink/10 bg-transparent py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-ink/35 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 dark:border-paper/15 dark:text-paper"
                  />
                </div>
              </div>
              <div className="mt-6 flex flex-col gap-1">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-3 py-3 font-display text-lg font-medium text-ink hover:bg-ink/5 dark:text-paper dark:hover:bg-paper/10"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
              <Button
                variant="outline"
                className="mt-auto"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
