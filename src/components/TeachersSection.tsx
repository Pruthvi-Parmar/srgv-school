import { teachers } from "@/lib/teachers";

export function TeachersSection() {
  if (teachers.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-900">Our Teachers</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Our dedicated and experienced teaching staff is committed to providing quality education and
          nurturing each student&apos;s potential. Teacher details will be updated soon.
        </p>
        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold">To add teacher details:</p>
          <ol className="mt-2 list-decimal space-y-1 pl-5">
            <li>Open the Excel file: <code className="rounded bg-slate-200 px-1.5 py-0.5">public/Teachers details 2025-26.xlsx</code></li>
            <li>Extract the data (use a tool like convertcsv.com/excel-to-json.htm)</li>
            <li>Update <code className="rounded bg-slate-200 px-1.5 py-0.5">src/lib/teachers.ts</code> with the teacher data</li>
          </ol>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">Our Teachers</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Our dedicated and experienced teaching staff is committed to providing quality education and
        nurturing each student&apos;s potential.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="text-sm font-semibold text-slate-900">{teacher.name}</div>
            {teacher.designation && (
              <div className="mt-1 text-xs font-medium text-slate-600">{teacher.designation}</div>
            )}
            {teacher.subject && (
              <div className="mt-2 text-xs text-slate-700">
                <span className="font-medium">Subject:</span> {teacher.subject}
              </div>
            )}
            {teacher.department && (
              <div className="mt-1 text-xs text-slate-700">
                <span className="font-medium">Department:</span> {teacher.department}
              </div>
            )}
            {teacher.qualification && (
              <div className="mt-1 text-xs text-slate-700">
                <span className="font-medium">Qualification:</span> {teacher.qualification}
              </div>
            )}
            {teacher.experience && (
              <div className="mt-1 text-xs text-slate-700">
                <span className="font-medium">Experience:</span> {teacher.experience}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

