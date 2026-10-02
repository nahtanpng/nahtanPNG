import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function Section({ className, ...props }: ComponentProps<"section">) {
  return <section className={cn("flex scroll-mt-20 flex-col gap-7", className)} {...props} />;
}
