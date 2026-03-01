import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { Adjustments } from "../../types/canvas";
import { DEFAULT_ADJUSTMENTS } from "../../types/canvas";

interface AdjustmentSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
}

function AdjustmentSlider({ label, value, onChange }: AdjustmentSliderProps) {
  const deviation = value - 100;
  return (
    <div className="flex items-center gap-3">
      <span className="font-ui text-[10px] tracking-wide text-mid-gray w-20 flex-shrink-0 uppercase">
        {label}
      </span>
      <div className="flex-1 relative">
        <input
          type="range"
          min={0}
          max={200}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full"
          style={{ width: "100%" }}
        />
      </div>
      <span
        className={`font-ui text-[10px] w-9 text-right flex-shrink-0 tabular-nums ${
          deviation === 0
            ? "text-mid-gray"
            : deviation > 0
              ? "text-ink"
              : "text-ink/60"
        }`}
      >
        {deviation > 0 ? "+" : ""}
        {deviation}
      </span>
    </div>
  );
}

interface AdjustmentsPanelProps {
  adjustments: Adjustments;
  onChange: (key: keyof Adjustments, value: number) => void;
  onReset: () => void;
}

export function AdjustmentsPanel({
  adjustments,
  onChange,
  onReset,
}: AdjustmentsPanelProps) {
  const [isOpen, setIsOpen] = useState(true);

  const hasChanges = Object.entries(adjustments).some(
    ([k, v]) => v !== DEFAULT_ADJUSTMENTS[k as keyof Adjustments],
  );

  const sliders: { key: keyof Adjustments; label: string }[] = [
    { key: "brightness", label: "Brightness" },
    { key: "contrast", label: "Contrast" },
    { key: "saturation", label: "Saturation" },
    { key: "exposure", label: "Exposure" },
    { key: "shadows", label: "Shadows" },
    { key: "highlights", label: "Highlights" },
  ];

  return (
    <div className="border-t border-warm-gray/30">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-parchment/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-ui text-[9px] tracking-editorial text-mid-gray uppercase">
            Adjustments
          </span>
          {hasChanges && (
            <span className="w-1.5 h-1.5 rounded-full bg-ink/50" />
          )}
        </div>
        <div className="flex items-center gap-2">
          {hasChanges && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onReset();
              }}
              className="text-mid-gray hover:text-ink transition-colors"
              title="Reset adjustments"
            >
              <RotateCcw size={10} />
            </button>
          )}
          {isOpen ? (
            <ChevronUp size={12} className="text-mid-gray" />
          ) : (
            <ChevronDown size={12} className="text-mid-gray" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {sliders.map((s) => (
                <AdjustmentSlider
                  key={s.key}
                  label={s.label}
                  value={adjustments[s.key]}
                  onChange={(v) => onChange(s.key, v)}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
