import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const INCLUDED = [
  "Unlimited Products",
  "Unlimited Customers",
  "WhatsApp Orders",
  "Email Orders",
  "Business Website",
];

const Pricing = ({ onStartFree })=> {
  return (
    <section id="pricing" className="py-20 md:py-28">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-teal-600 dark:text-teal-100">
            Pricing
          </p>
          <h2 className="mt-3 text-balance font-display text-3xl font-semibold tracking-tight text-ink dark:text-paper sm:text-4xl">
            Start selling without spending a rupee
          </h2>
        </div>

        <Card className="mx-auto mt-14 max-w-md overflow-hidden border-teal-500/20 shadow-xl shadow-teal-900/10">
          <div className="bg-teal-500 px-8 py-6 text-white">
            <p className="font-display text-lg font-semibold">Starter</p>
            <p className="mt-1 text-sm text-white/75">Everything to launch your first store</p>
          </div>
          <div className="px-8 py-8">
            <div className="flex items-baseline gap-2">
              <span className="font-display text-5xl font-semibold text-ink dark:text-paper">Free</span>
              <span className="text-sm text-ink-light dark:text-paper/60">forever, no card needed</span>
            </div>

            <ul className="mt-8 space-y-3.5">
              {INCLUDED.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-ink dark:text-paper/85">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100">
                    <Check className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
              <li className="flex items-center gap-3 border-t border-dashed border-ink/15 pt-3.5 text-sm text-ink-light dark:border-paper/15 dark:text-paper/55">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-ink/5 text-ink/40 dark:bg-paper/10 dark:text-paper/40">
                  —
                </span>
                No Payment Gateway
              </li>
            </ul>

            <Button size="lg" className="mt-8 w-full" onClick={onStartFree}>
              Start Free
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}


export default Pricing