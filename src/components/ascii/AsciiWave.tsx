"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

const CHARS = " .·:;+=xX$#@";
const FONT_SIZE = 11;
const LINE_HEIGHT = 13;
const MOUSE_RADIUS = 220;

type Exclusion = {
  radiusX: number;
  radiusY: number;
  fade: number;
};

type AsciiWaveProps = {
  exclusion?: Exclusion;
  className?: string;
};

function readTheme() {
  const styles = getComputedStyle(document.documentElement);
  return {
    color: styles.getPropertyValue("--muted").trim() || "#5f5f5b",
    font: styles.getPropertyValue("--font-geist-mono").trim() || "ui-monospace, monospace",
  };
}

export function AsciiWave({ exclusion, className }: AsciiWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: -9999, y: -9999 };
    let size = { width: 0, height: 0 };
    let frame = 0;
    let visible = true;

    const draw = (now: number) => {
      const { width, height } = size;
      const time = reducedMotion ? 0 : now * 0.06;
      const { color, font } = readTheme();

      ctx.clearRect(0, 0, width, height);
      ctx.font = `${FONT_SIZE}px ${font}`;
      ctx.fillStyle = color;

      const charWidth = ctx.measureText("M").width;
      const cols = Math.ceil(width / charWidth);
      const rows = Math.ceil(height / LINE_HEIGHT);
      const centerX = width / 2;
      const centerY = height / 2;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const x = col * charWidth;
          const y = row * LINE_HEIGHT;

          let fade = 1;
          if (exclusion) {
            const dx = (x - centerX) / exclusion.radiusX;
            const dy = (y - centerY) / exclusion.radiusY;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 1) continue;
            fade = Math.min(1, ((distance - 1) * Math.min(exclusion.radiusX, exclusion.radiusY)) / exclusion.fade);
          }

          const mouseDistance = Math.hypot(x - mouse.x, y - mouse.y);
          const mouseInfluence = reducedMotion ? 0 : Math.max(0, 1 - mouseDistance / MOUSE_RADIUS);

          const wave =
            Math.sin(col * 0.04 + time * 0.03) +
            Math.sin(row * 0.03 + time * 0.02) +
            Math.sin((col + row) * 0.02 + time * 0.025) +
            Math.sin(mouseDistance * 0.03 - time * 0.05) * mouseInfluence * 2;

          const value = Math.min(1, Math.max(0, (wave + 3) / 6));
          const char = CHARS[Math.round(value * (CHARS.length - 1))];
          if (char === " ") continue;

          ctx.globalAlpha = Math.min(1, 0.12 + value * 0.38 + mouseInfluence * 0.45) * fade;
          ctx.fillText(char, x, y + LINE_HEIGHT);
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reducedMotion) frame = requestAnimationFrame(loop);
    };

    const resize = () => {
      const { clientWidth, clientHeight } = canvas;
      const ratio = window.devicePixelRatio || 1;
      size = { width: clientWidth, height: clientHeight };
      canvas.width = Math.round(clientWidth * ratio);
      canvas.height = Math.round(clientHeight * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw(performance.now());
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const resizeObserver = new ResizeObserver(resize);
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(frame);
      if (visible && !reducedMotion) frame = requestAnimationFrame(loop);
    });
    const themeObserver = new MutationObserver(() => draw(performance.now()));

    resizeObserver.observe(canvas);
    visibilityObserver.observe(canvas);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    window.addEventListener("pointermove", onPointerMove);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener("pointermove", onPointerMove);
    };
  }, [exclusion]);

  return <canvas ref={canvasRef} aria-hidden="true" className={cn("pointer-events-none block size-full", className)} />;
}
