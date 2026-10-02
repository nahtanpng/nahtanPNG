import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type TimelineRowProps = {
  aside: ReactNode;
  children: ReactNode;
  asideLeading?: "tight" | "loose";
  as?: "article" | "div";
  className?: string;
};

export function TimelineRow({ aside, children, asideLeading = "tight", as: Component = "article", className }: TimelineRowProps) {
  return (
    <Component className="flex flex-wrap gap-x-8 gap-y-2">
      <div
        className={cn(
          "flex-[0_0_150px] font-mono text-xs text-muted",
          asideLeading === "tight" ? "leading-6" : "leading-[30px]",
        )}
      >
        {aside}
      </div>
      <div className={cn("min-w-0 flex-[1_1_380px]", className)}>{children}</div>
    </Component>
  );
}
