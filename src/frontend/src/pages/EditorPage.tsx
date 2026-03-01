import { useSearch } from "@tanstack/react-router";
import {
  CheckCircle,
  Download,
  Loader2,
  Save,
  Trash2,
  Undo,
  Upload,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { TemplateCategory } from "../backend";
import { AdjustmentsPanel } from "../components/editor/AdjustmentsPanel";
import {
  EditorCanvas,
  type EditorCanvasHandle,
} from "../components/editor/EditorCanvas";
import { FilterStrip } from "../components/editor/FilterStrip";
import { FrameSelector } from "../components/editor/FrameSelector";
import { StickerPanel } from "../components/editor/StickerPanel";
import { TextTool } from "../components/editor/TextTool";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { FALLBACK_PREBUILT_TEMPLATES } from "../data/prebuiltTemplates";
import { PREBUILT_TEMPLATE_CANVAS_STATES } from "../data/templateCanvasStates";
import {
  useCustomTemplates,
  usePrebuiltTemplates,
  useSaveTemplate,
} from "../hooks/useQueries";
import type {
  Adjustments,
  CanvasState,
  Layer,
  StickerType,
  TextLayer,
} from "../types/canvas";
import { DEFAULT_ADJUSTMENTS, DEFAULT_CANVAS_STATE } from "../types/canvas";

function generateId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

interface SaveDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (name: string, category: TemplateCategory) => Promise<void>;
  isSaving: boolean;
  saved: boolean;
}

function SaveDialog({
  open,
  onClose,
  onSave,
  isSaving,
  saved,
}: SaveDialogProps) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState<TemplateCategory>(
    TemplateCategory.instagram,
  );

  const handleSave = async () => {
    if (!name.trim()) return;
    await onSave(name.trim(), category);
  };

  const CATEGORIES = [
    { value: TemplateCategory.instagram, label: "Instagram" },
    { value: TemplateCategory.old_money, label: "Old Money" },
  ];

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="sm:max-w-md bg-ivory border-warm-gray/40">
        <DialogHeader>
          <DialogTitle className="font-display text-ink text-xl">
            Save Template
          </DialogTitle>
          <DialogDescription className="font-elegant italic text-mid-gray">
            Name your creation and categorize it for your gallery
          </DialogDescription>
        </DialogHeader>

        {saved ? (
          <div className="flex flex-col items-center py-6 gap-3">
            <CheckCircle className="text-ink/60" size={32} />
            <p className="font-display text-ink italic">
              Template saved successfully
            </p>
          </div>
        ) : (
          <div className="space-y-4 pt-2">
            <div>
              <label
                htmlFor="template-name-input"
                className="font-ui text-[9px] tracking-editorial text-mid-gray uppercase block mb-1.5"
              >
                Template Name
              </label>
              <input
                id="template-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Summer Afternoon"
                className="w-full border border-warm-gray/50 bg-white px-3 py-2 font-elegant text-sm text-ink placeholder:text-mid-gray/60 focus:outline-none focus:border-ink/40"
                onKeyDown={(e) => e.key === "Enter" && handleSave()}
              />
            </div>

            <div>
              <p className="font-ui text-[9px] tracking-editorial text-mid-gray uppercase block mb-1.5">
                Category
              </p>
              <div className="flex gap-2">
                {CATEGORIES.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setCategory(opt.value)}
                    className={`flex-1 py-2 border font-ui text-[10px] tracking-editorial uppercase transition-colors ${
                      category === opt.value
                        ? "bg-ink text-ivory border-ink"
                        : "border-warm-gray/50 text-mid-gray hover:border-ink/30 hover:text-ink"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-2 border border-warm-gray/50 font-ui text-[10px] tracking-editorial text-mid-gray uppercase hover:border-ink/30 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={!name.trim() || isSaving}
                className="flex-1 py-2 bg-ink text-ivory font-ui text-[10px] tracking-editorial uppercase hover:bg-charcoal transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <Loader2 size={12} className="animate-spin" />
                ) : null}
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export function EditorPage() {
  const search = useSearch({ strict: false }) as {
    templateId?: string;
    templateType?: string;
  };

  const [canvasState, setCanvasState] = useState<CanvasState>({
    ...DEFAULT_CANVAS_STATE,
  });
  const [history, setHistory] = useState<CanvasState[]>([]);
  const [isTextMode, setIsTextMode] = useState(false);
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [aspectRatio, setAspectRatio] =
    useState<CanvasState["aspectRatio"]>("1:1");

  const canvasRef = useRef<EditorCanvasHandle>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: prebuiltData } = usePrebuiltTemplates();
  const { data: customData } = useCustomTemplates();
  const saveMutation = useSaveTemplate();

  // Load template if templateId is provided
  useEffect(() => {
    if (!search.templateId) return;

    const prebuilts =
      prebuiltData && prebuiltData.length > 0
        ? prebuiltData
        : FALLBACK_PREBUILT_TEMPLATES;
    const customs = customData || [];

    if (search.templateType === "custom") {
      const t = customs.find((c) => c.id === search.templateId);
      if (t) {
        try {
          const state = JSON.parse(t.canvasState) as CanvasState;
          setCanvasState({ ...DEFAULT_CANVAS_STATE, ...state });
        } catch {
          // ignore
        }
      }
    } else {
      const t = prebuilts.find((p) => p.id === search.templateId);
      if (t) {
        // Use the exact canvas state mapped to this template ID so the editor
        // opens with the same visual appearance shown in the template thumbnail.
        const exactState = PREBUILT_TEMPLATE_CANVAS_STATES[t.id];
        if (exactState) {
          setCanvasState({ ...exactState });
        } else {
          // Fallback for any template not yet in the mapping
          const isOldMoney = t.thumbnailHint.startsWith("old-money");
          setCanvasState({
            ...DEFAULT_CANVAS_STATE,
            filter: isOldMoney ? "Sepia" : "Faded",
            frame: isOldMoney ? "double" : "corners",
          });
        }
      }
    }
  }, [search.templateId, search.templateType, prebuiltData, customData]);

  const pushHistory = useCallback((newState: CanvasState) => {
    setHistory((h) => [...h.slice(-19), newState]);
  }, []);

  const updateState = useCallback(
    (updater: (prev: CanvasState) => CanvasState) => {
      setCanvasState((prev) => {
        const next = updater(prev);
        pushHistory(prev);
        return next;
      });
    },
    [pushHistory],
  );

  const handleUndo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setCanvasState(prev);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const dataUrl = ev.target?.result as string;
      updateState((prev) => ({ ...prev, backgroundImage: dataUrl }));
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFilterChange = (filter: CanvasState["filter"]) => {
    updateState((prev) => ({ ...prev, filter }));
  };

  const handleAdjustmentChange = (key: keyof Adjustments, value: number) => {
    updateState((prev) => ({
      ...prev,
      adjustments: { ...prev.adjustments, [key]: value },
    }));
  };

  const handleAdjustmentReset = () => {
    updateState((prev) => ({
      ...prev,
      adjustments: { ...DEFAULT_ADJUSTMENTS },
    }));
  };

  const handleFrameChange = (frame: CanvasState["frame"]) => {
    updateState((prev) => ({ ...prev, frame }));
  };

  const handleAddSticker = (stickerType: StickerType) => {
    const newLayer = {
      type: "sticker" as const,
      id: generateId(),
      stickerType,
      x: 0.5,
      y: 0.5,
      size: 40,
      color: "#1a1201",
    };
    updateState((prev) => ({ ...prev, layers: [...prev.layers, newLayer] }));
  };

  const handleCanvasClick = (x: number, y: number) => {
    if (!isTextMode) return;
    const newLayer: TextLayer = {
      type: "text",
      id: generateId(),
      text: "Your Text",
      x,
      y,
      fontSize: 32,
      fontFamily: "'Playfair Display', serif",
      bold: false,
      italic: false,
      color: "#1a1201",
    };
    updateState((prev) => ({ ...prev, layers: [...prev.layers, newLayer] }));
    setIsTextMode(false);
    setSelectedLayerId(newLayer.id);
  };

  const handleLayerMove = (id: string, x: number, y: number) => {
    updateState((prev) => ({
      ...prev,
      layers: prev.layers.map((l) => (l.id === id ? { ...l, x, y } : l)),
    }));
  };

  const handleUpdateText = (id: string, updates: Partial<TextLayer>) => {
    updateState((prev) => ({
      ...prev,
      layers: prev.layers.map((l) =>
        l.id === id ? { ...l, ...updates } : l,
      ) as Layer[],
    }));
  };

  const handleDeleteSelectedLayer = () => {
    if (!selectedLayerId) return;
    updateState((prev) => ({
      ...prev,
      layers: prev.layers.filter((l) => l.id !== selectedLayerId),
    }));
    setSelectedLayerId(null);
  };

  const selectedLayer =
    canvasState.layers.find((l) => l.id === selectedLayerId) ?? null;
  const selectedTextLayer =
    selectedLayer?.type === "text" ? (selectedLayer as TextLayer) : null;

  const handleSave = async (name: string, category: TemplateCategory) => {
    setIsSaving(true);
    try {
      await saveMutation.mutateAsync({
        id:
          search.templateId && search.templateType === "custom"
            ? search.templateId
            : generateId(),
        name,
        category,
        canvasState: JSON.stringify(canvasState),
        created: BigInt(Date.now()),
      });
      setSavedSuccess(true);
      setTimeout(() => {
        setSaveDialogOpen(false);
        setSavedSuccess(false);
      }, 1500);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDownload = () => {
    const dataUrl = canvasRef.current?.getDataUrl() || "";
    if (!dataUrl) return;
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = `lumen-dei-${Date.now()}.png`;
    a.click();
  };

  const ASPECT_RATIOS = ["1:1", "4:5", "9:16"] as const;
  const canvasSize = Math.min(window.innerWidth - 320 - 64, 560);

  return (
    <main className="min-h-screen bg-ivory flex flex-col">
      {/* Toolbar */}
      <div className="border-b border-warm-gray/30 bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {ASPECT_RATIOS.map((ratio) => (
              <button
                key={ratio}
                type="button"
                onClick={() => {
                  setAspectRatio(ratio);
                  updateState((prev) => ({ ...prev, aspectRatio: ratio }));
                }}
                className={`font-ui text-[9px] tracking-editorial px-2 py-1 border transition-colors ${
                  aspectRatio === ratio
                    ? "border-ink text-ink bg-parchment/50"
                    : "border-warm-gray/40 text-mid-gray hover:border-ink/30"
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            {/* Upload */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-warm-gray/50 font-ui text-[9px] tracking-editorial text-mid-gray hover:text-ink hover:border-ink/30 transition-colors uppercase"
              title="Upload image"
            >
              <Upload size={11} />
              Upload
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {/* Undo */}
            <button
              type="button"
              onClick={handleUndo}
              disabled={history.length === 0}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-warm-gray/50 font-ui text-[9px] tracking-editorial text-mid-gray hover:text-ink hover:border-ink/30 transition-colors uppercase disabled:opacity-30"
              title="Undo"
            >
              <Undo size={11} />
            </button>

            {/* Delete layer */}
            {selectedLayerId && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={handleDeleteSelectedLayer}
                className="flex items-center gap-1.5 px-3 py-1.5 border border-destructive/40 font-ui text-[9px] tracking-editorial text-destructive/70 hover:text-destructive hover:border-destructive transition-colors uppercase"
                title="Delete selected layer"
              >
                <Trash2 size={11} />
                Delete Layer
              </motion.button>
            )}

            {/* Save */}
            <button
              type="button"
              onClick={() => setSaveDialogOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 border border-warm-gray/50 font-ui text-[9px] tracking-editorial text-mid-gray hover:text-ink hover:border-ink/30 transition-colors uppercase"
            >
              <Save size={11} />
              Save
            </button>

            {/* Download */}
            <button
              type="button"
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-ink text-ivory font-ui text-[9px] tracking-editorial uppercase hover:bg-charcoal transition-colors"
            >
              <Download size={11} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Editor layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Canvas area */}
        <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <EditorCanvas
              ref={canvasRef}
              state={canvasState}
              isTextMode={isTextMode}
              selectedLayerId={selectedLayerId}
              onLayerSelect={setSelectedLayerId}
              onLayerMove={handleLayerMove}
              onCanvasClick={handleCanvasClick}
              canvasSize={canvasSize}
            />
          </motion.div>
        </div>

        {/* Side panel */}
        <aside className="w-72 border-l border-warm-gray/30 bg-white overflow-y-auto flex-shrink-0">
          {/* Filter strip */}
          <div className="py-4 border-b border-warm-gray/20">
            <FilterStrip
              current={canvasState.filter}
              onChange={handleFilterChange}
              previewImage={canvasState.backgroundImage}
            />
          </div>

          {/* Adjustments */}
          <AdjustmentsPanel
            adjustments={canvasState.adjustments}
            onChange={handleAdjustmentChange}
            onReset={handleAdjustmentReset}
          />

          {/* Frame */}
          <FrameSelector
            current={canvasState.frame}
            onChange={handleFrameChange}
          />

          {/* Text tool */}
          <TextTool
            isActive={isTextMode}
            onToggle={() => setIsTextMode((p) => !p)}
            selectedText={selectedTextLayer}
            onUpdateText={handleUpdateText}
            onAddText={() => {}}
          />

          {/* Stickers */}
          <StickerPanel onAddSticker={handleAddSticker} />

          {/* Clear canvas */}
          <div className="border-t border-warm-gray/30 px-4 py-3">
            <button
              type="button"
              onClick={() => {
                if (confirm("Clear the canvas? This cannot be undone.")) {
                  pushHistory(canvasState);
                  setCanvasState({ ...DEFAULT_CANVAS_STATE, aspectRatio });
                  setSelectedLayerId(null);
                }
              }}
              className="w-full font-ui text-[9px] tracking-editorial text-mid-gray hover:text-destructive/70 uppercase transition-colors py-1"
            >
              Clear Canvas
            </button>
          </div>
        </aside>
      </div>

      {/* Save dialog */}
      <SaveDialog
        open={saveDialogOpen}
        onClose={() => setSaveDialogOpen(false)}
        onSave={handleSave}
        isSaving={isSaving}
        saved={savedSuccess}
      />
    </main>
  );
}
