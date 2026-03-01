// Maps each prebuilt template ID to the exact CanvasState it should open with in the editor.
// The visual style here must match the thumbnail shown on the home screen.
import type { CanvasState } from "../types/canvas";
import { DEFAULT_ADJUSTMENTS } from "../types/canvas";

function base(overrides: Partial<CanvasState>): CanvasState {
  return {
    backgroundImage: null,
    filter: "Original",
    adjustments: { ...DEFAULT_ADJUSTMENTS },
    frame: "none",
    layers: [],
    aspectRatio: "1:1",
    ...overrides,
  };
}

export const PREBUILT_TEMPLATE_CANVAS_STATES: Record<string, CanvasState> = {
  // ── Instagram ──────────────────────────────────────────────────────────────
  "ig-minimal-white": base({
    filter: "Original",
    frame: "thin",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 105 },
  }),

  "ig-editorial-grid": base({
    filter: "High Contrast",
    frame: "film",
    adjustments: { ...DEFAULT_ADJUSTMENTS, contrast: 115 },
  }),

  "ig-portrait-frame": base({
    filter: "Faded",
    frame: "corners",
    aspectRatio: "4:5",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 102, saturation: 90 },
  }),

  "ig-duo-tone": base({
    filter: "Noir",
    frame: "double",
    adjustments: { ...DEFAULT_ADJUSTMENTS, contrast: 120 },
  }),

  // ── Old Money ─────────────────────────────────────────────────────────────
  "om-estate": base({
    filter: "Sepia",
    frame: "double",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 98, saturation: 70 },
  }),

  "om-monogram": base({
    filter: "Matte",
    frame: "corners",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 100, saturation: 60 },
  }),

  "om-gazette": base({
    filter: "Sepia",
    frame: "double",
    adjustments: { ...DEFAULT_ADJUSTMENTS, saturation: 55, contrast: 108 },
  }),

  "om-crest": base({
    filter: "Matte",
    frame: "corners",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 97, saturation: 65 },
  }),

  // ── Pastel ────────────────────────────────────────────────────────────────
  "pastel-pink-story": base({
    filter: "Rose Blush",
    frame: "blush-frame",
    aspectRatio: "9:16",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 108, saturation: 90 },
  }),

  "pastel-blush": base({
    filter: "Rose Blush",
    frame: "coral-frame",
    adjustments: {
      ...DEFAULT_ADJUSTMENTS,
      brightness: 106,
      saturation: 85,
      highlights: 105,
    },
  }),

  "pastel-petal": base({
    filter: "Velvet Pink",
    frame: "coral-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 104, saturation: 90 },
  }),

  "pastel-dreamy": base({
    filter: "Lavender Haze",
    frame: "lilac-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 106, saturation: 85 },
  }),

  "pastel-cloud": base({
    filter: "Airy",
    frame: "sky-blue",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 110, saturation: 60 },
  }),

  "pastel-vintage-rose": base({
    filter: "Rose Blush",
    frame: "blush-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 99, saturation: 75 },
  }),

  "pastel-cottage": base({
    filter: "Mint Fresh",
    frame: "mint-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, saturation: 80, brightness: 103 },
  }),

  "pastel-peach": base({
    filter: "Peach Dream",
    frame: "orange",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 107, saturation: 90 },
  }),

  // ── New Instagram ──────────────────────────────────────────────────────────
  "ig-botanical": base({
    filter: "Mint Fresh",
    frame: "mint-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, saturation: 110, brightness: 103 },
  }),

  "ig-minimal-line": base({
    filter: "Original",
    frame: "thin",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 103 },
  }),

  "ig-soft-aesthetic": base({
    filter: "Rose Blush",
    frame: "blush-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 108, saturation: 80 },
  }),

  "ig-retro": base({
    filter: "Golden Hour",
    frame: "orange",
    adjustments: { ...DEFAULT_ADJUSTMENTS, saturation: 110, contrast: 108 },
  }),

  "ig-glam": base({
    filter: "Twilight",
    frame: "double",
    adjustments: { ...DEFAULT_ADJUSTMENTS, contrast: 115, brightness: 98 },
  }),

  // ── New Old Money ─────────────────────────────────────────────────────────
  "om-midnight": base({
    filter: "Twilight",
    frame: "double",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 90, contrast: 112 },
  }),

  "om-coffee": base({
    filter: "Mocha",
    frame: "corners",
    adjustments: { ...DEFAULT_ADJUSTMENTS, saturation: 70, brightness: 98 },
  }),

  "om-fairytale": base({
    filter: "Lavender Haze",
    frame: "lilac-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 104, saturation: 75 },
  }),

  // ── New Pastel ────────────────────────────────────────────────────────────
  "pastel-sunlit": base({
    filter: "Golden Hour",
    frame: "soft-yellow",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 110, saturation: 95 },
  }),

  "pastel-lilac": base({
    filter: "Lavender Haze",
    frame: "lilac-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 107, saturation: 80 },
  }),

  "pastel-mint": base({
    filter: "Mint Fresh",
    frame: "mint-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 108, saturation: 75 },
  }),

  "pastel-coral": base({
    filter: "Peach Dream",
    frame: "coral-frame",
    adjustments: { ...DEFAULT_ADJUSTMENTS, brightness: 106, saturation: 95 },
  }),
};
