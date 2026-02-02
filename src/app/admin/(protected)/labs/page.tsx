import { AdminLabsClient } from "@/components/admin/AdminLabsClient";

export default function AdminLabsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Labs</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage lab names, descriptions and images shown on the Labs page.
        </p>
      </div>
      <AdminLabsClient />
    </div>
  );
}

