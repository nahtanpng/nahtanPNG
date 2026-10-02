import { MiniAscii } from "@/components/ascii/MiniAscii";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { profile } from "@/data/profile";
import { Greeting } from "./Greeting";

export function About() {
  return (
    <Section id="about" className="gap-5">
      <div className="flex items-end justify-between gap-4">
        <SectionHeader eyebrow="about" title={<Greeting />} size="lg" />
        <MiniAscii />
      </div>
      <div className="flex flex-col gap-3.5 text-[15px] leading-[1.7] text-pretty">
        <p className="m-0">{profile.bio.lead}</p>
        <p className="m-0 text-muted">{profile.bio.rest}</p>
      </div>
    </Section>
  );
}
