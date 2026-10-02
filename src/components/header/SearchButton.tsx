"use client";

import { useCommandPalette } from "@/components/command-palette/CommandPaletteProvider";
import { SearchIcon } from "@/components/icons";
import { Kbd } from "@/components/ui/Kbd";

export function SearchButton() {
  const { setOpen } = useCommandPalette();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Search (Ctrl K)"
      className="flex h-9 cursor-pointer items-center gap-2 rounded-[9px] border border-line bg-chip pr-1.5 pl-2.5 text-[13px] text-muted transition-colors duration-150 hover:border-faint"
    >
      <SearchIcon size={15} />
      <span className="min-w-16 text-left max-[720px]:hidden">Search…</span>
      <Kbd className="bg-bg">Ctrl K</Kbd>
    </button>
  );
}
