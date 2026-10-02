import type { Metadata } from "next";
import { PostGrid } from "@/components/blog/PostGrid";
import { BackLink } from "@/components/ui/BackLink";
import { profile } from "@/data/profile";
import { PageContainer } from "@/components/ui/PageContainer";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getPosts } from "@/lib/posts";

const description = `Notes by ${profile.name} on building software — what I ship and what I learn along the way.`;

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: { type: "website", url: "/blog", title: `Blog — ${profile.name}`, description },
  twitter: { card: "summary_large_image", title: `Blog — ${profile.name}`, description },
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
