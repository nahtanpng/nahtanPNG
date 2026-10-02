import { notFound } from "next/navigation";
import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ResourceItemForm } from "@/components/admin/forms/ResourceItemForm";
import { isResourceName, resources } from "@/lib/admin/resources";
import { saveItem } from "../../actions";

export default async function NewResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!isResourceName(resource)) notFound();

  const config = resources[resource];

  return (
    <AdminPage>
      <AdminPageHeader eyebrow={`admin / ${resource}`} title={`Adicionar ${config.singular}`} />
      <ResourceItemForm resource={resource} action={saveItem.bind(null, resource, null)} />
    </AdminPage>
  );
}
