import Link from "next/link";

export function BackLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="font-mono text-xs text-muted no-underline transition-colors duration-150 hover:text-fg">
      &lt;- {children}
    </Link>
  );
}
