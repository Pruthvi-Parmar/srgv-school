import { AdminSmcClient } from "@/components/admin/AdminSmcClient";

export default function AdminSmcPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">School Managing Committee</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage the School Managing Committee members shown on the Academics page.
        </p>
      </div>
      <AdminSmcClient />
    </div>
  );
}

