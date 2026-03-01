"use client";

import { DocumentEditor } from "./document-editor";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { Document } from "@/lib/types";

interface DocumentListProps {
  documents: Document[];
  onUpdate: (id: string, text: string) => void;
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export function DocumentList({ documents, onUpdate, onRemove, onAdd }: DocumentListProps) {
  return (
    <div className="space-y-3">
      {documents.map((doc, i) => (
        <DocumentEditor
          key={doc.id}
          index={i}
          text={doc.text}
          onChange={(text) => onUpdate(doc.id, text)}
          onRemove={() => onRemove(doc.id)}
          canRemove={documents.length > 1}
        />
      ))}
      {documents.length < 8 && (
        <Button variant="outline" size="sm" onClick={onAdd} className="w-full">
          <Plus className="h-3 w-3 mr-1" />
          Add Document
        </Button>
      )}
    </div>
  );
}
