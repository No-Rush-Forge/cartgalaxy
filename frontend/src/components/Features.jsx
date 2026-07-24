import { Store, PackagePlus, Smartphone, MessageCircle, Mail, LayoutDashboard } from "lucide-react";
import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Store,
    title: "Business Profile",
    description: "Create your business identity with a name, logo, and story customers recognize.",
  },
  {
    icon: PackagePlus,
    title: "Product Management",
    description: "Upload products with price, description, and images in just a few taps.",
  },
  {
    icon: Smartphone,
    title: "Responsive Store",
    description: "Every store looks sharp on any screen — automatically, with no extra setup.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Orders",
    description: "Customers checkout straight into a WhatsApp chat with you — no app switching.",
  },
  {
    icon: Mail,
    title: "Email Orders",
    description: "Prefer email? Every order lands in your inbox, formatted and ready to fulfil.",
  },
  {
    icon: LayoutDashboard,
    title: "Dashboard",
    description: "Manage products, orders, and your storefront from a single, simple dashboard.",
  },
];

const Features = () => {
  return (
    <section id="features" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-100">
            Everything you need
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink dark:text-paper sm:text-4xl">
            Run your whole shop from one place
          </h2>
          <p className="mt-4 text-balance text-ink-light dark:text-paper/70">
            OwnStore replaces spreadsheets, screenshots, and scattered chats with one simple
            toolkit built for how small businesses actually sell.
          </p>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="group animate-fade-up p-1 transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-500/30 hover:shadow-xl hover:shadow-teal-900/10"
                style={{ animationDelay: `${i * 0.08}s` }}
              >
                <div className="p-6">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 transition-colors duration-300 group-hover:bg-teal-500 group-hover:text-white dark:bg-teal-500/10 dark:text-teal-100">
                    <Icon className="h-5 w-5" strokeWidth={2.1} />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-ink dark:text-paper">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-light dark:text-paper/65">
                    {feature.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}


export default Features