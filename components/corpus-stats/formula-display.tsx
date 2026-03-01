"use client";

import { KaTeXInline } from "@/components/shared/katex-inline";

interface FormulaDisplayProps {
  formula: string;
  substituted?: string;
  className?: string;
}

export function FormulaDisplay({ formula, substituted, className = "" }: FormulaDisplayProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <div className="py-1">
        <KaTeXInline math={formula} display />
      </div>
      {substituted && (
        <div className="py-1">
          <KaTeXInline math={substituted} display />
        </div>
      )}
    </div>
  );
}
