"use client";

import { Card, CardContent } from "@/components/ui/card";
import { SectionLabel } from "@/components/shared/section-label";
import { DocumentList } from "./document-list";
import { QueryInput } from "./query-input";
import { HyperparameterControls } from "./hyperparameter-controls";
import type { Document } from "@/lib/types";

interface InputPanelProps {
  documents: Document[];
  query: string;
  k1: number;
  b: number;
  onDocumentUpdate: (id: string, text: string) => void;
  onDocumentRemove: (id: string) => void;
  onDocumentAdd: () => void;
  onQueryChange: (query: string) => void;
  onK1Change: (k1: number) => void;
  onBChange: (b: number) => void;
}

export function InputPanel({
  documents,
  query,
  k1,
  b,
  onDocumentUpdate,
  onDocumentRemove,
  onDocumentAdd,
  onQueryChange,
  onK1Change,
  onBChange,
}: InputPanelProps) {
  return (
    <section>
      <SectionLabel number={1} title="Input" />
      <Card>
        <CardContent className="space-y-6 pt-6">
          <div>
            <h3 className="text-sm font-medium mb-3">Documents</h3>
            <DocumentList
              documents={documents}
              onUpdate={onDocumentUpdate}
              onRemove={onDocumentRemove}
              onAdd={onDocumentAdd}
            />
          </div>
          <QueryInput query={query} onChange={onQueryChange} />
          <div>
            <h3 className="text-sm font-medium mb-3">Hyperparameters</h3>
            <HyperparameterControls
              k1={k1}
              b={b}
              onK1Change={onK1Change}
              onBChange={onBChange}
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
