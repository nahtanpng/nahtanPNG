import Link from "next/link";
import { AsciiCover } from "@/components/ascii/AsciiCover";
import { TagList } from "@/components/ui/Tag";
import { formatPostDate } from "@/lib/post-format";
import type { Post } from "@/lib/posts";

export function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-3.5 text-fg no-underline">
      <AsciiCover kind={post.cover} className="transition-colors duration-150 group-hover:bg-hover" />
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-baseline justify-between gap-2">
          <h3 className="m-0 text-base font-semibold underline-offset-3 group-hover:underline">{post.title}</h3>
          <time dateTime={post.date} className="flex-none font-mono text-[11px] text-muted">
            {formatPostDate(post.date)}
          </time>
        </div>
        <p className="m-0 text-sm leading-[1.6] text-pretty text-muted">{post.summary}</p>
        <TagList items={[...post.tags, `${post.readingTime} min read`]} />
      </div>
    </Link>
  );
}
