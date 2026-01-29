import type { Metadata } from "next";
import { getSettings } from "@/lib/data";
import { WhatsAppLink } from "@/components/WhatsAppLink";

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
                <span className="inline-flex items-center gap-2"><a className="text-base font-semibold text-slate-900" href={`tel:`}>{contact.phone}</a><WhatsAppLink phone={contact.phone} /></span>
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

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-semibold text-slate-900">Office Timings</div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Please call in advance for an appointment to ensure the right team member is available.
            </p>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>8:30 AM to 3:00 PM</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">Monday to Friday</p>
            </div>
            <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <svg className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>8:30 AM to 12:00 PM</span>
              </div>
              <p className="mt-2 text-xs text-slate-600">Saturday</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <div className="text-sm font-semibold text-slate-900">Location</div>
            <p className="mt-2 text-sm leading-7 text-slate-600">
              Visit us at our campus or view our location on Google Maps.
            </p>
            
            {/* Mini Map Embed - To get the embed URL: 
                1. Open https://maps.app.goo.gl/VuqVc2pZyKTfjRZz7 in Google Maps
                2. Click "Share" → "Embed a map"
                3. Copy the iframe src URL and replace the src below
            */}
            <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3719.1234567890123!2d73.12345678901234!3d21.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjHCsDA3JzI0LjQiTiA3M8KwMDcnMjQuNCJF!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-[250px] w-full"
                title="Shree Radhagovind Vidyamandir, Ninat Location"
              />
              <div className="border-t border-slate-200 bg-white p-3 text-center">
                <p className="text-xs text-slate-500">
                  To update the map: Open{" "}
                  <a
                    href="https://maps.app.goo.gl/VuqVc2pZyKTfjRZz7?g_st=aw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-slate-700 underline hover:text-slate-900"
                  >
                    this link
                  </a>
                  {" "}in Google Maps → Share → Embed a map → Copy the iframe src
                </p>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/VuqVc2pZyKTfjRZz7?g_st=aw"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-50"
            >
              <svg className="h-5 w-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}


