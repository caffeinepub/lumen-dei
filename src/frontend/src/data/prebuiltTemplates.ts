// Local fallback prebuilt templates (used if backend returns empty)
import type { PrebuiltTemplate } from "../backend";
import { TemplateCategory } from "../backend";

export const FALLBACK_PREBUILT_TEMPLATES: PrebuiltTemplate[] = [
  {
    id: "ig-minimal-white",
    name: "Blanc Minimal",
    description:
      "Clean white canvas with centered text guide — perfect for product shots",
    thumbnailHint: "instagram-white-minimal",
    category: TemplateCategory.instagram,
  },
  {
    id: "ig-editorial-grid",
    name: "The Editorial",
    description:
      "Bold typography with asymmetric layout guides for editorial posts",
    thumbnailHint: "instagram-editorial-grid",
    category: TemplateCategory.instagram,
  },
  {
    id: "ig-portrait-frame",
    name: "Portrait Frame",
    description: "4:5 ratio with thin border frame and serif caption area",
    thumbnailHint: "instagram-portrait-frame",
    category: TemplateCategory.instagram,
  },
  {
    id: "ig-duo-tone",
    name: "Duo Tone",
    description: "High contrast split layout — bold and modern",
    thumbnailHint: "instagram-duo-tone",
    category: TemplateCategory.instagram,
  },
  {
    id: "om-estate",
    name: "The Estate",
    description:
      "Cream and ivory with double border treatment — timeless aristocratic feel",
    thumbnailHint: "old-money-estate",
    category: TemplateCategory.old_money,
  },
  {
    id: "om-monogram",
    name: "Monogram",
    description:
      "Classic monogram placement with fine ruled lines and serif typeface",
    thumbnailHint: "old-money-monogram",
    category: TemplateCategory.old_money,
  },
  {
    id: "om-gazette",
    name: "La Gazette",
    description:
      "Newspaper-inspired layout with masthead typography and column rules",
    thumbnailHint: "old-money-gazette",
    category: TemplateCategory.old_money,
  },
  {
    id: "om-crest",
    name: "Heritage Crest",
    description: "Coat-of-arms inspired composition with parchment tones",
    thumbnailHint: "old-money-crest",
    category: TemplateCategory.old_money,
  },
  // Pastel templates
  {
    id: "pastel-pink-story",
    name: "Soft Pink Story",
    description: "Dreamy gradient pink background for stories",
    thumbnailHint: "pastel-pink-gradient",
    category: TemplateCategory.instagram,
  },
  {
    id: "pastel-blush",
    name: "Blush Collage",
    description: "Blush tones with subtle grain texture",
    thumbnailHint: "pastel-blush-collage",
    category: TemplateCategory.instagram,
  },
  {
    id: "pastel-petal",
    name: "Petal Post",
    description: "Rose petal tones with vignette",
    thumbnailHint: "pastel-petal-post",
    category: TemplateCategory.instagram,
  },
  {
    id: "pastel-dreamy",
    name: "Dreamy Gradient",
    description: "Lavender to pink soft gradient",
    thumbnailHint: "pastel-dreamy-gradient",
    category: TemplateCategory.instagram,
  },
  {
    id: "pastel-cloud",
    name: "Cloud Nine",
    description: "Airy pale blue to white softness",
    thumbnailHint: "pastel-cloud-nine",
    category: TemplateCategory.instagram,
  },
  {
    id: "pastel-vintage-rose",
    name: "Vintage Rose",
    description: "Dusty rose with old-film overlay",
    thumbnailHint: "pastel-vintage-rose",
    category: TemplateCategory.old_money,
  },
  {
    id: "pastel-cottage",
    name: "Cottagecore",
    description: "Warm sage and cream pastoral tones",
    thumbnailHint: "pastel-cottagecore",
    category: TemplateCategory.old_money,
  },
  {
    id: "pastel-peach",
    name: "Peach Fuzz",
    description: "Soft peach warm glow background",
    thumbnailHint: "pastel-peach-fuzz",
    category: TemplateCategory.instagram,
  },
  // New templates
  {
    id: "ig-botanical",
    name: "Botanical",
    description: "Fresh green botanical borders, nature-inspired",
    thumbnailHint: "instagram-botanical",
    category: TemplateCategory.instagram,
  },
  {
    id: "ig-minimal-line",
    name: "Hairline",
    description: "Ultra-thin single line border, pure minimal",
    thumbnailHint: "instagram-minimal-line",
    category: TemplateCategory.instagram,
  },
  {
    id: "ig-soft-aesthetic",
    name: "Soft Aesthetic",
    description: "Hazy soft focus dreamy pastel overlay",
    thumbnailHint: "instagram-soft-aesthetic",
    category: TemplateCategory.instagram,
  },
  {
    id: "ig-retro",
    name: "Retro Vibes",
    description: "70s warm grain with orange-toned border",
    thumbnailHint: "instagram-retro",
    category: TemplateCategory.instagram,
  },
  {
    id: "ig-glam",
    name: "Glam Shot",
    description: "High-shine glitter border with gold accents",
    thumbnailHint: "instagram-glam",
    category: TemplateCategory.instagram,
  },
  {
    id: "om-midnight",
    name: "Midnight",
    description: "Deep navy with silver filigree — evening elegance",
    thumbnailHint: "old-money-midnight",
    category: TemplateCategory.old_money,
  },
  {
    id: "om-coffee",
    name: "Coffee Hour",
    description: "Warm espresso tones with aged paper texture",
    thumbnailHint: "old-money-coffee",
    category: TemplateCategory.old_money,
  },
  {
    id: "om-fairytale",
    name: "Fairytale",
    description: "Dusty lilac and cream with hand-drawn florals",
    thumbnailHint: "old-money-fairytale",
    category: TemplateCategory.old_money,
  },
  {
    id: "pastel-sunlit",
    name: "Sunlit",
    description: "Warm golden hour glow gradient",
    thumbnailHint: "pastel-sunlit",
    category: TemplateCategory.instagram,
  },
  {
    id: "pastel-lilac",
    name: "Lilac Mist",
    description: "Soft muted lilac fog gradient",
    thumbnailHint: "pastel-lilac",
    category: TemplateCategory.instagram,
  },
  {
    id: "pastel-mint",
    name: "Mint Breeze",
    description: "Cool mint to white airy softness",
    thumbnailHint: "pastel-mint",
    category: TemplateCategory.instagram,
  },
  {
    id: "pastel-coral",
    name: "Coral Bloom",
    description: "Warm coral pink to blush gradient",
    thumbnailHint: "pastel-coral",
    category: TemplateCategory.instagram,
  },
];
