import { ChevronDown, ChevronUp } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { StickerType } from "../../types/canvas";

interface StickerDef {
  type: StickerType;
  label: string;
}

const STICKERS: StickerDef[] = [
  { type: "star", label: "Star" },
  { type: "crescent", label: "Moon" },
  { type: "dots", label: "Dots" },
  { type: "divider", label: "Divider" },
  { type: "diamond", label: "Diamond" },
  { type: "bow", label: "Bow" },
  { type: "ribbon", label: "Ribbon" },
  { type: "flower", label: "Flower" },
  { type: "butterfly", label: "Butterfly" },
  { type: "heart", label: "Heart" },
  { type: "sparkle", label: "Sparkle" },
  { type: "cherry", label: "Cherry" },
  { type: "crown", label: "Crown" },
  { type: "leaf", label: "Leaf" },
  { type: "pearl", label: "Pearl" },
  { type: "cloud", label: "Cloud" },
  { type: "music-note", label: "Music" },
  { type: "bunny", label: "Bunny" },
  { type: "lace-corner", label: "Lace" },
  { type: "shooting-star", label: "Shoot★" },
];

function StickerIcon({ type }: { type: StickerType }) {
  if (type === "star") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (type === "crescent") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  if (type === "dots") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx={4} cy={4} r={1.5} />
        <circle cx={12} cy={4} r={1.5} />
        <circle cx={20} cy={4} r={1.5} />
        <circle cx={4} cy={12} r={1.5} />
        <circle cx={12} cy={12} r={1.5} />
        <circle cx={20} cy={12} r={1.5} />
        <circle cx={4} cy={20} r={1.5} />
        <circle cx={12} cy={20} r={1.5} />
        <circle cx={20} cy={20} r={1.5} />
      </svg>
    );
  }
  if (type === "divider") {
    return (
      <svg
        width="20"
        height="8"
        viewBox="0 0 24 8"
        stroke="currentColor"
        strokeWidth={0.8}
        fill="none"
        aria-hidden="true"
      >
        <line x1={0} y1={4} x2={24} y2={4} />
        <circle cx={12} cy={4} r={1.5} fill="currentColor" />
      </svg>
    );
  }
  if (type === "diamond") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2L22 12 12 22 2 12z" />
      </svg>
    );
  }
  if (type === "bow") {
    return (
      <svg
        width="22"
        height="16"
        viewBox="0 0 44 28"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Left loop */}
        <ellipse cx="11" cy="14" rx="10" ry="7" opacity="0.9" />
        {/* Right loop */}
        <ellipse cx="33" cy="14" rx="10" ry="7" opacity="0.9" />
        {/* Knot center */}
        <ellipse cx="22" cy="14" rx="4" ry="4" />
        {/* Tail left */}
        <path
          d="M18 14 Q10 22 5 26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        {/* Tail right */}
        <path
          d="M26 14 Q34 22 39 26"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    );
  }
  if (type === "ribbon") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        <path d="M12 2 C8 6 4 8 2 12 C4 16 8 18 12 22 C16 18 20 16 22 12 C20 8 16 6 12 2z" />
        <path
          d="M12 7 C10 9 8 10 7 12 C8 14 10 15 12 17 C14 15 16 14 17 12 C16 10 14 9 12 7z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
    );
  }
  if (type === "flower") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="3" />
        <ellipse cx="12" cy="5" rx="2.5" ry="4" />
        <ellipse cx="12" cy="19" rx="2.5" ry="4" />
        <ellipse cx="5" cy="12" rx="4" ry="2.5" />
        <ellipse cx="19" cy="12" rx="4" ry="2.5" />
        <ellipse
          cx="7.2"
          cy="7.2"
          rx="2.5"
          ry="4"
          transform="rotate(-45 7.2 7.2)"
        />
        <ellipse
          cx="16.8"
          cy="16.8"
          rx="2.5"
          ry="4"
          transform="rotate(-45 16.8 16.8)"
        />
        <ellipse
          cx="16.8"
          cy="7.2"
          rx="2.5"
          ry="4"
          transform="rotate(45 16.8 7.2)"
        />
        <ellipse
          cx="7.2"
          cy="16.8"
          rx="2.5"
          ry="4"
          transform="rotate(45 7.2 16.8)"
        />
      </svg>
    );
  }
  if (type === "butterfly") {
    return (
      <svg
        width="22"
        height="16"
        viewBox="0 0 44 32"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Left wings */}
        <ellipse cx="12" cy="10" rx="11" ry="8" opacity="0.85" />
        <ellipse cx="10" cy="22" rx="9" ry="6" opacity="0.65" />
        {/* Right wings */}
        <ellipse cx="32" cy="10" rx="11" ry="8" opacity="0.85" />
        <ellipse cx="34" cy="22" rx="9" ry="6" opacity="0.65" />
        {/* Body */}
        <ellipse cx="22" cy="16" rx="2" ry="9" />
        {/* Antennae */}
        <line
          x1="20"
          y1="7"
          x2="14"
          y2="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <line
          x1="24"
          y1="7"
          x2="30"
          y2="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="13" cy="2" r="1.5" />
        <circle cx="31" cy="2" r="1.5" />
      </svg>
    );
  }
  if (type === "heart") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    );
  }
  if (type === "sparkle") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12 2 L13.5 9 L20 12 L13.5 15 L12 22 L10.5 15 L4 12 L10.5 9 Z" />
        <path d="M5 5 L5.8 7.8 L8 8.5 L5.8 9.2 L5 12 L4.2 9.2 L2 8.5 L4.2 7.8 Z" />
        <path d="M19 16 L19.6 18 L21 18.5 L19.6 19 L19 21 L18.4 19 L17 18.5 L18.4 18 Z" />
      </svg>
    );
  }
  if (type === "cherry") {
    return (
      <svg
        width="20"
        height="22"
        viewBox="0 0 24 26"
        fill="currentColor"
        aria-hidden="true"
      >
        {/* Stems */}
        <path
          d="M8 12 Q12 4 16 4 Q18 4 16 12"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M16 4 Q20 0 22 4"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="none"
        />
        {/* Left cherry */}
        <circle cx="8" cy="16" r="4" />
        {/* Right cherry */}
        <circle cx="17" cy="16" r="4" />
        {/* Highlights */}
        <circle cx="6.5" cy="14.5" r="1.2" fill="white" opacity="0.5" />
        <circle cx="15.5" cy="14.5" r="1.2" fill="white" opacity="0.5" />
      </svg>
    );
  }
  if (type === "crown") {
    return (
      <svg
        width="22"
        height="18"
        viewBox="0 0 44 34"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M4 30 L4 16 L12 22 L22 6 L32 22 L40 16 L40 30 Z" />
        <rect x="4" y="28" width="36" height="4" rx="1" />
        {/* Jewels */}
        <circle cx="22" cy="20" r="3" fill="white" opacity="0.6" />
        <circle cx="13" cy="25" r="2" fill="white" opacity="0.4" />
        <circle cx="31" cy="25" r="2" fill="white" opacity="0.4" />
      </svg>
    );
  }
  if (type === "leaf") {
    return (
      <svg
        width="18"
        height="22"
        viewBox="0 0 18 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M9 2 C5 4 2 8 2 13 C2 18 5 22 9 22 C13 22 16 18 16 13 C16 8 13 4 9 2z"
          opacity="0.9"
        />
        <line
          x1="9"
          y1="22"
          x2="9"
          y2="6"
          stroke="white"
          strokeWidth="1"
          opacity="0.5"
        />
        <line
          x1="9"
          y1="14"
          x2="5"
          y2="10"
          stroke="white"
          strokeWidth="0.8"
          opacity="0.4"
        />
        <line
          x1="9"
          y1="14"
          x2="13"
          y2="10"
          stroke="white"
          strokeWidth="0.8"
          opacity="0.4"
        />
      </svg>
    );
  }
  if (type === "pearl") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="8" cy="8" r="3" fill="white" opacity="0.45" />
        <circle cx="7" cy="7" r="1.5" fill="white" opacity="0.7" />
      </svg>
    );
  }
  if (type === "cloud") {
    return (
      <svg
        width="24"
        height="16"
        viewBox="0 0 32 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M6 16 Q2 16 2 12 Q2 8 6 8 Q6 4 10 4 Q13 4 14 7 Q16 4 20 4 Q25 4 25 9 Q28 9 28 13 Q28 16 24 16 Z" />
      </svg>
    );
  }
  if (type === "music-note") {
    return (
      <svg
        width="18"
        height="22"
        viewBox="0 0 18 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          d="M6 18 C6 20.2 4.2 22 2 22 C-0.2 22 -2 20.2 -2 18 C-2 15.8 -0.2 14 2 14 C4.2 14 6 15.8 6 18z"
          transform="translate(4 0)"
        />
        <rect x="8" y="0" width="2" height="18" />
        <path d="M10 0 L18 3 L18 7 L10 4 Z" />
      </svg>
    );
  }
  if (type === "bunny") {
    return (
      <svg
        width="20"
        height="24"
        viewBox="0 0 24 28"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        aria-hidden="true"
      >
        {/* Left ear */}
        <ellipse cx="9" cy="6" rx="3" ry="6" />
        {/* Right ear */}
        <ellipse cx="15" cy="6" rx="3" ry="6" />
        {/* Head */}
        <circle
          cx="12"
          cy="16"
          r="7"
          fill="currentColor"
          opacity="0.15"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        {/* Eyes */}
        <circle cx="9.5" cy="15" r="1.2" fill="currentColor" />
        <circle cx="14.5" cy="15" r="1.2" fill="currentColor" />
        {/* Nose */}
        <circle cx="12" cy="18" r="0.8" fill="currentColor" />
        {/* Whiskers */}
        <line
          x1="5"
          y1="18"
          x2="10"
          y2="18.5"
          stroke="currentColor"
          strokeWidth="0.8"
        />
        <line
          x1="14"
          y1="18.5"
          x2="19"
          y2="18"
          stroke="currentColor"
          strokeWidth="0.8"
        />
      </svg>
    );
  }
  if (type === "lace-corner") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        aria-hidden="true"
      >
        <path d="M2 2 L10 2 L2 10 Z" fill="currentColor" opacity="0.2" />
        <path d="M2 2 Q6 2 6 6 Q6 10 2 10" />
        <path d="M2 2 L6 2 Q8 2 8 4 L8 8 Q8 10 6 10 L2 10" />
        <circle cx="4" cy="4" r="1" fill="currentColor" />
        <circle cx="8" cy="8" r="0.8" fill="currentColor" />
        <path d="M4 2 Q4 4 2 4" />
        <path d="M8 2 Q8 6 2 6" opacity="0.5" />
        <path d="M2 8 Q6 8 6 2" opacity="0.5" />
      </svg>
    );
  }
  if (type === "shooting-star") {
    return (
      <svg
        width="22"
        height="18"
        viewBox="0 0 26 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M14 2 L15.2 6.6 L20 8 L15.2 9.4 L14 14 L12.8 9.4 L8 8 L12.8 6.6 Z" />
        {/* Trailing sparkles */}
        <circle cx="6" cy="12" r="1.5" opacity="0.7" />
        <circle cx="3" cy="16" r="1" opacity="0.5" />
        <circle cx="1" cy="19" r="0.7" opacity="0.3" />
        <path
          d="M22 3 L22.6 5 L24 5.5 L22.6 6 L22 8 L21.4 6 L20 5.5 L21.4 5 Z"
          opacity="0.7"
        />
      </svg>
    );
  }
  return null;
}

interface StickerPanelProps {
  onAddSticker: (type: StickerType) => void;
}

export function StickerPanel({ onAddSticker }: StickerPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-t border-warm-gray/30">
      <button
        type="button"
        onClick={() => setIsOpen((p) => !p)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-parchment/40 transition-colors"
      >
        <span className="font-ui text-[9px] tracking-editorial text-mid-gray uppercase">
          Decorative Elements
        </span>
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
            <div className="px-4 pb-4">
              <p className="font-ui text-[9px] text-mid-gray mb-3">
                Click to add to canvas center
              </p>
              <div className="grid grid-cols-4 gap-2">
                {STICKERS.map((sticker) => (
                  <motion.button
                    key={sticker.type}
                    type="button"
                    onClick={() => onAddSticker(sticker.type)}
                    className="flex flex-col items-center gap-1 p-2 border border-warm-gray/40 hover:border-pink-300 hover:bg-pink-50/60 transition-all text-ink/60 rounded-sm"
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    aria-label={`Add ${sticker.label}`}
                  >
                    <StickerIcon type={sticker.type} />
                    <span className="font-ui text-[7px] text-mid-gray text-center leading-tight">
                      {sticker.label}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
