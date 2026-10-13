"use client";

import { useEffect, useState } from "react";
import { ArrowUpIcon } from "@/components/icons";
import { cn } from "@/lib/cn";

const SHOW_AFTER = 320;

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > SHOW_AFTER);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? "instant" : "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      inert={!visible}
      className={cn(
        "group fixed right-5 bottom-5 z-30 flex size-10 items-center justify-center rounded-[9px] border border-line bg-head text-muted backdrop-blur-md transition duration-200 hover:bg-hover hover:text-fg cursor-pointer",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
      )}
    >
      <ArrowUpIcon size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
    </button>
  );
}
