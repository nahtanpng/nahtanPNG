import path from "node:path";
import { SLUG_PATTERN } from "../slugify";

export const POSTS_DIR = path.join(process.cwd(), "content", "blog");
export const IMAGES_DIR = path.join(process.cwd(), "public", "blog");

export function isValidSlug(slug: unknown): slug is string {
  return typeof slug === "string" && SLUG_PATTERN.test(slug);
}

function inside(dir: string, target: string) {
  const resolved = path.resolve(dir, target);
  if (!resolved.startsWith(dir + path.sep)) throw new Error(`Path escapes ${dir}: ${target}`);
  return resolved;
}

function assertSlug(slug: unknown): asserts slug is string {
  if (!isValidSlug(slug)) throw new Error(`Invalid post slug: ${String(slug)}`);
}

export function postPath(slug: unknown) {
  assertSlug(slug);
  return inside(POSTS_DIR, `${slug}.mdx`);
}

export function imagesPath(slug: unknown) {
  assertSlug(slug);
  return inside(IMAGES_DIR, slug);
}

export function imageFilePath(slug: unknown, fileName: string) {
  return inside(imagesPath(slug), fileName);
}
