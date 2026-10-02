let context: AudioContext | null = null;

function getContext() {
  if (typeof window === "undefined" || !("AudioContext" in window)) return null;
  context ??= new AudioContext();
  if (context.state === "suspended") void context.resume();
  return context;
}

type NoiseHit = {
  start: number;
  duration: number;
  decay: number;
  filter: BiquadFilterType;
  frequency: number;
  q: number;
  volume: number;
};

function playNoise(ctx: AudioContext, { start, duration, decay, filter, frequency, q, volume }: NoiseHit) {
  const length = Math.floor(ctx.sampleRate * duration);
  const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = (Math.random() * 2 - 1) * (1 - i / length) ** decay;

  const source = ctx.createBufferSource();
  const shape = ctx.createBiquadFilter();
  const gain = ctx.createGain();
  source.buffer = buffer;
  shape.type = filter;
  shape.frequency.value = frequency;
  shape.Q.value = q;
  gain.gain.value = volume;
  source.connect(shape).connect(gain).connect(ctx.destination);
  source.start(start);
}

export function playSwitchClick(direction: "on" | "off") {
  const ctx = getContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const tone = direction === "on" ? 2 : 1;

  playNoise(ctx, {
    start: now,
    duration: 0.006,
    decay: 6,
    filter: "bandpass",
    frequency: 50 * tone,
    q: 1.1,
    volume: 0.55,
  });
  playNoise(ctx, {
    start: now + 0.004,
    duration: 0.035,
    decay: 3,
    filter: "bandpass",
    frequency: 320 * tone,
    q: 0.9,
    volume: 0.7,
  });
}
