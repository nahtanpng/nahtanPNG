"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-GB", {
  timeZone: "America/Sao_Paulo",
  hour: "2-digit",
  minute: "2-digit",
});

export function LocalClock({ suffix }: { suffix: string }) {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const update = () => setTime(formatter.format(new Date()));
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="font-mono text-[13px]">
      {time} · {suffix}
    </span>
  );
}
