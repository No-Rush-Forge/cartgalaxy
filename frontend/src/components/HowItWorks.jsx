import { UserPlus, Building2, ImagePlus, Share2 } from "lucide-react";

const STEPS = [
  {
    icon: UserPlus,
    title: "Register",
    description: "Create your OwnStore account in under a minute.",
  },
  {
    icon: Building2,
    title: "Add Business Details",
    description: "Tell customers who you are — name, logo, and location.",
  },
  {
    icon: ImagePlus,
    title: "Upload Products",
    description: "Add photos, prices, and descriptions for what you sell.",
  },
  {
    icon: Share2,
    title: "Share Your Store",
    description: "Send your store link anywhere and start taking orders.",
  },
];

const HowItWorks = () =>{
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-100">
            How it works
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink dark:text-paper sm:text-4xl">
            From sign-up to your first order, four steps
          </h2>
        </div>

        <div className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-6">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent dark:via-paper/15 md:block"
          />
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div key={step.title} className="relative animate-fade-up text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-paper font-mono text-sm font-semibold text-teal-600 shadow-sm dark:border-paper/10 dark:bg-night dark:text-teal-100">
                  0{i + 1}
                </div>
                <div className="mx-auto mt-5 flex h-10 w-10 items-center justify-center rounded-xl bg-gold-100 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400">
                  <Icon className="h-5 w-5" strokeWidth={2.1} />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold text-ink dark:text-paper">
                  {step.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[200px] text-sm leading-relaxed text-ink-light dark:text-paper/65">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export default HowItWorks