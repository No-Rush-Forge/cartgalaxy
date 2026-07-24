// import { Store, Instagram, Twitter, Linkedin } from "lucide-react";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const SOCIALS = [
  // { icon: Instagram, label: "Instagram", href: "#" },
  // { icon: Twitter, label: "Twitter", href: "#" },
  // // { icon: Facebook, label: "Facebook", href: "#" },
  // { icon: Linkedin, label: "LinkedIn", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-textured border-t border-ink/8 dark:border-paper/10">
      <div className="container py-14">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <a href="#home" className="flex items-center gap-2 font-display text-lg font-semibold text-ink dark:text-paper">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-teal-500 text-white">
                {/* <Store className="h-4.5 w-4.5" strokeWidth={2.25} /> */}
              </span>
              OwnStore
            </a>
            <p className="mt-4 text-sm leading-relaxed text-ink-light dark:text-paper/60">
              The simplest way for small businesses to sell online — no code, no payment
              gateway, just a store link you can share today.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/45 dark:text-paper/45">
                Quick Links
              </p>
              <ul className="mt-4 space-y-2.5">
                {QUICK_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm text-ink-light transition-colors hover:text-ink dark:text-paper/65 dark:hover:text-paper"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-ink/45 dark:text-paper/45">
                Follow
              </p>
              <div className="mt-4 flex gap-2.5">
                {SOCIALS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/10 text-ink/60 transition-colors hover:border-teal-500/40 hover:bg-teal-50 hover:text-teal-600 dark:border-paper/15 dark:text-paper/60 dark:hover:bg-teal-500/10 dark:hover:text-teal-100"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-dashed border-ink/10 pt-6 text-center text-xs text-ink-light dark:border-paper/10 dark:text-paper/50">
          © {new Date().getFullYear()} OwnStore. All rights reserved.
        </div>
      </div>
    </footer>
  );
}


export default Footer