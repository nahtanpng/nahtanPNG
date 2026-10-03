import { grid, render } from "./grid";
import { rng } from "./rng";

export const ASCII_KINDS = [
  "chart",
  "wave",
  "rings",
  "rain",
  "mountains",
  "sunset",
  "city",
  "forest",
  "circuit",
  "synth",
  "terminal",
  "network",
] as const;

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

function slope(d: number) {
  return d < -0.35 ? "/" : d > 0.35 ? "\\" : "_";
}

function mountains() {
  const g = grid(W, H);
  const ridges = [
    { base: 3, amp: 2, f: 11, p: 0, fill: "." },
    { base: 6, amp: 1.8, f: 8, p: 2, fill: ":" },
    { base: 9, amp: 1.4, f: 5, p: 5, fill: "#" },
  ];
  for (const { base, amp, f, p, fill } of ridges) {
    const y = (c: number) => base + amp * Math.sin(c / f + p) + amp * 0.5 * Math.sin(c / (f * 0.4) + p * 2);
    for (let c = 0; c < W; c++) {
      const top = Math.max(0, Math.round(y(c)));
      for (let r = top; r < H; r++) g[r][c] = r === top ? slope(y(c + 1) - y(c - 1)) : fill;
    }
  }
  g[1][W - 14] = "o";
  return render(g);
}

function sunset() {
  const horizon = 7;
  const cx = W / 2;
  return ramped(" .~-=", (r, c) => {
    const dx = (c - cx) / 2.2;
    const dy = horizon - r;
    if (r < horizon) {
      if (Math.sqrt(dx * dx + dy * dy) < 5.5) return dy % 2 === 0 && dy < 4 ? " " : "@";
      return 0;
    }
    if (r === horizon) return "_";
    const shimmer = Math.abs(dx) < 11 - (r - horizon) && (c + r * 3) % 4 !== 0;
    return shimmer ? "=" : (Math.sin(c / 3 + r * 1.7) + 1) / 2 * 0.75;
  });
}

function city() {
  const g = grid(W, H);
  const R = rng(11);
  let c = 0;
  while (c < W) {
    const w = 3 + Math.floor(R() * 6);
    const h = 3 + Math.floor(R() * (H - 4));
    const top = H - h;
    for (let x = c; x < Math.min(W, c + w); x++) {
      for (let r = top; r < H; r++) {
        const edge = x === c || x === c + w - 1;
        g[r][x] = r === top ? "_" : edge ? "|" : R() < 0.35 ? "o" : ".";
      }
    }
    if (R() < 0.3 && top > 1) g[top - 1][c + Math.floor(w / 2)] = "!";
    c += w + (R() < 0.3 ? 1 : 0);
  }
  for (let i = 0; i < 10; i++) {
    const x = Math.floor(R() * W);
    const y = Math.floor(R() * 3);
    if (g[y][x] === " ") g[y][x] = "+";
  }
  return render(g);
}

function forest() {
  const g = grid(W, H);
  const R = rng(23);
  for (let c = 0; c < W; c++) g[H - 1][c] = R() < 0.3 ? "," : "_";
  for (let c = 2; c < W - 2; c += 2 + Math.floor(R() * 3)) {
    const h = 4 + Math.floor(R() * (H - 5));
    const top = H - 1 - h;
    for (let i = 0; i < h - 1; i++) {
      const r = top + i;
      const spread = Math.min(2, Math.floor(i / 2));
      for (let d = -spread; d <= spread; d++) {
        if (c + d < 0 || c + d >= W) continue;
        g[r][c + d] = d < 0 ? "/" : d > 0 ? "\\" : i === 0 ? "^" : "|";
      }
      if (spread === 0 && i > 0) g[r][c] = "A";
    }
    g[H - 2][c] = "|";
  }
  return render(g);
}

function circuit() {
  const g = grid(W, H);
  const R = rng(5);
  const set = (r: number, c: number, ch: string) => {
    if (c < W && g[r][c] === " ") g[r][c] = ch;
  };
  for (let i = 0; i < 4; i++) {
    const r = 1 + Math.floor(R() * (H - 4));
    const c = 6 + i * 30 + Math.floor(R() * 14);
    ["+--------+", "| ###### |", "+--------+"].forEach((row, dr) => [...row].forEach((ch, dc) => (g[r + dr][c + dc] = ch)));
  }
  for (let t = 0; t < 12; t++) {
    let r = Math.floor(R() * H);
    let c = Math.floor(R() * W * 0.6);
    set(r, c, "o");
    const len = 15 + Math.floor(R() * 40);
    for (let i = 0; i < len && c < W - 1; i++) {
      c++;
      if (R() < 0.1) {
        const dir = r < H / 2 ? 1 : -1;
        set(r, c, "+");
        for (let s = 1 + Math.floor(R() * 3); s > 0 && r + dir >= 0 && r + dir < H; s--) set((r += dir), c, "|");
        if (g[r][c] === "|") g[r][c] = "+";
      } else set(r, c, "-");
    }
    if (g[r][c] === "-") g[r][c] = "o";
  }
  return render(g);
}

function synth() {
  const g = grid(W, H);
  const horizon = 5;
  const cx = Math.floor(W / 2);
  for (let r = 0; r < horizon; r++) {
    for (let c = 0; c < W; c++) {
      const dx = (c - cx) / 2.2;
      const dy = horizon - r;
      if (Math.sqrt(dx * dx + dy * dy) < 6) g[r][c] = dy === 2 ? " " : "=";
      else if (r === 0 && c % 17 === 3) g[r][c] = ".";
    }
  }
  for (let c = 0; c < W; c++) g[horizon][c] = "_";
  for (const depth of [2, 4, 7]) for (let c = 0; c < W; c++) g[horizon + depth][c] = "-";
  for (let depth = 1; horizon + depth < H; depth++) {
    for (let k = -12; k <= 12; k++) {
      const c = Math.round(cx + k * 2.4 * depth);
      if (c >= 0 && c < W) g[horizon + depth][c] = k === 0 ? "|" : k < 0 ? "/" : "\\";
    }
  }
  return render(g);
}

function terminal() {
  const g = grid(W, H);
  const R = rng(31);
  const put = (r: number, c: number, s: string) => [...s].forEach((ch, i) => c + i < W && (g[r][c + i] = ch));
  put(0, 0, "+" + "-".repeat(W - 2) + "+");
  put(H - 1, 0, "+" + "-".repeat(W - 2) + "+");
  for (let r = 1; r < H - 1; r++) {
    g[r][0] = "|";
    g[r][W - 1] = "|";
  }
  put(1, 2, "o o o");
  let indent = 0;
  for (let r = 2; r < H - 2; r++) {
    const n = String(r - 1).padStart(2, " ");
    put(r, 3, n);
    const roll = R();
    if (roll < 0.25 && indent > 0) {
      indent--;
      put(r, 8 + indent * 2, "}");
      continue;
    }
    let line = roll < 0.55 ? "fn " : roll < 0.75 ? "let " : "// ";
    const words = 2 + Math.floor(R() * 6);
    for (let w = 0; w < words; w++) line += "=".repeat(2 + Math.floor(R() * 7)) + " ";
    if (roll < 0.55) {
      line += "{";
      put(r, 8 + indent * 2, line);
      indent++;
    } else put(r, 8 + indent * 2, line);
  }
  put(H - 2, 8, "$ _");
  return render(g);
}

function network() {
  const g = grid(W, H);
  const R = rng(41);
  const nodes = Array.from({ length: 22 }, () => [Math.floor(R() * H), 2 + Math.floor(R() * (W - 4))]);
  const dist = (a: number[], b: number[]) => Math.hypot((a[0] - b[0]) * 2.2, a[1] - b[1]);
  for (const a of nodes) {
    const nearest = nodes.filter((b) => b !== a).sort((x, y) => dist(a, x) - dist(a, y)).slice(0, 2);
    for (const b of nearest) {
      const steps = Math.max(Math.abs(b[1] - a[1]), Math.abs(b[0] - a[0]) * 2);
      for (let s = 1; s < steps; s++) {
        const r = Math.round(a[0] + ((b[0] - a[0]) * s) / steps);
        const c = Math.round(a[1] + ((b[1] - a[1]) * s) / steps);
        if (g[r][c] === " ") g[r][c] = ".";
      }
    }
  }
  nodes.forEach(([r, c], i) => (g[r][c] = i % 5 === 0 ? "@" : "o"));
  return render(g);
}

export const covers: Record<AsciiKind, () => string> = {
  chart,
  wave,
  rings,
  rain,
  mountains,
  sunset,
  city,
  forest,
  circuit,
  synth,
  terminal,
  network,
};
