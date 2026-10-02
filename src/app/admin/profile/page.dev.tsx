import { AdminPage } from "@/components/admin/AdminPage";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { ProfileForm } from "@/components/admin/forms/ProfileForm";
import type { Profile } from "@/data/types";
import { readData } from "@/lib/admin/files";
import { saveProfile } from "../actions";

export default async function ProfilePage() {
  const profile = await readData<Profile>("profile");

  return (
    <AdminPage>
      <AdminPageHeader title="Perfil" description="Topo da página e seção About." />
      <ProfileForm action={saveProfile} profile={profile} />
    </AdminPage>
  );
}
