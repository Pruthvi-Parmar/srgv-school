import type { Metadata } from "next";
import { listAchievements } from "@/lib/data";

export const metadata: Metadata = {
  title: "Achievements",
  description: "Academic, co-curricular and sports achievements of SRVM, Ninat.",
};

export const dynamic = "force-dynamic";

export default async function AchievementsPage() {
  const achievements = await listAchievements(50);

  return (
    <div className="container-page py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Achievements</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          We are proud of our students&apos; and school&apos;s achievements across academics, sports, cultural
          events and other fields.
        </p>

        {achievements.length === 0 ? (
          <p className="mt-8 text-sm text-slate-600">Achievements will be updated soon.</p>
        ) : (
          <div className="mt-8 space-y-4">
            {achievements.map((a) => (
              <div
                key={String(a._id)}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold text-slate-900">{a.title}</div>
                  {a.year ? (
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                      {a.year}
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">{a.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

