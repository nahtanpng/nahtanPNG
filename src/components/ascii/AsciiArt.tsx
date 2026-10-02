import { cn } from "@/lib/cn";

type AsciiArtProps = {
  children: string;
  size?: "sm" | "md";
  className?: string;
};

export function AsciiArt({ children, size = "md", className }: AsciiArtProps) {
  return (
    <pre
      aria-hidden="true"
      className={cn(
        "m-0 flex-none font-mono text-faint select-none",
        size === "sm" ? "text-[10px] leading-3" : "text-[11px] leading-[13px]",
        className,
      )}
    >
      {children}
    </pre>
  );
}
