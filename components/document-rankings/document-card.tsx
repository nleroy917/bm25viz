"use client";

import { Card, CardContent } from "@/components/ui/card";
import { HighlightedText } from "./highlighted-text";
import { ScoreBadge } from "./score-badge";
import { ScoreBreakdown } from "./score-breakdown";
import type { RankedDocument } from "@/lib/types";

interface DocumentCardProps {
  doc: RankedDocument;
  rank: number;
  queryTerms: string[];
  expanded: boolean;
  onToggleExpand: () => void;
  hoveredTerm: string | null;
  onHoverTerm: (term: string | null) => void;
  N: number;
}

export function DocumentCard({
  doc,
  rank,
  queryTerms,
  expanded,
  onToggleExpand,
  hoveredTerm,
  onHoverTerm,
  N,
}: DocumentCardProps) {
  return (
    <Card className={`transition-shadow ${expanded ? "shadow-md ring-1 ring-orange-200" : ""}`}>
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start gap-3">
          <span className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-muted-foreground text-xs font-bold">
            {rank}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-muted-foreground">
                {doc.docLen} words
              </span>
              <ScoreBadge
                score={doc.totalScore}
                onClick={onToggleExpand}
                expanded={expanded}
              />
            </div>
            <p className="text-sm leading-relaxed">
              <HighlightedText
                text={doc.text}
                queryTerms={queryTerms}
                hoveredTerm={hoveredTerm}
              />
            </p>
            {expanded && (
              <ScoreBreakdown
                termScores={doc.termScores}
                totalScore={doc.totalScore}
                N={N}
                onHoverTerm={onHoverTerm}
              />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
