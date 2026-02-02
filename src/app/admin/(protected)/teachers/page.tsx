import { AdminTeachersClient } from "@/components/admin/AdminTeachersClient";

export default function AdminTeachersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Teachers</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage the list of teachers and staff shown on the Academics page.
        </p>
      </div>
      <AdminTeachersClient />
    </div>
  );
}

