"use client";

import { MoonIcon, SunIcon } from "@/components/icons";
import { useToggleTheme } from "@/components/providers/useToggleTheme";
import { playSwitchClick } from "@/lib/sounds/switch-click";

export function ThemeToggle() {
  const toggleTheme = useToggleTheme();

  const onClick = () => {
    playSwitchClick(document.documentElement.classList.contains("dark") ? "on" : "off");
    toggleTheme();
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Toggle theme"
      className="flex size-9 cursor-pointer items-center justify-center rounded-[9px] text-fg transition-colors duration-150 hover:bg-hover"
    >
      <SunIcon size={17} className="hidden dark:block" />
      <MoonIcon size={17} className="dark:hidden" />
    </button>
  );
}
