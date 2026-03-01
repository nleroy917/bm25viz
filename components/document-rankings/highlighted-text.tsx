"use client";

interface HighlightedTextProps {
  text: string;
  queryTerms: string[];
  hoveredTerm: string | null;
}

export function HighlightedText({ text, queryTerms, hoveredTerm }: HighlightedTextProps) {
  if (queryTerms.length === 0) {
    return <span>{text}</span>;
  }

  // Build regex from query terms
  const escaped = queryTerms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const pattern = new RegExp(`\\b(${escaped.join("|")})\\b`, "gi");

  const parts: { text: string; isMatch: boolean; matchTerm: string | null }[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), isMatch: false, matchTerm: null });
    }
    parts.push({ text: match[0], isMatch: true, matchTerm: match[1].toLowerCase() });
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isMatch: false, matchTerm: null });
  }

  return (
    <span>
      {parts.map((part, i) => {
        if (!part.isMatch) return <span key={i}>{part.text}</span>;
        const isHovered = hoveredTerm === null || hoveredTerm === part.matchTerm;
        return (
          <mark
            key={i}
            className={`rounded px-0.5 transition-all ${
              isHovered
                ? "bg-yellow-200 text-yellow-900"
                : "bg-yellow-100/50 text-yellow-800/50"
            }`}
          >
            {part.text}
          </mark>
        );
      })}
    </span>
  );
}
