import { SOCIAL_ICONS, type Education, type Experience, type Project, type SkillGroup, type Social } from "@/data/types";
import type { DataFile } from "./files";
import { rules, type Rule } from "./form";

type ResourceConfig<T> = {
  file: DataFile;
  title: string;
  singular: string;
  description: string;
  shape: Record<string, Rule<unknown>>;
  summary: (item: T) => { title: string; subtitle?: string };
};

const defineResource = <T>(config: ResourceConfig<T>) => config;

export const resources = {
  socials: defineResource<Social>({
    file: "socials",
    title: "Redes",
    singular: "rede",
    description: "Cards de links do perfil e grupo Links da busca.",
    shape: {
      label: rules.text("Nome"),
      handle: rules.text("Usuário"),
      href: rules.link("Link"),
      icon: rules.oneOf(SOCIAL_ICONS, "Ícone"),
      hint: rules.text("Dica"),
    },
    summary: (item) => ({ title: item.label, subtitle: item.handle }),
  }),
  experience: defineResource<Experience>({
    file: "experience",
    title: "Experiência",
    singular: "experiência",
    description: "Seção Work Experience.",
    shape: {
      role: rules.text("Cargo"),
      company: rules.text("Empresa"),
      period: rules.text("Período"),
      description: rules.text("Descrição"),
      stack: rules.tags(),
    },
    summary: (item) => ({ title: `${item.role} · ${item.company}`, subtitle: item.period }),
  }),
  education: defineResource<Education>({
    file: "education",
    title: "Educação",
    singular: "formação",
    description: "Seção Education.",
    shape: {
      course: rules.text("Curso"),
      institution: rules.text("Instituição"),
      period: rules.text("Período"),
    },
    summary: (item) => ({ title: item.course, subtitle: `${item.institution} · ${item.period}` }),
  }),
  projects: defineResource<Project>({
    file: "projects",
    title: "Projetos",
    singular: "projeto",
    description: "Cards da seção Projects.",
    shape: {
      name: rules.text("Nome"),
      status: rules.text("Status"),
      description: rules.text("Descrição"),
      stack: rules.tags(),
      cover: rules.cover(),
      href: rules.optionalLink(),
    },
    summary: (item) => ({ title: item.name, subtitle: item.status }),
  }),
  skills: defineResource<SkillGroup>({
    file: "skills",
    title: "Skills",
    singular: "grupo",
    description: "Grupos da seção Skills.",
    shape: {
      category: rules.text("Categoria"),
      skills: rules.tags(),
    },
    summary: (item) => ({ title: item.category, subtitle: item.skills.join(", ") }),
  }),
};

export type ResourceName = keyof typeof resources;

export const RESOURCE_NAMES = Object.keys(resources) as ResourceName[];

export function isResourceName(value: string): value is ResourceName {
  return Object.hasOwn(resources, value);
}
