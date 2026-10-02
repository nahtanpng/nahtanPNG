"use client";

import { Field } from "@/components/admin/form/Field";
import { FieldGrid } from "@/components/admin/form/FieldGrid";
import { ResourceForm, type FormAction } from "@/components/admin/form/ResourceForm";
import { TagInput } from "@/components/admin/form/TagInput";
import { TextArea } from "@/components/admin/form/TextArea";
import { TextInput } from "@/components/admin/form/TextInput";
import type { Experience } from "@/data/types";

export function ExperienceForm({ action, item }: { action: FormAction; item?: Experience }) {
  return (
    <ResourceForm action={action} cancelHref="/admin/experience">
      {(errors) => (
        <>
          <FieldGrid>
            <Field label="Cargo" error={errors.role}>
              <TextInput name="role" defaultValue={item?.role} invalid={!!errors.role} />
            </Field>
            <Field label="Empresa" error={errors.company}>
              <TextInput name="company" defaultValue={item?.company} invalid={!!errors.company} />
            </Field>
            <Field label="Período" error={errors.period} hint="Ex.: Jan 2024 — Present">
              <TextInput name="period" defaultValue={item?.period} invalid={!!errors.period} />
            </Field>
          </FieldGrid>
          <Field label="Descrição" error={errors.description}>
            <TextArea name="description" defaultValue={item?.description} invalid={!!errors.description} />
          </Field>
          <Field label="Stack">
            <TagInput name="stack" defaultValue={item?.stack} />
          </Field>
        </>
      )}
    </ResourceForm>
  );
}
