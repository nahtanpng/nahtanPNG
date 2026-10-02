import Link from "next/link";
import { DeleteButton } from "./DeleteButton";
import { Button, buttonClass } from "./ui/Button";

export type ResourceRow = {
  title: string;
  subtitle?: string;
  editHref: string;
  moveUp: () => Promise<void>;
  moveDown: () => Promise<void>;
  remove: () => Promise<void>;
};

export function ResourceList({ rows, emptyLabel }: { rows: ResourceRow[]; emptyLabel: string }) {
  if (rows.length === 0) {
    return (
      <p className="m-0 rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
        {emptyLabel}
      </p>
    );
  }

  return (
    <ol className="m-0 flex list-none flex-col divide-y divide-line rounded-xl border border-line p-0">
      {rows.map((row, index) => (
        <li key={row.editHref} className="flex flex-wrap items-center gap-3 px-4 py-3">
          <span className="w-5 flex-none font-mono text-xs text-faint">{index + 1}</span>
          <Link href={row.editHref} className="flex min-w-0 grow flex-col gap-0.5 text-fg no-underline hover:underline">
            <span className="truncate text-[15px] font-medium">{row.title}</span>
            {row.subtitle && <span className="truncate text-[13px] text-muted">{row.subtitle}</span>}
          </Link>
          <div className="flex items-center gap-1">
            <form action={row.moveUp}>
              <Button type="submit" variant="ghost" size="icon" aria-label="Mover para cima" disabled={index === 0}>
                ↑
              </Button>
            </form>
            <form action={row.moveDown}>
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                aria-label="Mover para baixo"
                disabled={index === rows.length - 1}
              >
                ↓
              </Button>
            </form>
            <Link href={row.editHref} className={buttonClass("ghost")}>
              Editar
            </Link>
            <DeleteButton action={row.remove} />
          </div>
        </li>
      ))}
    </ol>
  );
}
