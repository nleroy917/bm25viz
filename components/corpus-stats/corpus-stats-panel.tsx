"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "@/components/shared/section-label";
import { StatCard } from "./stat-card";
import { IDFExplorer } from "./idf-explorer";
import { COLORS } from "@/lib/colors";
import type { TermStats } from "@/lib/types";

interface CorpusStatsPanelProps {
  N: number;
  avgdl: number;
  termStats: TermStats[];
  selectedIdfTerm: string | null;
  onSelectIdfTerm: (term: string) => void;
  onHoverTerm: (term: string | null) => void;
}

export function CorpusStatsPanel({
  N,
  avgdl,
  termStats,
  selectedIdfTerm,
  onSelectIdfTerm,
  onHoverTerm,
}: CorpusStatsPanelProps) {
  return (
    <section>
      <SectionLabel number={2} title="Corpus Statistics" />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3 text-center">
          <StatCard
            label="Total Documents (N)"
            value={N}
            colorType="idf"
          />
          <StatCard
            label="Avg Document Length (avgdl)"
            value={avgdl.toFixed(1)}
            detail={`= total words / ${N} docs`}
            colorType="docLen"
          />
        </div>

        <Card>
          <CardContent className="pt-2 pb-4">
            <h3 className="text-xl font-bold mb-3">IDF Explorer</h3>
            <IDFExplorer
              termStats={termStats}
              selectedTerm={selectedIdfTerm}
              onSelectTerm={onSelectIdfTerm}
              N={N}
              onHoverTerm={onHoverTerm}
            />
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-5 pb-4">
            <h3 className="text-sm font-medium mb-3">Color Legend</h3>
            <div className="flex flex-wrap gap-2">
              {(["tf", "idf", "docLen"] as const).map((type) => (
                <span
                  key={type}
                  className={`inline-flex items-center text-xs px-2.5 py-1 rounded-full font-medium ${COLORS[type].badge}`}
                >
                  {COLORS[type].label}
                </span>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
