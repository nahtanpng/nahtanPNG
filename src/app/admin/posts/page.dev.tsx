import Link from "next/link";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostRow } from "@/components/admin/posts/PostRow";
import { buttonClass } from "@/components/admin/ui/Button";
import { listPostSources } from "@/lib/admin/posts";

export default async function PostsPage() {
  const posts = await listPostSources();

  return (
    <AdminPage>
      <AdminPageHeader
        title="Posts"
        description="Arquivos em content/blog. Rascunhos não aparecem no site."
        actions={
          <Link href="/admin/posts/new" className={buttonClass("primary")}>
            Novo post
          </Link>
        }
      />
      {posts.length === 0 ? (
        <p className="m-0 rounded-xl border border-dashed border-line px-4 py-10 text-center text-sm text-muted">
          Nenhum post ainda.
        </p>
      ) : (
        <ul className="m-0 flex list-none flex-col divide-y divide-line rounded-xl border border-line p-0">
          {posts.map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ul>
      )}
    </AdminPage>
  );
}
