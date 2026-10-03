export function SkillPill({ children }: { children: React.ReactNode }) {
  return <span className="rounded-lg border border-line px-2.5 py-1.25 font-mono text-[13px] transition-colors duration-150 hover:bg-hover cursor-pointer">{children}</span>;
}
