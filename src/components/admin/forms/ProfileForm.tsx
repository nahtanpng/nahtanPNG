"use client";

import { Field } from "@/components/admin/form/Field";
import { FieldGrid } from "@/components/admin/form/FieldGrid";
import { ResourceForm, type FormAction } from "@/components/admin/form/ResourceForm";
import { TextArea } from "@/components/admin/form/TextArea";
import { TextInput } from "@/components/admin/form/TextInput";
import type { Profile } from "@/data/types";

export function ProfileForm({ action, profile }: { action: FormAction; profile: Profile }) {
  return (
    <ResourceForm action={action} cancelHref="/admin">
      {(errors) => (
        <>
          <FieldGrid>
            <Field label="Nome" error={errors.name}>
              <TextInput name="name" defaultValue={profile.name} invalid={!!errors.name} />
            </Field>
            <Field label="Cargo" error={errors.role}>
              <TextInput name="role" defaultValue={profile.role} invalid={!!errors.role} />
            </Field>
            <Field label="Localização" error={errors.location}>
              <TextInput name="location" defaultValue={profile.location} invalid={!!errors.location} />
            </Field>
            <Field label="Fuso exibido" error={errors.timezoneLabel} hint="O relógio usa America/Sao_Paulo">
              <TextInput name="timezoneLabel" defaultValue={profile.timezoneLabel} invalid={!!errors.timezoneLabel} />
            </Field>
            <Field label="Foto" error={errors.avatar} hint="Caminho em public/, ex.: /nathan-perfil.jpeg">
              <TextInput name="avatar" defaultValue={profile.avatar} invalid={!!errors.avatar} />
            </Field>
            <Field label="Usuário do GitHub" error={errors.githubLogin} hint="Usado no gráfico de contribuições">
              <TextInput name="githubLogin" defaultValue={profile.githubLogin} invalid={!!errors.githubLogin} />
            </Field>
          </FieldGrid>
          <Field label="About — primeiro parágrafo" error={errors.bioLead}>
            <TextArea name="bioLead" defaultValue={profile.bio.lead} invalid={!!errors.bioLead} />
          </Field>
          <Field label="About — segundo parágrafo" error={errors.bioRest} hint="Exibido em cinza">
            <TextArea name="bioRest" defaultValue={profile.bio.rest} invalid={!!errors.bioRest} />
          </Field>
        </>
      )}
    </ResourceForm>
  );
}
