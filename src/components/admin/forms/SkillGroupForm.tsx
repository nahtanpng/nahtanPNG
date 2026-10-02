"use client";

import { Field } from "@/components/admin/form/Field";
import { ResourceForm, type FormAction } from "@/components/admin/form/ResourceForm";
import { TagInput } from "@/components/admin/form/TagInput";
import { TextInput } from "@/components/admin/form/TextInput";
import type { SkillGroup } from "@/data/types";

export function SkillGroupForm({ action, item }: { action: FormAction; item?: SkillGroup }) {
  return (
    <ResourceForm action={action} cancelHref="/admin/skills">
      {(errors) => (
        <>
          <Field label="Categoria" error={errors.category} hint="Ex.: frontend, backend">
            <TextInput name="category" defaultValue={item?.category} invalid={!!errors.category} />
          </Field>
          <Field label="Skills">
            <TagInput name="skills" defaultValue={item?.skills} />
          </Field>
        </>
      )}
    </ResourceForm>
  );
}
