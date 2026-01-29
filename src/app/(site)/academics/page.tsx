import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Academics",
  description: "Academic approach, curriculum support, and student development at SRVM, Ninat.",
};

export default function AcademicsPage() {
  return (
    <div className="container-page py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Academics</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          We believe strong concepts create strong futures. Our approach blends classroom learning with
          practical exposure through labs, activities, and structured guidance.
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
            pupil’s diary, attending parent-teacher meetings, school functions, and meeting teachers when
            needed.
          </p>
          <div className="mt-4">
            <Link href="/contact" className="text-sm font-semibold text-[color:var(--brand)]">
              Contact us to know more →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}



