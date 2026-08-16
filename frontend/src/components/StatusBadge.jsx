const STATUS_STYLES = {
  Pending: "bg-gold-100 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400",
  Processing: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100",
  Shipped: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100",
  Delivered: "bg-teal-500 text-white",
  Cancelled: "bg-ink/5 text-ink/45 dark:bg-paper/10 dark:text-paper/45",
  Active: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100",
  Paid: "bg-teal-50 text-teal-600 dark:bg-teal-500/10 dark:text-teal-100",
  COD: "bg-gold-100 text-gold-600 dark:bg-gold-500/10 dark:text-gold-400",
};

export function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
        STATUS_STYLES[status] || "bg-ink/5 text-ink/55 dark:bg-paper/10 dark:text-paper/55"
      }`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      {status}
    </span>
  );
}
