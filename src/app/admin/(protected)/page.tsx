import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Manage notices and update admissions/contact details.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Link href="/admin/notices" className="rounded-2xl border border-slate-200 bg-white p-6 hover:bg-slate-50">
          <div className="text-sm font-semibold text-slate-900">Notices</div>
          <div className="mt-2 text-sm text-slate-600">Add, edit, and delete announcements.</div>
        </Link>
        <Link href="/admin/settings" className="rounded-2xl border border-slate-200 bg-white p-6 hover:bg-slate-50">
          <div className="text-sm font-semibold text-slate-900">Settings</div>
          <div className="mt-2 text-sm text-slate-600">Update admissions text and contact details.</div>
        </Link>
      </div>
    </div>
  );
}


