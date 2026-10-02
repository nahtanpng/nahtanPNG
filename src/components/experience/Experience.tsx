import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TagList } from "@/components/ui/Tag";
import { TimelineRow } from "@/components/ui/TimelineRow";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <Section id="experience">
      <SectionHeader eyebrow="experience" title="Work Experience" />
      <div className="flex flex-col gap-9">
        {experience.map((job) => (
          <TimelineRow key={`${job.company}-${job.role}`} aside={job.period} className="flex flex-col gap-2.5">
            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <h3 className="m-0 text-base font-semibold">{job.role}</h3>
              <span className="text-[15px] text-muted">· {job.company}</span>
            </div>
            <p className="m-0 text-[15px] leading-[1.65] text-pretty text-muted">{job.description}</p>
            <TagList items={job.stack} />
          </TimelineRow>
        ))}
      </div>
    </Section>
  );
}
