import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface StripFrame {
  id: string;
  label: string;
  type: "color" | "themed";
  color?: string;
  pattern?: string;
}

interface PhotoShape {
  id: string;
  label: string;
  clipPath: string;
  borderRadius: string;
}

interface StripStickerDef {
  id: string;
  label: string;
  emoji: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const CAMERA_FILTERS = [
  { name: "Original", css: "none" },
  { name: "Warm", css: "sepia(0.3) saturate(1.3) brightness(1.05)" },
  { name: "Noir", css: "grayscale(1) contrast(1.2)" },
  {
    name: "Soft Pink",
    css: "sepia(0.2) saturate(1.5) hue-rotate(320deg) brightness(1.1)",
  },
  { name: "Dreamy", css: "blur(0.5px) brightness(1.15) saturate(0.9)" },
  { name: "Faded", css: "brightness(1.1) contrast(0.85) saturate(0.75)" },
  { name: "Cool", css: "hue-rotate(190deg) saturate(0.9) brightness(1.05)" },
  { name: "Rose", css: "sepia(0.4) saturate(2) hue-rotate(310deg)" },
  { name: "Velvet", css: "contrast(1.2) saturate(1.3) brightness(0.95)" },
  {
    name: "Film",
    css: "sepia(0.15) contrast(1.1) brightness(0.95) saturate(0.9)",
  },
  { name: "Matte", css: "contrast(0.9) brightness(1.05) saturate(0.8)" },
  { name: "Bloom", css: "brightness(1.2) saturate(1.4) contrast(0.9)" },
  { name: "Chrome", css: "grayscale(0.3) contrast(1.3) brightness(1.1)" },
  { name: "Dusk", css: "sepia(0.25) hue-rotate(340deg) brightness(0.95)" },
  {
    name: "Peach",
    css: "sepia(0.3) saturate(1.8) hue-rotate(340deg) brightness(1.05)",
  },
];

const STRIP_FRAMES: StripFrame[] = [
  { id: "white", label: "White", type: "color", color: "#ffffff" },
  { id: "cream", label: "Cream", type: "color", color: "#f5e6d3" },
  { id: "beige", label: "Beige", type: "color", color: "#d4b896" },
  { id: "baby-pink", label: "Baby Pink", type: "color", color: "#ffd1dc" },
  { id: "dusty-rose", label: "Dusty Rose", type: "color", color: "#e8b4b8" },
  { id: "lavender", label: "Lavender", type: "color", color: "#c9b3d1" },
  { id: "sage", label: "Sage", type: "color", color: "#a8c5a0" },
  { id: "peach", label: "Peach", type: "color", color: "#ffc5a1" },
  { id: "brown", label: "Chocolate", type: "color", color: "#5c3d2e" },
  { id: "black", label: "Black", type: "color", color: "#1a1a1a" },
  { id: "orange-strip", label: "Orange 🍊", type: "color", color: "#FF8C42" },
  { id: "coral-strip", label: "Coral", type: "color", color: "#F4A261" },
  { id: "mint-strip", label: "Mint 🌿", type: "color", color: "#A8E6CF" },
  { id: "sky-blue-strip", label: "Sky Blue", type: "color", color: "#87CEEB" },
  { id: "lilac-strip", label: "Lilac 💜", type: "color", color: "#C8A8E0" },
  {
    id: "soft-yellow-strip",
    label: "Lemon 🌼",
    type: "color",
    color: "#FFE066",
  },
  {
    id: "terracotta-strip",
    label: "Terracotta",
    type: "color",
    color: "#C67C52",
  },
  { id: "blush-strip", label: "Blush 🌸", type: "color", color: "#F8BBD9" },
  { id: "emerald-strip", label: "Emerald 💚", type: "color", color: "#4CAF82" },
  { id: "slate-strip", label: "Slate", type: "color", color: "#7B8FA6" },
  { id: "bows", label: "Bows 🎀", type: "themed", pattern: "bows" },
  { id: "ribbons", label: "Ribbons", type: "themed", pattern: "ribbons" },
  { id: "flowers", label: "Flowers 🌸", type: "themed", pattern: "flowers" },
  {
    id: "leopard-brown",
    label: "Leopard ♟",
    type: "themed",
    pattern: "leopard-brown",
  },
  {
    id: "leopard-black",
    label: "Leopard ◆",
    type: "themed",
    pattern: "leopard-black",
  },
  { id: "lace", label: "Lace ✦", type: "themed", pattern: "lace" },
  {
    id: "cherry-blossom",
    label: "Cherry 🌸",
    type: "themed",
    pattern: "cherry",
  },
  { id: "daisies", label: "Daisies 🌼", type: "themed", pattern: "daisies" },
  { id: "hearts", label: "Hearts 💕", type: "themed", pattern: "hearts" },
  { id: "gold-foil", label: "Gold ✨", type: "themed", pattern: "gold" },
  { id: "film-strip", label: "Film 🎞", type: "themed", pattern: "film" },
  { id: "polaroid", label: "Polaroid", type: "themed", pattern: "polaroid" },
  { id: "cottage", label: "Cottage 🌿", type: "themed", pattern: "cottage" },
  {
    id: "butterfly",
    label: "Butterfly 🦋",
    type: "themed",
    pattern: "butterfly",
  },
  {
    id: "stardust",
    label: "Stardust ⭐",
    type: "themed",
    pattern: "stardust",
  },
];

const PHOTO_SHAPES: PhotoShape[] = [
  {
    id: "rect",
    label: "Rectangle",
    clipPath: "none",
    borderRadius: "0",
  },
  {
    id: "rounded",
    label: "Rounded",
    clipPath: "none",
    borderRadius: "12px",
  },
  {
    id: "circle",
    label: "Circle",
    clipPath: "circle(50%)",
    borderRadius: "50%",
  },
  {
    id: "heart",
    label: "Heart",
    clipPath:
      "path('M 50 85 C 20 65 0 45 0 30 A 25 25 0 0 1 50 20 A 25 25 0 0 1 100 30 C 100 45 80 65 50 85 Z')",
    borderRadius: "0",
  },
  {
    id: "diamond",
    label: "Diamond",
    clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
    borderRadius: "0",
  },
];

const STRIP_STICKERS: StripStickerDef[] = [
  { id: "bunny", label: "White Bunny", emoji: "🐰" },
  { id: "bow", label: "Pink Bow", emoji: "🎀" },
  { id: "heart", label: "Heart", emoji: "🩷" },
  { id: "butterfly", label: "Butterfly", emoji: "🦋" },
  { id: "cherry", label: "Cherry Blossom", emoji: "🌸" },
  { id: "sparkle", label: "Sparkle", emoji: "✨" },
  { id: "ribbon", label: "Ribbon", emoji: "🎗️" },
  { id: "flower", label: "Flower", emoji: "🌷" },
  { id: "crown", label: "Crown", emoji: "👑" },
  { id: "pearl", label: "Pearl", emoji: "🫧" },
  { id: "star", label: "Star", emoji: "⭐" },
  { id: "moon", label: "Moon", emoji: "🌙" },
  { id: "cloud", label: "Cloud", emoji: "☁️" },
  { id: "ghost", label: "Ghost", emoji: "👻" },
  { id: "mushroom", label: "Mushroom", emoji: "🍄" },
  { id: "cat", label: "Cat", emoji: "🐱" },
  { id: "clover", label: "Clover", emoji: "🍀" },
  { id: "rainbow", label: "Rainbow", emoji: "🌈" },
  { id: "rosette", label: "Orange Rosette", emoji: "🏵️" },
];

// ── Frame style helper ────────────────────────────────────────────────────────

function getFrameStyle(frame: StripFrame): React.CSSProperties {
  if (frame.type === "color") {
    return {
      backgroundColor: frame.color,
      border: `12px solid ${frame.color}`,
    };
  }

  const patterns: Record<string, React.CSSProperties> = {
    bows: {
      background: "#ffd1dc",
      border: "12px solid #ffd1dc",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ctext y='18' font-size='16'%3E%F0%9F%8E%80%3C/text%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat",
    },
    ribbons: {
      background: "#f7c5d0",
      border: "12px solid #f7c5d0",
      backgroundImage:
        "repeating-linear-gradient(45deg, #e8b4c8 0px, #e8b4c8 4px, transparent 4px, transparent 20px)",
    },
    flowers: {
      background: "#fce4ec",
      border: "12px solid #fce4ec",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Ctext y='22' font-size='20'%3E%F0%9F%8C%B8%3C/text%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat",
    },
    "leopard-brown": {
      background: "#c8a06a",
      border: "12px solid #7a4f2a",
      backgroundImage:
        "radial-gradient(ellipse 6px 4px at 50% 50%, transparent 40%, #5c3010 42%, #5c3010 60%, transparent 62%), radial-gradient(ellipse 4px 6px at 50% 50%, transparent 40%, #5c3010 42%, #5c3010 58%, transparent 60%)",
      backgroundSize: "28px 28px",
      backgroundPosition: "0 0, 14px 14px",
    },
    "leopard-black": {
      background: "#4a4a4a",
      border: "12px solid #1a1a1a",
      backgroundImage:
        "radial-gradient(ellipse 6px 4px at 50% 50%, transparent 40%, #111 42%, #111 60%, transparent 62%), radial-gradient(ellipse 4px 6px at 50% 50%, transparent 40%, #111 42%, #111 58%, transparent 60%)",
      backgroundSize: "28px 28px",
      backgroundPosition: "0 0, 14px 14px",
    },
    lace: {
      background: "#fff8f9",
      border: "14px solid transparent",
      borderImage:
        "repeating-linear-gradient(90deg, #f0d0d8 0px, #e8b4c0 6px, #f8e0e8 12px) 14",
    },
    cherry: {
      background: "#ffe0eb",
      border: "12px solid #ffb3c9",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ctext y='20' font-size='18'%3E%F0%9F%8C%B8%3C/text%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat",
    },
    daisies: {
      background: "#fffde7",
      border: "12px solid #fff176",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Ctext y='20' font-size='18'%3E%F0%9F%8C%BC%3C/text%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat",
    },
    hearts: {
      background: "#fce4ec",
      border: "12px solid #f48fb1",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22'%3E%3Ctext y='16' font-size='14'%3E%F0%9F%A9%B7%3C/text%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat",
    },
    gold: {
      background: "#b8860b",
      border: "14px solid transparent",
      backgroundImage:
        "linear-gradient(135deg, #ffd700 0%, #b8860b 30%, #ffd700 50%, #b8860b 70%, #ffd700 100%)",
      backgroundClip: "padding-box",
    },
    film: {
      background: "#1a1a1a",
      border: "12px solid #1a1a1a",
    },
    polaroid: {
      background: "#f8f4ef",
      border: "12px solid #f8f4ef",
      borderBottom: "40px solid #f8f4ef",
    },
    cottage: {
      background: "#a8c5a0",
      border: "12px solid #7da870",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26'%3E%3Ctext y='20' font-size='18'%3E%F0%9F%8C%BF%3C/text%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat",
    },
    butterfly: {
      background: "#e8d5f0",
      border: "12px solid #c9a8e0",
      backgroundImage:
        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='28' height='28'%3E%3Ctext y='22' font-size='18'%3E%F0%9F%A6%8B%3C/text%3E%3C/svg%3E\")",
      backgroundRepeat: "repeat",
    },
    stardust: {
      background: "#1a1040",
      border: "12px solid #2d1b69",
      backgroundImage:
        "radial-gradient(circle 1px at 10% 20%, #fff 1px, transparent 1px), radial-gradient(circle 1.5px at 40% 60%, #ffd700 1.5px, transparent 1.5px), radial-gradient(circle 1px at 70% 30%, #fff 1px, transparent 1px), radial-gradient(circle 1px at 90% 80%, #c9b3d1 1px, transparent 1px)",
      backgroundSize: "60px 60px",
    },
  };

  return (
    patterns[frame.pattern ?? ""] ?? {
      background: "#ffd1dc",
      border: "12px solid #ffd1dc",
    }
  );
}

// ── Photostrip Preview ────────────────────────────────────────────────────────

interface PhotostripPreviewProps {
  photos: string[];
  frame: StripFrame;
  shape: PhotoShape;
  stickers: string[];
  showDateTime: boolean;
  stripRef: React.RefObject<HTMLDivElement | null>;
  stripCount: number;
}

function PhotostripPreview({
  photos,
  frame,
  shape,
  stickers,
  showDateTime,
  stripRef,
  stripCount,
}: PhotostripPreviewProps) {
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const frameStyle = getFrameStyle(frame);
  const isFilmFrame = frame.id === "film-strip";
  const isDarkFrame =
    frame.id === "black" ||
    frame.id === "brown" ||
    frame.id === "leopard-black" ||
    frame.id === "stardust";

  return (
    <div
      ref={stripRef}
      className="inline-flex flex-col items-center relative select-none"
      style={{
        ...frameStyle,
        padding: "16px",
        paddingBottom: "24px",
        minWidth: "220px",
        maxWidth: "260px",
        borderRadius: "4px",
        position: "relative",
      }}
    >
      {/* Film strip side holes decoration */}
      {isFilmFrame && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-3 flex flex-col justify-around items-center py-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div
                key={`lh-${n}`}
                className="w-2 h-1.5 bg-white/20 rounded-[1px]"
              />
            ))}
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-3 flex flex-col justify-around items-center py-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
              <div
                key={`rh-${n}`}
                className="w-2 h-1.5 bg-white/20 rounded-[1px]"
              />
            ))}
          </div>
        </>
      )}

      {/* Top sticker row — max 3 */}
      {stickers.length > 0 && (
        <div className="flex gap-1 mb-2 text-lg">
          {stickers.slice(0, 3).map((sid) => {
            const s = STRIP_STICKERS.find((x) => x.id === sid);
            return s ? (
              <span key={sid} className="drop-shadow-sm">
                {s.emoji}
              </span>
            ) : null;
          })}
        </div>
      )}

      {/* Photos */}
      <div className="flex flex-col gap-2 w-full">
        {Array.from({ length: stripCount }, (_, idx) => {
          const slotKey = `slot-${stripCount}-${idx}`;
          return (
            <div
              key={slotKey}
              className="relative overflow-hidden"
              style={{
                width: "100%",
                aspectRatio: "4/3",
                borderRadius: shape.borderRadius,
                clipPath:
                  shape.clipPath !== "none" ? shape.clipPath : undefined,
                background: photos[idx] ? undefined : "oklch(0.88 0.055 5)",
              }}
            >
              {photos[idx] ? (
                <img
                  src={photos[idx]}
                  alt={`Captured moment ${idx + 1}`}
                  className="w-full h-full object-cover"
                  style={{ display: "block" }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl opacity-40">
                  📷
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Date & Time — always before logo */}
      {showDateTime && (
        <p
          className="mt-2 text-center text-[10px] tracking-wide opacity-70"
          style={{
            fontFamily: "'Quicksand', sans-serif",
            color: isDarkFrame ? "#fff" : "#555",
          }}
        >
          {dateStr} · {timeStr}
        </p>
      )}

      {/* Logo — always at the very bottom */}
      <p
        className="mt-2 text-center text-[11px]"
        style={{
          fontFamily: "'Great Vibes', cursive",
          color: isDarkFrame ? "#f8e8ee" : "#c06080",
          fontSize: "13px",
        }}
      >
        ~Lamen Dei Photobooth~
      </p>
    </div>
  );
}

// ── Main PhotoboothPage ───────────────────────────────────────────────────────

type BoothPhase = "setup" | "countdown" | "capturing" | "result";

export function PhotoboothPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [phase, setPhase] = useState<BoothPhase>("setup");
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState(5);
  const [currentShot, setCurrentShot] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState(CAMERA_FILTERS[0]);
  const [selectedFrame, setSelectedFrame] = useState(STRIP_FRAMES[3]); // baby-pink default
  const [selectedShape, setSelectedShape] = useState(PHOTO_SHAPES[1]); // rounded default
  const [selectedStickers, setSelectedStickers] = useState<string[]>([]);
  const [showDateTime, setShowDateTime] = useState(true);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const stripCount = 3;

  // Start webcam
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 1280 }, height: { ideal: 720 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (err) {
      setCameraError(
        "Camera access denied. Please allow camera permissions and reload.",
      );
      console.error(err);
    }
  }, []);

  // Stop webcam
  const stopCamera = useCallback(() => {
    const tracks = streamRef.current?.getTracks() ?? [];
    for (const t of tracks) t.stop();
    streamRef.current = null;
  }, []);

  useEffect(() => {
    startCamera();
    return () => stopCamera();
  }, [startCamera, stopCamera]);

  // Capture a single photo
  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return null;
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    ctx.filter = selectedFilter.css === "none" ? "none" : selectedFilter.css;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    ctx.filter = "none";
    return canvas.toDataURL("image/jpeg", 0.92);
  }, [selectedFilter]);

  // Start photo session
  const startSession = useCallback(() => {
    setPhotos([]);
    setCurrentShot(0);
    setPhase("countdown");
    setCountdown(5);
  }, []);

  // Countdown + capture loop
  useEffect(() => {
    if (phase !== "countdown") return;
    if (countdown > 0) {
      const t = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(t);
    }
    // countdown hit 0 → capture
    setPhase("capturing");
    const dataUrl = capturePhoto();
    if (dataUrl) {
      setPhotos((prev) => {
        const next = [...prev, dataUrl];
        if (next.length < stripCount) {
          // schedule next countdown
          setTimeout(() => {
            setCurrentShot(next.length);
            setCountdown(5);
            setPhase("countdown");
          }, 500);
        } else {
          // done
          setPhase("result");
        }
        return next;
      });
    }
  }, [phase, countdown, capturePhoto]);

  // Reset
  const handleReset = () => {
    setPhotos([]);
    setCurrentShot(0);
    setPhase("setup");
    startCamera();
  };

  // Build canvas for export
  const buildStripCanvas = useCallback(async (): Promise<HTMLCanvasElement> => {
    // 2x pixel density for high-quality export
    const SCALE = 2;
    const STRIP_W = 340;
    const PHOTO_H = 240;
    const PHOTO_W = STRIP_W - 64;
    const GAP = 10;
    const PADDING = 20;
    const META_H = showDateTime ? 32 : 0;
    const LOGO_H = 28;
    const STICKER_H = selectedStickers.length > 0 ? 32 : 0;
    const TOTAL_H =
      PADDING * 2 +
      STICKER_H +
      (PHOTO_H + GAP) * stripCount -
      GAP +
      META_H +
      LOGO_H;

    const c = document.createElement("canvas");
    c.width = STRIP_W * SCALE;
    c.height = TOTAL_H * SCALE;
    const ctx = c.getContext("2d")!;
    ctx.scale(SCALE, SCALE);

    // Background
    const frameStyle = getFrameStyle(selectedFrame);
    ctx.fillStyle =
      selectedFrame.type === "color"
        ? selectedFrame.color!
        : (frameStyle.background as string) || "#ffd1dc";
    ctx.fillRect(0, 0, STRIP_W, TOTAL_H);

    let yPos = PADDING;

    // Top stickers — max 3
    if (selectedStickers.length > 0) {
      ctx.font = "22px serif";
      ctx.textAlign = "center";
      const topStickers = selectedStickers.slice(0, 3);
      const startX = STRIP_W / 2 - ((topStickers.length - 1) * 28) / 2;
      topStickers.forEach((sid, i) => {
        const s = STRIP_STICKERS.find((x) => x.id === sid);
        if (s) ctx.fillText(s.emoji, startX + i * 28, yPos + 22);
      });
      yPos += STICKER_H;
    }

    // Photos
    for (let i = 0; i < stripCount; i++) {
      const photoDataUrl = photos[i];
      if (photoDataUrl) {
        await new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = () => {
            const x = (STRIP_W - PHOTO_W) / 2;
            ctx.save();
            // Apply shape clip
            if (selectedShape.id === "circle") {
              ctx.beginPath();
              ctx.arc(
                x + PHOTO_W / 2,
                yPos + PHOTO_H / 2,
                Math.min(PHOTO_W, PHOTO_H) / 2,
                0,
                Math.PI * 2,
              );
              ctx.clip();
            } else if (selectedShape.id === "diamond") {
              ctx.beginPath();
              ctx.moveTo(x + PHOTO_W / 2, yPos);
              ctx.lineTo(x + PHOTO_W, yPos + PHOTO_H / 2);
              ctx.lineTo(x + PHOTO_W / 2, yPos + PHOTO_H);
              ctx.lineTo(x, yPos + PHOTO_H / 2);
              ctx.closePath();
              ctx.clip();
            } else if (selectedShape.id === "rounded") {
              ctx.beginPath();
              ctx.roundRect(x, yPos, PHOTO_W, PHOTO_H, 12);
              ctx.clip();
            } else if (selectedShape.id === "heart") {
              // Heart clip on canvas
              const hw = PHOTO_W / 2;
              const hh = PHOTO_H / 2;
              const cx = x + hw;
              const cy = yPos + hh;
              ctx.beginPath();
              ctx.moveTo(cx, cy + hh * 0.85);
              ctx.bezierCurveTo(
                cx - hw,
                cy + hh * 0.35,
                cx - hw,
                cy - hh * 0.15,
                cx,
                cy - hh * 0.15,
              );
              ctx.bezierCurveTo(
                cx + hw,
                cy - hh * 0.15,
                cx + hw,
                cy + hh * 0.35,
                cx,
                cy + hh * 0.85,
              );
              ctx.closePath();
              ctx.clip();
            }
            // Draw image maintaining aspect ratio (cover)
            const imgAspect = img.naturalWidth / img.naturalHeight;
            const boxAspect = PHOTO_W / PHOTO_H;
            let sx = 0;
            let sy = 0;
            let sw = img.naturalWidth;
            let sh = img.naturalHeight;
            if (imgAspect > boxAspect) {
              sw = img.naturalHeight * boxAspect;
              sx = (img.naturalWidth - sw) / 2;
            } else {
              sh = img.naturalWidth / boxAspect;
              sy = (img.naturalHeight - sh) / 2;
            }
            ctx.drawImage(img, sx, sy, sw, sh, x, yPos, PHOTO_W, PHOTO_H);
            ctx.restore();
            resolve();
          };
          img.src = photoDataUrl;
        });
      } else {
        // Placeholder
        ctx.fillStyle = "#f8d7e3";
        ctx.fillRect((STRIP_W - PHOTO_W) / 2, yPos, PHOTO_W, PHOTO_H);
      }
      yPos += PHOTO_H + GAP;
    }

    // Date/time — always before logo
    if (showDateTime) {
      const isDarkFrameLocal =
        selectedFrame.id === "black" ||
        selectedFrame.id === "brown" ||
        selectedFrame.id === "leopard-black" ||
        selectedFrame.id === "stardust";
      ctx.fillStyle = isDarkFrameLocal ? "#f8e8ee" : "#666666";
      ctx.font = "11px 'Quicksand', sans-serif";
      ctx.textAlign = "center";
      const now = new Date();
      ctx.fillText(
        `${now.toLocaleDateString()} · ${now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}`,
        STRIP_W / 2,
        yPos + 18,
      );
      yPos += META_H;
    }

    // Logo — always at the very bottom, fixed position
    const isDarkFrame =
      selectedFrame.id === "black" ||
      selectedFrame.id === "brown" ||
      selectedFrame.id === "leopard-black" ||
      selectedFrame.id === "stardust";
    ctx.fillStyle = isDarkFrame ? "#f8e8ee" : "#c06080";
    ctx.font = "16px 'Great Vibes', cursive";
    ctx.textAlign = "center";
    ctx.fillText("~Lamen Dei Photobooth~", STRIP_W / 2, yPos + 22);

    return c;
  }, [photos, selectedFrame, selectedShape, selectedStickers, showDateTime]);

  // Download
  const handleDownload = async () => {
    const c = await buildStripCanvas();
    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = `bessy-booth-${Date.now()}.png`;
    a.click();
  };

  // Print — uses canvas for full quality, no DOM HTML injection
  const handlePrint = async () => {
    const c = await buildStripCanvas();
    const dataUrl = c.toDataURL("image/png");
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(`
      <html><head>
        <style>
          @page { margin: 0; size: auto; }
          body { margin: 0; padding: 0; background: white; display: flex; justify-content: center; align-items: flex-start; min-height: 100vh; }
          img { max-width: 100%; max-height: 100vh; object-fit: contain; display: block; }
        </style>
      </head><body><img src="${dataUrl}" alt="Bessy Booth Strip" /></body></html>
    `);
    w.document.close();
    setTimeout(() => {
      w.print();
      w.close();
    }, 500);
  };

  // Copy
  const handleCopy = async () => {
    try {
      const c = await buildStripCanvas();
      c.toBlob(async (blob) => {
        if (!blob) return;
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": blob }),
        ]);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      });
    } catch {
      // fallback
    }
  };

  // Share
  const handleShare = async () => {
    try {
      const c = await buildStripCanvas();
      c.toBlob(async (blob) => {
        if (!blob) return;
        const file = new File([blob], "bessy-booth.png", {
          type: "image/png",
        });
        if (navigator.share && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: "~Bessy Booth~ Photos",
          });
        } else {
          handleCopy();
        }
      });
    } catch {
      handleCopy();
    }
  };

  const toggleSticker = (id: string) => {
    setSelectedStickers((prev) => {
      if (prev.includes(id)) return prev.filter((s) => s !== id);
      if (prev.length >= 3) return prev; // max 3 stickers
      return [...prev, id];
    });
  };

  return (
    <main
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.93 0.04 15) 0%, oklch(0.92 0.055 5) 30%, oklch(0.88 0.055 290 / 0.4) 60%, oklch(0.90 0.06 50 / 0.3) 100%)",
      }}
    >
      {/* Blurred background blobs */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -top-32 -right-32 w-[500px] h-[500px] rounded-full opacity-30"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.07 350) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.055 290) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-[300px] h-[300px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, oklch(0.90 0.06 50) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          {/* Decorative top ornament */}
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-lg">🎀</span>
            <div className="h-px w-16 bg-gradient-to-r from-transparent via-pink-300/60 to-pink-300/60" />
            <span className="text-xl">✿</span>
            <div className="h-px w-16 bg-gradient-to-l from-transparent via-pink-300/60 to-pink-300/60" />
            <span className="text-lg">🎀</span>
          </div>

          <h1
            className="text-5xl sm:text-6xl mb-2"
            style={{
              fontFamily: "'Great Vibes', cursive",
              color: "oklch(0.45 0.15 350)",
            }}
          >
            ~Bessy Booth~
          </h1>

          <p
            className="text-sm text-pink-400/70 mt-1"
            style={{ fontFamily: "'Quicksand', sans-serif" }}
          >
            Capture your sweetest moments ✨
          </p>

          {/* Decorative divider */}
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="h-px w-24 bg-gradient-to-r from-transparent to-pink-200" />
            <span className="text-pink-300 text-xs">✦</span>
            <span className="text-pink-200 text-xs">♡</span>
            <span className="text-pink-300 text-xs">✦</span>
            <div className="h-px w-24 bg-gradient-to-l from-transparent to-pink-200" />
          </div>
        </motion.div>

        {/* Main layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* LEFT: Camera / Result */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {phase === "result" ? (
              // Result: show strip
              <div className="rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-6 flex flex-col items-center gap-4">
                <h2
                  className="text-xl text-center"
                  style={{
                    fontFamily: "'Sacramento', cursive",
                    color: "oklch(0.45 0.15 350)",
                  }}
                >
                  Your Photostrip ♡
                </h2>

                <div className="overflow-auto max-h-[600px] flex justify-center">
                  <PhotostripPreview
                    photos={photos}
                    frame={selectedFrame}
                    shape={selectedShape}
                    stickers={selectedStickers}
                    showDateTime={showDateTime}
                    stripRef={stripRef}
                    stripCount={stripCount}
                  />
                </div>

                {/* Action buttons */}
                <div className="grid grid-cols-2 gap-2 w-full max-w-xs mt-2">
                  <button
                    type="button"
                    onClick={handleDownload}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-medium text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.18 350), oklch(0.55 0.2 350))",
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    ⬇ Download
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-medium text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.12 290), oklch(0.55 0.14 290))",
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    🖨 Print
                  </button>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-medium text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    style={{
                      background: isCopied
                        ? "linear-gradient(135deg, oklch(0.6 0.15 140), oklch(0.5 0.17 140))"
                        : "linear-gradient(135deg, oklch(0.65 0.12 50), oklch(0.55 0.15 50))",
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    {isCopied ? "✓ Copied!" : "📋 Copy"}
                  </button>
                  <button
                    type="button"
                    onClick={handleShare}
                    className="flex items-center justify-center gap-1.5 py-2.5 rounded-full text-sm font-medium text-white shadow-sm transition-all hover:scale-105 active:scale-95"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.65 0.18 5), oklch(0.55 0.2 5))",
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    🔗 Share
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleReset}
                  className="text-sm text-pink-400/70 hover:text-pink-500 transition-colors underline-offset-2 hover:underline mt-1"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  ↺ Take new photos
                </button>
              </div>
            ) : (
              // Camera view
              <div className="rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-4 flex flex-col gap-3">
                {cameraError ? (
                  <div className="aspect-video rounded-xl bg-pink-50 flex items-center justify-center p-6 text-center">
                    <div>
                      <p className="text-3xl mb-3">📷</p>
                      <p
                        className="text-pink-500/80 text-sm"
                        style={{ fontFamily: "'Quicksand', sans-serif" }}
                      >
                        {cameraError}
                      </p>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="mt-3 px-4 py-2 rounded-full text-sm text-white"
                        style={{
                          background: "oklch(0.65 0.18 350)",
                          fontFamily: "'Quicksand', sans-serif",
                        }}
                      >
                        Try again
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="relative aspect-video rounded-xl overflow-hidden bg-pink-50">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                      style={{ filter: selectedFilter.css }}
                    />

                    {/* Countdown overlay */}
                    <AnimatePresence>
                      {phase === "countdown" && (
                        <motion.div
                          className="absolute inset-0 flex flex-col items-center justify-center"
                          style={{ background: "rgba(255,200,220,0.15)" }}
                        >
                          <motion.div
                            key={countdown}
                            initial={{ scale: 1.6, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.6, opacity: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 20,
                            }}
                            className="text-8xl font-bold drop-shadow-lg"
                            style={{
                              fontFamily: "'Great Vibes', cursive",
                              color: "oklch(0.45 0.2 350)",
                              textShadow: "0 2px 12px rgba(255,150,180,0.5)",
                            }}
                          >
                            {countdown > 0 ? countdown : "✨"}
                          </motion.div>
                          <p
                            className="text-pink-400/80 text-sm mt-2"
                            style={{ fontFamily: "'Quicksand', sans-serif" }}
                          >
                            Photo {currentShot + 1} of {stripCount}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Progress dots */}
                    {(phase === "countdown" || phase === "capturing") && (
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                        {Array.from({ length: stripCount }, (_, i) => {
                          const dotKey = `dot-${stripCount}-${i}`;
                          return (
                            <div
                              key={dotKey}
                              className="w-2 h-2 rounded-full transition-all duration-300"
                              style={{
                                background:
                                  i < photos.length
                                    ? "oklch(0.65 0.2 350)"
                                    : i === currentShot
                                      ? "oklch(0.75 0.15 350)"
                                      : "rgba(255,255,255,0.5)",
                              }}
                            />
                          );
                        })}
                      </div>
                    )}

                    {/* Shooting flash */}
                    {phase === "capturing" && (
                      <motion.div
                        className="absolute inset-0 bg-white"
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      />
                    )}
                  </div>
                )}

                {/* Start button */}
                {phase === "setup" && !cameraError && (
                  <motion.button
                    type="button"
                    onClick={startSession}
                    className="w-full py-3.5 rounded-2xl text-white text-base font-semibold shadow-md transition-all"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(0.72 0.18 350) 0%, oklch(0.62 0.2 350) 100%)",
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    🎀 Start Session · {stripCount} Photos
                  </motion.button>
                )}

                {/* Filter strip */}
                <div>
                  <p
                    className="text-[10px] uppercase tracking-wider text-pink-400/70 mb-2"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Camera Filter
                  </p>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {CAMERA_FILTERS.map((f) => (
                      <button
                        key={f.name}
                        type="button"
                        onClick={() => setSelectedFilter(f)}
                        className="flex-shrink-0 px-2.5 py-1.5 rounded-full text-xs transition-all border"
                        style={{
                          fontFamily: "'Quicksand', sans-serif",
                          borderColor:
                            selectedFilter.name === f.name
                              ? "oklch(0.65 0.18 350)"
                              : "oklch(0.88 0.055 5)",
                          background:
                            selectedFilter.name === f.name
                              ? "oklch(0.88 0.07 350)"
                              : "rgba(255,255,255,0.5)",
                          color:
                            selectedFilter.name === f.name
                              ? "oklch(0.4 0.18 350)"
                              : "oklch(0.5 0.05 350)",
                        }}
                      >
                        {f.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>

          {/* RIGHT: Controls */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col gap-4"
          >
            {/* Frame Selection */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-4">
              <h3
                className="text-sm mb-3"
                style={{
                  fontFamily: "'Sacramento', cursive",
                  color: "oklch(0.45 0.15 350)",
                  fontSize: "20px",
                }}
              >
                Strip Frame ✦
              </h3>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                {STRIP_FRAMES.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setSelectedFrame(f)}
                    title={f.label}
                    className="flex-shrink-0 flex flex-col items-center gap-1 group"
                  >
                    <div
                      className="w-8 h-10 rounded-sm border-2 transition-all"
                      style={{
                        ...(f.type === "color"
                          ? { background: f.color }
                          : getFrameStyle(f)),
                        borderColor:
                          selectedFrame.id === f.id
                            ? "oklch(0.65 0.18 350)"
                            : "transparent",
                        transform:
                          selectedFrame.id === f.id ? "scale(1.1)" : "scale(1)",
                        boxShadow:
                          selectedFrame.id === f.id
                            ? "0 0 0 2px oklch(0.88 0.07 350)"
                            : "none",
                      }}
                    />
                    <span
                      className="text-[8px] text-center leading-tight max-w-[40px] truncate"
                      style={{
                        fontFamily: "'Quicksand', sans-serif",
                        color: "oklch(0.55 0.08 350)",
                      }}
                    >
                      {f.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Shape */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-4">
              <h3
                className="text-sm mb-3"
                style={{
                  fontFamily: "'Sacramento', cursive",
                  color: "oklch(0.45 0.15 350)",
                  fontSize: "20px",
                }}
              >
                Photo Shape ✦
              </h3>
              <div className="flex gap-3 flex-wrap">
                {PHOTO_SHAPES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedShape(s)}
                    className="flex flex-col items-center gap-1 transition-all hover:scale-105"
                  >
                    <div
                      className="w-12 h-9 border-2 transition-all"
                      style={{
                        borderColor:
                          selectedShape.id === s.id
                            ? "oklch(0.65 0.18 350)"
                            : "oklch(0.82 0.055 5)",
                        borderRadius: s.borderRadius,
                        clipPath:
                          s.clipPath !== "none" ? s.clipPath : undefined,
                        background:
                          selectedShape.id === s.id
                            ? "oklch(0.88 0.07 350)"
                            : "oklch(0.93 0.04 15)",
                      }}
                    />
                    <span
                      className="text-[10px]"
                      style={{
                        fontFamily: "'Quicksand', sans-serif",
                        color: "oklch(0.5 0.1 350)",
                      }}
                    >
                      {s.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Stickers */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-md shadow-lg p-4">
              <h3
                className="text-sm mb-3"
                style={{
                  fontFamily: "'Sacramento', cursive",
                  color: "oklch(0.45 0.15 350)",
                  fontSize: "20px",
                }}
              >
                Strip Stickers ✦
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {STRIP_STICKERS.map((s) => {
                  const isSelected = selectedStickers.includes(s.id);
                  const isDisabled =
                    !isSelected && selectedStickers.length >= 3;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      title={isDisabled ? "Max 3 stickers" : s.label}
                      onClick={() => toggleSticker(s.id)}
                      disabled={isDisabled}
                      className="flex flex-col items-center gap-0.5 p-1.5 rounded-xl text-xl transition-all hover:scale-110 active:scale-95"
                      style={{
                        background: isSelected
                          ? "oklch(0.88 0.07 350)"
                          : "rgba(255,255,255,0.4)",
                        border: isSelected
                          ? "1.5px solid oklch(0.65 0.18 350)"
                          : "1.5px solid transparent",
                        opacity: isDisabled ? 0.35 : 1,
                        cursor: isDisabled ? "not-allowed" : "pointer",
                      }}
                    >
                      {s.emoji}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2 flex items-center justify-between">
                <span
                  className="text-[10px] text-pink-400/60"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  {selectedStickers.length}/3 selected
                </span>
                {selectedStickers.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedStickers([])}
                    className="text-[10px] text-pink-400/60 hover:text-pink-500 transition-colors"
                    style={{ fontFamily: "'Quicksand', sans-serif" }}
                  >
                    Clear all
                  </button>
                )}
              </div>
            </div>

            {/* Date/Time toggle */}
            <div className="rounded-2xl bg-white/60 backdrop-blur-md shadow-lg px-4 py-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={showDateTime}
                    onChange={(e) => setShowDateTime(e.target.checked)}
                  />
                  <div
                    className="w-10 h-5 rounded-full transition-all duration-300"
                    style={{
                      background: showDateTime
                        ? "oklch(0.65 0.18 350)"
                        : "oklch(0.82 0.008 60)",
                    }}
                  />
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-300"
                    style={{ left: showDateTime ? "22px" : "2px" }}
                  />
                </div>
                <span
                  className="text-sm"
                  style={{
                    fontFamily: "'Quicksand', sans-serif",
                    color: "oklch(0.45 0.1 350)",
                  }}
                >
                  Show Date & Time on strip
                </span>
              </label>
            </div>

            {/* Preview mini-strip hint */}
            {phase === "result" && (
              <div
                className="rounded-2xl bg-white/40 backdrop-blur-sm p-3 text-center text-xs text-pink-400/60"
                style={{ fontFamily: "'Quicksand', sans-serif" }}
              >
                ✦ Scroll up to see your photostrip preview ✦
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Footer */}
      <footer className="relative z-10 text-center py-6 mt-4">
        <p
          className="text-xs text-pink-300/50"
          style={{ fontFamily: "'Quicksand', sans-serif" }}
        >
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-pink-400/70 transition-colors"
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>
    </main>
  );
}
