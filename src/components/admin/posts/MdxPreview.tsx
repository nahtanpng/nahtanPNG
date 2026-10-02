"use client";

import { evaluate } from "@mdx-js/mdx";
import type { MDXContent } from "mdx/types";
import { useEffect, useState } from "react";
import * as runtime from "react/jsx-runtime";
import { cn } from "@/lib/cn";
import { useMDXComponents } from "@/mdx-components";

type PreviewState = {
  Content: MDXContent | null;
  error: string | null;
};

export function MdxPreview({ source }: { source: string }) {
  const [{ Content, error }, setPreview] = useState<PreviewState>({ Content: null, error: null });

  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      evaluate(source, { ...runtime, useMDXComponents })
        .then((mod) => {
          if (!cancelled) setPreview({ Content: mod.default, error: null });
        })
        .catch((reason: unknown) => {
          if (!cancelled) setPreview((previous) => ({ ...previous, error: String(reason) }));
        });
    }, 300);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [source]);

  return (
    <div className="flex flex-col gap-4">
      {error && (
        <pre className="m-0 overflow-x-auto rounded-xl border border-danger/40 px-4 py-3 font-mono text-xs leading-[1.6] whitespace-pre-wrap text-danger">
          {error}
        </pre>
      )}
      <div className={cn("flex flex-col gap-5 text-[15px] leading-[1.7] text-pretty", error && "opacity-50")}>
        {Content ? <Content /> : <p className="m-0 text-sm text-faint">O preview aparece aqui.</p>}
      </div>
    </div>
  );
}
