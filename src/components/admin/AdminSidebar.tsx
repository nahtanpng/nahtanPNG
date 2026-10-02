"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/header/ThemeToggle";
import { ArrowUpRightIcon } from "@/components/icons";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/cn";
import { ADMIN_NAV } from "./nav";

function isActive(pathname: string, href: string) {
  return href === "/admin" ? pathname === href : pathname.startsWith(href);
}

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="sticky top-0 z-20 flex flex-col gap-4 border-b border-line bg-head px-5 py-4 backdrop-blur-md md:h-screen md:gap-8 md:border-r md:border-b-0 md:bg-transparent md:pt-6 md:pb-20 md:backdrop-blur-none">
      <div className="flex items-center justify-between">
        <Link href="/admin" className="flex items-center gap-2.5 text-fg no-underline">
          <Logo size={22} />
          <span className="font-mono text-xs text-muted">{"// admin"}</span>
        </Link>
        <div className="md:hidden">
          <ThemeToggle />
        </div>
      </div>

      <nav aria-label="Painel" className="-mx-1 flex gap-1 overflow-x-auto md:mx-0 md:flex-col md:gap-6 md:overflow-visible">
        {ADMIN_NAV.map((section) => (
          <div key={section.group} className="flex gap-1 md:flex-col">
            <span className="hidden px-2.5 pb-1 font-mono text-[11px] text-faint md:block">{section.group}</span>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-2.5 py-1.5 text-sm whitespace-nowrap no-underline transition-colors duration-150",
                  isActive(pathname, item.href) ? "bg-hover text-fg" : "text-muted hover:text-fg",
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="mt-auto hidden items-center justify-between md:flex">
        <Link href="/" target="_blank" className="flex items-center gap-1.5 text-sm text-muted no-underline hover:text-fg">
          Ver site <ArrowUpRightIcon size={14} />
        </Link>
        <ThemeToggle />
      </div>
    </aside>
  );
}
