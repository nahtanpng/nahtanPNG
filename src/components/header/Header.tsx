import Link from "next/link";
import { Logo } from "@/components/Logo";
import { Nav } from "./Nav";
import { SearchButton } from "./SearchButton";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  return (
    <header className="sticky top-0 z-20 bg-head backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[760px] items-center justify-between gap-4 px-5">
        <Link href="/#top" aria-label="Home" className="flex-none text-fg">
          <Logo size={28} />
        </Link>
        <Nav />
        <div className="flex flex-none items-center gap-2">
          <SearchButton />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
