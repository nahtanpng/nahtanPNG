import { rng } from "./rng";

const RAMP = ".·:;+=xX$#@";
const SWEEP = 0.65;

export function thresholds(length: number, seed: number) {
  const random = rng(seed);
  const last = Math.max(1, length - 1);
  return Array.from({ length }, (_, i) => (i / last) * 0.6 + random() * 0.4);
}

// Each char starts resolving at `threshold * SWEEP` of the progress and takes the
// remaining `1 - SWEEP` to climb the density ramp before becoming the real char.
export function scramble(chars: string[], thresholds: number[], progress: number, seed: number) {
  const jitter = rng(seed);
  let out = "";

  for (let i = 0; i < chars.length; i++) {
    const char = chars[i];
    const local = (progress - thresholds[i] * SWEEP) / (1 - SWEEP);

    if (local >= 1 || char.trim() === "") {
      out += char;
      continue;
    }

    const level = Math.round(Math.max(0, local) * (RAMP.length - 1) + (jitter() - 0.5) * 3);
    out += RAMP[Math.min(RAMP.length - 1, Math.max(0, level))];
  }

  return out;
}
