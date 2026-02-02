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
              <span className="font-semibold text-slate-900">97144 77650</span>
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


