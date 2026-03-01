import { Bold, ChevronDown, ChevronUp, Italic, Type } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { TextLayer } from "../../types/canvas";

interface TextToolProps {
  isActive: boolean;
  onToggle: () => void;
  selectedText: TextLayer | null;
  onUpdateText: (id: string, updates: Partial<TextLayer>) => void;
  onAddText: (text: Omit<TextLayer, "id">) => void;
}

const AESTHETIC_FONTS = [
  { label: "Playfair Display", value: "'Playfair Display', serif" },
  { label: "Cormorant Garamond", value: "'Cormorant Garamond', serif" },
  { label: "Great Vibes", value: "'Great Vibes', cursive" },
  { label: "Dancing Script", value: "'Dancing Script', cursive" },
  { label: "Pacifico", value: "'Pacifico', cursive" },
  { label: "Sacramento", value: "'Sacramento', cursive" },
  { label: "Pinyon Script", value: "'Pinyon Script', cursive" },
  { label: "Alex Brush", value: "'Alex Brush', cursive" },
  { label: "Allura", value: "'Allura', cursive" },
  { label: "Tangerine", value: "'Tangerine', cursive" },
  { label: "Satisfy", value: "'Satisfy', cursive" },
  { label: "Lobster", value: "'Lobster', cursive" },
  { label: "Italiana", value: "'Italiana', serif" },
  { label: "Josefin Sans", value: "'Josefin Sans', sans-serif" },
  { label: "Nunito", value: "'Nunito', sans-serif" },
  { label: "Raleway", value: "'Raleway', sans-serif" },
  { label: "Quicksand", value: "'Quicksand', sans-serif" },
  { label: "Cinzel", value: "'Cinzel', serif" },
  { label: "EB Garamond", value: "'EB Garamond', serif" },
  { label: "Libre Baskerville", value: "'Libre Baskerville', serif" },
  { label: "Petit Formal Script", value: "'Petit Formal Script', cursive" },
  { label: "La Belle Aurore", value: "'La Belle Aurore', cursive" },
  { label: "Clicker Script", value: "'Clicker Script', cursive" },
  { label: "Kaushan Script", value: "'Kaushan Script', cursive" },
  { label: "Bodoni Moda", value: "'Bodoni Moda', serif" },
];

const TEXT_COLORS = [
  "#1a1201",
  "#ffffff",
  "#f8e8ee",
  "#ffd1dc",
  "#c9b3d1",
  "#b8d4e8",
  "#ffc5a1",
  "#d4c4a0",
  "#8b7355",
  "#2c3e50",
  "#e8b4b8",
  "#a8d8b9",
  "#f7c5d0",
  "#dbbfef",
  "#fff0f3",
  "#ffe4e1",
  "#faebd7",
  "#f5deb3",
  "#c8a2c8",
  "#87ceeb",
  "#ff69b4",
  "#db7093",
  "#4a0e2e",
  "#2d1b69",
];

export function TextTool({
  isActive,
  onToggle,
  selectedText,
  onUpdateText,
}: TextToolProps) {
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
            Text
          </span>
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
            <div className="px-4 pb-4 space-y-3">
              {/* Add text button */}
              <button
                type="button"
                onClick={onToggle}
                className={`w-full flex items-center justify-center gap-2 py-2 border transition-all font-ui text-[10px] tracking-editorial uppercase ${
                  isActive
                    ? "bg-ink text-ivory border-ink"
                    : "border-warm-gray/60 text-mid-gray hover:border-ink/40 hover:text-ink"
                }`}
              >
                <Type size={11} />
                {isActive ? "Click Canvas to Place Text" : "Add Text"}
              </button>

              {/* Text options when text layer is selected */}
              {selectedText && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 pt-2 border-t border-warm-gray/20"
                >
                  <p className="font-ui text-[8px] tracking-editorial text-mid-gray uppercase">
                    Selected Text Options
                  </p>

                  {/* Text input */}
                  <div>
                    <label
                      htmlFor="text-content-input"
                      className="font-ui text-[9px] text-mid-gray uppercase tracking-wide block mb-1"
                    >
                      Content
                    </label>
                    <input
                      id="text-content-input"
                      type="text"
                      value={selectedText.text}
                      onChange={(e) =>
                        onUpdateText(selectedText.id, { text: e.target.value })
                      }
                      className="w-full bg-white border border-warm-gray/40 px-2 py-1.5 font-ui text-xs text-ink focus:outline-none focus:border-ink/40"
                      placeholder="Enter text..."
                    />
                  </div>

                  {/* Font picker */}
                  <div>
                    <p className="font-ui text-[9px] text-mid-gray uppercase tracking-wide mb-2">
                      Font
                    </p>
                    <div className="max-h-40 overflow-y-auto pr-1 space-y-1 scrollbar-thin">
                      {AESTHETIC_FONTS.map((font) => {
                        const isSelected =
                          selectedText.fontFamily === font.value;
                        return (
                          <button
                            key={font.value}
                            type="button"
                            onClick={() =>
                              onUpdateText(selectedText.id, {
                                fontFamily: font.value,
                              })
                            }
                            className={`w-full text-left px-2 py-1.5 rounded-sm border text-sm transition-all ${
                              isSelected
                                ? "border-pink-300 bg-pink-50 text-ink"
                                : "border-warm-gray/30 text-ink/70 hover:border-pink-200 hover:bg-pink-50/50"
                            }`}
                            style={{ fontFamily: font.value }}
                          >
                            {font.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Size */}
                  <div>
                    <label
                      htmlFor="text-size-range"
                      className="font-ui text-[9px] text-mid-gray uppercase tracking-wide block mb-1"
                    >
                      Size: {selectedText.fontSize}px
                    </label>
                    <input
                      id="text-size-range"
                      type="range"
                      min={12}
                      max={120}
                      value={selectedText.fontSize}
                      onChange={(e) =>
                        onUpdateText(selectedText.id, {
                          fontSize: Number(e.target.value),
                        })
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Style toggles */}
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateText(selectedText.id, {
                          bold: !selectedText.bold,
                        })
                      }
                      className={`flex items-center gap-1 px-2 py-1 border text-[9px] transition-colors ${
                        selectedText.bold
                          ? "bg-ink text-ivory border-ink"
                          : "border-warm-gray/40 text-mid-gray hover:border-ink/30"
                      }`}
                    >
                      <Bold size={9} />
                      Bold
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onUpdateText(selectedText.id, {
                          italic: !selectedText.italic,
                        })
                      }
                      className={`flex items-center gap-1 px-2 py-1 border text-[9px] transition-colors ${
                        selectedText.italic
                          ? "bg-ink text-ivory border-ink"
                          : "border-warm-gray/40 text-mid-gray hover:border-ink/30"
                      }`}
                    >
                      <Italic size={9} />
                      Italic
                    </button>
                  </div>

                  {/* Color grid */}
                  <div>
                    <p className="font-ui text-[9px] text-mid-gray uppercase tracking-wide mb-2">
                      Color
                    </p>
                    <div className="grid grid-cols-8 gap-1.5 mb-2">
                      {TEXT_COLORS.map((color) => (
                        <button
                          key={color}
                          type="button"
                          onClick={() =>
                            onUpdateText(selectedText.id, { color })
                          }
                          className={`w-6 h-6 rounded-full border-2 transition-all hover:scale-110 ${
                            selectedText.color === color
                              ? "ring-2 ring-pink-400 ring-offset-1 border-white scale-110"
                              : "border-white/80 hover:border-pink-200"
                          }`}
                          style={{ backgroundColor: color }}
                          aria-label={`Set color to ${color}`}
                        />
                      ))}
                    </div>
                    {/* Custom color picker */}
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedText.color}
                        onChange={(e) =>
                          onUpdateText(selectedText.id, {
                            color: e.target.value,
                          })
                        }
                        className="w-7 h-7 rounded-full border border-warm-gray/40 cursor-pointer"
                        title="Custom color"
                      />
                      <span className="font-ui text-[9px] text-mid-gray">
                        Custom
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
