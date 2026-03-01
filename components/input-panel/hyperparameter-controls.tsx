"use client";

import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

interface HyperparameterControlsProps {
  k1: number;
  b: number;
  onK1Change: (k1: number) => void;
  onBChange: (b: number) => void;
}

function getK1Annotation(k1: number): string {
  if (k1 < 0.5) return "Very low: term frequency has minimal impact on scoring";
  if (k1 < 1.0) return "Low: diminishing returns on repeated terms kick in quickly";
  if (k1 <= 1.5) return "Typical range: balanced term frequency saturation";
  if (k1 <= 2.0) return "High: repeated terms continue to boost scores";
  return "Very high: term frequency dominates scoring heavily";
}

function getBAnnotation(b: number): string {
  if (b < 0.1) return "Near zero: document length is not penalized at all";
  if (b < 0.4) return "Low: minimal length normalization — longer docs have an advantage";
  if (b <= 0.8) return "Typical range: moderate length normalization";
  if (b < 1.0) return "High: strong penalty for longer documents";
  return "Maximum: full length normalization — long documents heavily penalized";
}

export function HyperparameterControls({
  k1,
  b,
  onK1Change,
  onBChange,
}: HyperparameterControlsProps) {
  return (
    <div className="space-y-5">
      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">
            k<sub>1</sub> = {k1.toFixed(2)}
          </Label>
          <span className="text-xs text-muted-foreground">Term frequency saturation</span>
        </div>
        <Slider
          value={[k1]}
          onValueChange={([v]) => onK1Change(v)}
          min={0}
          max={3}
          step={0.05}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground mt-1.5">{getK1Annotation(k1)}</p>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <Label className="text-sm font-medium">
            b = {b.toFixed(2)}
          </Label>
          <span className="text-xs text-muted-foreground">Length normalization</span>
        </div>
        <Slider
          value={[b]}
          onValueChange={([v]) => onBChange(v)}
          min={0}
          max={1}
          step={0.05}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground mt-1.5">{getBAnnotation(b)}</p>
      </div>
    </div>
  );
}
