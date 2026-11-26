import { CheckCircle2 } from "lucide-react";

export default function SuccessBox({ children }) {
  return (
    <div
      role="status"
      className="flex items-start gap-3 rounded-xl bg-teal-50 px-4 py-3.5 text-sm text-teal-700 dark:bg-teal-500/10 dark:text-teal-100"
    >
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
      <span>{children}</span>
    </div>
  );
}
