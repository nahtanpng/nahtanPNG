"use client";

import { useState, type KeyboardEvent } from "react";
import { cn } from "@/lib/cn";
import { controlClass } from "./styles";

type TagInputProps = {
  name: string;
  defaultValue?: string[];
  placeholder?: string;
  onChange?: (tags: string[]) => void;
};

export function TagInput({ name, defaultValue = [], placeholder = "Digite e tecle Enter", onChange }: TagInputProps) {
  const [tags, setTags] = useState(defaultValue);
  const [draft, setDraft] = useState("");

  const update = (next: string[]) => {
    setTags(next);
    onChange?.(next);
  };

  const commit = () => {
    const value = draft.trim().replace(/,$/, "");
    if (value && !tags.includes(value)) update([...tags, value]);
    setDraft("");
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      commit();
    } else if (event.key === "Backspace" && !draft && tags.length > 0) {
      update(tags.slice(0, -1));
    }
  };

  return (
    <div className={cn(controlClass, "flex min-h-10 flex-wrap items-center gap-1.5 px-2 py-1.5 focus-within:border-faint")}>
      <input type="hidden" name={name} value={tags.join("\n")} />
      {tags.map((tag) => (
        <span key={tag} className="flex items-center gap-1 rounded-md bg-chip py-[3px] pr-1 pl-2 font-mono text-xs text-muted">
          {tag}
          <button
            type="button"
            aria-label={`Remover ${tag}`}
            onClick={() => update(tags.filter((item) => item !== tag))}
            className="cursor-pointer rounded px-1 text-faint hover:text-fg"
          >
            ×
          </button>
        </span>
      ))}
      <input
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={onKeyDown}
        onBlur={commit}
        placeholder={tags.length ? "" : placeholder}
        className="h-7 min-w-24 grow bg-transparent px-1 text-sm outline-none placeholder:text-faint"
      />
    </div>
  );
}
