import { AdminSettingsClient } from "@/components/admin/AdminSettingsClient";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="mt-2 text-sm text-slate-600">
          Update admissions text and contact details displayed across the website.
        </p>
      </div>
      <AdminSettingsClient />
    </div>
  );
}



