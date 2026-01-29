import { teachers } from "@/lib/teachers";

export function TeachersSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">Teachers & Staff</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Our dedicated and experienced team is committed to providing quality education and nurturing each
        student&apos;s potential.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher, idx) => (
          <div
            key={`${teacher.name}-${idx}`}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="text-sm font-semibold text-slate-900">{teacher.name}</div>
            {teacher.designation ? (
              <div className="mt-1 text-xs font-medium text-slate-600">{teacher.designation}</div>
            ) : null}
            {teacher.qualification ? (
              <div className="mt-2 text-xs text-slate-700">
                <span className="font-medium">Qualification:</span> {teacher.qualification}
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
