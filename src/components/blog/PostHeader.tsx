import { AsciiCover } from "@/components/ascii/AsciiCover";
import { TagList } from "@/components/ui/Tag";
import { formatPostDate } from "@/lib/post-format";
import type { Post } from "@/lib/posts";

export function PostHeader({ post }: { post: Post }) {
  return (
    <header className="flex flex-col gap-6">
      <AsciiCover kind={post.cover} />
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readingTime} min read
        </span>
        <h1 className="m-0 text-[30px] leading-[1.1] font-semibold tracking-[-0.02em]">{post.title}</h1>
        {post.summary && <p className="m-0 text-[15px] leading-[1.7] text-pretty text-muted">{post.summary}</p>}
        <TagList items={post.tags} />
      </div>
    </header>
  );
}
