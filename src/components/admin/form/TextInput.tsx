import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { controlClass } from "./styles";

export function TextInput({ className, invalid, ...props }: ComponentProps<"input"> & { invalid?: boolean }) {
  return <input aria-invalid={invalid || undefined} className={cn(controlClass, "h-10", className)} {...props} />;
}
