import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { SkillPill } from "@/components/ui/SkillPill";
import { TimelineRow } from "@/components/ui/TimelineRow";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <Section id="skills">
      <SectionHeader eyebrow="skills" title="Skills" />
      <div className="flex flex-col gap-5.5">
        {skills.map((group) => (
          <TimelineRow
            key={group.category}
            as="div"
            aside={group.category}
            asideLeading="loose"
            className="flex flex-wrap gap-2"
          >
            {group.skills.map((skill) => (
              <SkillPill key={skill}>{skill}</SkillPill>
            ))}
          </TimelineRow>
        ))}
      </div>
    </Section>
  );
}
