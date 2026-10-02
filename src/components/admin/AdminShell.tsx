import { AdminSidebar } from "./AdminSidebar";

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen md:grid md:grid-cols-[232px_minmax(0,1fr)]">
      <AdminSidebar />
      <main className="min-w-0 px-5 pt-8 pb-24 md:px-10 md:pt-12">{children}</main>
    </div>
  );
}
