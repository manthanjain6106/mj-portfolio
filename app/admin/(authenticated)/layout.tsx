import { requireAdmin } from "@/lib/admin-auth";
import { AdminHeader } from "@/components/admin/admin-header";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminAuthenticatedLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const session = await requireAdmin();

  return (
    <div className="bg-background flex min-h-screen flex-col">
      <AdminHeader email={session.user?.email || "Admin"} />
      <div className="flex flex-1">
        <AdminSidebar />
        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
