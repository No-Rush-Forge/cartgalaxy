import { Card } from "@/components/ui/card";

export function AdminTable({ columns, children, isEmpty, emptyMessage = "No results found." }) {
  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-ink/8 text-xs uppercase tracking-wide text-ink/45 dark:border-paper/10 dark:text-paper/45">
              {columns.map((column) => (
                <th key={column} className="whitespace-nowrap px-5 py-3.5 font-semibold">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-dashed divide-ink/8 dark:divide-paper/10">
            {isEmpty ? (
              <tr>
                <td colSpan={columns.length} className="px-5 py-10 text-center text-sm text-ink-light dark:text-paper/55">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              children
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
