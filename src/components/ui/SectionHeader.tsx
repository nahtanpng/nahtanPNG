import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeaderProps = {
  eyebrow: string;
  title: ReactNode;
  size?: "md" | "lg";
};

export function SectionHeader({ eyebrow, title, size = "md" }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-xs text-muted">{`// ${eyebrow}`}</span>
      <h2
        className={cn(
          "m-0 font-semibold",
          size === "lg" ? "text-[30px] leading-[1.1] tracking-[-0.02em]" : "text-[22px] tracking-[-0.01em]",
        )}
      >
        {title}
      </h2>
    </div>
  );
}
