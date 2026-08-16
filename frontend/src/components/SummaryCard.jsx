import { Card } from "@/components/ui/card";

const TONE_CLASSES = {
  teal: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100",
  gold: "bg-gold-100 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400",
};

export function SummaryCard({ icon: Icon, title, value, tone = "teal" }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${
            TONE_CLASSES[tone] || TONE_CLASSES.teal
          }`}
        >
          <Icon className="h-5 w-5" strokeWidth={2.1} />
        </span>
        <div>
          <p className="font-mono text-2xl font-semibold text-ink dark:text-paper">{value}</p>
          <p className="text-xs text-ink-light dark:text-paper/60">{title}</p>
        </div>
      </div>
    </Card>
  );
}
