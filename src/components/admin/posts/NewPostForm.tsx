"use client";

import { createPost } from "@/app/admin/posts/actions";
import { Field } from "@/components/admin/form/Field";
import { FormMessage } from "@/components/admin/form/FormMessage";
import { SubmitButton } from "@/components/admin/form/SubmitButton";
import { TextInput } from "@/components/admin/form/TextInput";
import { useFormSubmit } from "@/components/admin/form/useFormSubmit";

export function NewPostForm() {
  const { state, pending, onSubmit } = useFormSubmit(createPost);

  return (
    <form onSubmit={onSubmit} className="flex max-w-xl flex-col gap-5">
      <Field label="Título" error={state.fieldErrors?.title} hint="O slug é gerado a partir do título; dá para mudar depois.">
        <TextInput name="title" autoFocus invalid={!!state.fieldErrors?.title} />
      </Field>
      <div className="flex items-center gap-3">
        <SubmitButton pending={pending}>Criar rascunho</SubmitButton>
        <FormMessage state={state} />
      </div>
    </form>
  );
}
