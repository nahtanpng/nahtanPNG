import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "md" | "icon";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-fg text-bg hover:opacity-85",
  secondary: "border border-line bg-chip text-fg hover:border-faint",
  ghost: "text-muted hover:bg-hover hover:text-fg",
  danger: "border border-line text-danger hover:bg-hover",
};

const SIZES: Record<Size, string> = {
  md: "h-9 px-3",
  icon: "size-8",
};

export function buttonClass(variant: Variant = "secondary", size: Size = "md") {
  return cn(
    "inline-flex flex-none cursor-pointer items-center justify-center gap-2 rounded-[9px] text-[13px] font-medium no-underline transition-[background-color,border-color,opacity] duration-150 disabled:cursor-not-allowed disabled:opacity-50",
    VARIANTS[variant],
    SIZES[size],
  );
}

type ButtonProps = ComponentProps<"button"> & { variant?: Variant; size?: Size };

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonClass(variant, size), className)} {...props} />;
}
