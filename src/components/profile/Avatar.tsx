import Image from "next/image";

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative z-1 -mt-15 size-31 overflow-hidden rounded-full border-5 border-bg bg-chip">
      <Image src={src} alt={alt} fill sizes="124px" priority className="object-cover" />
    </div>
  );
}
