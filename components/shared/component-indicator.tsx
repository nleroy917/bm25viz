import { COLORS } from "@/lib/colors";

type ComponentType = "tf" | "idf" | "docLen";

interface ComponentIndicatorProps {
  type: ComponentType;
  description: string;
}

export function ComponentIndicator({ type, description }: ComponentIndicatorProps) {
  const color = COLORS[type];

  return (
    <div className={`flex items-start gap-2 rounded-md px-3 py-2 ${color.bg} ${color.border} border`}>
      <span className={`text-xs font-semibold whitespace-nowrap ${color.text}`}>
        {color.label}
      </span>
      <span className="text-xs text-muted-foreground">{description}</span>
    </div>
  );
}
