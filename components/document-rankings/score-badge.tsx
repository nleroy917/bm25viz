"use client";

interface ScoreBadgeProps {
  score: number;
  onClick: () => void;
  expanded: boolean;
}

export function ScoreBadge({ score, onClick, expanded }: ScoreBadgeProps) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold transition-colors cursor-pointer ${
        expanded
          ? "bg-orange-500 text-white"
          : "bg-orange-100 text-orange-800 hover:bg-orange-200"
      }`}
    >
      {score.toFixed(3)}
      <span className="text-xs opacity-75">{expanded ? "▲" : "▼"}</span>
    </button>
  );
}
