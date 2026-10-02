"use client";

import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";
import { useToggleTheme } from "@/components/providers/useToggleTheme";
import { sections } from "@/data/sections";
import { socials } from "@/data/socials";
import { formatPostDate } from "@/lib/post-format";

export type CommandGroup = "Go to" | "Blog" | "Links" | "Actions";

export type PalettePost = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
};

export type Command = {
  id: string;
  group: CommandGroup;
  label: string;
  glyph: string;
  hint: string;
  keywords?: string[];
  hiddenUntilSearch?: boolean;
  run: () => void;
};

const RECENT_POSTS = 3;

export function useCommands(posts: PalettePost[]) {
  const router = useRouter();
  const pathname = usePathname();
  const toggleTheme = useToggleTheme();

  return useMemo<Command[]>(() => {
    const goTo = (id: string) => {
      if (pathname !== "/") {
        router.push(`/#${id}`);
        return;
      }
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 0);
    };

    const openLink = (href: string) => {
      if (href.startsWith("mailto:")) window.location.assign(href);
      else window.open(href, "_blank", "noopener");
    };

    return [
      ...sections.map((section) => ({
        id: `section-${section.id}`,
        group: "Go to" as const,
        label: section.label,
        glyph: "#",
        hint: "section",
        run: () => goTo(section.id),
      })),
      ...posts.map((post, index) => ({
        id: `post-${post.slug}`,
        group: "Blog" as const,
        label: post.title,
        glyph: "¶",
        hint: formatPostDate(post.date),
        keywords: [post.summary, ...post.tags],
        hiddenUntilSearch: index >= RECENT_POSTS,
        run: () => router.push(`/blog/${post.slug}`),
      })),
      ...socials.map((social) => ({
        id: `link-${social.icon}`,
        group: "Links" as const,
        label: social.label,
        glyph: social.icon === "mail" ? "@" : "↗",
        hint: social.hint,
        run: () => openLink(social.href),
      })),
      {
        id: "action-theme",
        group: "Actions",
        label: "Toggle theme",
        glyph: "~",
        hint: "light / dark",
        run: toggleTheme,
      },
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              id: "action-admin",
              group: "Actions" as const,
              label: "Admin panel",
              glyph: "*",
              hint: "dev only",
              run: () => router.push("/admin"),
            },
          ]
        : []),
    ];
  }, [pathname, posts, router, toggleTheme]);
}
