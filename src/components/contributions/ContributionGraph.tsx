import type { ContributionWeek } from "@/lib/github";
import { ContributionCell } from "./ContributionCell";

const WEEKDAY_LABELS = ["", "Mon", "", "Wed", "", "Fri", ""];

export function ContributionGraph({ weeks }: { weeks: ContributionWeek[] }) {
  return (
    <div className="overflow-x-auto">
      <div role="img" aria-label="GitHub contribution calendar for the last year" className="flex w-max flex-col gap-1.5">
        <div aria-hidden="true" className="ml-7.5 flex h-3 gap-[3px]">
          {weeks.map((week, i) => (
            <div key={i} className="w-2.5 flex-none overflow-visible font-mono text-[10px] leading-3 whitespace-nowrap text-muted">
              {week.label}
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="flex gap-[3px]">
          <div className="grid w-[27px] flex-none grid-rows-[repeat(7,10px)] gap-y-[3px] font-mono text-[9px] leading-2.5 text-muted">
            {WEEKDAY_LABELS.map((label, i) => (
              <div key={i}>{label}</div>
            ))}
          </div>
          {weeks.map((week, i) => (
            <div key={i} className="flex flex-none flex-col gap-[3px]">
              {week.days.map((level, d) => (
                <ContributionCell key={d} level={level} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
