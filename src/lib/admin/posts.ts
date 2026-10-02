import { mkdir, readdir, readFile, rename, rm, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import type { PostMetadata } from "@/lib/posts";
import { slugify } from "@/lib/slugify";
import { assertDev } from "./env";
import { detectImageExtension } from "./images";
import { imageFilePath, imagesPath, isValidSlug, postPath, POSTS_DIR } from "./paths";

export type PostSource = {
  slug: string;
  metadata: PostMetadata;
  body: string;
};

const METADATA_PATTERN = /^export const metadata = (\{[\s\S]*?\n\});\n/;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

async function exists(target: string) {
  return stat(target).then(
    () => true,
    () => false,
  );
}

export function serializePost(metadata: PostMetadata, body: string) {
  return `export const metadata = ${JSON.stringify(metadata, null, 2)};\n\n${body.trim()}\n`;
}

export async function readPostSource(slug: string): Promise<PostSource | null> {
  if (!isValidSlug(slug) || !(await exists(postPath(slug)))) return null;
  const source = await readFile(postPath(slug), "utf8");
  const match = source.match(METADATA_PATTERN);
  if (!match) throw new Error(`content/blog/${slug}.mdx has no JSON metadata block.`);
  return { slug, metadata: JSON.parse(match[1]) as PostMetadata, body: source.slice(match[0].length).trim() };
}

export async function listPostSources() {
  const files = await readdir(POSTS_DIR);
  const posts = await Promise.all(
    files
      .map((file) => file.replace(/\.mdx$/, ""))
      .filter((slug, i) => files[i].endsWith(".mdx") && isValidSlug(slug))
      .map(readPostSource),
  );
  return posts
    .filter((post): post is PostSource => post !== null)
    .sort((a, b) => b.metadata.date.localeCompare(a.metadata.date));
}

export async function postExists(slug: string) {
  return exists(postPath(slug));
}

export async function writePost(slug: string, metadata: PostMetadata, body: string) {
  assertDev();
  await writeFile(postPath(slug), serializePost(metadata, body));
}

export async function renamePost(from: string, to: string) {
  assertDev();
  await rename(postPath(from), postPath(to));
  if (await exists(imagesPath(from))) {
    await rename(imagesPath(from), imagesPath(to));
  }
}

export async function deletePost(slug: string) {
  assertDev();
  await rm(postPath(slug), { force: true });
  await rm(imagesPath(slug), { recursive: true, force: true });
}

export async function savePostImage(slug: string, file: File) {
  assertDev();
  if (file.size > MAX_IMAGE_BYTES) throw new Error("A imagem deve ter no máximo 5 MB.");

  const bytes = new Uint8Array(await file.arrayBuffer());
  const ext = detectImageExtension(file.type, bytes);
  if (!ext) throw new Error("Use imagens PNG, JPEG, WebP, GIF ou AVIF.");

  await mkdir(imagesPath(slug), { recursive: true });

  const base = slugify(path.basename(file.name, path.extname(file.name))) || "image";
  let name = `${base}${ext}`;
  for (let i = 1; await exists(imageFilePath(slug, name)); i++) name = `${base}-${i}${ext}`;

  await writeFile(imageFilePath(slug, name), bytes);
  return `/blog/${slug}/${name}`;
}
