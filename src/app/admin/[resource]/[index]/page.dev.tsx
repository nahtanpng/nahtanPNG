import { notFound } from "next/navigation";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ResourceItemForm } from "@/components/admin/forms/ResourceItemForm";
import { readData } from "@/lib/admin/files";
import { isResourceName, resources } from "@/lib/admin/resources";
import { saveItem } from "../../actions";

type EditResourcePageProps = {
  params: Promise<{ resource: string; index: string }>;
};

export default async function EditResourcePage({ params }: EditResourcePageProps) {
  const { resource, index: rawIndex } = await params;
  if (!isResourceName(resource)) notFound();

  const config = resources[resource];
  const items = await readData<unknown[]>(config.file);
  const index = Number(rawIndex);
  if (!Number.isInteger(index) || !(index in items)) notFound();

  return (
    <AdminPage>
      <AdminPageHeader eyebrow={`admin / ${resource}`} title={`Editar ${config.singular}`} />
      <ResourceItemForm resource={resource} action={saveItem.bind(null, resource, index)} item={items[index]} />
    </AdminPage>
  );
}
