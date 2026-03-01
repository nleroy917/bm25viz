"use client";

import { useState, useCallback } from "react";
import { useBM25 } from "@/hooks/use-bm25";
import { InputPanel } from "./input-panel/input-panel";
import { CorpusStatsPanel } from "./corpus-stats/corpus-stats-panel";
import { RankingsPanel } from "./document-rankings/rankings-panel";
import type { Document } from "@/lib/types";

const DEFAULT_DOCUMENTS: Document[] = [
  {
    id: "1",
    text: "The quick brown fox jumps over the lazy dog in the sunny meadow",
  },
  {
    id: "2",
    text: "A fast fox runs through the forest chasing a rabbit through the dense trees",
  },
  {
    id: "3",
    text: "The lazy dog sleeps all day long by the warm fireplace and never chases anything",
  },
  {
    id: "4",
    text: "Foxes and dogs are both popular animals but foxes are much harder to domesticate",
  },
];

const DEFAULT_QUERY = "quick fox";

let nextId = 5;

export function BM25Visualizer() {
  // Input state
  const [documents, setDocuments] = useState<Document[]>(DEFAULT_DOCUMENTS);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [k1, setK1] = useState(1.2);
  const [b, setB] = useState(0.75);

  // UI state
  const [hoveredTerm, setHoveredTerm] = useState<string | null>(null);
  const [expandedDocId, setExpandedDocId] = useState<string | null>(null);
  const [selectedIdfTerm, setSelectedIdfTerm] = useState<string | null>(null);

  // Computed BM25 state
  const bm25 = useBM25(documents, query, k1, b);

  // Auto-select first IDF term when query changes
  if (bm25.queryTerms.length > 0 && !bm25.queryTerms.includes(selectedIdfTerm ?? "")) {
    // We'll handle this in a useEffect-like manner via the render
    // For simplicity, compute inline
  }

  const effectiveIdfTerm =
    selectedIdfTerm && bm25.queryTerms.includes(selectedIdfTerm)
      ? selectedIdfTerm
      : bm25.queryTerms[0] ?? null;

  // Document handlers
  const handleDocumentUpdate = useCallback((id: string, text: string) => {
    setDocuments((prev) => prev.map((d) => (d.id === id ? { ...d, text } : d)));
  }, []);

  const handleDocumentRemove = useCallback((id: string) => {
    setDocuments((prev) => prev.filter((d) => d.id !== id));
  }, []);

  const handleDocumentAdd = useCallback(() => {
    setDocuments((prev) => [...prev, { id: String(nextId++), text: "" }]);
  }, []);

  const handleToggleExpand = useCallback((docId: string) => {
    setExpandedDocId((prev) => (prev === docId ? null : docId));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <div className="flex flex-row items-start">
          <a href="/" className="text-sm">
          {'<-'}  nathanleroy.dev
          </a>
        </div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          BM25 Ranking Visualizer
        </h1>
        <p className="text-muted-foreground">
          Explore how term frequency, document frequency, and document length
          normalization interact in BM25 scoring.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <InputPanel
          documents={documents}
          query={query}
          k1={k1}
          b={b}
          onDocumentUpdate={handleDocumentUpdate}
          onDocumentRemove={handleDocumentRemove}
          onDocumentAdd={handleDocumentAdd}
          onQueryChange={setQuery}
          onK1Change={setK1}
          onBChange={setB}
        />

        <CorpusStatsPanel
          N={bm25.N}
          avgdl={bm25.avgdl}
          termStats={bm25.termStats}
          selectedIdfTerm={effectiveIdfTerm}
          onSelectIdfTerm={setSelectedIdfTerm}
          onHoverTerm={setHoveredTerm}
        />
      </div>

      <div className="mt-8">
        <RankingsPanel
          rankedDocuments={bm25.rankedDocuments}
          queryTerms={bm25.queryTerms}
          expandedDocId={expandedDocId}
          onToggleExpand={handleToggleExpand}
          hoveredTerm={hoveredTerm}
          onHoverTerm={setHoveredTerm}
          N={bm25.N}
        />
      </div>
    </div>
  );
}
