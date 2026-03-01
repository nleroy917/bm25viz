import { Card, CardContent } from "@/components/ui/card";
import { COLORS } from "@/lib/colors";

interface StatCardProps {
  label: string;
  value: string | number;
  detail?: string;
  colorType?: keyof typeof COLORS;
}

export function StatCard({ label, value, detail, colorType }: StatCardProps) {
  const color = colorType ? COLORS[colorType] : null;
  return (
    <Card>
      <CardContent className="pt-4 pb-3 px-4">
        <p className={`text-xs mb-1 font-medium ${color ? color.text : "text-muted-foreground"}`}>{label}</p>
        <p className="text-2xl font-bold tabular-nums">{value}</p>
        {detail && <p className="text-xs text-muted-foreground mt-1">{detail}</p>}
      </CardContent>
    </Card>
  );
}
