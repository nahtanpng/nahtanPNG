"use client";

import { startTransition, useActionState, type FormEvent } from "react";
import { initialFormState, type FormState } from "@/lib/admin/form";

export type FormAction = (state: FormState, formData: FormData) => Promise<FormState>;

export function useFormSubmit(action: FormAction) {
  const [state, dispatch, pending] = useActionState(action, initialFormState);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => dispatch(formData));
  };

  return { state, pending, onSubmit };
}
