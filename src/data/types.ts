import type { AsciiKind } from "@/lib/ascii/covers";

export const SOCIAL_ICONS = ["github", "linkedin", "discord", "mail"] as const;

export type IconName = (typeof SOCIAL_ICONS)[number];

export type Profile = {
  name: string;
  role: string;
  location: string;
  timezoneLabel: string;
  avatar: string;
  githubLogin: string;
  bio: { lead: string; rest: string };
};

export type Social = {
  label: string;
  handle: string;
  href: string;
  icon: IconName;
  hint: string;
};

export type Section = {
  id: string;
  label: string;
  nav?: string;
};

export type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
  stack: string[];
};

export type Education = {
  course: string;
  institution: string;
  period: string;
};

export type Project = {
  name: string;
  status: string;
  description: string;
  stack: string[];
  cover: AsciiKind;
  href?: string;
};

export type SkillGroup = {
  category: string;
  skills: string[];
};
