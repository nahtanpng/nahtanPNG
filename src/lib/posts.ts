import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";
import type { AsciiKind } from "@/lib/ascii/covers";
import { readingTimeOf } from "@/lib/post-format";

export type PostMetadata = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  cover: AsciiKind;
  draft?: boolean;
};

export type Post = PostMetadata & {
  slug: string;
  readingTime: number;
};

type PostModule = {
  default: MDXContent;
  metadata: PostMetadata;
};

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

async function loadModule(slug: string) {
  return (await import(`@content/blog/${slug}.mdx`)) as PostModule;
}

async function readingTime(slug: string) {
  const source = await readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
  return readingTimeOf(source.replace(/export const metadata[\s\S]*?\n};?\n/, ""));
}

export async function getSlugs() {
  const files = await readdir(POSTS_DIR);
  return files.filter((file) => file.endsWith(".mdx")).map((file) => file.replace(/\.mdx$/, ""));
}

export async function getPost(slug: string) {
  const mod = await loadModule(slug);
  const post: Post = { ...mod.metadata, slug, readingTime: await readingTime(slug) };
  return { post, Content: mod.default };
}

export async function getPosts(limit?: number) {
  const slugs = await getSlugs();
  const all = await Promise.all(slugs.map(async (slug) => (await getPost(slug)).post));
  const posts = all.filter((post) => !post.draft);
  posts.sort((a, b) => b.date.localeCompare(a.date));
  return limit ? posts.slice(0, limit) : posts;
}
