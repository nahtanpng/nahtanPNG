import { CardGrid } from "@/components/ui/CardGrid";
import type { Post } from "@/lib/posts";
import { PostCard } from "./PostCard";

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <CardGrid>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </CardGrid>
  );
}
