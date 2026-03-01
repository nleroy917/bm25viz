"use client";

import { SectionLabel } from "@/components/shared/section-label";
import { DocumentCard } from "./document-card";
import type { RankedDocument } from "@/lib/types";

interface RankingsPanelProps {
  rankedDocuments: RankedDocument[];
  queryTerms: string[];
  expandedDocId: string | null;
  onToggleExpand: (docId: string) => void;
  hoveredTerm: string | null;
  onHoverTerm: (term: string | null) => void;
  N: number;
}

export function RankingsPanel({
  rankedDocuments,
  queryTerms,
  expandedDocId,
  onToggleExpand,
  hoveredTerm,
  onHoverTerm,
  N,
}: RankingsPanelProps) {
  if (queryTerms.length === 0) {
    return (
      <section>
        <SectionLabel number={3} title="Document Rankings" />
        <p className="text-sm text-muted-foreground">
          Enter a query to see document rankings.
        </p>
      </section>
    );
  }

  return (
    <section>
      <SectionLabel number={3} title="Document Rankings" />
      <div className="space-y-3">
        {rankedDocuments.map((doc, i) => (
          <DocumentCard
            key={doc.id}
            doc={doc}
            rank={i + 1}
            queryTerms={queryTerms}
            expanded={expandedDocId === doc.id}
            onToggleExpand={() => onToggleExpand(doc.id)}
            hoveredTerm={hoveredTerm}
            onHoverTerm={onHoverTerm}
            N={N}
          />
        ))}
      </div>
    </section>
  );
}
