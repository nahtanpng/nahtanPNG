"use client";

import { type RefObject, useEffect } from "react";
import { scramble, thresholds } from "@/lib/ascii/reveal";

const SKIP = "pre, script, style, svg, [data-ascii-reveal='off']";
const REVEAL_END = 0.6;
const TICK_MS = 70;

type Entry = {
  chars: string[];
  thresholds: number[];
  seed: number;
  written: string;
  progress: number;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

export function useAsciiReveal(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = ref.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const entries = new Map<Text, Entry>();
    let nextSeed = 1;
    let frame = 0;

    const createEntry = (text: string, progress: number): Entry => {
      const chars = [...text];
      const seed = nextSeed++;
      return { chars, thresholds: thresholds(chars.length, seed), seed, written: text, progress };
    };

    // Text already on screen (or above it) when it shows up stays readable;
    // only content that enters from below the fold gets the reveal.
    const collect = () => {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node as Text;
        const parent = text.parentElement;
        if (entries.has(text) || !parent || !text.nodeValue?.trim() || parent.closest(SKIP)) continue;

        const onScreen = parent.getBoundingClientRect().top < window.innerHeight;
        entries.set(text, createEntry(text.nodeValue, onScreen ? 1 : 0));
      }
    };

    const update = (now: number) => {
      frame = 0;
      const viewport = window.innerHeight;
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - viewport;
      const pending: { node: Text; entry: Entry; visible: boolean }[] = [];

      for (const [node, entry] of entries) {
        if (!node.isConnected || !node.parentElement) {
          entries.delete(node);
          continue;
        }
        if (node.nodeValue !== entry.written) {
          Object.assign(entry, createEntry(node.nodeValue ?? "", entry.progress));
        }
        if (entry.progress >= 1) continue;

        // Progress is measured in scroll space so elements near the end of the page,
        // which never reach REVEAL_END of the viewport, still finish at max scroll.
        const rect = node.parentElement.getBoundingClientRect();
        const top = rect.top + scrollY;
        const start = top - viewport;
        const end = Math.min(top - viewport * REVEAL_END, maxScroll);
        entry.progress = Math.max(entry.progress, clamp01((scrollY - start) / Math.max(1, end - start)));

        pending.push({ node, entry, visible: rect.bottom > 0 && rect.top < viewport });
      }

      const tick = Math.floor(now / TICK_MS);
      let animating = false;

      for (const { node, entry, visible } of pending) {
        const text =
          entry.progress >= 1
            ? entry.chars.join("")
            : scramble(entry.chars, entry.thresholds, entry.progress, tick * 1009 + entry.seed);

        if (node.nodeValue !== text) node.nodeValue = text;
        entry.written = text;
        if (visible && entry.progress > 0 && entry.progress < 1) animating = true;
      }

      if (animating) frame = requestAnimationFrame(update);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const mutationObserver = new MutationObserver(() => {
      collect();
      schedule();
    });

    collect();
    update(performance.now());
    mutationObserver.observe(root, { childList: true, subtree: true });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      mutationObserver.disconnect();
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      for (const [node, entry] of entries) {
        if (node.nodeValue === entry.written) node.nodeValue = entry.chars.join("");
      }
    };
  }, [ref]);
}
