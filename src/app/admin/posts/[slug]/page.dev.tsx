import { notFound } from "next/navigation";
import { PostEditor } from "@/components/admin/posts/PostEditor";
import { readPostSource } from "@/lib/admin/posts";
import { removePost, savePost, uploadPostImage } from "../actions";

export default async function EditPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await readPostSource(slug);
  if (!post) notFound();

  return (
    <PostEditor
      key={slug}
      post={post}
      saveAction={savePost.bind(null, slug)}
      deleteAction={removePost.bind(null, slug)}
      uploadAction={uploadPostImage.bind(null, slug)}
    />
  );
}
