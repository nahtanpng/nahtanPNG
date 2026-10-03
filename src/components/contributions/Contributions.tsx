import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { getContributions } from "@/lib/github";
import { ContributionGraph } from "./ContributionGraph";
import { ContributionLegend } from "./ContributionLegend";

export async function Contributions() {
  const { total, weeks } = await getContributions(profile.githubLogin);
  const profileUrl = `https://github.com/${profile.githubLogin}`;

  return (
    <Section id="github" className="gap-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <SectionHeader eyebrow="github" title="Contributions" />
        <span className="font-mono text-xs text-muted">
          {total === null ? "—" : total.toLocaleString("en-US")} contributions in the last year
        </span>
      </div>
      <ContributionGraph weeks={weeks} />
      <div className="flex flex-wrap items-center justify-between gap-3 font-mono text-[11px] text-muted">
        <a href={profileUrl} target="_blank" rel="noopener noreferrer" className="text-muted hover:underline transition duration-150">
          github.com/{profile.githubLogin}
        </a>
        <ContributionLegend />
      </div>
    </Section>
  );
}
