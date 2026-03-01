import { useMemo } from "react";
import { computeBM25 } from "@/lib/bm25";
import type { Document, BM25State } from "@/lib/types";

export function useBM25(
  documents: Document[],
  query: string,
  k1: number,
  b: number
): BM25State {
  return useMemo(
    () => computeBM25(documents, query, k1, b),
    [documents, query, k1, b]
  );
}
