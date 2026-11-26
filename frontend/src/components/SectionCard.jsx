import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export function SectionCard({ title, description, footer, className = "", children }) {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent className="space-y-5">{children}</CardContent>
      {footer && <div className="flex flex-wrap gap-3 px-6 pb-6">{footer}</div>}
    </Card>
  );
}
