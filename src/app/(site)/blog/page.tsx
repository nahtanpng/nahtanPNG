import type { Metadata } from "next";
import { PostGrid } from "@/components/blog/PostGrid";
import { BackLink } from "@/components/ui/BackLink";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPosts } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <PageContainer className="gap-10 pt-6">
      <BackLink href="/">home</BackLink>
      <SectionHeader eyebrow="blog" title="All posts" size="lg" />
      <PostGrid posts={posts} />
    </PageContainer>
  );
}
