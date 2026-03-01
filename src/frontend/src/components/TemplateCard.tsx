import { useNavigate } from "@tanstack/react-router";
import { Edit3, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import type { CustomTemplate, PrebuiltTemplate } from "../backend";
import { TemplateCategory } from "../backend";

// Pastel gradient mappings
const PASTEL_GRADIENTS: Record<string, string> = {
  "pastel-pink-gradient":
    "linear-gradient(135deg, #ffd1dc 0%, #ffb3c6 40%, #ffc8d8 100%)",
  "pastel-blush-collage":
    "linear-gradient(135deg, #f8e8ee 0%, #e8b4b8 50%, #f7c5d0 100%)",
  "pastel-petal-post":
    "radial-gradient(circle at 40% 40%, #fae0e8 0%, #e8a0b0 60%, #d4607c 100%)",
  "pastel-dreamy-gradient":
    "linear-gradient(135deg, #c9b3d1 0%, #e0c8e8 40%, #ffd1dc 100%)",
  "pastel-cloud-nine":
    "linear-gradient(160deg, #dbeafe 0%, #e8f4fd 50%, #ffffff 100%)",
  "pastel-vintage-rose":
    "linear-gradient(135deg, #d4a0a8 0%, #c88090 40%, #b06070 100%)",
  "pastel-cottagecore":
    "linear-gradient(135deg, #a8c5a0 0%, #c8d8b0 40%, #f5e6d3 100%)",
  "pastel-peach-fuzz":
    "linear-gradient(135deg, #ffc5a1 0%, #ffb080 40%, #ffd4b0 100%)",
  "pastel-sunlit":
    "linear-gradient(135deg, #ffd580 0%, #ffb347 40%, #ffe4b5 100%)",
  "pastel-lilac":
    "linear-gradient(135deg, #d8b4fe 0%, #c4b5fd 40%, #ede9fe 100%)",
  "pastel-mint":
    "linear-gradient(135deg, #a7f3d0 0%, #d1fae5 50%, #f0fdf4 100%)",
  "pastel-coral":
    "linear-gradient(135deg, #fca5a5 0%, #f87171 40%, #ffd6d6 100%)",
};

// Visual hints for prebuilt templates
function PrebuiltThumbnail({ hint }: { hint: string }) {
  // Handle pastel templates
  if (hint.startsWith("pastel-")) {
    const gradient = PASTEL_GRADIENTS[hint];
    if (gradient) {
      const label = hint
        .replace("pastel-", "")
        .split("-")
        .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");
      return (
        <div
          className="w-full h-full flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
          style={{ background: gradient }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }}
          />
          <span className="text-white/80 text-[8px] font-light tracking-[0.2em] uppercase drop-shadow-sm">
            {label}
          </span>
          <div className="flex gap-1">
            <div className="w-1 h-1 rounded-full bg-white/60" />
            <div className="w-1 h-1 rounded-full bg-white/60" />
            <div className="w-1 h-1 rounded-full bg-white/60" />
          </div>
        </div>
      );
    }
  }

  // ── New specific templates ────────────────────────────────────────────────

  if (hint === "instagram-botanical") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-1 relative overflow-hidden"
        style={{ background: "#e8f5e9" }}
      >
        {/* Leaf corner accents */}
        {[
          { top: 4, left: 4, id: "tl" },
          { top: 4, right: 4, id: "tr" },
          { bottom: 4, left: 4, id: "bl" },
          { bottom: 4, right: 4, id: "br" },
        ].map(({ id, ...pos }) => (
          <svg
            key={`leaf-${id}`}
            width="14"
            height="14"
            viewBox="0 0 14 14"
            className="absolute"
            aria-hidden="true"
            style={pos as React.CSSProperties}
          >
            <path
              d="M7 1 C4 3 1 6 2 10 C5 9 9 7 12 4 C10 2 8 1 7 1Z"
              fill="#81c784"
              opacity="0.7"
            />
            <line
              x1="7"
              y1="1"
              x2="4"
              y2="11"
              stroke="#4caf50"
              strokeWidth="0.6"
              opacity="0.5"
            />
          </svg>
        ))}
        <span
          className="text-[9px] tracking-widest uppercase"
          style={{ fontFamily: "Georgia, serif", color: "#388e3c" }}
        >
          Botanical
        </span>
        <div className="flex gap-1 mt-0.5">
          {["#a5d6a7", "#66bb6a", "#43a047"].map((c) => (
            <div
              key={c}
              className="w-1 h-1 rounded-full"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (hint === "instagram-minimal-line") {
    return (
      <div className="w-full h-full bg-white flex items-center justify-center">
        <div
          className="absolute"
          style={{
            inset: "10px",
            border: "0.75px solid #1a1a1a",
            opacity: 0.35,
          }}
        />
        <div
          className="absolute"
          style={{
            inset: "14px",
            border: "0.4px solid #1a1a1a",
            opacity: 0.15,
          }}
        />
        <span
          className="text-[8px] tracking-[0.3em] uppercase"
          style={{ fontFamily: "Georgia, serif", color: "#555", opacity: 0.5 }}
        >
          Hairline
        </span>
      </div>
    );
  }

  if (hint === "instagram-soft-aesthetic") {
    return (
      <div
        className="w-full h-full flex items-center justify-center relative overflow-hidden"
        style={{ background: "#fce4ec" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.7) 0%, rgba(252,228,236,0.2) 60%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <span
          className="relative text-[8px] tracking-widest uppercase"
          style={{
            fontFamily: "Georgia, serif",
            color: "#c06080",
            opacity: 0.7,
          }}
        >
          Soft Aesthetic
        </span>
      </div>
    );
  }

  if (hint === "instagram-retro") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
        style={{ background: "#e8a87c" }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            border: "6px solid #c97042",
            margin: "6px",
            opacity: 0.6,
          }}
        />
        <span
          className="relative text-[9px] tracking-[0.25em] uppercase font-bold"
          style={{ fontFamily: "Georgia, serif", color: "#5c2a0a" }}
        >
          Retro '70s
        </span>
        <div className="relative flex gap-1.5">
          {["#c97042", "#e8642c", "#f5a040"].map((c) => (
            <div
              key={c}
              className="w-1.5 h-1.5 rounded-sm"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (hint === "instagram-glam") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
        style={{ background: "#1a1a2e" }}
      >
        {/* Gold shimmer dots */}
        {[
          { top: "15%", left: "20%", id: 0 },
          { top: "25%", left: "75%", id: 1 },
          { top: "65%", left: "30%", id: 2 },
          { top: "75%", left: "68%", id: 3 },
          { top: "45%", left: "10%", id: 4 },
          { top: "50%", left: "88%", id: 5 },
          { top: "10%", left: "50%", id: 6 },
          { top: "85%", left: "50%", id: 7 },
        ].map(({ id, ...pos }) => (
          <div
            key={`shimmer-${id}`}
            className="absolute rounded-full"
            style={{
              ...pos,
              width: id % 2 === 0 ? "3px" : "2px",
              height: id % 2 === 0 ? "3px" : "2px",
              background: id % 3 === 0 ? "#ffd700" : "rgba(255,215,0,0.5)",
            }}
          />
        ))}
        <div
          className="absolute"
          style={{
            inset: "8px",
            border: "1px solid rgba(255,215,0,0.35)",
          }}
        />
        <span
          className="relative text-[9px] tracking-[0.25em] uppercase"
          style={{ fontFamily: "Georgia, serif", color: "#ffd700" }}
        >
          Glam Shot
        </span>
      </div>
    );
  }

  if (hint === "old-money-midnight") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 relative overflow-hidden"
        style={{ background: "#0d1b2a" }}
      >
        <div
          className="absolute"
          style={{
            inset: "8px",
            border: "0.5px solid rgba(192,192,192,0.3)",
          }}
        />
        {/* Silver filigree dots */}
        {[
          { top: "10px", left: "50%", id: "top" },
          { bottom: "10px", left: "50%", id: "bot" },
          { left: "10px", top: "50%", id: "lft" },
          { right: "10px", top: "50%", id: "rgt" },
        ].map(({ id, ...pos }) => (
          <div
            key={`silver-${id}`}
            className="absolute w-1 h-1 rounded-full"
            style={{
              ...pos,
              background: "rgba(192,192,192,0.6)",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
        <span
          className="relative text-[9px] tracking-[0.3em] uppercase"
          style={{
            fontFamily: "Georgia, serif",
            color: "rgba(192,192,192,0.7)",
          }}
        >
          Midnight
        </span>
        <div
          className="relative h-px w-12"
          style={{ background: "rgba(192,192,192,0.25)" }}
        />
      </div>
    );
  }

  if (hint === "old-money-coffee") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-2 relative overflow-hidden"
        style={{ background: "#f5e6d3" }}
      >
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 30% 30%, #8b5e3c 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute"
          style={{
            inset: "8px",
            border: "1px solid rgba(139,94,60,0.3)",
          }}
        />
        <div
          className="absolute"
          style={{
            inset: "12px",
            border: "0.4px solid rgba(139,94,60,0.15)",
          }}
        />
        <span
          className="relative text-[9px] tracking-widest uppercase"
          style={{ fontFamily: "Georgia, serif", color: "#5c3a1e" }}
        >
          Coffee Hour
        </span>
        <div className="relative flex gap-1">
          {["#8b5e3c", "#c49a6c", "#f5e6d3"].map((c) => (
            <div
              key={c}
              className="w-1 h-1 rounded-full"
              style={{ background: c, border: "0.5px solid rgba(0,0,0,0.1)" }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (hint === "old-money-fairytale") {
    return (
      <div
        className="w-full h-full flex flex-col items-center justify-center gap-1.5 relative overflow-hidden"
        style={{ background: "#e0cfe8" }}
      >
        <div
          className="absolute"
          style={{
            inset: "8px",
            border: "1px solid rgba(255,255,255,0.7)",
          }}
        />
        {/* Tiny hand-drawn flower marks */}
        {[
          { top: "12px", left: "12px", id: "tl" },
          { top: "12px", right: "12px", id: "tr" },
          { bottom: "12px", left: "12px", id: "bl" },
          { bottom: "12px", right: "12px", id: "br" },
        ].map(({ id, ...pos }) => (
          <svg
            key={`fairy-flower-${id}`}
            width="10"
            height="10"
            viewBox="0 0 10 10"
            className="absolute"
            aria-hidden="true"
            style={pos as React.CSSProperties}
          >
            <circle cx="5" cy="5" r="1.5" fill="#c9a8d4" />
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <ellipse
                key={angle}
                cx={5 + 3.2 * Math.cos((angle * Math.PI) / 180)}
                cy={5 + 3.2 * Math.sin((angle * Math.PI) / 180)}
                rx="1.2"
                ry="0.7"
                fill="#e0c8f0"
                opacity="0.8"
                transform={`rotate(${angle} ${5 + 3.2 * Math.cos((angle * Math.PI) / 180)} ${5 + 3.2 * Math.sin((angle * Math.PI) / 180)})`}
              />
            ))}
          </svg>
        ))}
        <span
          className="relative text-[9px] tracking-widest uppercase"
          style={{ fontFamily: "Georgia, serif", color: "#7a5c8a" }}
        >
          Fairytale
        </span>
        <div
          className="relative h-px w-10"
          style={{ background: "rgba(122,92,138,0.3)" }}
        />
      </div>
    );
  }

  // ── End new specific templates ────────────────────────────────────────────

  const isOldMoney = hint.startsWith("old-money");
  const isEditorial = hint.includes("editorial");
  const isGazette = hint.includes("gazette");
  const isMonogram = hint.includes("monogram");
  const isCrest = hint.includes("crest");
  const isFilm = hint.includes("film") || hint.includes("duo");

  if (isGazette) {
    return (
      <div className="w-full h-full bg-parchment flex flex-col p-3 gap-1.5">
        <div className="h-[2px] bg-ink/80 w-full" />
        <div className="font-display text-[10px] text-ink/60 tracking-widest uppercase text-center">
          La Gazette
        </div>
        <div className="h-[0.5px] bg-ink/40 w-full" />
        <div className="flex gap-1.5 flex-1 mt-1">
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-[3px] bg-ink/20 rounded-sm w-[90%]" />
            <div className="h-[3px] bg-ink/20 rounded-sm w-[70%]" />
            <div className="h-[3px] bg-ink/20 rounded-sm w-[85%]" />
            <div className="h-[3px] bg-ink/20 rounded-sm w-[60%]" />
            <div className="h-[3px] bg-ink/20 rounded-sm w-[75%]" />
          </div>
          <div className="w-[1px] bg-ink/20" />
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-[3px] bg-ink/20 rounded-sm w-[80%]" />
            <div className="h-[3px] bg-ink/20 rounded-sm w-[65%]" />
            <div className="h-[3px] bg-ink/20 rounded-sm w-[85%]" />
            <div className="h-[3px] bg-ink/20 rounded-sm w-[55%]" />
            <div className="h-[3px] bg-ink/20 rounded-sm w-[70%]" />
          </div>
        </div>
        <div className="h-[2px] bg-ink/80 w-full mt-auto" />
      </div>
    );
  }

  if (isMonogram) {
    return (
      <div className="w-full h-full bg-cream flex items-center justify-center">
        <div className="relative">
          <div className="absolute inset-0 border border-ink/20 scale-150" />
          <span className="font-display text-4xl font-light text-ink/30 tracking-widest">
            LD
          </span>
        </div>
        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          <div className="h-[0.5px] w-6 bg-ink/30" />
          <span className="font-ui text-[8px] tracking-editorial text-ink/40 uppercase">
            Est. MMXXIV
          </span>
          <div className="h-[0.5px] w-6 bg-ink/30" />
        </div>
      </div>
    );
  }

  if (isCrest) {
    return (
      <div className="w-full h-full bg-parchment flex flex-col items-center justify-center gap-2">
        <div className="border border-ink/20 w-12 h-14 flex items-center justify-center relative">
          <div className="font-elegant text-xl italic text-ink/30">L</div>
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-ink/20" />
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-1 rounded-full bg-ink/25" />
          <div className="w-1 h-1 rounded-full bg-ink/25" />
          <div className="w-1 h-1 rounded-full bg-ink/25" />
        </div>
        <div className="font-ui text-[7px] tracking-widest text-ink/30 uppercase">
          Heritage
        </div>
      </div>
    );
  }

  if (isEditorial) {
    return (
      <div className="w-full h-full bg-white flex">
        <div className="w-1/3 bg-ink/90 flex items-end p-2">
          <span className="font-display text-[8px] text-ivory/80 leading-none tracking-wide">
            EDIT
            <br />
            ORIAL
          </span>
        </div>
        <div className="flex-1 flex flex-col justify-between p-2">
          <div className="space-y-1">
            <div className="h-[2px] bg-ink/15 rounded-sm w-[80%]" />
            <div className="h-[2px] bg-ink/15 rounded-sm w-[70%]" />
            <div className="h-[2px] bg-ink/15 rounded-sm w-[60%]" />
            <div className="h-[2px] bg-ink/15 rounded-sm w-[50%]" />
          </div>
          <div className="h-[0.5px] bg-ink/20 w-full" />
        </div>
      </div>
    );
  }

  if (isFilm) {
    return (
      <div className="w-full h-full bg-ink flex">
        <div className="w-3 flex flex-col justify-around items-center py-2">
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
        </div>
        <div className="flex-1 bg-dark-gray/80" />
        <div className="w-3 flex flex-col justify-around items-center py-2">
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
          <div className="w-1.5 h-1 bg-ivory/30 rounded-[1px]" />
        </div>
      </div>
    );
  }

  if (isOldMoney) {
    return (
      <div className="w-full h-full bg-cream flex flex-col items-center justify-center gap-2 p-3">
        <div className="border border-ink/20 w-full h-full flex flex-col items-center justify-center gap-1.5">
          <div className="border border-ink/10 w-[85%] h-[85%] flex flex-col items-center justify-center gap-1.5">
            <div className="h-[0.5px] w-8 bg-ink/30" />
            <div className="font-display text-[11px] italic text-ink/40 tracking-wider text-center">
              The Estate
            </div>
            <div className="h-[0.5px] w-8 bg-ink/30" />
          </div>
        </div>
      </div>
    );
  }

  // Default Instagram white
  return (
    <div className="w-full h-full bg-white flex flex-col items-center justify-center gap-2 p-3">
      <div className="border border-ink/10 w-full h-full flex flex-col items-center justify-center gap-1.5">
        <div className="w-8 h-8 rounded-full border border-ink/15 flex items-center justify-center">
          <div className="w-3 h-3 bg-ink/10 rounded-full" />
        </div>
        <div className="space-y-1 w-full px-3">
          <div className="h-1 bg-ink/10 rounded-sm w-3/4 mx-auto" />
          <div className="h-1 bg-ink/10 rounded-sm w-1/2 mx-auto" />
        </div>
      </div>
    </div>
  );
}

function CustomThumbnail({ template }: { template: CustomTemplate }) {
  let bgColor = "bg-cream";
  try {
    const state = JSON.parse(template.canvasState);
    if (state.backgroundImage) {
      return (
        <div className="w-full h-full bg-cream overflow-hidden">
          <img
            src={state.backgroundImage}
            alt={template.name}
            className="w-full h-full object-cover"
          />
        </div>
      );
    }
    if (state.filter === "Noir") bgColor = "bg-ink/90";
  } catch {
    // ignore
  }

  return (
    <div
      className={`w-full h-full ${bgColor} flex flex-col items-center justify-center gap-2`}
    >
      <span className="font-display text-[11px] italic text-ink/50 text-center px-2 leading-snug">
        {template.name}
      </span>
      <div className="flex gap-1.5">
        <div className="w-1 h-1 rounded-full bg-ink/20" />
        <div className="w-1 h-1 rounded-full bg-ink/20" />
        <div className="w-1 h-1 rounded-full bg-ink/20" />
      </div>
    </div>
  );
}

interface TemplateCardProps {
  template: PrebuiltTemplate | CustomTemplate;
  type: "prebuilt" | "custom";
  index: number;
  onDelete?: (id: string) => void;
}

export function TemplateCard({
  template,
  type,
  index,
  onDelete,
}: TemplateCardProps) {
  const navigate = useNavigate();
  const isOldMoney = template.category === TemplateCategory.old_money;

  const handleEdit = () => {
    const state = { templateId: template.id, templateType: type };
    navigate({ to: "/editor", search: state as Record<string, string> });
  };

  return (
    <motion.article
      className={`template-card group relative cursor-pointer ${
        isOldMoney ? "border border-ink/20" : "border border-warm-gray/60"
      } bg-card overflow-hidden`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      onClick={handleEdit}
    >
      {/* Thumbnail */}
      <div className="aspect-square relative overflow-hidden">
        {type === "prebuilt" ? (
          <PrebuiltThumbnail
            hint={(template as PrebuiltTemplate).thumbnailHint}
          />
        ) : (
          <CustomThumbnail template={template as CustomTemplate} />
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-ink/0 group-hover:bg-ink/10 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-ui text-[10px] tracking-editorial text-ivory bg-ink/80 px-3 py-1.5">
            {type === "prebuilt" ? "USE TEMPLATE" : "EDIT"}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute top-2 left-2">
          <span
            className={`font-ui text-[8px] tracking-editorial px-2 py-0.5 ${
              isOldMoney
                ? "bg-parchment text-ink/60"
                : "bg-white/90 text-ink/50"
            }`}
          >
            {isOldMoney ? "OLD MONEY" : "INSTAGRAM"}
          </span>
        </div>

        {/* Custom badge */}
        {type === "custom" && (
          <div className="absolute top-2 right-2">
            <span className="font-ui text-[8px] tracking-editorial px-2 py-0.5 bg-ink text-ivory">
              MINE
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className={`p-3 ${isOldMoney ? "bg-cream" : "bg-white"}`}>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-display text-sm text-ink truncate">
              {template.name}
            </h3>
            <p className="font-ui text-[10px] text-mid-gray mt-0.5 leading-snug line-clamp-2">
              {(template as PrebuiltTemplate).description || "Custom template"}
            </p>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleEdit();
              }}
              className="p-1.5 text-mid-gray hover:text-ink transition-colors"
              title="Edit template"
            >
              <Edit3 size={12} />
            </button>
            {type === "custom" && onDelete && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(template.id);
                }}
                className="p-1.5 text-mid-gray hover:text-destructive transition-colors"
                title="Delete template"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
