import { cn } from "@/lib/cn";

export function PageContainer({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={cn("mx-auto flex max-w-[760px] flex-col px-5 pt-2 pb-30", className)}>{children}</main>
  );
}
