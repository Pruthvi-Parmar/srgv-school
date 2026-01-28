import type { Metadata } from "next";
import Link from "next/link";
import { listNotices } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Notices",
  description: "Announcements and notices from SRVM, Ninat.",
};

export default async function NoticesPage() {
  const notices = await listNotices(50);

  return (
    <div className="container-page py-12">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Notices</h1>
          <p className="mt-3 text-sm text-slate-600">School announcements and important updates.</p>
        </div>
      </div>

      <div className="mt-10 grid gap-3">
        {notices.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-6 text-sm text-slate-600">
            No notices yet.
          </div>
        ) : (
          notices.map((n) => (
            <Link
              key={String(n._id)}
              href={`/notices/${String(n._id)}`}
              className="rounded-2xl border border-slate-200 bg-white p-6 hover:bg-slate-50"
            >
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="text-base font-semibold text-slate-900">{n.title}</div>
                <div className="text-xs text-slate-500">
                  {new Date(n.publishedAt).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </div>
              </div>
              <div className="mt-2 line-clamp-2 text-sm leading-7 text-slate-600">{n.body}</div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}


