"use client";

import { CoverField } from "@/components/admin/form/CoverField";
import { Field } from "@/components/admin/form/Field";
import { FieldGrid } from "@/components/admin/form/FieldGrid";
import { ResourceForm, type FormAction } from "@/components/admin/form/ResourceForm";
import { TagInput } from "@/components/admin/form/TagInput";
import { TextArea } from "@/components/admin/form/TextArea";
import { TextInput } from "@/components/admin/form/TextInput";
import type { Project } from "@/data/types";

export function ProjectForm({ action, item }: { action: FormAction; item?: Project }) {
  return (
    <ResourceForm action={action} cancelHref="/admin/projects">
      {(errors) => (
        <>
          <FieldGrid>
            <Field label="Nome" error={errors.name}>
              <TextInput name="name" defaultValue={item?.name} invalid={!!errors.name} />
            </Field>
            <Field label="Status" error={errors.status} hint="Ex.: in progress, on npm">
              <TextInput name="status" defaultValue={item?.status} invalid={!!errors.status} />
            </Field>
            <Field label="Link" error={errors.href} hint="Opcional">
              <TextInput name="href" defaultValue={item?.href} invalid={!!errors.href} />
            </Field>
          </FieldGrid>
          <Field label="Descrição" error={errors.description}>
            <TextArea name="description" defaultValue={item?.description} invalid={!!errors.description} />
          </Field>
          <Field label="Stack">
            <TagInput name="stack" defaultValue={item?.stack} />
          </Field>
          <CoverField defaultValue={item?.cover} error={errors.cover} />
        </>
      )}
    </ResourceForm>
  );
}
