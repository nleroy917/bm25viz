"use client";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface DocumentEditorProps {
  index: number;
  text: string;
  onChange: (text: string) => void;
  onRemove: () => void;
  canRemove: boolean;
}

export function DocumentEditor({ index, text, onChange, onRemove, canRemove }: DocumentEditorProps) {
  return (
    <div className="relative group">
      <label className="text-xs font-medium text-muted-foreground mb-1 block">
        Document {index + 1}
      </label>
      <Textarea
        value={text}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Enter document ${index + 1} text...`}
        className="min-h-[60px] resize-none text-sm"
        rows={2}
      />
      {canRemove && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-0 right-0 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={onRemove}
        >
          <X className="h-3 w-3" />
        </Button>
      )}
    </div>
  );
}
