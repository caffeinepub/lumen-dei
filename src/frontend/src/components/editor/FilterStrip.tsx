import { motion } from "motion/react";
import type { FilterName } from "../../types/canvas";
import { FILTERS } from "../../utils/filters";

interface FilterStripProps {
  current: FilterName;
  onChange: (filter: FilterName) => void;
  previewImage: string | null;
}

export function FilterStrip({
  current,
  onChange,
  previewImage,
}: FilterStripProps) {
  return (
    <div className="px-4">
      <p className="font-ui text-[9px] tracking-editorial text-mid-gray mb-2 uppercase">
        Filters
      </p>
      <div className="filter-strip">
        {FILTERS.map((filter, i) => (
          <motion.button
            key={filter.name}
            onClick={() => onChange(filter.name)}
            className={`flex-shrink-0 flex flex-col items-center gap-1.5 group transition-all duration-200 ${
              current === filter.name
                ? "opacity-100"
                : "opacity-70 hover:opacity-100"
            }`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Thumbnail */}
            <div
              className={`w-14 h-14 overflow-hidden relative transition-all duration-200 ${
                current === filter.name
                  ? "ring-2 ring-ink ring-offset-1"
                  : "ring-1 ring-warm-gray/50 group-hover:ring-ink/40"
              }`}
            >
              {previewImage ? (
                <img
                  src={previewImage}
                  alt={filter.name}
                  className="w-full h-full object-cover"
                  style={{ filter: filter.cssFilter }}
                />
              ) : (
                <div
                  className="w-full h-full"
                  style={{
                    filter: filter.cssFilter,
                    background:
                      filter.name === "Noir"
                        ? "linear-gradient(135deg, #1a1a1a 0%, #666 100%)"
                        : filter.name === "Warm"
                          ? "linear-gradient(135deg, #d4a574 0%, #f0c88a 100%)"
                          : filter.name === "Cool"
                            ? "linear-gradient(135deg, #8ab4d4 0%, #b8d4e8 100%)"
                            : filter.name === "Sepia"
                              ? "linear-gradient(135deg, #c8a882 0%, #e4c8a0 100%)"
                              : filter.name === "Velvet"
                                ? "linear-gradient(135deg, #6b4c6b 0%, #9b7c9b 100%)"
                                : filter.name === "Chrome"
                                  ? "linear-gradient(135deg, #9ba8b8 0%, #c8d0d8 100%)"
                                  : "linear-gradient(135deg, #e8e0d8 0%, #f5f0ea 100%)",
                  }}
                />
              )}
            </div>

            {/* Name */}
            <span
              className={`font-ui text-[9px] tracking-wide transition-colors ${
                current === filter.name
                  ? "text-ink font-medium"
                  : "text-mid-gray"
              }`}
              style={{ fontSize: "9px" }}
            >
              {filter.name}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
