import type {
  CanvasState,
  FrameType,
  Layer,
  StickerLayer,
  TextLayer,
} from "../types/canvas";
import { getFilterCss } from "./filters";

/**
 * Renders the canvas state to a new offscreen canvas and returns a blob URL for download.
 */
export async function exportCanvasAsPng(
  state: CanvasState,
  width: number,
  height: number,
): Promise<string> {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Cannot get canvas context");

  // Background
  ctx.fillStyle = "#f8f5f0";
  ctx.fillRect(0, 0, width, height);

  // Draw background image with filter (approximate via image draw)
  if (state.backgroundImage) {
    await new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, width, height);
        resolve();
      };
      img.onerror = reject;
      img.src = state.backgroundImage!;
    });
  }

  // Draw frame
  drawFrame(ctx, state.frame, width, height);

  // Draw text layers
  for (const layer of state.layers) {
    if (layer.type === "text") {
      drawTextLayer(ctx, layer, width, height);
    } else if (layer.type === "sticker") {
      drawStickerLayer(ctx, layer, width, height);
    }
  }

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(URL.createObjectURL(blob));
      }
    }, "image/png");
  });
}

function drawFrame(
  ctx: CanvasRenderingContext2D,
  frame: FrameType,
  w: number,
  h: number,
) {
  ctx.strokeStyle = "#1a1a1a";
  const margin = Math.min(w, h) * 0.03;

  switch (frame) {
    case "thin":
      ctx.lineWidth = 1;
      ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);
      break;
    case "double":
      ctx.lineWidth = 0.5;
      ctx.strokeRect(margin, margin, w - margin * 2, h - margin * 2);
      ctx.strokeRect(
        margin + 6,
        margin + 6,
        w - margin * 2 - 12,
        h - margin * 2 - 12,
      );
      break;
    case "corners": {
      ctx.lineWidth = 1.5;
      const cs = Math.min(w, h) * 0.07; // corner size
      // TL
      ctx.beginPath();
      ctx.moveTo(margin, margin + cs);
      ctx.lineTo(margin, margin);
      ctx.lineTo(margin + cs, margin);
      ctx.stroke();
      // TR
      ctx.beginPath();
      ctx.moveTo(w - margin - cs, margin);
      ctx.lineTo(w - margin, margin);
      ctx.lineTo(w - margin, margin + cs);
      ctx.stroke();
      // BL
      ctx.beginPath();
      ctx.moveTo(margin, h - margin - cs);
      ctx.lineTo(margin, h - margin);
      ctx.lineTo(margin + cs, h - margin);
      ctx.stroke();
      // BR
      ctx.beginPath();
      ctx.moveTo(w - margin - cs, h - margin);
      ctx.lineTo(w - margin, h - margin);
      ctx.lineTo(w - margin, h - margin - cs);
      ctx.stroke();
      break;
    }
    case "film": {
      ctx.fillStyle = "#1a1a1a";
      const sw = Math.min(w, h) * 0.06;
      // left strip
      ctx.fillRect(0, 0, sw, h);
      ctx.fillRect(w - sw, 0, sw, h);
      // perforations
      ctx.fillStyle = "#f8f5f0";
      const perfCount = Math.floor(h / (sw * 1.5));
      for (let i = 0; i < perfCount; i++) {
        const py = (h / perfCount) * i + sw * 0.25;
        const ph = sw * 0.5;
        ctx.fillRect(sw * 0.15, py, sw * 0.7, ph);
        ctx.fillRect(w - sw * 0.85, py, sw * 0.7, ph);
      }
      break;
    }
    case "vignette": {
      const radGrad = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.3,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.8,
      );
      radGrad.addColorStop(0, "rgba(0,0,0,0)");
      radGrad.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);
      break;
    }
    default:
      break;
  }
}

function drawTextLayer(
  ctx: CanvasRenderingContext2D,
  layer: TextLayer,
  w: number,
  h: number,
) {
  const x = layer.x * w;
  const y = layer.y * h;
  const size = layer.fontSize * Math.min(w, h) * 0.001;

  ctx.save();
  const fontStyle = layer.italic ? "italic " : "";
  const fontWeight = layer.bold ? "700" : "400";
  const fontFam =
    layer.fontFamily === "serif"
      ? "Playfair Display, Georgia, serif"
      : "Jost, system-ui, sans-serif";
  ctx.font = `${fontStyle}${fontWeight} ${size}px ${fontFam}`;
  ctx.fillStyle = layer.color;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(layer.text, x, y);
  ctx.restore();
}

function drawStickerLayer(
  ctx: CanvasRenderingContext2D,
  layer: StickerLayer,
  w: number,
  h: number,
) {
  const x = layer.x * w;
  const y = layer.y * h;
  const size = layer.size * Math.min(w, h) * 0.001;

  ctx.save();
  ctx.strokeStyle = layer.color;
  ctx.fillStyle = layer.color;
  ctx.lineWidth = 1;
  ctx.translate(x, y);

  switch (layer.stickerType) {
    case "star":
      drawStar(ctx, 0, 0, size, 5);
      break;
    case "crescent":
      drawCrescent(ctx, 0, 0, size);
      break;
    case "dots":
      drawDots(ctx, 0, 0, size);
      break;
    case "divider":
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.stroke();
      break;
    case "diamond":
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.7);
      ctx.lineTo(size * 0.5, 0);
      ctx.lineTo(0, size * 0.7);
      ctx.lineTo(-size * 0.5, 0);
      ctx.closePath();
      ctx.fill();
      break;
  }
  ctx.restore();
}

function drawStar(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
  points: number,
) {
  const innerR = r * 0.4;
  ctx.beginPath();
  for (let i = 0; i < points * 2; i++) {
    const angle = (Math.PI / points) * i - Math.PI / 2;
    const radius = i % 2 === 0 ? r : innerR;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fill();
}

function drawCrescent(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "destination-out";
  ctx.beginPath();
  ctx.arc(cx + r * 0.4, cy - r * 0.1, r * 0.75, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalCompositeOperation = "source-over";
}

function drawDots(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  r: number,
) {
  const count = 3;
  const spacing = r * 0.5;
  for (let i = -count; i <= count; i++) {
    for (let j = -count; j <= count; j++) {
      ctx.beginPath();
      ctx.arc(cx + i * spacing, cy + j * spacing, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
