import type { ComponentType } from "react";
import { ArrowUpRightIcon } from "@/components/icons";

type ExternalLinkCardProps = {
  href: string;
  title: string;
  subtitle: string;
  icon: ComponentType<{ size?: number }>;
};

export function ExternalLinkCard({ href, title, subtitle, icon: Icon }: ExternalLinkCardProps) {
  const external = href.startsWith("http");

  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3.5 rounded-xl border border-line p-3 text-fg no-underline transition-colors duration-150 hover:bg-hover"
    >
      <div className="flex size-11 flex-none items-center justify-center rounded-[9px] bg-chip">
        <Icon size={20} />
      </div>
      <div className="flex min-w-0 grow flex-col gap-0.5">
        <span className="text-[15px] font-medium">{title}</span>
        <span className="truncate font-mono text-[13px] text-muted">{subtitle}</span>
      </div>
      <ArrowUpRightIcon className="flex-none text-muted" />
    </a>
  );
}
