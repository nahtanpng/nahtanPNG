import Link from "next/link";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { PostRow } from "@/components/admin/posts/PostRow";
import { buttonClass } from "@/components/admin/ui/Button";
import { readData } from "@/lib/admin/files";
import { listPostSources } from "@/lib/admin/posts";
import { RESOURCE_NAMES, resources } from "@/lib/admin/resources";

export default async function AdminHomePage() {
  const [counts, posts] = await Promise.all([
    Promise.all(RESOURCE_NAMES.map(async (name) => [name, (await readData<unknown[]>(resources[name].file)).length] as const)),
    listPostSources(),
  ]);
  const drafts = posts.filter((post) => post.metadata.draft).length;

  return (
    <AdminPage>
      <AdminPageHeader
        title="Visão geral"
        description="Tudo que você salvar aqui vai direto para os arquivos do projeto. Para publicar: commit + push."
        actions={
          <Link href="/admin/posts/new" className={buttonClass("primary")}>
            Novo post
          </Link>
        }
      />

      <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] gap-3">
        <Link href="/admin/profile" className="flex flex-col gap-1 rounded-xl border border-line p-4 text-fg no-underline hover:bg-hover">
          <span className="font-mono text-xs text-muted">perfil</span>
          <span className="text-[15px] font-medium">Editar</span>
        </Link>
        {counts.map(([name, count]) => (
          <Link
            key={name}
            href={`/admin/${name}`}
            className="flex flex-col gap-1 rounded-xl border border-line p-4 text-fg no-underline hover:bg-hover"
          >
            <span className="font-mono text-xs text-muted">{resources[name].title.toLowerCase()}</span>
            <span className="text-[15px] font-medium">{count} {count === 1 ? "item" : "itens"}</span>
          </Link>
        ))}
        <Link href="/admin/posts" className="flex flex-col gap-1 rounded-xl border border-line p-4 text-fg no-underline hover:bg-hover">
          <span className="font-mono text-xs text-muted">posts</span>
          <span className="text-[15px] font-medium">
            {posts.length} · {drafts} {drafts === 1 ? "rascunho" : "rascunhos"}
          </span>
        </Link>
      </div>

      <section className="flex flex-col gap-3">
        <h2 className="m-0 text-base font-semibold">Posts recentes</h2>
        <ul className="m-0 flex list-none flex-col divide-y divide-line rounded-xl border border-line p-0">
          {posts.slice(0, 5).map((post) => (
            <PostRow key={post.slug} post={post} />
          ))}
        </ul>
      </section>
    </AdminPage>
  );
}
