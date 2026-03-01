import type { Adjustments, FilterName } from "../types/canvas";

export interface FilterDef {
  name: FilterName;
  cssFilter: string;
  description: string;
}

export const FILTERS: FilterDef[] = [
  {
    name: "Original",
    cssFilter: "none",
    description: "No filter",
  },
  {
    name: "Warm",
    cssFilter: "sepia(0.2) saturate(1.2) brightness(1.05) hue-rotate(-5deg)",
    description: "Golden warm tones",
  },
  {
    name: "Cool",
    cssFilter:
      "saturate(0.9) brightness(1.02) hue-rotate(15deg) contrast(1.05)",
    description: "Cool silver tones",
  },
  {
    name: "Faded",
    cssFilter: "brightness(1.08) contrast(0.85) saturate(0.7)",
    description: "Faded film look",
  },
  {
    name: "Noir",
    cssFilter: "grayscale(1) contrast(1.2) brightness(0.95)",
    description: "Black & white noir",
  },
  {
    name: "Soft Glow",
    cssFilter: "brightness(1.1) contrast(0.9) saturate(1.1) blur(0px)",
    description: "Ethereal soft light",
  },
  {
    name: "Sepia",
    cssFilter: "sepia(0.7) contrast(1.05) brightness(1.02)",
    description: "Vintage sepia tone",
  },
  {
    name: "High Contrast",
    cssFilter: "contrast(1.4) saturate(1.1) brightness(0.95)",
    description: "Bold and graphic",
  },
  {
    name: "Matte",
    cssFilter: "contrast(0.9) saturate(0.85) brightness(1.05)",
    description: "Cinematic matte",
  },
  {
    name: "Film Grain",
    cssFilter: "contrast(1.1) brightness(0.98) saturate(0.9)",
    description: "Analog film texture",
  },
  {
    name: "Chrome",
    cssFilter: "grayscale(0.3) contrast(1.2) brightness(1.05) saturate(1.3)",
    description: "Metallic chrome",
  },
  {
    name: "Velvet",
    cssFilter:
      "sepia(0.15) contrast(1.1) saturate(1.2) brightness(0.95) hue-rotate(-10deg)",
    description: "Deep rich velvet",
  },
  {
    name: "Rose Blush",
    cssFilter:
      "sepia(0.25) saturate(1.6) hue-rotate(315deg) brightness(1.08) contrast(0.95)",
    description: "Soft rosy pink blush",
  },
  {
    name: "Peach Dream",
    cssFilter:
      "sepia(0.3) saturate(1.8) hue-rotate(340deg) brightness(1.07) contrast(0.92)",
    description: "Warm peachy dream",
  },
  {
    name: "Lavender Haze",
    cssFilter:
      "saturate(0.8) hue-rotate(260deg) brightness(1.1) contrast(0.9) sepia(0.1)",
    description: "Dreamy lavender mist",
  },
  {
    name: "Golden Hour",
    cssFilter:
      "sepia(0.4) saturate(1.5) brightness(1.1) contrast(1.05) hue-rotate(-10deg)",
    description: "Warm golden sunset",
  },
  {
    name: "Dusty Tan",
    cssFilter: "sepia(0.5) saturate(0.85) brightness(1.04) contrast(0.95)",
    description: "Warm dusty tan film",
  },
  {
    name: "Twilight",
    cssFilter:
      "saturate(1.2) hue-rotate(220deg) brightness(0.9) contrast(1.15) sepia(0.1)",
    description: "Cool twilight blue",
  },
  {
    name: "Mint Fresh",
    cssFilter:
      "saturate(1.1) hue-rotate(155deg) brightness(1.08) contrast(0.93)",
    description: "Cool fresh mint",
  },
  {
    name: "Mocha",
    cssFilter: "sepia(0.6) saturate(0.7) brightness(0.97) contrast(1.1)",
    description: "Rich mocha brown",
  },
  {
    name: "Velvet Pink",
    cssFilter:
      "sepia(0.2) saturate(1.7) hue-rotate(325deg) brightness(0.96) contrast(1.12)",
    description: "Deep velvet pink",
  },
  {
    name: "Airy",
    cssFilter: "brightness(1.15) contrast(0.82) saturate(0.85) sepia(0.05)",
    description: "Light and airy",
  },
  {
    name: "Cherry Blossom",
    cssFilter:
      "sepia(0.15) saturate(1.9) hue-rotate(308deg) brightness(1.06) contrast(0.94)",
    description: "Soft cherry blossom pink",
  },
  {
    name: "Cosmic",
    cssFilter:
      "saturate(1.4) hue-rotate(200deg) brightness(0.88) contrast(1.25) sepia(0.1)",
    description: "Deep cosmic indigo",
  },
  {
    name: "Lush Green",
    cssFilter:
      "saturate(1.5) hue-rotate(100deg) brightness(1.04) contrast(1.05)",
    description: "Vibrant lush greenery",
  },
  {
    name: "Desert Sand",
    cssFilter:
      "sepia(0.55) saturate(0.75) brightness(1.08) contrast(0.92) hue-rotate(5deg)",
    description: "Warm desert sand tones",
  },
  {
    name: "Arctic",
    cssFilter:
      "saturate(0.6) hue-rotate(185deg) brightness(1.15) contrast(0.88)",
    description: "Cool icy arctic blue",
  },
  {
    name: "Neon Dream",
    cssFilter:
      "saturate(2.2) hue-rotate(270deg) brightness(1.05) contrast(1.2)",
    description: "Vivid neon purple glow",
  },
  {
    name: "Soft Linen",
    cssFilter: "sepia(0.35) saturate(0.65) brightness(1.1) contrast(0.88)",
    description: "Neutral linen warmth",
  },
  {
    name: "Marshmallow",
    cssFilter: "brightness(1.2) contrast(0.78) saturate(0.7) sepia(0.08)",
    description: "Airy white marshmallow",
  },
  {
    name: "Espresso",
    cssFilter: "sepia(0.7) saturate(0.6) brightness(0.88) contrast(1.2)",
    description: "Deep espresso brown",
  },
  {
    name: "Azure Sky",
    cssFilter:
      "saturate(1.3) hue-rotate(170deg) brightness(1.1) contrast(0.95) sepia(0.05)",
    description: "Clear azure sky blue",
  },
];

export function getFilterCss(
  filterName: FilterName,
  adjustments: Adjustments,
): string {
  const filter = FILTERS.find((f) => f.name === filterName);
  const base = filter ? filter.cssFilter : "none";

  const brightnessVal = adjustments.brightness / 100;
  const contrastVal = adjustments.contrast / 100;
  const saturateVal = adjustments.saturation / 100;
  // Exposure is multiplicative brightness
  const exposureVal = adjustments.exposure / 100;
  // Shadows/highlights don't have direct CSS analogs, approximate via brightness
  const shadowsVal = (adjustments.shadows - 100) * 0.002;
  const highlightsVal = (adjustments.highlights - 100) * 0.002;

  const adjustmentFilter = `brightness(${(brightnessVal + exposureVal - 1 + shadowsVal + highlightsVal).toFixed(3)}) contrast(${contrastVal.toFixed(3)}) saturate(${saturateVal.toFixed(3)})`;

  if (base === "none") return adjustmentFilter;
  return `${base} ${adjustmentFilter}`;
}

export function filterNameToId(name: FilterName): string {
  return name.toLowerCase().replace(/\s+/g, "-");
}
