import { AdminAchievementsClient } from "@/components/admin/AdminAchievementsClient";

export default function AdminAchievementsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Achievements</h1>
        <p className="mt-2 text-sm text-slate-600">
          Add and manage school achievements highlighted on the website.
        </p>
      </div>
      <AdminAchievementsClient />
    </div>
  );
}

