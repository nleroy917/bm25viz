"use client";

import { KaTeXInline } from "@/components/shared/katex-inline";
import { ComponentIndicator } from "@/components/shared/component-indicator";
import { COLORS } from "@/lib/colors";
import type { TermScore } from "@/lib/types";

interface ScoreBreakdownProps {
  termScores: TermScore[];
  totalScore: number;
  N: number;
  onHoverTerm: (term: string | null) => void;
}

export function ScoreBreakdown({ termScores, totalScore, N, onHoverTerm }: ScoreBreakdownProps) {
  const nonZeroScores = termScores.filter((ts) => ts.score > 0);
  const zeroScores = termScores.filter((ts) => ts.score === 0);

  // Sum formula
  const sumParts = termScores.map((ts) => ts.score.toFixed(3)).join(" + ");

  return (
    <div className="space-y-4 mt-3 pt-3 border-t">
      {/* Sum formula with term chips */}
      <div className="flex items-start justify-center gap-1 flex-wrap py-1">
        <span className="text-lg pt-1">
          <KaTeXInline math="\text{score} =" />
        </span>
        {termScores.map((ts, i) => (
          <span key={ts.term} className="flex items-start gap-1">
            {i > 0 && <span className="text-lg pt-1"><KaTeXInline math="+" /></span>}
            <span
              className="flex flex-col items-center"
              onMouseEnter={() => onHoverTerm(ts.term)}
              onMouseLeave={() => onHoverTerm(null)}
            >
              <span className="text-lg">
                <KaTeXInline math={ts.score.toFixed(3)} />
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground font-medium leading-none">
                {ts.term}
              </span>
            </span>
          </span>
        ))}
        <span className="text-lg pt-1">
          <KaTeXInline math={`= ${totalScore.toFixed(3)}`} />
        </span>
      </div>

      {/* Per-term breakdowns */}
      {nonZeroScores.map((ts) => (
        <TermScoreCard key={ts.term} ts={ts} N={N} onHoverTerm={onHoverTerm} />
      ))}

      {zeroScores.length > 0 && (
        <p className="text-xs text-muted-foreground">
          Terms with zero score (not in this doc):{" "}
          {zeroScores.map((ts) => `"${ts.term}"`).join(", ")}
        </p>
      )}
    </div>
  );
}

function TermScoreCard({
  ts,
  N,
  onHoverTerm,
}: {
  ts: TermScore;
  N: number;
  onHoverTerm: (term: string | null) => void;
}) {
  const avgTf = ts.avgdl > 0 ? ts.tf / (ts.docLen / ts.avgdl) : ts.tf;
  const tfComparison = avgTf > 1 ? "above average" : "below average";

  const idfDescription =
    ts.idf > 1.5
      ? "rare — high discriminating power"
      : ts.idf > 0.5
        ? "moderately common"
        : "very common — low discriminating power";

  const lenComparison =
    ts.docLen > ts.avgdl ? "longer than average" : ts.docLen < ts.avgdl ? "shorter than average" : "exactly average length";

  return (
    <div
      className="rounded-lg border p-3 space-y-3"
      onMouseEnter={() => onHoverTerm(ts.term)}
      onMouseLeave={() => onHoverTerm(null)}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">&ldquo;{ts.term}&rdquo;</span>
        <span className="text-xs text-muted-foreground">score = {ts.score.toFixed(3)}</span>
      </div>

      {/* BM25 formula with substituted values */}
      <div className="py-1">
        <KaTeXInline
          math={`\\textcolor{${COLORS.idf.hex}}{\\text{IDF}} \\cdot \\frac{\\textcolor{${COLORS.tf.hex}}{tf} \\cdot (k_1 + 1)}{\\textcolor{${COLORS.tf.hex}}{tf} + k_1 \\cdot \\textcolor{${COLORS.docLen.hex}}{(1 - b + b \\cdot \\frac{|D|}{\\text{avgdl}})}}`}
          display
        />
      </div>
      <div className="py-1">
        <KaTeXInline
          math={`= \\textcolor{${COLORS.idf.hex}}{${ts.idf.toFixed(3)}} \\cdot \\frac{\\textcolor{${COLORS.tf.hex}}{${ts.tf}} \\cdot (${ts.k1} + 1)}{\\textcolor{${COLORS.tf.hex}}{${ts.tf}} + ${ts.k1} \\cdot \\textcolor{${COLORS.docLen.hex}}{(1 - ${ts.b} + ${ts.b} \\cdot \\frac{${ts.docLen}}{${ts.avgdl.toFixed(1)}})}} = ${ts.score.toFixed(3)}`}
          display
        />
      </div>

      {/* Component indicators */}
      <div className="space-y-2">
        <ComponentIndicator
          type="tf"
          description={`Appears ${ts.tf} time${ts.tf !== 1 ? "s" : ""} — ${tfComparison}`}
        />
        <ComponentIndicator
          type="idf"
          description={`IDF = ${ts.idf.toFixed(3)} — ${idfDescription}`}
        />
        <ComponentIndicator
          type="docLen"
          description={`${ts.docLen} words vs avg ${ts.avgdl.toFixed(1)} — ${lenComparison}`}
        />
      </div>
    </div>
  );
}
