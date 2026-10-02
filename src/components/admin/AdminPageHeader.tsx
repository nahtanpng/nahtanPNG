import type { ReactNode } from "react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  actions?: ReactNode;
};

export function AdminPageHeader({ title, description, eyebrow = "admin", actions }: AdminPageHeaderProps) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="flex flex-col gap-1.5">
        <span className="font-mono text-xs text-muted">{`// ${eyebrow}`}</span>
        <h1 className="m-0 text-[26px] leading-[1.15] font-semibold tracking-[-0.02em]">{title}</h1>
        {description && <p className="m-0 text-sm text-muted">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}
