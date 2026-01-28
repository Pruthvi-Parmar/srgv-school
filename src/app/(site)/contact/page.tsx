import type { Metadata } from "next";
import { getSettings } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Contact details for SRVM, Ninat.",
};

export default async function ContactPage() {
  const settings = await getSettings();
  const { contact } = settings;

  return (
    <div className="container-page py-12">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Contact Us</h1>
          <p className="mt-3 text-sm leading-7 text-slate-600">
            We’ll be happy to help with admissions, academics, facilities, or general enquiries.
          </p>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</div>
                <a className="text-base font-semibold text-slate-900" href={`tel:${contact.phone}`}>
                  {contact.phone}
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</div>
                <a className="text-base font-semibold text-slate-900" href={`mailto:${contact.email}`}>
                  {contact.email}
                </a>
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Address</div>
                <div className="text-sm text-slate-700">{contact.address}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div className="text-sm font-semibold text-slate-900">Office timings</div>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Please call in advance for an appointment to ensure the right team member is available.
          </p>
          <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-600">
            Map embed can be added later (optional).
          </div>
        </div>
      </div>
    </div>
  );
}


