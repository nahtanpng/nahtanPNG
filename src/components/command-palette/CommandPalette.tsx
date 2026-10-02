"use client";

import { Command } from "cmdk";
import { useState } from "react";
import { SearchIcon } from "@/components/icons";
import { Kbd } from "@/components/ui/Kbd";
import { useCommands, type Command as PaletteCommand, type CommandGroup, type PalettePost } from "./useCommands";

const GROUPS: CommandGroup[] = ["Go to", "Blog", "Links", "Actions"];

const matchesSearch = (_value: string, search: string, keywords: string[] = []) => {
  const query = search.trim().toLowerCase();
  return !query || keywords.some((keyword) => keyword.toLowerCase().includes(query)) ? 1 : 0;
};

type CommandPaletteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  posts: PalettePost[];
};

export function CommandPalette({ open, onOpenChange, posts }: CommandPaletteProps) {
  const commands = useCommands(posts);
  const [search, setSearch] = useState("");
  const [wasOpen, setWasOpen] = useState(open);

  if (open !== wasOpen) {
    setWasOpen(open);
    if (open) setSearch("");
  }

  const run = (command: PaletteCommand) => {
    onOpenChange(false);
    command.run();
  };

  return (
    <Command.Dialog
      open={open}
      onOpenChange={onOpenChange}
      label="Search"
      filter={matchesSearch}
      loop
      overlayClassName="fixed inset-0 z-50 bg-scrim"
      contentClassName="fixed top-24 left-1/2 z-50 flex w-[calc(100%-32px)] max-w-[560px] -translate-x-1/2 flex-col overflow-hidden rounded-[14px] border border-line bg-bg text-fg shadow-[0_24px_64px_rgba(0,0,0,.18)]"
    >
      <div className="flex h-13 items-center gap-2.5 border-b border-line px-3.5">
        <SearchIcon size={17} className="flex-none text-muted" />
        <Command.Input
          value={search}
          onValueChange={setSearch}
          placeholder="Search sections, posts, links…"
          className="h-full min-w-0 grow border-none bg-transparent text-[15px] text-fg outline-none placeholder:text-faint"
        />
        <Kbd>Esc</Kbd>
      </div>

      <Command.List className="max-h-[340px] overflow-y-auto p-1.5">
        <Command.Empty className="px-2.5 py-7 text-center text-sm text-muted">No results for “{search}”</Command.Empty>
        {GROUPS.map((group) => (
          <Command.Group
            key={group}
            heading={group}
            className="pb-1 [&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:pt-2.5 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:text-muted"
          >
            {commands
              .filter((command) => command.group === group && (search.trim() || !command.hiddenUntilSearch))
              .map((command) => (
                <Command.Item
                  key={command.id}
                  value={command.id}
                  keywords={[command.label, command.group, ...(command.keywords ?? [])]}
                  onSelect={() => run(command)}
                  className="flex min-h-11 cursor-pointer items-center gap-3 rounded-[9px] px-2.5 text-sm data-[selected=true]:bg-hover"
                >
                  <span aria-hidden="true" className="w-4.5 flex-none text-center font-mono text-[13px] text-muted">
                    {command.glyph}
                  </span>
                  <span className="min-w-0 grow truncate">{command.label}</span>
                  <span className="flex-none font-mono text-[11px] text-muted">{command.hint}</span>
                </Command.Item>
              ))}
          </Command.Group>
        ))}
      </Command.List>

      <div className="flex gap-4 border-t border-line px-3.5 py-2.5 font-mono text-[11px] text-muted">
        <span>↑↓ navigate</span>
        <span>↵ open</span>
        <span>esc close</span>
      </div>
    </Command.Dialog>
  );
}
