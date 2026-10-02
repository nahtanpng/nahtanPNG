import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { controlClass } from "./styles";

export function TextArea({ className, invalid, ...props }: ComponentProps<"textarea"> & { invalid?: boolean }) {
  return (
    <textarea
      aria-invalid={invalid || undefined}
      className={cn(controlClass, "min-h-28 resize-y py-2.5 leading-[1.6]", className)}
      {...props}
    />
  );
}
