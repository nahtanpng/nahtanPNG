"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { buttonClass } from "@/components/admin/ui/Button";
import type { FieldErrors } from "@/lib/admin/form";
import { FormMessage } from "./FormMessage";
import { SubmitButton } from "./SubmitButton";
import { useFormSubmit, type FormAction } from "./useFormSubmit";

export type { FormAction };

type ResourceFormProps = {
  action: FormAction;
  cancelHref: string;
  children: (errors: FieldErrors) => ReactNode;
};

export function ResourceForm({ action, cancelHref, children }: ResourceFormProps) {
  const { state, pending, onSubmit } = useFormSubmit(action);

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-5">
      {children(state.fieldErrors ?? {})}
      <div className="flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <SubmitButton pending={pending} />
        <Link href={cancelHref} className={buttonClass("ghost")}>
          Cancelar
        </Link>
        <FormMessage state={state} />
      </div>
    </form>
  );
}
