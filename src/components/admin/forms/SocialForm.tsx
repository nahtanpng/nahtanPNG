"use client";

import { Field } from "@/components/admin/form/Field";
import { FieldGrid } from "@/components/admin/form/FieldGrid";
import { ResourceForm, type FormAction } from "@/components/admin/form/ResourceForm";
import { Select } from "@/components/admin/form/Select";
import { TextInput } from "@/components/admin/form/TextInput";
import { SOCIAL_ICONS, type Social } from "@/data/types";

export function SocialForm({ action, item }: { action: FormAction; item?: Social }) {
  return (
    <ResourceForm action={action} cancelHref="/admin/socials">
      {(errors) => (
        <FieldGrid>
          <Field label="Nome" error={errors.label}>
            <TextInput name="label" defaultValue={item?.label} invalid={!!errors.label} placeholder="GitHub" />
          </Field>
          <Field label="Usuário exibido" error={errors.handle}>
            <TextInput name="handle" defaultValue={item?.handle} invalid={!!errors.handle} />
          </Field>
          <Field label="Link" error={errors.href} hint="https://… ou mailto:…">
            <TextInput name="href" defaultValue={item?.href} invalid={!!errors.href} />
          </Field>
          <Field label="Dica na busca" error={errors.hint} hint="Texto à direita no Ctrl K">
            <TextInput name="hint" defaultValue={item?.hint} invalid={!!errors.hint} placeholder="github.com" />
          </Field>
          <Field label="Ícone" error={errors.icon}>
            <Select name="icon" options={SOCIAL_ICONS} defaultValue={item?.icon} />
          </Field>
        </FieldGrid>
      )}
    </ResourceForm>
  );
}
