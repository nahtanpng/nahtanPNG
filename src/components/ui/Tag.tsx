export function Tag({ children }: { children: React.ReactNode }) {
  return <span className="rounded-md bg-chip px-2 py-[3px] font-mono text-xs text-muted">{children}</span>;
}

export function TagList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5 pt-0.5">
      {items.map((item) => (
        <Tag key={item}>{item}</Tag>
      ))}
    </div>
  );
}
