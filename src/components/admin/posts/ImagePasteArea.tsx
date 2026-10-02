"use client";

import { useRef, useState, type ClipboardEvent, type Dispatch, type DragEvent, type SetStateAction } from "react";
import { TextArea } from "@/components/admin/form/TextArea";
import { cn } from "@/lib/cn";

type ImagePasteAreaProps = {
  name: string;
  value: string;
  onChange: Dispatch<SetStateAction<string>>;
  upload: (file: File) => Promise<string>;
  error?: string;
};

const altFrom = (fileName: string) => fileName.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");

export function ImagePasteArea({ name, value, onChange, upload, error }: ImagePasteAreaProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<{ tone: "muted" | "danger"; text: string } | null>(null);
  const [dragging, setDragging] = useState(false);

  const insertImages = async (files: File[]) => {
    const images = files.filter((file) => file.type.startsWith("image/"));
    if (images.length === 0) return;

    const start = ref.current?.selectionStart ?? value.length;
    const end = ref.current?.selectionEnd ?? start;
    setStatus({ tone: "muted", text: `Enviando ${images.length === 1 ? "imagem" : `${images.length} imagens`}…` });

    try {
      const snippets = [];
      for (const file of images) snippets.push(`![${altFrom(file.name)}](${await upload(file)})`);
      const insert = snippets.join("\n\n");
      onChange((current) => current.slice(0, start) + insert + current.slice(end));
      setStatus(null);
    } catch (error) {
      setStatus({ tone: "danger", text: error instanceof Error ? error.message : "Falha no envio." });
    }
  };

  const onPaste = (event: ClipboardEvent<HTMLTextAreaElement>) => {
    const files = Array.from(event.clipboardData.files);
    if (files.some((file) => file.type.startsWith("image/"))) {
      event.preventDefault();
      void insertImages(files);
    }
  };

  const onDrop = (event: DragEvent<HTMLTextAreaElement>) => {
    event.preventDefault();
    setDragging(false);
    void insertImages(Array.from(event.dataTransfer.files));
  };

  return (
    <div className="flex flex-col gap-1.5">
      <TextArea
        ref={ref}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onPaste={onPaste}
        onDrop={onDrop}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        invalid={!!error}
        spellCheck={false}
        placeholder="Escreva em MDX…"
        className={cn("min-h-[560px] font-mono text-[13px]", dragging && "border-faint bg-chip")}
      />
      {error && <span className="font-mono text-xs text-danger">{error}</span>}
      <span className={cn("text-xs", status?.tone === "danger" ? "text-danger" : "text-muted")}>
        {status?.text ?? "Cole ou arraste imagens no texto · Ctrl S salva"}
      </span>
    </div>
  );
}
