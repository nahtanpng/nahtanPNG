import { LOGO_GHOST_RUN, LOGO_MARK } from "@/lib/ascii/logo-mark";
import { cn } from "@/lib/cn";

function segments(line: string) {
  return line.split(LOGO_GHOST_RUN).filter(Boolean);
}

export function AsciiLogoMark({ className }: { className?: string }) {
  return (
    <pre aria-hidden="true" className={cn("m-0 font-mono text-[11px] leading-[13px] text-fg select-none", className)}>
      {LOGO_MARK.map((line, row) => (
        <span key={row} className="block">
          {segments(line).map((part, i) => (
            <span key={i} className={LOGO_GHOST_RUN.test(part) ? "text-muted" : undefined}>
              {part}
            </span>
          ))}
        </span>
      ))}
    </pre>
  );
}
