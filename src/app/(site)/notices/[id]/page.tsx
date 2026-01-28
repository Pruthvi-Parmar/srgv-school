import { notFound } from "next/navigation";
import Link from "next/link";
import { getNoticeById } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function NoticeDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const notice = await getNoticeById(id);
  if (!notice) notFound();

  return (
    <div className="container-page py-12">
      <div className="max-w-3xl">
        <Link href="/notices" className="text-sm font-semibold text-[color:var(--brand)]">
          ← Back to notices
        </Link>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">{notice.title}</h1>
        <div className="mt-2 text-sm text-slate-500">
          {new Date(notice.publishedAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </div>
        <div className="mt-8 whitespace-pre-line text-sm leading-7 text-slate-700">{notice.body}</div>
      </div>
    </div>
  );
}


