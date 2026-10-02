"use client";

import { usePeriod } from "@/hooks/usePeriod";
import { mini } from "@/lib/ascii/mini";
import { AsciiArt } from "./AsciiArt";

export function MiniAscii() {
  const period = usePeriod();

  return (
    <AsciiArt className={period ? undefined : "invisible"}>
      {mini(period ?? "night")}
    </AsciiArt>
  );
}
