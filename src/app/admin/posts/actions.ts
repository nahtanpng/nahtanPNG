"use server";

import { compile } from "@mdx-js/mdx";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { assertLocalRequest } from "@/lib/admin/env";
import { parseForm, rules, type FormState } from "@/lib/admin/form";
import { isValidSlug } from "@/lib/admin/paths";
import { deletePost, postExists, renamePost, savePostImage, writePost } from "@/lib/admin/posts";
import type { PostMetadata } from "@/lib/posts";
import { slugify } from "@/lib/slugify";

const postShape = {
  title: rules.text("Título"),
  slug: rules.slug(),
  date: rules.date("Data"),
  summary: rules.optionalText(),
  tags: rules.tags(),
  cover: rules.cover(),
  draft: rules.checkbox(),
  content: rules.raw(),
};

function refresh() {
  revalidatePath("/", "layout");
}

function today() {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());
}

async function uniqueSlug(base: string) {
  let slug = base;
  for (let i = 2; await postExists(slug); i++) slug = `${base}-${i}`;
  return slug;
}

export async function createPost(_state: FormState, formData: FormData): Promise<FormState> {
  await assertLocalRequest();
  const parsed = parseForm(formData, { title: rules.text("Título") });
  if (!parsed.ok) return parsed.state;

  const slug = await uniqueSlug(slugify(parsed.data.title) || "post");
  const metadata: PostMetadata = {
    title: parsed.data.title,
    date: today(),
    summary: "",
    tags: [],
    cover: "rings",
    draft: true,
  };

  await writePost(slug, metadata, "");
  refresh();
  redirect(`/admin/posts/${slug}`);
}

export async function savePost(originalSlug: string, _state: FormState, formData: FormData): Promise<FormState> {
  await assertLocalRequest();
  if (!isValidSlug(originalSlug)) return { status: "error", message: "Post inválido." };
  const parsed = parseForm(formData, postShape);
  if (!parsed.ok) return parsed.state;

  const { slug, content, draft, ...fields } = parsed.data;
  const renamed = slug !== originalSlug;

  if (renamed && (await postExists(slug))) {
    return { status: "error", message: "Revise os campos destacados.", fieldErrors: { slug: "Já existe um post com esse slug." } };
  }

  try {
    await compile(content);
  } catch (error) {
    return {
      status: "error",
      message: "O MDX tem um erro de sintaxe; nada foi salvo.",
      fieldErrors: { content: error instanceof Error ? error.message : String(error) },
    };
  }

  const metadata: PostMetadata = draft ? { ...fields, draft } : fields;
  const body = renamed ? content.replaceAll(`/blog/${originalSlug}/`, `/blog/${slug}/`) : content;

  if (renamed) await renamePost(originalSlug, slug);
  await writePost(slug, metadata, body);
  refresh();

  if (renamed) redirect(`/admin/posts/${slug}`);
  return { status: "success", message: `Salvo às ${new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}.` };
}

export async function removePost(slug: string) {
  await assertLocalRequest();
  if (!isValidSlug(slug)) throw new Error("Post inválido.");
  await deletePost(slug);
  refresh();
  redirect("/admin/posts");
}

export async function uploadPostImage(slug: string, formData: FormData): Promise<{ url: string } | { error: string }> {
  await assertLocalRequest();
  if (!isValidSlug(slug)) return { error: "Post inválido." };
  const file = formData.get("file");
  if (!(file instanceof File)) return { error: "Nenhum arquivo enviado." };

  try {
    return { url: await savePostImage(slug, file) };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Falha ao salvar a imagem." };
  }
}
