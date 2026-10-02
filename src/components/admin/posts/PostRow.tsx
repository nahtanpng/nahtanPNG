import Link from "next/link";
import { StatusBadge } from "@/components/admin/ui/StatusBadge";
import type { PostSource } from "@/lib/admin/posts";
import { formatPostDate } from "@/lib/post-format";

export function PostRow({ post }: { post: PostSource }) {
  return (
    <li>
      <Link
        href={`/admin/posts/${post.slug}`}
        className="flex flex-wrap items-center gap-3 px-4 py-3 text-fg no-underline transition-colors duration-150 hover:bg-hover"
      >
        <span className="flex min-w-0 grow flex-col gap-0.5">
          <span className="truncate text-[15px] font-medium">{post.metadata.title}</span>
          <span className="truncate font-mono text-xs text-muted">/blog/{post.slug}</span>
        </span>
        <time dateTime={post.metadata.date} className="font-mono text-xs text-muted">
          {formatPostDate(post.metadata.date)}
        </time>
        <StatusBadge draft={post.metadata.draft} />
      </Link>
    </li>
  );
}
