import { ContributionCell } from "./ContributionCell";

const LEVELS = [0, 1, 2, 3, 4] as const;

export function ContributionLegend() {
  return (
    <div className="flex items-center gap-1">
      <span className="mr-1">Less</span>
      {LEVELS.map((level) => (
        <ContributionCell key={level} level={level} />
      ))}
      <span className="ml-1">More</span>
    </div>
  );
}
