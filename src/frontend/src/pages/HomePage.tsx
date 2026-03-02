import { useNavigate } from "@tanstack/react-router";
import { Loader2, Plus, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { TemplateCategory } from "../backend";
import type { CustomTemplate, PrebuiltTemplate } from "../backend";
import { PrebuiltThumbnail, TemplateCard } from "../components/TemplateCard";
import { FALLBACK_PREBUILT_TEMPLATES } from "../data/prebuiltTemplates";
import {
  useCustomTemplates,
  useDeleteTemplate,
  usePrebuiltTemplates,
} from "../hooks/useQueries";

const QUOTES = [
  "Wrapped in love's quiet glow.",
  "Light finds you, always.",
  "Grace lives in the small moments.",
  "Softly, beautifully, you bloom.",
  "Golden hours were made for you.",
  "There is magic in your stillness.",
  "Every frame holds a love story.",
  "You are the art and the artist.",
  "Tenderness is your superpower.",
  "Luminous inside and out.",
  "Peace lives where beauty breathes.",
  "Today, you are enough and more.",
  "The world is softer with you in it.",
  "You carry summer wherever you go.",
  "Joy is the truest form of courage.",
];

function RotatingQuote() {
  const [index, setIndex] = useState(() =>
    Math.floor(Math.random() * QUOTES.length),
  );
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % QUOTES.length);
        setVisible(true);
      }, 600);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    // REFINEMENT 2 — Full-width ornaments, larger quote scale, generous vertical air
    <div className="max-w-7xl mx-auto px-6 py-10 sm:py-14">
      <div className="flex flex-col items-center gap-5">
        {/* Top ornamental rule — full width */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
          className="flex items-center gap-4 w-full origin-center"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-warm-gray/40 to-warm-gray/40" />
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="currentColor"
            className="text-ink/25 flex-shrink-0"
            aria-hidden="true"
          >
            <circle cx="4" cy="4" r="4" />
          </svg>
          <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="currentColor"
            className="text-ink/15 flex-shrink-0"
            aria-hidden="true"
          >
            <circle cx="2.5" cy="2.5" r="2.5" />
          </svg>
          <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="currentColor"
            className="text-ink/15 flex-shrink-0"
            aria-hidden="true"
          >
            <circle cx="2.5" cy="2.5" r="2.5" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-warm-gray/40 to-warm-gray/40" />
        </motion.div>

        {/* Quote — significantly larger, Cormorant Garamond at its best */}
        <div className="min-h-[3.5rem] sm:min-h-[4.5rem] flex items-center justify-center px-4">
          <AnimatePresence mode="wait">
            {visible && (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-elegant text-3xl sm:text-4xl italic text-ink/55 text-center leading-snug tracking-wide max-w-2xl"
              >
                &ldquo;{QUOTES[index]}&rdquo;
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Bottom ornamental rule */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, delay: 0.65, ease: "easeOut" }}
          className="flex items-center gap-4 w-full origin-center"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-warm-gray/40 to-warm-gray/40" />
          <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="currentColor"
            className="text-ink/15 flex-shrink-0"
            aria-hidden="true"
          >
            <circle cx="2.5" cy="2.5" r="2.5" />
          </svg>
          <svg
            width="5"
            height="5"
            viewBox="0 0 5 5"
            fill="currentColor"
            className="text-ink/15 flex-shrink-0"
            aria-hidden="true"
          >
            <circle cx="2.5" cy="2.5" r="2.5" />
          </svg>
          <svg
            width="8"
            height="8"
            viewBox="0 0 8 8"
            fill="currentColor"
            className="text-ink/25 flex-shrink-0"
            aria-hidden="true"
          >
            <circle cx="4" cy="4" r="4" />
          </svg>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent via-warm-gray/40 to-warm-gray/40" />
        </motion.div>
      </div>
    </div>
  );
}

interface TemplatePreviewModalProps {
  template: PrebuiltTemplate;
  onClose: () => void;
  onUse: () => void;
}

function TemplatePreviewModal({
  template,
  onClose,
  onUse,
}: TemplatePreviewModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        onClick={onClose}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0"
          style={{
            background: "rgba(26,26,26,0.55)",
            backdropFilter: "blur(6px)",
          }}
        />

        {/* Modal card */}
        <motion.div
          className="relative z-10 bg-ivory border border-ink/20 shadow-2xl max-w-sm w-full"
          initial={{ opacity: 0, scale: 0.94, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 16 }}
          transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 text-mid-gray hover:text-ink transition-colors z-10"
            aria-label="Close preview"
          >
            <X size={14} />
          </button>

          {/* Thumbnail — large square */}
          <div className="w-full aspect-square overflow-hidden border-b border-ink/10">
            <PrebuiltThumbnail hint={template.thumbnailHint} />
          </div>

          {/* Info */}
          <div className="p-5 flex flex-col gap-4">
            <div>
              <p className="font-ui text-[9px] tracking-[0.2em] text-mid-gray/60 uppercase mb-1">
                {template.category === TemplateCategory.old_money
                  ? "Old Money"
                  : template.thumbnailHint.startsWith("pastel-")
                    ? "✿ Pastel"
                    : "Instagram"}
              </p>
              <h2 className="font-display text-xl text-ink leading-snug">
                {template.name}
              </h2>
              {template.description && (
                <p className="font-elegant text-sm italic text-mid-gray/70 mt-1.5 leading-relaxed">
                  {template.description}
                </p>
              )}
            </div>

            {/* Ornamental divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-warm-gray/30" />
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="currentColor"
                className="text-ink/20"
                aria-hidden="true"
              >
                <circle cx="3" cy="3" r="3" />
              </svg>
              <div className="h-px flex-1 bg-warm-gray/30" />
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border border-ink/25 text-ink/60 font-ui text-[10px] tracking-[0.15em] uppercase py-3 hover:bg-ink/5 transition-colors"
              >
                Close
              </button>
              <button
                type="button"
                onClick={onUse}
                className="flex-1 bg-ink text-ivory font-ui text-[10px] tracking-[0.15em] uppercase py-3 hover:bg-ink/85 transition-colors"
              >
                Use Template
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

type Tab = "all" | "instagram" | "old_money" | "pastel" | "mine";

const TABS: { id: Tab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "instagram", label: "Instagram" },
  { id: "old_money", label: "Old Money" },
  { id: "pastel", label: "✿ Pastel" },
  { id: "mine", label: "My Templates" },
];

export function HomePage() {
  const [activeTab, setActiveTab] = useState<Tab>("all");
  const [previewTemplate, setPreviewTemplate] =
    useState<PrebuiltTemplate | null>(null);
  const navigate = useNavigate();

  // Prebuilt templates are always served from the local list (all 28 templates).
  // The backend only contains 2 stub templates and must NOT override the local list.
  usePrebuiltTemplates(); // keep the hook call to avoid breaking the actor init flow
  const { data: customData, isLoading: customLoading } = useCustomTemplates();
  const deleteMutation = useDeleteTemplate();

  // Always use the full local template list — never replaced by backend data
  const prebuilt: PrebuiltTemplate[] = FALLBACK_PREBUILT_TEMPLATES;

  const custom: CustomTemplate[] = customData || [];

  const filteredPrebuilt = prebuilt.filter((t) => {
    const isPastel = t.thumbnailHint.startsWith("pastel-");
    if (activeTab === "all") return true;
    if (activeTab === "instagram")
      return t.category === TemplateCategory.instagram && !isPastel;
    if (activeTab === "old_money")
      return t.category === TemplateCategory.old_money && !isPastel;
    if (activeTab === "pastel") return isPastel;
    if (activeTab === "mine") return false;
    return true;
  });

  const filteredCustom = custom.filter((t) => {
    if (activeTab === "all") return true;
    if (activeTab === "instagram")
      return t.category === TemplateCategory.instagram;
    if (activeTab === "old_money")
      return t.category === TemplateCategory.old_money;
    if (activeTab === "pastel") return false;
    if (activeTab === "mine") return true;
    return true;
  });

  // Counts for tab badges
  const pastelCount = prebuilt.filter((t) =>
    t.thumbnailHint.startsWith("pastel-"),
  ).length;
  const instagramCount = prebuilt.filter(
    (t) =>
      t.category === TemplateCategory.instagram &&
      !t.thumbnailHint.startsWith("pastel-"),
  ).length;
  const oldMoneyCount = prebuilt.filter(
    (t) =>
      t.category === TemplateCategory.old_money &&
      !t.thumbnailHint.startsWith("pastel-"),
  ).length;

  // Only wait for custom templates to load; prebuilt are instantly available
  const isLoading = customLoading;

  const handleDelete = (id: string) => {
    if (confirm("Delete this template?")) {
      deleteMutation.mutate(id);
    }
  };

  const allItems = [...filteredCustom, ...filteredPrebuilt];

  return (
    <main className="min-h-screen bg-ivory">
      {/* ── Hero: dramatic scale + pastel accent ── */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-6 relative">
        {/* Soft pastel bloom decoration */}
        <div
          className="absolute top-0 right-0 w-96 h-64 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, oklch(0.88 0.07 350) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute bottom-0 left-0 w-72 h-48 pointer-events-none opacity-20"
          style={{
            background:
              "radial-gradient(ellipse at 20% 80%, oklch(0.88 0.055 290) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 relative"
        >
          <div>
            {/* Refined label */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="font-ui text-[9px] tracking-[0.22em] text-mid-gray/70 uppercase mb-4"
            >
              Lumen Dei · Creative Studio
            </motion.p>

            {/* h1 */}
            <h1 className="font-display text-6xl sm:text-7xl text-ink leading-[0.95] font-normal italic">
              Your
              <br />
              <span className="not-italic font-semibold">Templates</span>
            </h1>

            <p className="font-elegant text-xl text-mid-gray/80 mt-4 leading-relaxed max-w-xs">
              Curated aesthetics for the discerning creator
            </p>
          </div>

          <div className="flex flex-col gap-2 self-start sm:self-auto">
            <motion.button
              type="button"
              onClick={() => navigate({ to: "/editor" })}
              className="group flex items-center gap-2.5 border border-ink text-ink font-ui text-[10px] tracking-[0.18em] uppercase px-7 py-3.5 hover:bg-ink hover:text-ivory transition-all duration-300"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus
                size={11}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
              📷 New Template
            </motion.button>
            <motion.button
              type="button"
              onClick={() => navigate({ to: "/photobooth" })}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="group flex items-center gap-2 border font-ui text-[10px] tracking-[0.14em] uppercase px-7 py-3 transition-all duration-300"
              style={{
                borderColor: "oklch(0.88 0.07 350 / 0.6)",
                color: "oklch(0.5 0.12 350)",
                backgroundColor: "oklch(0.92 0.055 5 / 0.3)",
              }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              🎀 ~Bessy Booth~
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Rotating quote */}
      <RotatingQuote />

      {/* ── REFINEMENT 3 — Tab nav: section label + tighter grid ── */}
      <section className="max-w-7xl mx-auto px-6">
        {/* Section heading above tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex items-center justify-between mb-0"
        >
          <div className="flex gap-0 border-b border-warm-gray/40 w-full overflow-x-auto">
            {TABS.map((tab) => {
              const count =
                tab.id === "instagram"
                  ? instagramCount
                  : tab.id === "old_money"
                    ? oldMoneyCount
                    : tab.id === "pastel"
                      ? pastelCount
                      : tab.id === "mine"
                        ? custom.length
                        : prebuilt.length + custom.length;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex-shrink-0 px-5 py-3.5 font-ui text-[10px] tracking-[0.16em] uppercase transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "text-ink"
                      : "text-mid-gray/60 hover:text-ink/70"
                  }`}
                >
                  {tab.label}
                  {count > 0 && (
                    <span
                      className={`ml-1.5 font-ui text-[8px] rounded-full w-4 h-4 inline-flex items-center justify-center ${
                        activeTab === tab.id
                          ? "bg-ink text-ivory"
                          : "bg-warm-gray/50 text-mid-gray"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                  {activeTab === tab.id && (
                    <motion.div
                      layoutId="tab-indicator"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-ink"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 pt-6 pb-12">
        {isLoading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="animate-spin text-mid-gray/50" size={18} />
              <span className="font-ui text-[9px] tracking-[0.18em] text-mid-gray/40 uppercase">
                Loading
              </span>
            </div>
          </div>
        ) : allItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 gap-5"
          >
            <div className="w-14 h-14 border border-warm-gray/30 flex items-center justify-center">
              <span className="font-display text-xl text-warm-gray/40 italic">
                L
              </span>
            </div>
            <p className="font-elegant text-xl italic text-mid-gray/60">
              {activeTab === "mine"
                ? "No saved templates yet"
                : "No templates found"}
            </p>
            <button
              type="button"
              onClick={() => navigate({ to: "/editor" })}
              className="font-ui text-[9px] tracking-[0.18em] text-ink/40 hover:text-ink uppercase transition-colors border-b border-ink/20 hover:border-ink/60 pb-0.5"
            >
              Create your first template
            </button>
          </motion.div>
        ) : (
          <AnimatePresence mode="wait">
            {/* Tighter gap, denser gallery feel */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3"
            >
              {filteredCustom.map((t, i) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  type="custom"
                  index={i}
                  onDelete={handleDelete}
                />
              ))}
              {filteredPrebuilt.map((t, i) => (
                <TemplateCard
                  key={t.id}
                  template={t}
                  type="prebuilt"
                  index={filteredCustom.length + i}
                  onPreview={() => setPreviewTemplate(t)}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* Template Preview Modal */}
      {previewTemplate && (
        <TemplatePreviewModal
          template={previewTemplate}
          onClose={() => setPreviewTemplate(null)}
          onUse={() => {
            navigate({
              to: "/editor",
              search: {
                templateId: previewTemplate.id,
                templateType: "prebuilt",
              } as Record<string, string>,
            });
            setPreviewTemplate(null);
          }}
        />
      )}

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-10 border-t border-warm-gray/20">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center">
            <span className="font-display text-sm tracking-widest text-ink/60 uppercase">
              Lumen Dei
            </span>
          </div>
          <p className="font-ui text-[9px] tracking-[0.16em] text-mid-gray/40 uppercase">
            © {new Date().getFullYear()}.{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-mid-gray/70 transition-colors"
            >
              Built with love using caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </main>
  );
}
