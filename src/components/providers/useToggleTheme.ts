"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";

export function useToggleTheme() {
  const { resolvedTheme, setTheme } = useTheme();
  return useCallback(() => setTheme(resolvedTheme === "dark" ? "light" : "dark"), [resolvedTheme, setTheme]);
}
