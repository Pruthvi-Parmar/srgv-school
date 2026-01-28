import { AdminNoticesClient } from "@/components/admin/AdminNoticesClient";

export default function AdminNoticesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Notices</h1>
        <p className="mt-2 text-sm text-slate-600">Create and manage announcements shown on the website.</p>
      </div>
      <AdminNoticesClient />
    </div>
  );
}


