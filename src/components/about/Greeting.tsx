"use client";

import { usePeriod } from "@/hooks/usePeriod";
import { greetings } from "@/lib/period";

export function Greeting() {
  const period = usePeriod();

  return <span className={period ? undefined : "invisible"}>{greetings[period ?? "morning"]}</span>;
}
