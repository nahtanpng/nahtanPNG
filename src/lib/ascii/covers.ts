import { grid, render } from "./grid";
import { rng } from "./rng";

export const ASCII_KINDS = ["chart", "wave", "rings", "rain"] as const;

export type AsciiKind = (typeof ASCII_KINDS)[number];

const W = 128;
const H = 13;

function ramped(ramp: string, value: (r: number, c: number) => string | number) {
  const rows: string[] = [];
  for (let r = 0; r < H; r++) {
    let line = "";
    for (let c = 0; c < W; c++) {
      const v = value(r, c);
      line += typeof v === "string" ? v : ramp[Math.max(0, Math.min(ramp.length - 1, Math.floor(v * ramp.length)))];
    }
    rows.push(line);
  }
  return rows.join("\n");
}

function chart() {
  const g = grid(W, H);
  const R = rng(3);
  for (let c = 0; c < W; c++) g[H - 1][c] = c % 4 === 0 ? "+" : "-";
  let level = 2;
  for (let c = 1; c < W - 1; c += 3) {
    level = Math.max(1, Math.min(H - 2, level + (R() - 0.3) * 1.6));
    const h = Math.round(level);
    for (let r = H - 2; r > H - 2 - h; r--) {
      const ch = r === H - 1 - h ? "_" : "#";
      g[r][c] = ch;
      g[r][c + 1] = ch;
    }
  }
  g[0][W - 6] = "$";
  return render(g);
}

function wave() {
  return ramped(" .:-=+*#", (r, c) => (Math.sin(c / 6 + r / 2) + Math.sin(c / 11 - r / 3) + 2) / 4);
}

function rings() {
  return ramped(" .:-=+", (r, c) => {
    const dx = (c - W / 2) / 2.1;
    const dy = r - H / 2 + 0.5;
    const d = Math.sqrt(dx * dx + dy * dy);
    return d < 1.2 ? "@" : (Math.cos(d * 1.15) + 1) / 2;
  });
}

function rain() {
  const g = grid(W, H);
  const R = rng(17);
  for (let c = 0; c < W; c++) {
    if (R() < 0.45) {
      const len = 2 + Math.floor(R() * 6);
      const start = Math.floor(R() * H);
      for (let i = 0; i < len; i++) {
        g[(start + i) % H][c] = i === len - 1 ? "0" : R() < 0.5 ? "1" : "/";
      }
    }
  }
  return render(g);
}

export const covers: Record<AsciiKind, () => string> = { chart, wave, rings, rain };
