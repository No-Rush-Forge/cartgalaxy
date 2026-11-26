import { AdminLayout } from "@/components/admin/AdminLayout";
import { AdminActivityList } from "@/components/admin/AdminActivityList";
import { mockAdminActivity } from "@/data/adminData";

export function AdminActivity() {
  return (
    <AdminLayout
      title="Activity"
      subtitle="A running log of platform-level events."
    >
      <AdminActivityList items={mockAdminActivity} title="Platform Activity" />
    </AdminLayout>
  );
}
