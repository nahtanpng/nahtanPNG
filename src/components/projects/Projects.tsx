import { CardGrid } from "@/components/ui/CardGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export function Projects() {
  return (
    <Section id="projects">
      <SectionHeader eyebrow="projects" title="My stuffs" />
      <CardGrid>
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </CardGrid>
    </Section>
  );
}
