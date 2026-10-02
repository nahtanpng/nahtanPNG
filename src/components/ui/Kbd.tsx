import { cn } from "@/lib/cn";

export function Kbd({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <kbd className={cn("rounded-[5px] border border-line px-1.5 py-0.5 font-mono text-[11px] text-muted", className)}>
      {children}
    </kbd>
  );
}
