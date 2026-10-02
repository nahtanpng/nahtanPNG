"use client";

import Link from "next/link";
import { useRef, useState, type KeyboardEvent } from "react";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { DeleteButton } from "@/components/admin/DeleteButton";
import { CoverField } from "@/components/admin/form/CoverField";
import { Field } from "@/components/admin/form/Field";
import { FieldGrid } from "@/components/admin/form/FieldGrid";
import { FormMessage } from "@/components/admin/form/FormMessage";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { TagInput } from "@/components/admin/form/TagInput";
import { TextArea } from "@/components/admin/form/TextArea";
import { TextInput } from "@/components/admin/form/TextInput";
import { useFormSubmit, type FormAction } from "@/components/admin/form/useFormSubmit";
import { Button, buttonClass } from "@/components/admin/ui/Button";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import { PostHeader } from "@/components/blog/PostHeader";
import type { PostSource } from "@/lib/admin/posts";
import { readingTimeOf } from "@/lib/post-format";
import { slugify } from "@/lib/slugify";
import { ImagePasteArea } from "./ImagePasteArea";
import { MdxPreview } from "./MdxPreview";

type PostEditorProps = {
  post: PostSource;
  saveAction: FormAction;
  deleteAction: () => Promise<void>;
  uploadAction: (formData: FormData) => Promise<{ url: string } | { error: string }>;
};

const FORM_ID = "post-form";

export function PostEditor({ post, saveAction, deleteAction, uploadAction }: PostEditorProps) {
  const { state, pending, onSubmit } = useFormSubmit(saveAction);
  const [meta, setMeta] = useState(post.metadata);
  const [slug, setSlug] = useState(post.slug);
  const [content, setContent] = useState(post.body);
  const formRef = useRef<HTMLFormElement>(null);
  const errors = state.fieldErrors ?? {};

  const set = <K extends keyof typeof meta>(key: K, value: (typeof meta)[K]) =>
    setMeta((current) => ({ ...current, [key]: value }));

  const upload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    const result = await uploadAction(formData);
    if ("error" in result) throw new Error(result.error);
    return result.url;
  };

  const onKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "s") {
      event.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <AdminPage wide>
      <AdminPageHeader
        eyebrow="admin / posts"
        title={meta.title || "Sem título"}
        description={`content/blog/${post.slug}.mdx`}
        actions={
          <>
            <StatusBadge draft={post.metadata.draft} />
            {!post.metadata.draft && (
              <Link href={`/blog/${post.slug}`} target="_blank" className={buttonClass("ghost")}>
                Ver no site ↗
              </Link>
            )}
            <DeleteButton action={deleteAction} label="Excluir post" />
            <SubmitButton form={FORM_ID} pending={pending} />
          </>
        }
      />

      <form id={FORM_ID} ref={formRef} onSubmit={onSubmit} onKeyDown={onKeyDown} className="flex flex-col gap-8">
        <FormMessage state={state} />

        <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="flex flex-col gap-5">
            <FieldGrid>
              <Field label="Título" error={errors.title}>
                <TextInput
                  name="title"
                  value={meta.title}
                  onChange={(event) => set("title", event.target.value)}
                  invalid={!!errors.title}
                />
              </Field>
              <Field label="Slug" error={errors.slug} hint={`/blog/${slug || "…"}`}>
                <div className="flex gap-2">
                  <TextInput
                    name="slug"
                    value={slug}
                    onChange={(event) => setSlug(event.target.value)}
                    invalid={!!errors.slug}
                    className="font-mono text-[13px]"
                  />
                  <Button onClick={() => setSlug(slugify(meta.title))}>Do título</Button>
                </div>
              </Field>
              <Field label="Data" error={errors.date}>
                <TextInput type="date" name="date" value={meta.date} onChange={(event) => set("date", event.target.value)} />
              </Field>
              <Field label="Tags">
                <TagInput name="tags" defaultValue={meta.tags} onChange={(tags) => set("tags", tags)} />
              </Field>
            </FieldGrid>
            <Field label="Resumo" hint="Aparece no card e no topo do post.">
              <TextArea
                name="summary"
                value={meta.summary}
                onChange={(event) => set("summary", event.target.value)}
                className="min-h-20"
              />
            </Field>
          </div>
          <div className="flex flex-col gap-5">
            <CoverField defaultValue={meta.cover} error={errors.cover} onChange={(cover) => set("cover", cover)} preview={false} />
            <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-line p-3">
              <input
                type="checkbox"
                name="draft"
                checked={!!meta.draft}
                onChange={(event) => set("draft", event.target.checked)}
                className="mt-0.5 accent-current"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">Rascunho</span>
                <span className="text-xs text-muted">Não aparece no blog nem na home.</span>
              </span>
            </label>
          </div>
        </section>

        <section className="grid items-start gap-6 lg:grid-cols-2">
          <ImagePasteArea name="content" value={content} onChange={setContent} upload={upload} error={errors.content} />
          <div className="flex flex-col gap-10 rounded-2xl border border-line p-5 lg:sticky lg:top-6 lg:max-h-[calc(100vh-48px)] lg:overflow-y-auto">
            <PostHeader post={{ ...meta, slug, readingTime: readingTimeOf(content) }} />
            <MdxPreview source={content} />
          </div>
        </section>
      </form>
    </AdminPage>
  );
}
