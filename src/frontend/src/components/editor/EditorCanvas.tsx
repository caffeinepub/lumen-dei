import { motion } from "motion/react";
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react";
import type {
  CanvasState,
  Layer,
  StickerLayer,
  TextLayer,
} from "../../types/canvas";
import { getFilterCss } from "../../utils/filters";

interface FrameOverlayProps {
  frame: CanvasState["frame"];
}

function FrameOverlay({ frame }: FrameOverlayProps) {
  if (frame === "none") return null;

  return (
    <div className="absolute inset-0 pointer-events-none">
      {frame === "thin" && (
        <div className="absolute inset-[3%] border border-ink/70" />
      )}
      {frame === "double" && (
        <>
          <div className="absolute inset-[3%] border border-ink/50" />
          <div className="absolute inset-[4.5%] border border-ink/30" />
        </>
      )}
      {frame === "corners" && (
        <>
          <div className="absolute top-[3%] left-[3%] w-[8%] h-[8%] border-t-[1.5px] border-l-[1.5px] border-ink/70" />
          <div className="absolute top-[3%] right-[3%] w-[8%] h-[8%] border-t-[1.5px] border-r-[1.5px] border-ink/70" />
          <div className="absolute bottom-[3%] left-[3%] w-[8%] h-[8%] border-b-[1.5px] border-l-[1.5px] border-ink/70" />
          <div className="absolute bottom-[3%] right-[3%] w-[8%] h-[8%] border-b-[1.5px] border-r-[1.5px] border-ink/70" />
        </>
      )}
      {frame === "film" && (
        <>
          <div className="absolute top-0 left-0 bottom-0 w-[7%] bg-ink flex flex-col justify-around items-center py-2">
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
          </div>
          <div className="absolute top-0 right-0 bottom-0 w-[7%] bg-ink flex flex-col justify-around items-center py-2">
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
            <div className="w-[60%] h-[4%] bg-ivory/25 rounded-[1px]" />
          </div>
        </>
      )}
      {frame === "vignette" && (
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, transparent 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />
      )}
      {frame === "orange" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #FF8C42" }}
        />
      )}
      {frame === "coral-frame" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #F4A261" }}
        />
      )}
      {frame === "mint-frame" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #A8E6CF" }}
        />
      )}
      {frame === "sky-blue" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #87CEEB" }}
        />
      )}
      {frame === "lilac-frame" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #C8A8E0" }}
        />
      )}
      {frame === "soft-yellow" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #FFE066" }}
        />
      )}
      {frame === "terracotta" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #C67C52" }}
        />
      )}
      {frame === "blush-frame" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #F8BBD9" }}
        />
      )}
      {frame === "emerald-frame" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #4CAF82" }}
        />
      )}
      {frame === "slate-frame" && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ boxShadow: "inset 0 0 0 14px #7B8FA6" }}
        />
      )}
    </div>
  );
}

interface TextLayerElProps {
  layer: TextLayer;
  isSelected: boolean;
  canvasSize: number;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
}

function TextLayerEl({
  layer,
  isSelected,
  canvasSize,
  onSelect,
  onDragEnd,
}: TextLayerElProps) {
  // fontFamily is now a full CSS font-family string; fall back for legacy values
  const fontFam =
    layer.fontFamily === "serif"
      ? '"Playfair Display", Georgia, serif'
      : layer.fontFamily === "sans"
        ? '"Jost", system-ui, sans-serif'
        : layer.fontFamily;

  return (
    <motion.div
      tabIndex={0}
      aria-label={`Text layer: ${layer.text}`}
      drag
      dragMomentum={false}
      onDragEnd={(_, info) => {
        const container = document.getElementById("canvas-container");
        if (!container) return;
        const newX = (layer.x * canvasSize + info.offset.x) / canvasSize;
        const newY = (layer.y * canvasSize + info.offset.y) / canvasSize;
        onDragEnd(
          layer.id,
          Math.max(0, Math.min(1, newX)),
          Math.max(0, Math.min(1, newY)),
        );
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(layer.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
          onSelect(layer.id);
        }
      }}
      style={{
        position: "absolute",
        left: `${layer.x * 100}%`,
        top: `${layer.y * 100}%`,
        transform: "translate(-50%, -50%)",
        cursor: "move",
        userSelect: "none",
        fontFamily: fontFam,
        fontSize: `${layer.fontSize * (canvasSize / 500)}px`,
        fontWeight: layer.bold ? 700 : 400,
        fontStyle: layer.italic ? "italic" : "normal",
        color: layer.color,
        textShadow: "0 1px 2px rgba(0,0,0,0.1)",
        outline: isSelected ? "1.5px dashed oklch(0.55 0.006 60)" : "none",
        outlineOffset: "4px",
        padding: "2px 4px",
        whiteSpace: "nowrap",
        zIndex: 10,
      }}
    >
      {layer.text}
    </motion.div>
  );
}

interface StickerLayerElProps {
  layer: StickerLayer;
  isSelected: boolean;
  canvasSize: number;
  onSelect: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => void;
}

function StickerSvg({
  layer,
  sizeInPx,
}: { layer: StickerLayer; sizeInPx: number }) {
  if (layer.stickerType === "star") {
    return (
      <svg
        width={sizeInPx}
        height={sizeInPx}
        viewBox="0 0 24 24"
        fill={layer.color}
        aria-hidden="true"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    );
  }
  if (layer.stickerType === "crescent") {
    return (
      <svg
        width={sizeInPx}
        height={sizeInPx}
        viewBox="0 0 24 24"
        fill={layer.color}
        aria-hidden="true"
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    );
  }
  if (layer.stickerType === "dots") {
    return (
      <svg
        width={sizeInPx}
        height={sizeInPx}
        viewBox="0 0 24 24"
        fill={layer.color}
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
  if (layer.stickerType === "divider") {
    return (
      <svg
        width={sizeInPx * 2}
        height={sizeInPx * 0.4}
        viewBox="0 0 48 6"
        stroke={layer.color}
        strokeWidth={0.5}
        fill="none"
        aria-hidden="true"
      >
        <line x1={0} y1={3} x2={48} y2={3} />
        <circle cx={24} cy={3} r={1.5} fill={layer.color} />
      </svg>
    );
  }
  if (layer.stickerType === "diamond") {
    return (
      <svg
        width={sizeInPx}
        height={sizeInPx}
        viewBox="0 0 24 24"
        fill={layer.color}
        aria-hidden="true"
      >
        <path d="M12 2L22 12 12 22 2 12z" />
      </svg>
    );
  }
  return null;
}

function StickerLayerEl({
  layer,
  isSelected,
  canvasSize,
  onSelect,
  onDragEnd,
}: StickerLayerElProps) {
  const sizeInPx = layer.size * (canvasSize / 500);

  return (
    <motion.div
      tabIndex={0}
      aria-label={`Sticker: ${layer.stickerType}`}
      drag
      dragMomentum={false}
      onDragEnd={(_, info) => {
        const container = document.getElementById("canvas-container");
        if (!container) return;
        const newX = (layer.x * canvasSize + info.offset.x) / canvasSize;
        const newY = (layer.y * canvasSize + info.offset.y) / canvasSize;
        onDragEnd(
          layer.id,
          Math.max(0, Math.min(1, newX)),
          Math.max(0, Math.min(1, newY)),
        );
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(layer.id);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.stopPropagation();
          onSelect(layer.id);
        }
      }}
      style={{
        position: "absolute",
        left: `${layer.x * 100}%`,
        top: `${layer.y * 100}%`,
        transform: "translate(-50%, -50%)",
        cursor: "move",
        zIndex: 10,
        outline: isSelected ? "1.5px dashed oklch(0.55 0.006 60)" : "none",
        outlineOffset: "4px",
      }}
    >
      <StickerSvg layer={layer} sizeInPx={sizeInPx} />
    </motion.div>
  );
}

export interface EditorCanvasHandle {
  getDataUrl: () => string;
}

interface EditorCanvasProps {
  state: CanvasState;
  isTextMode: boolean;
  selectedLayerId: string | null;
  onLayerSelect: (id: string | null) => void;
  onLayerMove: (id: string, x: number, y: number) => void;
  onCanvasClick: (x: number, y: number) => void;
  canvasSize?: number;
}

export const EditorCanvas = forwardRef<EditorCanvasHandle, EditorCanvasProps>(
  function EditorCanvas(
    {
      state,
      isTextMode,
      selectedLayerId,
      onLayerSelect,
      onLayerMove,
      onCanvasClick,
      canvasSize = 500,
    },
    ref,
  ) {
    const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({
      getDataUrl: () => {
        const canvas = hiddenCanvasRef.current;
        if (!canvas) return "";
        return canvas.toDataURL("image/png");
      },
    }));

    const handleContainerClick = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isTextMode && !selectedLayerId) return;

        if (selectedLayerId) {
          onLayerSelect(null);
          return;
        }

        if (isTextMode) {
          const rect = e.currentTarget.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          onCanvasClick(x, y);
        }
      },
      [isTextMode, selectedLayerId, onLayerSelect, onCanvasClick],
    );

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === "Escape" && selectedLayerId) {
          onLayerSelect(null);
        }
      },
      [selectedLayerId, onLayerSelect],
    );

    const filterCss = getFilterCss(state.filter, state.adjustments);

    const aspectClass =
      state.aspectRatio === "4:5"
        ? "aspect-[4/5]"
        : state.aspectRatio === "9:16"
          ? "aspect-[9/16]"
          : "aspect-square";

    return (
      <div className="canvas-wrapper">
        <div
          id="canvas-container"
          role="presentation"
          className={`relative overflow-hidden select-none bg-cream ${aspectClass}`}
          style={{
            width: canvasSize,
            cursor: isTextMode ? "crosshair" : "default",
          }}
          onClick={handleContainerClick}
          onKeyDown={handleKeyDown}
        >
          {/* Background image with filter */}
          {state.backgroundImage ? (
            <div className="absolute inset-0" style={{ filter: filterCss }}>
              <img
                src={state.backgroundImage}
                alt="Canvas background"
                className="w-full h-full object-cover"
                draggable={false}
              />
            </div>
          ) : (
            <div
              className="absolute inset-0"
              style={{
                filter: filterCss,
                background: "oklch(0.955 0.012 85)",
              }}
            />
          )}

          {/* Frame overlay */}
          <FrameOverlay frame={state.frame} />

          {/* Layers */}
          {state.layers.map((layer: Layer) => {
            if (layer.type === "text") {
              return (
                <TextLayerEl
                  key={layer.id}
                  layer={layer}
                  isSelected={selectedLayerId === layer.id}
                  canvasSize={canvasSize}
                  onSelect={onLayerSelect}
                  onDragEnd={onLayerMove}
                />
              );
            }
            if (layer.type === "sticker") {
              return (
                <StickerLayerEl
                  key={layer.id}
                  layer={layer}
                  isSelected={selectedLayerId === layer.id}
                  canvasSize={canvasSize}
                  onSelect={onLayerSelect}
                  onDragEnd={onLayerMove}
                />
              );
            }
            return null;
          })}

          {/* Text mode indicator */}
          {isTextMode && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-ink/60 text-ivory font-ui text-[10px] tracking-editorial px-3 py-1.5 uppercase">
                Click to Place Text
              </div>
            </div>
          )}
        </div>

        {/* Hidden canvas for export */}
        <canvas ref={hiddenCanvasRef} style={{ display: "none" }} />
      </div>
    );
  },
);
