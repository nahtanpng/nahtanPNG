import { profile } from "@/data/profile";
import { OG_SIZE, postImage } from "@/lib/og";
import { formatPostDate } from "@/lib/post-format";
import { getPost, getPosts } from "@/lib/posts";

export const alt = `Blog post by ${profile.name}`;
export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { post } = await getPost(slug);

  return postImage({
    title: post.title,
    summary: post.summary,
    meta: `${formatPostDate(post.date)} · ${post.readingTime} min read`,
    tags: post.tags,
    author: profile.name,
  });
}
