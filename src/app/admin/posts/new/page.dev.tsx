import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { NewPostForm } from "@/components/admin/posts/NewPostForm";

export default function NewPostPage() {
  return (
    <AdminPage>
      <AdminPageHeader eyebrow="admin / posts" title="Novo post" description="O post começa como rascunho." />
      <NewPostForm />
    </AdminPage>
  );
}
