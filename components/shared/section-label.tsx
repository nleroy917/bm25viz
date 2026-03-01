interface SectionLabelProps {
  number: number;
  title: string;
}

export function SectionLabel({ number, title }: SectionLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-purple-100 text-purple-700 text-sm font-semibold">
        {number}
      </span>
      <h2 className="text-lg font-semibold text-foreground">{title}</h2>
    </div>
  );
}
