export type FilterName =
  | "Original"
  | "Warm"
  | "Cool"
  | "Faded"
  | "Noir"
  | "Soft Glow"
  | "Sepia"
  | "High Contrast"
  | "Matte"
  | "Film Grain"
  | "Chrome"
  | "Velvet"
  | "Rose Blush"
  | "Peach Dream"
  | "Lavender Haze"
  | "Golden Hour"
  | "Dusty Tan"
  | "Twilight"
  | "Mint Fresh"
  | "Mocha"
  | "Velvet Pink"
  | "Airy"
  | "Cherry Blossom"
  | "Cosmic"
  | "Lush Green"
  | "Desert Sand"
  | "Arctic"
  | "Neon Dream"
  | "Soft Linen"
  | "Marshmallow"
  | "Espresso"
  | "Azure Sky";

export type FrameType =
  | "none"
  | "thin"
  | "double"
  | "corners"
  | "film"
  | "vignette"
  | "orange"
  | "coral-frame"
  | "mint-frame"
  | "sky-blue"
  | "lilac-frame"
  | "soft-yellow"
  | "terracotta"
  | "blush-frame"
  | "emerald-frame"
  | "slate-frame";

export type StickerType =
  | "star"
  | "crescent"
  | "dots"
  | "divider"
  | "diamond"
  | "bow"
  | "ribbon"
  | "flower"
  | "butterfly"
  | "heart"
  | "sparkle"
  | "cherry"
  | "crown"
  | "leaf"
  | "pearl"
  | "cloud"
  | "music-note"
  | "bunny"
  | "lace-corner"
  | "shooting-star";

export interface TextLayer {
  type: "text";
  id: string;
  text: string;
  x: number;
  y: number;
  fontSize: number;
  fontFamily: string;
  bold: boolean;
  italic: boolean;
  color: string;
}

export interface StickerLayer {
  type: "sticker";
  id: string;
  stickerType: StickerType;
  x: number;
  y: number;
  size: number;
  color: string;
}

export type Layer = TextLayer | StickerLayer;

export interface Adjustments {
  brightness: number; // 100 = neutral
  contrast: number;
  saturation: number;
  exposure: number;
  shadows: number;
  highlights: number;
}

export interface CanvasState {
  backgroundImage: string | null;
  filter: FilterName;
  adjustments: Adjustments;
  frame: FrameType;
  layers: Layer[];
  aspectRatio: "1:1" | "4:5" | "9:16";
}

export const DEFAULT_ADJUSTMENTS: Adjustments = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  exposure: 100,
  shadows: 100,
  highlights: 100,
};

export const DEFAULT_CANVAS_STATE: CanvasState = {
  backgroundImage: null,
  filter: "Original",
  adjustments: { ...DEFAULT_ADJUSTMENTS },
  frame: "none",
  layers: [],
  aspectRatio: "1:1",
};
