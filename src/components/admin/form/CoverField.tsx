"use client";

import { useState } from "react";
import { AsciiCover } from "@/components/ascii/AsciiCover";
import { ASCII_KINDS, type AsciiKind } from "@/lib/ascii/covers";
import { Field } from "./Field";
import { Select } from "./Select";

type CoverFieldProps = {
  defaultValue?: AsciiKind;
  error?: string;
  onChange?: (cover: AsciiKind) => void;
  preview?: boolean;
};

export function CoverField({ defaultValue = "rings", error, onChange, preview = true }: CoverFieldProps) {
  const [cover, setCover] = useState<AsciiKind>(defaultValue);

  return (
    <div className="flex flex-col gap-3">
      <Field label="Capa ASCII" error={error}>
        <Select
          name="cover"
          options={ASCII_KINDS}
          value={cover}
          onChange={(event) => {
            const next = event.target.value as AsciiKind;
            setCover(next);
            onChange?.(next);
          }}
        />
      </Field>
      {preview && <AsciiCover kind={cover} className="h-28" />}
    </div>
  );
}
