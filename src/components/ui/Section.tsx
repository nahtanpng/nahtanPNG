"use client";

import { type ComponentProps, useRef } from "react";
import { useAsciiReveal } from "@/hooks/useAsciiReveal";
import { cn } from "@/lib/cn";

export function Section({ className, ...props }: ComponentProps<"section">) {
  const ref = useRef<HTMLElement>(null);
  useAsciiReveal(ref);

  return <section className={cn("flex scroll-mt-20 flex-col gap-7", className)} {...props} ref={ref} />;
}
