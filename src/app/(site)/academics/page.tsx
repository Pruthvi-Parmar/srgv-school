import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TeachersSection } from "@/components/TeachersSection";
import { getAcademicsSettings, listPtaMembers, listSmcMembers } from "@/lib/data";

export const metadata: Metadata = {
  title: "Academics",
  description: "Academic approach, curriculum support, and student development at SRVM, Ninat.",
};

export const dynamic = "force-dynamic";

export default async function AcademicsPage() {
  const [settings, ptaMembers, smcMembers] = await Promise.all([
    getAcademicsSettings(),
    listPtaMembers(),
    listSmcMembers(),
  ]);

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

          <details className="group rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              <div className="flex items-center justify-between gap-4">
                <span>PTA Members (2023–24)</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] group-open:hidden">View</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] hidden group-open:inline">Hide</span>
              </div>
              <p className="mt-2 text-sm font-normal text-slate-600">
                Parents–Teachers Association members supporting collaborative growth between home and school.
              </p>
            </summary>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {ptaMembers.map((m) => (
                <div
                  key={String(m._id)}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  {m.photo ? (
                    <div className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{m.name}</div>
                    <div className="mt-1 text-xs font-medium text-slate-600">{m.role}</div>
                    <div className="mt-1 text-xs text-slate-700">{m.address}</div>
                  </div>
                </div>
              ))}
            </div>
          </details>

          <details className="group rounded-2xl border border-slate-200 bg-white p-6">
            <summary className="cursor-pointer list-none text-base font-semibold text-slate-900">
              <div className="flex items-center justify-between gap-4">
                <span>School Managing Committee (SMC)</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] group-open:hidden">View</span>
                <span className="text-xs font-semibold text-[color:var(--brand)] hidden group-open:inline">Hide</span>
              </div>
              <p className="mt-2 text-sm font-normal text-slate-600">
                Members of the School Managing Committee guiding the institution&apos;s academic and administrative
                direction.
              </p>
            </summary>
            <div className="mt-4 space-y-3 text-sm text-slate-700">
              {smcMembers.map((m) => (
                <div
                  key={String(m._id)}
                  className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  {m.photo ? (
                    <div className="relative mt-0.5 h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                      <Image
                        src={m.photo}
                        alt={m.name}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                  ) : null}
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{m.name}</div>
                    <div className="mt-1 text-xs text-slate-700">
                      <span className="font-medium">Father/Spouse:</span> {m.fatherOrSpouseName}
                    </div>
                    <div className="mt-1 text-xs text-slate-700">
                      <span className="font-medium">Designation:</span> {m.designation}
                    </div>
                    <div className="mt-1 text-xs text-slate-700">
                      <span className="font-medium">Occupation with address:</span> {m.occupationWithAddress}
                    </div>
                    <div className="mt-1 text-xs text-slate-700">
                      <span className="font-medium">Residential address:</span> {m.residentialAddress}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
