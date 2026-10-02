import Link from "next/link";
import { sections } from "@/data/sections";

export function Nav() {
  return (
    <nav aria-label="Main" className="flex items-center gap-5.5 text-sm max-[720px]:hidden">
      {sections
        .filter((section) => section.nav)
        .map((section) => (
          <Link
            key={section.id}
            href={`/#${section.id}`}
            className="text-muted no-underline transition-colors duration-150 hover:text-fg"
          >
            {section.nav}
          </Link>
        ))}
    </nav>
  );
}
