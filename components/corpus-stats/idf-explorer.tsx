"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormulaDisplay } from "./formula-display";
import type { TermStats } from "@/lib/types";

interface IDFExplorerProps {
  termStats: TermStats[];
  selectedTerm: string | null;
  onSelectTerm: (term: string) => void;
  N: number;
  onHoverTerm: (term: string | null) => void;
}

export function IDFExplorer({
  termStats,
  selectedTerm,
  onSelectTerm,
  N,
  onHoverTerm,
}: IDFExplorerProps) {
  const selected = termStats.find((t) => t.term === selectedTerm);

  if (termStats.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Enter a query to explore IDF values.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span className="text-sm font-medium whitespace-nowrap">Query term:</span>
        <Select value={selectedTerm ?? undefined} onValueChange={onSelectTerm}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select a term" />
          </SelectTrigger>
          <SelectContent>
            {termStats.map((ts) => (
              <SelectItem key={ts.term} value={ts.term}>
                &ldquo;{ts.term}&rdquo; (df={ts.df})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selected && (
        <div
          className="space-y-3"
          onMouseEnter={() => onHoverTerm(selected.term)}
          onMouseLeave={() => onHoverTerm(null)}
        >
          <FormulaDisplay
            formula={`\\text{IDF}(t) = \\ln\\!\\left(\\frac{N - df(t) + 0.5}{df(t) + 0.5} + 1\\right)`}
            substituted={`= \\ln\\!\\left(\\frac{${N} - ${selected.df} + 0.5}{${selected.df} + 0.5} + 1\\right) = ${selected.idf.toFixed(3)}`}
          />
          <p className="text-sm text-muted-foreground">{selected.explanation}</p>
        </div>
      )}
    </div>
  );
}
