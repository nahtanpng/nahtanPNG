import { AsciiCover } from "@/components/ascii/AsciiCover";
import { TagList } from "@/components/ui/Tag";
import type { Project } from "@/data/types";

export function ProjectCard({ project }: { project: Project }) {
  const content = (
    <>
      <AsciiCover kind={project.cover} className="transition-colors duration-150 group-hover:bg-hover" />
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center justify-between gap-2">
          <h3 className="m-0 text-base font-semibold underline-offset-3 group-hover:underline">{project.name}</h3>
          <span className="font-mono text-[11px] text-muted">{project.status}</span>
        </div>
        <p className="m-0 text-sm leading-[1.6] text-pretty text-muted">{project.description}</p>
        <TagList items={project.stack} />
      </div>
    </>
  );

  return project.href ? (
    <a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-3.5 text-fg no-underline"
    >
      {content}
    </a>
  ) : (
    <article className="flex flex-col gap-3.5">{content}</article>
  );
}
