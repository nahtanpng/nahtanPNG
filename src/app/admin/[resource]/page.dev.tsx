import Link from "next/link";
import { notFound } from "next/navigation";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ResourceList } from "@/components/admin/ResourceList";
import { buttonClass } from "@/components/admin/ui/Button";
import { readData } from "@/lib/admin/files";
import { isResourceName, resources } from "@/lib/admin/resources";
import { deleteItem, moveItem } from "../actions";

export default async function ResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!isResourceName(resource)) notFound();

  const config = resources[resource];
  const items = await readData<never[]>(config.file);
  const summarize = config.summary as (item: unknown) => { title: string; subtitle?: string };

  return (
    <AdminPage>
      <AdminPageHeader
        title={config.title}
        description={config.description}
        actions={
          <Link href={`/admin/${resource}/new`} className={buttonClass("primary")}>
            Adicionar {config.singular}
          </Link>
        }
      />
      <ResourceList
        emptyLabel={`Nenhum item ainda. Adicione o primeiro ${config.singular}.`}
        rows={items.map((item, index) => ({
          ...summarize(item),
          editHref: `/admin/${resource}/${index}`,
          moveUp: moveItem.bind(null, resource, index, "up"),
          moveDown: moveItem.bind(null, resource, index, "down"),
          remove: deleteItem.bind(null, resource, index),
        }))}
      />
    </AdminPage>
  );
}
