const SIGNATURES: { mime: string; ext: string; matches: (bytes: Uint8Array) => boolean }[] = [
  { mime: "image/png", ext: ".png", matches: (b) => [0x89, 0x50, 0x4e, 0x47].every((v, i) => b[i] === v) },
  { mime: "image/jpeg", ext: ".jpg", matches: (b) => b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  { mime: "image/gif", ext: ".gif", matches: (b) => ascii(b, 0, 4) === "GIF8" },
  { mime: "image/webp", ext: ".webp", matches: (b) => ascii(b, 0, 4) === "RIFF" && ascii(b, 8, 12) === "WEBP" },
  { mime: "image/avif", ext: ".avif", matches: (b) => ascii(b, 4, 8) === "ftyp" && ascii(b, 8, 12).startsWith("avi") },
];

function ascii(bytes: Uint8Array, start: number, end: number) {
  return String.fromCharCode(...bytes.slice(start, end));
}

export const ACCEPTED_IMAGE_TYPES = SIGNATURES.map((signature) => signature.mime);

export function detectImageExtension(mime: string, bytes: Uint8Array) {
  const signature = SIGNATURES.find((candidate) => candidate.mime === mime);
  return signature?.matches(bytes) ? signature.ext : null;
}
