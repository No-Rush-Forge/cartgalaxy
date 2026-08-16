import { MapPin, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StoreInfo({ location, phone, email }) {
  const items = [
    { icon: MapPin, label: "Location", value: location },
    { icon: Phone, label: "Phone", value: phone },
    { icon: Mail, label: "Email", value: email },
  ];

  return (
    <section className="py-14 md:py-16">
      <div className="container">
        <div className="mx-auto max-w-xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-100">
            Get in Touch
          </p>
          <h2 className="mt-3 text-balance font-display text-2xl font-semibold tracking-tight text-ink dark:text-paper sm:text-3xl">
            Store Information
          </h2>
        </div>

        <Card className="mx-auto mt-10 max-w-xl">
          <div className="grid divide-y divide-dashed divide-ink/10 dark:divide-paper/10">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-4 px-7 py-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
                    <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
                  </span>
                  <div className="text-left">
                    <p className="text-xs font-semibold uppercase tracking-wider text-ink/45 dark:text-paper/45">
                      {item.label}
                    </p>
                    <p className="font-medium text-ink dark:text-paper">{item.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}
