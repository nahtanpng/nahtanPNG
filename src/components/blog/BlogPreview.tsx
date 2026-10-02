import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPosts } from "@/lib/posts";
import { PostGrid } from "./PostGrid";

export async function BlogPreview() {
  const posts = await getPosts(2);

  return (
    <Section id="blog" className="gap-5">
      <div className="flex items-end justify-between gap-3">
        <SectionHeader eyebrow="blog" title="Blog" />
        <Link href="/blog" className="font-mono text-xs text-muted no-underline transition-colors duration-150 hover:text-fg">
          all posts -&gt;
        </Link>
      </div>
      <PostGrid posts={posts} />
    </Section>
  );
}
