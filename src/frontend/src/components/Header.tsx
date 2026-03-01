import { Link, useLocation } from "@tanstack/react-router";
import { motion } from "motion/react";

export function Header() {
  const location = useLocation();
  const isEditor = location.pathname === "/editor";
  const isBooth = location.pathname === "/photobooth";

  return (
    <header className="sticky top-0 z-50 bg-ivory/96 backdrop-blur-md border-b border-warm-gray/25">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <motion.img
            src="/assets/generated/lumen-dei-logo-transparent.dim_400x400.png"
            alt="Lumen Dei"
            className="w-8 h-8 object-contain opacity-90"
            whileHover={{ scale: 1.06, opacity: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
          />
          <div className="hidden sm:flex flex-col justify-center">
            <p className="font-display text-ink text-[13px] font-semibold tracking-[0.18em] uppercase leading-none">
              Lumen Dei
            </p>
            <p className="font-ui text-mid-gray/60 text-[8px] tracking-[0.22em] uppercase leading-none mt-[3px]">
              Creative Studio
            </p>
          </div>
        </Link>

        {/* Nav */}
        <nav className="flex items-center gap-5">
          {isEditor ? (
            <Link
              to="/"
              className="font-ui text-[9px] tracking-[0.18em] text-mid-gray/70 hover:text-ink transition-colors duration-200 uppercase"
            >
              ← Gallery
            </Link>
          ) : (
            <>
              <Link
                to="/"
                className="font-ui text-[9px] tracking-[0.18em] text-mid-gray/60 hover:text-ink transition-colors duration-200 uppercase"
              >
                Gallery
              </Link>
              <Link
                to="/editor"
                className="font-ui text-[9px] tracking-[0.18em] text-ink border-b border-ink/40 hover:border-ink pb-px transition-colors duration-200 uppercase"
              >
                New Template
              </Link>
              <Link
                to="/photobooth"
                className={`font-ui text-[9px] tracking-[0.14em] transition-colors duration-200 px-3 py-1 rounded-full ${
                  isBooth
                    ? "text-pink-600 bg-pink-50 border border-pink-200"
                    : "text-pink-400/80 hover:text-pink-500 hover:bg-pink-50/60 border border-transparent hover:border-pink-200/60"
                }`}
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "10px",
                }}
              >
                🎀 Booth
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
