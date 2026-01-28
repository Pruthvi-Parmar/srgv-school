import Link from "next/link";
import { school } from "@/lib/content";
import { listNotices } from "@/lib/data";
import { HomeHeroCarousel } from "@/components/HomeHeroCarousel";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const notices = await listNotices(5);

  return (
    <div>
      <section className="border-b border-slate-200 bg-gradient-to-b from-slate-50 to-white">
        <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] lg:items-center lg:py-20">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
              <span className="h-2 w-2 rounded-full bg-[color:var(--brand-2)]" />
              Admissions 2026–27 open
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              {school.name}
            </h1>
            <p className="text-base leading-7 text-slate-600 sm:text-lg">
              {school.tagline} Founded in {school.established}.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/admissions"
                className="inline-flex items-center justify-center rounded-xl bg-[color:var(--brand)] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-95"
              >
                Admissions
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50"
              >
                Contact us
              </Link>
            </div>
          </div>

          <HomeHeroCarousel />
        </div>
      </section>

      <section className="container-page py-14">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold text-slate-900">Welcome</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              We are committed to provide a nurturing safe environment where students can grow
              intellectually, emotionally and culturally. Education is a journey of curiosity and discovery,
              and we encourage our students to embrace learning with enthusiasm and determination.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-semibold text-slate-900">From Management</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  “Quality education at an affordable fees” — a commitment we carry forward since 2008.
                </p>
                <Link href="/about" className="mt-3 inline-flex text-sm font-semibold text-[color:var(--brand)]">
                  Read more →
                </Link>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="text-sm font-semibold text-slate-900">From the Principal</div>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  We build the citizens of tomorrow through holistic learning, sports and creative arts.
                </p>
                <Link href="/about#principal" className="mt-3 inline-flex text-sm font-semibold text-[color:var(--brand)]">
                  Principal’s message →
                </Link>
              </div>
            </div>
          </div>

          <aside className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-sm font-semibold text-slate-900">Latest notices</h2>
              <Link href="/notices" className="text-sm font-semibold text-[color:var(--brand)]">
                View all
              </Link>
            </div>
            <div className="mt-4 grid gap-3">
              {notices.length === 0 ? (
                <div className="text-sm text-slate-600">No notices yet.</div>
              ) : (
                notices.map((n) => (
                  <Link
                    key={String(n._id)}
                    href={`/notices/${String(n._id)}`}
                    className="rounded-xl border border-slate-200 p-4 hover:bg-slate-50"
                  >
                    <div className="text-sm font-semibold text-slate-900">{n.title}</div>
                    <div className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600">{n.body}</div>
                  </Link>
                ))
              )}
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}


