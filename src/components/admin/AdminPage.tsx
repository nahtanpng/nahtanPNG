import { cn } from "@/lib/cn";

export function AdminPage({ wide, children }: { wide?: boolean; children: React.ReactNode }) {
  return <div className={cn("mx-auto flex flex-col gap-8", wide ? "max-w-[1240px]" : "max-w-[880px]")}>{children}</div>;
}
