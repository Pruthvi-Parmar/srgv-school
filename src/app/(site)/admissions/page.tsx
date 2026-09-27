import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { WhatsAppLink } from "@/components/WhatsAppLink";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Admissions details for SRVM, Ninat.",
};

export default async function AdmissionsPage() {
  const settings = await getSettings();
  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Admissions</h1>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-600">
            {settings.admissionsText}
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-slate-900">How to apply</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-slate-700">
              <li>Call or email the school office for enquiry.</li>
              <li>Visit the campus and interact with the team.</li>
              <li>Submit the admission form and required documents.</li>
              <li>Complete fee payment as per the schedule.</li>
            </ol>
            <p className="mt-4 text-sm text-slate-600">
              Note: Admission process and required documents may vary by grade.
            </p>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">General Rules</h2>
            </div>

            <ul className="mt-5 space-y-3">
              {[
                "Students must come to school on all working days in the prescribed uniform, failing which they are liable to disciplinary action or to be sent back home.",
                "Punctuality is an essential aspect of school discipline. Late coming students must submit a 'Late Slip' to the class teacher. If the act is repeated frequently, the student may be sent back home.",
                "Irregular attendance, perpetual disobedience, defiance to authority or insubordinate conduct could lead to suspension and/or rustication.",
                "Auditorium, stage, and various labs (Computer, Biology, Physics, Chemistry) are to be used by students only under the direct supervision of a teacher.",
                "Ensuring cleanliness is the responsibility of every student. Wrappers, litter, and other disposable items must be disposed of in the litter bins provided.",
                "If any student's behaviour or academic performance indicates an inability or unwillingness to meet the school's requirements, or whose actions are injurious to self or others, the Principal reserves the right to rusticate them.",
                "If any unclaimed article is found in the class or school campus, students should report and deposit it to the school office.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[10px] font-bold text-slate-600">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-700">{rule}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-sm leading-6 text-slate-700">
                Any student who has recently suffered from an infectious or contagious illness such as measles,
                chickenpox, or conjunctivitis (red eyes) will not be allowed to attend school until permission has been
                granted by a registered medical practitioner.
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M11.25 4.533A9.707 9.707 0 0 0 6 3a9.735 9.735 0 0 0-3.25.555.75.75 0 0 0-.5.707v14.25a.75.75 0 0 0 1 .707A8.237 8.237 0 0 1 6 18.75c1.995 0 3.823.707 5.25 1.886V4.533ZM12.75 20.636A8.214 8.214 0 0 1 18 18.75c.966 0 1.89.166 2.75.47a.75.75 0 0 0 1-.708V4.262a.75.75 0 0 0-.5-.707A9.735 9.735 0 0 0 18 3a9.707 9.707 0 0 0-5.25 1.533v16.103Z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Library Rules</h2>
            </div>

            <ul className="mt-5 space-y-3">
              {[
                "Strict silence must be observed in the library.",
                "Books can be issued from the library with the permission of the librarian after being registered in the library register.",
                "Reference books are not to be issued. They are important books and are required for reference during working hours in the library.",
                "Marking, underlining or tearing of pages is strictly forbidden.",
                "Books and magazines must be handled carefully and should be kept back in their original places.",
                "The librarian should be informed about any damage to the books before the student borrows it.",
                "Any damage done to the books will have to be replaced in cash or kind.",
                "The students of junior classes should use the library only under the guidance of teachers.",
                "A book may be issued for 7 days only. A student wishing to keep it for a longer time will have to get it re-issued.",
                "Books borrowed from the library should be returned by the due date.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-50 text-[10px] font-bold text-amber-600">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-700">{rule}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path fillRule="evenodd" d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z" clipRule="evenodd" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Rules on Leaves &amp; Attendance</h2>
            </div>

            <ul className="mt-5 space-y-3">
              {[
                "Regular attendance is mandatory.",
                "It is mandatory for the students to be present on the first and the last working day i.e. before the vacation and after the vacation.",
                "A written approval from the concerned school authorities is a must before proceeding on leave. The application must be signed by the parent or guardian.",
                "Grant of leave for genuine reasons will depend purely on the discretion of the Principal.",
                "One day's leave will be sanctioned by the class teacher while leave for more than a day will be sanctioned by the Principal only.",
                "Medical leave(s) shall be granted only on submission of a medical certificate by a registered medical practitioner.",
                "If the child remains absent for more than a week without any prior information, his/her name will be struck off from the roll.",
                "Attendance of 75% is compulsory for the students of all classes, failing which the student will not be considered for promotion.",
                "Taking half day or taking leave after the test/examination is not permitted.",
              ].map((rule, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-600">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-6 text-slate-700">{rule}</span>
                </li>
              ))}
            </ul>

            <div className="mt-5 rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm leading-6 text-blue-800">
                Once in the school, the student must attend all the classes and will not be allowed to leave the premises
                either during school hours or in the recess, as it hampers the teaching-learning process. Half-day leave
                will not be granted unless under emergency, for which parent(s) should come to school with an
                application explaining the reason. Permitting such leave(s) will be solely at the discretion of the
                Principal.
              </p>
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-sm font-semibold text-slate-900">Enquiry</div>
          <div className="mt-4 space-y-2 text-sm text-slate-700">
            <div>
              <span className="text-slate-600">Phone:</span>{" "}
              <span className="inline-flex items-center gap-2">
                <a className="font-semibold text-slate-900" href={`tel:${settings.contact.phone}`}>
                  {settings.contact.phone}
                </a>
                <WhatsAppLink phone={settings.contact.phone} variant="icon" />
              </span>
            </div>
            <div>
              <span className="text-slate-600">Alt Phone:</span>{" "}
              <span className="font-semibold text-slate-900">+91 7698006505</span>
            </div>
            <div>
              <span className="text-slate-600">Email:</span>{" "}
              <a className="font-semibold text-slate-900" href={`mailto:${settings.contact.email}`}>
                {settings.contact.email}
              </a>
            </div>
            <div className="pt-2 text-slate-600">{settings.contact.address}</div>
          </div>
        </aside>
      </div>
    </div>
  );
}


