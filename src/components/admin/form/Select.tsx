import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { controlClass } from "./styles";

type SelectProps = Omit<ComponentProps<"select">, "children"> & {
  options: readonly string[];
};

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <select className={cn(controlClass, "h-10 cursor-pointer", className)} {...props}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
