import { cn } from "@/lib/cn";

export function StatusBadge({ draft }: { draft?: boolean }) {
  return (
    <span
      className={cn(
        "rounded-md px-2 py-[3px] font-mono text-[11px]",
        draft ? "border border-dashed border-faint text-muted" : "bg-chip text-fg",
      )}
    >
      {draft ? "rascunho" : "publicado"}
    </span>
  );
}
