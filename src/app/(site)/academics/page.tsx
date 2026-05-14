import type { Metadata } from "next";
import Link from "next/link";
import { TeachersSection } from "@/components/TeachersSection";
import { getAcademicsSettings } from "@/lib/data";

export const metadata: Metadata = {
  title: "Academics",
  description: "Academic approach, curriculum support, and student development at SRVM, Ninat.",
};

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  const settings = await getAcademicsSettings();

  return (
    <div className="container-page py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Academics</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">{settings.introText}</p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {settings.featureCards.map((c) => (
            <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-semibold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">{c.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-sm font-semibold text-slate-900">Student &amp; Parent guidelines</div>
          <p className="mt-2 text-sm leading-7 text-slate-600">{settings.guidelinesText}</p>
          <div className="mt-4">
            <Link href="/contact" className="text-sm font-semibold text-[color:var(--brand)]">
              Contact us to know more →
            </Link>
          </div>
        </div>

        <div className="mt-10 space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-semibold text-slate-900">Teachers information (2026)</div>
                <p className="mt-1 text-sm text-slate-600">
                  List of teaching and non-teaching staff — same document as on the CBSE Public Disclosure page.
                </p>
              </div>
              <a
                href={`/pdfs/${encodeURIComponent("Teachers info. 2026.pdf")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-[color:var(--brand)] hover:bg-slate-100"
              >
                VIEW
              </a>
            </div>
          </div>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              <div className="flex items-center justify-between gap-4">
                <span>Our Teachers</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] group-open:hidden">View</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] hidden group-open:inline">Hide</span>
              </div>
              <p className="mt-2 text-sm font-normal text-slate-600">
                Click to view the list of teachers and staff for the current academic year.
              </p>
            </summary>
            <div className="mt-6">
              <TeachersSection />
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
