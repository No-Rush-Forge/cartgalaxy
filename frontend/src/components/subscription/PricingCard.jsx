import { Check } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function PricingCard({ name, price, period, features, buttonLabel, highlighted = false, onAction }) {
  return (
    <Card
      className={`flex flex-col p-6 ${
        highlighted ? "border-teal-500/30 shadow-xl shadow-teal-900/10 ring-1 ring-teal-500/20" : ""
      }`}
    >
      {highlighted && (
        <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-teal-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
          Recommended
        </span>
      )}
      <p className="font-display text-lg font-semibold text-ink dark:text-paper">{name}</p>
      <div className="mt-2 flex items-baseline gap-1">
        <span className="font-display text-3xl font-semibold text-ink dark:text-paper">{price}</span>
        {period && <span className="text-sm text-ink-light dark:text-paper/60">{period}</span>}
      </div>

      <ul className="mt-5 flex-1 space-y-2.5">
        {features.map((feature) => (
          <li key={feature} className="flex items-center gap-2.5 text-sm text-ink dark:text-paper/85">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
              <Check className="h-3 w-3" strokeWidth={3} />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <Button className="mt-6 w-full" variant={highlighted ? "default" : "outline"} onClick={onAction}>
        {buttonLabel}
      </Button>
    </Card>
  );
}
