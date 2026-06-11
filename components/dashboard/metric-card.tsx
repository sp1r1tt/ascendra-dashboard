import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MetricCardProps {
  title: string;
  value: string;
  description: string;
  trend: "up" | "down" | "neutral";
}

export function MetricCard({ title, value, description, trend }: MetricCardProps) {
  const trendStyles = {
    up: "text-emerald-600 dark:text-emerald-400",
    down: "text-blue-600 dark:text-blue-400",
    neutral: "text-muted-foreground"
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold tracking-tight">{value}</div>
        <p className={`text-xs mt-1 font-medium ${trendStyles[trend]}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
