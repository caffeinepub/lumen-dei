import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { FrameType } from "../../types/canvas";

interface FrameDef {
  type: FrameType;
  label: string;
}

const FRAMES: FrameDef[] = [
  { type: "none", label: "None" },
  { type: "thin", label: "Thin Border" },
  { type: "double", label: "Double" },
  { type: "corners", label: "Corners" },
  { type: "film", label: "Film Strip" },
  { type: "vignette", label: "Vignette" },
  { type: "orange", label: "Orange" },
  { type: "coral-frame", label: "Coral" },
  { type: "mint-frame", label: "Mint" },
  { type: "sky-blue", label: "Sky Blue" },
  { type: "lilac-frame", label: "Lilac" },
  { type: "soft-yellow", label: "Yellow" },
  { type: "terracotta", label: "Terracotta" },
  { type: "blush-frame", label: "Blush" },
  { type: "emerald-frame", label: "Emerald" },
  { type: "slate-frame", label: "Slate" },
];

function FramePreview({ type }: { type: FrameType }) {
  if (type === "none") {
    return (
      <div className="w-full h-full bg-cream/50 flex items-center justify-center">
        <span className="font-ui text-[8px] text-mid-gray">—</span>
      </div>
    );
  }
  if (type === "thin") {
    return (
      <div className="w-full h-full bg-cream flex items-center justify-center p-1.5">
        <div className="w-full h-full border border-ink/50" />
      </div>
    );
  }
  if (type === "double") {
    return (
      <div className="w-full h-full bg-cream flex items-center justify-center p-1">
        <div className="w-full h-full border border-ink/40 flex items-center justify-center p-0.5">
          <div className="w-full h-full border border-ink/25" />
        </div>
      </div>
    );
  }
  if (type === "corners") {
    return (
      <div className="w-full h-full bg-cream relative p-1.5">
        <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-ink/60" />
        <div className="absolute top-1.5 right-1.5 w-3 h-3 border-t border-r border-ink/60" />
        <div className="absolute bottom-1.5 left-1.5 w-3 h-3 border-b border-l border-ink/60" />
        <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-ink/60" />
      </div>
    );
  }
  if (type === "film") {
    return (
      <div className="w-full h-full bg-ink flex">
        <div className="w-3 flex flex-col justify-around items-center py-0.5">
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
        </div>
        <div className="flex-1 bg-dark-gray/80" />
        <div className="w-3 flex flex-col justify-around items-center py-0.5">
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
        </div>
      </div>
    );
  }
  if (type === "vignette") {
    return (
      <div
        className="w-full h-full"
        style={{
          background:
            "radial-gradient(circle, oklch(0.955 0.012 85) 40%, oklch(0.08 0.003 60) 100%)",
        }}
      />
    );
  }
  if (type === "orange") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#FF8C42" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "coral-frame") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#F4A261" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "mint-frame") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#A8E6CF" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "sky-blue") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#87CEEB" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "lilac-frame") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#C8A8E0" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "soft-yellow") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#FFE066" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "terracotta") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#C67C52" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "blush-frame") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#F8BBD9" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "emerald-frame") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#4CAF82" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  if (type === "slate-frame") {
    return (
      <div
        className="w-full h-full flex items-center justify-center p-1"
        style={{ background: "#7B8FA6" }}
      >
        <div className="w-full h-full border border-white/40 opacity-70" />
      </div>
    );
  }
  return null;
}

interface FrameSelectorProps {
  current: FrameType;
  onChange: (f: FrameType) => void;
}

export function FrameSelector({ current, onChange }: FrameSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-warm-gray/30">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-parchment/40 transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className="font-ui text-[9px] tracking-editorial text-mid-gray uppercase">
            Frame
          </span>
          {current !== "none" && (
            <span className="font-ui text-[8px] text-ink/50 capitalize">
              {FRAMES.find((f) => f.type === current)?.label}
            </span>
          )}
        </div>
        {isOpen ? (
          <ChevronUp size={12} className="text-mid-gray" />
        ) : (
          <ChevronDown size={12} className="text-mid-gray" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 grid grid-cols-3 gap-2">
              {FRAMES.map((frame) => (
                <button
                  key={frame.type}
                  type="button"
                  onClick={() => onChange(frame.type)}
                  className={`flex flex-col items-center gap-1 group transition-all ${
                    current === frame.type
                      ? "opacity-100"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  <div
                    className={`w-full aspect-square overflow-hidden transition-all ${
                      current === frame.type
                        ? "ring-2 ring-ink ring-offset-1"
                        : "ring-1 ring-warm-gray/40 group-hover:ring-ink/30"
                    }`}
                  >
                    <FramePreview type={frame.type} />
                  </div>
                  <span
                    className={`font-ui text-[8px] tracking-wide ${
                      current === frame.type ? "text-ink" : "text-mid-gray"
                    }`}
                  >
                    {frame.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
