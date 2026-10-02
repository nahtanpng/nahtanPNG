import { covers, type AsciiKind } from "@/lib/ascii/covers";
import { cn } from "@/lib/cn";
import { AsciiArt } from "./AsciiArt";

type AsciiCoverProps = {
  kind: AsciiKind;
  className?: string;
};

export function AsciiCover({ kind, className }: AsciiCoverProps) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex h-37 items-center justify-center overflow-hidden rounded-[14px] bg-chip", className)}
    >
      <AsciiArt size="sm">{covers[kind]()}</AsciiArt>
    </div>
  );
}
