import { CheckCircle2, Circle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FIELDS = [
  { key: "fullName", label: "Full Name" },
  { key: "email", label: "Email" },
  { key: "phone", label: "Phone Number" },
  { key: "country", label: "Country" },
  { key: "state", label: "State" },
  { key: "city", label: "City" },
  { key: "businessCategory", label: "Business Category" },
];

export function ProfileCard({ profile, onCompleteProfile }) {

  console.log(profile);
  const completedCount = FIELDS.filter((field) => Boolean(profile[field.key])).length;
  const percent = Math.round((completedCount / FIELDS.length) * 100);
  const isComplete = completedCount === FIELDS.length;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-ink dark:text-paper">
          Profile Completion
        </h3>
        <span className="font-mono text-sm font-semibold text-teal-600 dark:text-teal-100">
          {percent}%
        </span>
      </div>

      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-ink/8 dark:bg-paper/10">
        <div
          className="h-full rounded-full bg-teal-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <ul className="mt-5 space-y-2.5">
        {FIELDS.map((field) => {
          const done = Boolean(profile[field.key]);
          return (
            <li key={field.key} className="flex items-center gap-2.5 text-sm">
              {done ? (
                <CheckCircle2 className="h-4 w-4 shrink-0 text-teal-500" />
              ) : (
                <Circle className="h-4 w-4 shrink-0 text-ink/25 dark:text-paper/25" />
              )}
              <span
                className={
                  done ? "text-ink dark:text-paper" : "text-ink-light dark:text-paper/55"
                }
              >
                {field.label}
              </span>
            </li>
          );
        })}
      </ul>

      {!isComplete && (
        <Button className="mt-6 w-full" onClick={onCompleteProfile}>
          Complete Profile
        </Button>
      )}
    </Card>
  );
}
