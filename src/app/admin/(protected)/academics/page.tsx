import { AdminAcademicsSettingsClient } from "@/components/admin/AdminAcademicsSettingsClient";

export default function AdminAcademicsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Academics page content</h1>
        <p className="mt-2 text-sm text-slate-600">
          Edit the general text and highlight cards that appear on the Academics page.
        </p>
      </div>
      <AdminAcademicsSettingsClient />
    </div>
  );
}

