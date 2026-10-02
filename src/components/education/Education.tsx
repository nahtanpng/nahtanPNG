import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TimelineRow } from "@/components/ui/TimelineRow";
import { education } from "@/data/education";

export function Education() {
  return (
    <Section id="education">
      <SectionHeader eyebrow="education" title="Education" />
      {education.map((item) => (
        <TimelineRow key={`${item.institution}-${item.course}`} aside={item.period} className="flex flex-col gap-1.5">
          <h3 className="m-0 text-base font-semibold">{item.course}</h3>
          <span className="text-[15px] text-muted">{item.institution}</span>
        </TimelineRow>
      ))}
    </Section>
  );
}
