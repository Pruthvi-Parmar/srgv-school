import { AdminPtaClient } from "@/components/admin/AdminPtaClient";

export default function AdminPtaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">PTA Members</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage the Parents–Teachers Association members shown on the Academics page.
        </p>
      </div>
      <AdminPtaClient />
    </div>
  );
}

