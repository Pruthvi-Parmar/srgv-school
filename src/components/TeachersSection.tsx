import Image from "next/image";
import { listTeachers } from "@/lib/data";

export async function TeachersSection() {
  const teachers = await listTeachers();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-slate-900">Teachers &amp; Staff</h2>
      <p className="mt-3 text-sm leading-7 text-slate-600">
        Our dedicated and experienced team is committed to providing quality education and nurturing each
        student&apos;s potential.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teachers.map((teacher) => (
          <div
            key={String(teacher._id)}
            className="rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-slate-300 hover:shadow-sm"
          >
            <div className="flex items-center gap-3">
              {teacher.photo ? (
                <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-slate-200">
                  <Image
                    src={teacher.photo}
                    alt={teacher.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
              ) : null}
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-slate-900">{teacher.name}</div>
                {teacher.designation ? (
                  <div className="mt-0.5 text-xs font-medium text-slate-600">{teacher.designation}</div>
                ) : null}
              </div>
            </div>
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
