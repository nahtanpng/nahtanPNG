import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { LOGO_GHOST_RUN, LOGO_MARK } from "@/lib/ascii/logo-mark";
import { SITE_HOST } from "@/lib/site";

export const OG_SIZE = { width: 1200, height: 630 };

// Dark theme tokens from globals.css
const COLORS = {
  bg: "#0c0c0b",
  fg: "#ececea",
  muted: "#9d9d98",
  faint: "#4f4f4b",
  line: "#262624",
  chip: "#151514",
};

const FONTS_DIR = path.join(process.cwd(), "assets", "fonts");

async function loadFonts() {
  const [regular, semibold, mono] = await Promise.all(
    ["Geist-Regular.ttf", "Geist-SemiBold.ttf", "GeistMono-Regular.ttf"].map((file) =>
      readFile(path.join(FONTS_DIR, file)),
    ),
  );
  return [
    { name: "Geist", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Geist", data: semibold, weight: 600 as const, style: "normal" as const },
    { name: "Geist Mono", data: mono, weight: 400 as const, style: "normal" as const },
  ];
}

function LogoMark({ fontSize }: { fontSize: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", fontFamily: "Geist Mono", fontSize, lineHeight: 1.18 }}>
      {LOGO_MARK.map((line, row) => (
        <div key={row} style={{ display: "flex", whiteSpace: "pre" }}>
          {line
            .split(LOGO_GHOST_RUN)
            .filter(Boolean)
            .map((part, i) => (
              <span key={i} style={{ color: LOGO_GHOST_RUN.test(part) ? COLORS.faint : COLORS.fg }}>
                {part}
              </span>
            ))}
        </div>
      ))}
    </div>
  );
}

function Frame({ children, left, right }: { children: React.ReactNode; left: string; right: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px 64px",
        background: COLORS.bg,
        color: COLORS.fg,
        fontFamily: "Geist",
      }}
    >
      {children}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 28,
          borderTop: `1px solid ${COLORS.line}`,
          fontFamily: "Geist Mono",
          fontSize: 24,
          color: COLORS.muted,
        }}
      >
        <span>{left}</span>
        <span style={{ color: COLORS.fg }}>{right}</span>
      </div>
    </div>
  );
}

export async function profileImage({ name, role, location }: { name: string; role: string; location: string }) {
  return new ImageResponse(
    (
      <Frame left={location} right={SITE_HOST}>
        <div style={{ display: "flex", flex: 1, justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: "-0.03em", lineHeight: 1.05 }}>{name}</div>
            <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 32, color: COLORS.muted }}>
              {role}
              <span style={{ color: COLORS.fg }}>_</span>
            </div>
          </div>
          <LogoMark fontSize={26} />
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}

export async function postImage({
  title,
  summary,
  meta,
  tags,
  author,
}: {
  title: string;
  summary: string;
  meta: string;
  tags: string[];
  author: string;
}) {
  return new ImageResponse(
    (
      <Frame left={author} right={`${SITE_HOST}/blog`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <LogoMark fontSize={11} />
          <div style={{ display: "flex", gap: 10 }}>
            {tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "Geist Mono",
                  fontSize: 20,
                  color: COLORS.muted,
                  background: COLORS.chip,
                  border: `1px solid ${COLORS.line}`,
                  borderRadius: 8,
                  padding: "6px 14px",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontFamily: "Geist Mono", fontSize: 24, color: COLORS.muted }}>{meta}</div>
          <div
            style={{
              fontSize: title.length > 48 ? 60 : 72,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.08,
              lineClamp: 2,
            }}
          >
            {title}
          </div>
          {summary && (
            <div style={{ fontSize: 30, lineHeight: 1.4, color: COLORS.muted, lineClamp: 2 }}>{summary}</div>
          )}
        </div>
      </Frame>
    ),
    { ...OG_SIZE, fonts: await loadFonts() },
  );
}
