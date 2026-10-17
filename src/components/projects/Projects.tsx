import { CardGrid } from "@/components/ui/CardGrid";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { projects } from "@/data/projects";
import { getLatestRelease } from "@/lib/github";
import { ProjectCard } from "./ProjectCard";

export async function Projects() {
  const withReleases = await Promise.all(
    projects.map(async (project) => {
      const release = project.repo ? await getLatestRelease(project.repo) : null;
      return release ? { ...project, status: release } : project;
    }),
  );

  return (
    <Section id="projects">
      <SectionHeader eyebrow="projects" title="My stuffs" />
      <CardGrid>
        {withReleases.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </CardGrid>
    </Section>
  );
}
