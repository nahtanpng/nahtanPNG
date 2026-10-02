"use client";

import { Field } from "@/components/admin/form/Field";
import { FieldGrid } from "@/components/admin/form/FieldGrid";
import { ResourceForm, type FormAction } from "@/components/admin/form/ResourceForm";
import { TextInput } from "@/components/admin/form/TextInput";
import type { Education } from "@/data/types";

export function EducationForm({ action, item }: { action: FormAction; item?: Education }) {
  return (
    <ResourceForm action={action} cancelHref="/admin/education">
      {(errors) => (
        <FieldGrid>
          <Field label="Curso" error={errors.course}>
            <TextInput name="course" defaultValue={item?.course} invalid={!!errors.course} />
          </Field>
          <Field label="Instituição" error={errors.institution}>
            <TextInput name="institution" defaultValue={item?.institution} invalid={!!errors.institution} />
          </Field>
          <Field label="Período" error={errors.period} hint="Ex.: 2019 — 2021">
            <TextInput name="period" defaultValue={item?.period} invalid={!!errors.period} />
          </Field>
        </FieldGrid>
      )}
    </ResourceForm>
  );
}
