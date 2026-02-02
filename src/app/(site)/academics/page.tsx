import type { Metadata } from "next";
import Link from "next/link";
import { TeachersSection } from "@/components/TeachersSection";
import { ptaMembers, smcMembers } from "@/lib/governance";

export const metadata: Metadata = {
  title: "Academics",
  description: "Academic approach, curriculum support, and student development at SRVM, Ninat.",
};

export default function AcademicsPage() {
  return (
    <div className="container-page py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Academics</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          We believe strong concepts create strong futures. Our approach blends classroom learning with
          practical exposure through laboratories, activities, and structured guidance.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[
            {
              title: "Concept-based learning",
              desc: "Focus on understanding and reasoning, not rote memorization.",
            },
            {
              title: "Experiential learning",
              desc: "Exploration and experimentation supported by laboratories and activities.",
            },
            {
              title: "Holistic growth",
              desc: "Equal emphasis on academics, sports, creative arts and values.",
            },
            {
              title: "Supportive environment",
              desc: "A safe, disciplined campus that encourages confidence and stage readiness.",
            },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="text-sm font-semibold text-slate-900">{c.title}</div>
              <div className="mt-2 text-sm leading-7 text-slate-600">{c.desc}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-sm font-semibold text-slate-900">Student & Parent guidelines</div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Home and school work best when they work together. We invite parents to engage using the
            pupil&apos;s diary, attending parent-teacher meetings, school functions, and meeting teachers when
            needed.
          </p>
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
                Click to view the list of teachers and staff for the academic year 2025–26.
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
              {ptaMembers.map((m, idx) => (
                <div
                  key={`${m.name}-${idx}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="text-sm font-semibold text-slate-900">{m.name}</div>
                  <div className="mt-1 text-xs font-medium text-slate-600">{m.role}</div>
                  <div className="mt-1 text-xs text-slate-700">{m.address}</div>
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
              {smcMembers.map((m, idx) => (
                <div
                  key={`${m.name}-${idx}`}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
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
              ))}
            </div>
          </details>
        </div>
      </div>
    </div>
  );
}
