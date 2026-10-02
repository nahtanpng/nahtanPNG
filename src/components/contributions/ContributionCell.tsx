import type { ContributionLevel } from "@/lib/github";
import { cn } from "@/lib/cn";

const LEVEL_CLASS: Record<ContributionLevel, string> = {
  0: "bg-c0",
  1: "bg-c1",
  2: "bg-c2",
  3: "bg-c3",
  4: "bg-c4",
};

export function ContributionCell({ level }: { level: ContributionLevel | null }) {
  return <div className={cn("size-2.5 rounded-[2px]", level === null ? "bg-transparent" : LEVEL_CLASS[level])} />;
}
