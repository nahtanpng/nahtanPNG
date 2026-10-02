import type { Metadata } from "next";
import { PostHeader } from "@/components/blog/PostHeader";
import { BackLink } from "@/components/ui/BackLink";
import { PageContainer } from "@/components/ui/PageContainer";
import { getPost, getPosts } from "@/lib/posts";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const { post } = await getPost(slug);
  return { title: post.title, description: post.summary };
}

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const { post, Content } = await getPost(slug);

  return (
    <PageContainer className="gap-10 pt-6">
      <BackLink href="/blog">all posts</BackLink>
      <article className="flex flex-col gap-10">
        <PostHeader post={post} />
        <div className="flex flex-col gap-5 text-[15px] leading-[1.7] text-pretty">
          <Content />
        </div>
      </article>
    </PageContainer>
  );
}
