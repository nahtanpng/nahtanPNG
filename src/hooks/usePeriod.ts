"use client";

import { useEffect, useState } from "react";
import { getPeriod, type Period } from "@/lib/period";

export function usePeriod() {
  const [period, setPeriod] = useState<Period | null>(null);

  useEffect(() => {
    const update = () => setPeriod(getPeriod());
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return period;
}
