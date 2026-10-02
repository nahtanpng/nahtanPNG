import type { FormState } from "@/lib/admin/form";
import { cn } from "@/lib/cn";

export function FormMessage({ state }: { state: FormState }) {
  if (!state.message) return null;

  return (
    <p role="status" className={cn("m-0 text-[13px]", state.status === "error" ? "text-danger" : "text-muted")}>
      {state.message}
    </p>
  );
}
