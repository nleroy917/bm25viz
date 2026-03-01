export interface Document {
  id: string;
  text: string;
}

export interface TermStats {
  term: string;
  df: number; // document frequency
  idf: number;
  explanation: string;
}

export interface TermScore {
  term: string;
  tf: number;
  idf: number;
  score: number;
  // For formula display
  k1: number;
  b: number;
  docLen: number;
  avgdl: number;
}

export interface RankedDocument {
  id: string;
  text: string;
  tokens: string[];
  docLen: number;
  totalScore: number;
  termScores: TermScore[];
}

export interface BM25State {
  N: number;
  avgdl: number;
  queryTerms: string[];
  termStats: TermStats[];
  rankedDocuments: RankedDocument[];
}
