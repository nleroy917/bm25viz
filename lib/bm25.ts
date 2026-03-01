import { tokenize } from "./tokenizer";
import type { BM25State, TermStats, TermScore, RankedDocument, Document } from "./types";

export function computeIDF(N: number, df: number): number {
  return Math.log((N - df + 0.5) / (df + 0.5) + 1);
}

export function computeTermScore(
  tf: number,
  idf: number,
  k1: number,
  b: number,
  docLen: number,
  avgdl: number
): number {
  const numerator = tf * (k1 + 1);
  const denominator = tf + k1 * (1 - b + b * (docLen / avgdl));
  return idf * (numerator / denominator);
}

export function generateIDFExplanation(
  term: string,
  df: number,
  N: number,
  idf: number
): string {
  if (df === 0) {
    return `"${term}" does not appear in any document, so it has no IDF contribution.`;
  }
  const ratio = df / N;
  let rarity: string;
  if (ratio <= 0.25) rarity = "rare";
  else if (ratio <= 0.5) rarity = "moderately common";
  else if (ratio <= 0.75) rarity = "common";
  else rarity = "very common";

  return `"${term}" appears in ${df} of ${N} document${N !== 1 ? "s" : ""} (${rarity}). IDF = ${idf.toFixed(3)}: ${
    idf > 1 ? "high weight — discriminating term" : "lower weight — less discriminating"
  }.`;
}

export function computeBM25(
  documents: Document[],
  query: string,
  k1: number,
  b: number
): BM25State {
  const queryTerms = [...new Set(tokenize(query))];
  const N = documents.length;

  // Tokenize all documents
  const docTokens = documents.map((doc) => tokenize(doc.text));
  const docLengths = docTokens.map((tokens) => tokens.length);
  const avgdl = N > 0 ? docLengths.reduce((a, b) => a + b, 0) / N : 0;

  // Compute document frequency for each query term
  const dfMap = new Map<string, number>();
  for (const term of queryTerms) {
    let df = 0;
    for (const tokens of docTokens) {
      if (tokens.includes(term)) df++;
    }
    dfMap.set(term, df);
  }

  // Compute term stats (IDF explorer data)
  const termStats: TermStats[] = queryTerms.map((term) => {
    const df = dfMap.get(term) ?? 0;
    const idf = computeIDF(N, df);
    return {
      term,
      df,
      idf,
      explanation: generateIDFExplanation(term, df, N, idf),
    };
  });

  // Compute per-document scores
  const rankedDocuments: RankedDocument[] = documents.map((doc, i) => {
    const tokens = docTokens[i];
    const docLen = docLengths[i];

    const termScores: TermScore[] = queryTerms.map((term) => {
      const tf = tokens.filter((t) => t === term).length;
      const df = dfMap.get(term) ?? 0;
      const idf = computeIDF(N, df);
      const score = tf > 0 ? computeTermScore(tf, idf, k1, b, docLen, avgdl) : 0;

      return { term, tf, idf, score, k1, b, docLen, avgdl };
    });

    const totalScore = termScores.reduce((sum, ts) => sum + ts.score, 0);

    return {
      id: doc.id,
      text: doc.text,
      tokens,
      docLen,
      totalScore,
      termScores,
    };
  });

  // Sort by score descending
  rankedDocuments.sort((a, b) => b.totalScore - a.totalScore);

  return { N, avgdl, queryTerms, termStats, rankedDocuments };
}
