"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface QueryInputProps {
  query: string;
  onChange: (query: string) => void;
}

export function QueryInput({ query, onChange }: QueryInputProps) {
  return (
    <div>
      <Label htmlFor="query" className="text-sm font-medium mb-1.5 block">
        Search Query
      </Label>
      <div className="relative">
        <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id="query"
          value={query}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter search query..."
          className="pl-9 text-sm"
        />
      </div>
    </div>
  );
}
