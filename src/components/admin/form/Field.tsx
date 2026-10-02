import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  className?: string;
  children: ReactNode;
};

export function Field({ label, error, hint, className, children }: FieldProps) {
  return (
    <label className={cn("flex min-w-0 flex-col gap-1.5", className)}>
      <span className="text-[13px] font-medium">{label}</span>
      {children}
      {error ? (
        <span className="text-xs text-danger">{error}</span>
      ) : (
        hint && <span className="text-xs text-muted">{hint}</span>
      )}
    </label>
  );
}
