import type { Metadata } from "next";
import Link from "next/link";
import { LeavingCertificatesList } from "@/components/LeavingCertificatesList";
import { listLeavingCertificates } from "@/lib/data";

export const metadata: Metadata = {
  title: "Leaving Certificates",
  description: "Leaving certificates issued by Shree Radhagovind Vidyamandir, Ninat.",
};

export const dynamic = "force-dynamic";

export default async function LeavingCertificatesPage() {
  const certificates = await listLeavingCertificates();

  return (
    <div className="container-page py-10 sm:py-12">
      <nav className="text-xs font-medium uppercase tracking-wide text-slate-500">
        <Link href="/" className="hover:text-[color:var(--brand)]">
          Home
        </Link>
        <span className="px-2 text-slate-300">/</span>
        <Link href="/cbse-info" className="hover:text-[color:var(--brand)]">
          CBSE Info
        </Link>
        <span className="px-2 text-slate-300">/</span>
        <span className="text-slate-900">Leaving Certificates</span>
      </nav>

      <header className="mt-4 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Leaving Certificates</h1>
        <p className="mt-2 text-sm text-slate-600">
          Select a standard to see student leaving certificates. Use <span className="font-semibold">VIEW</span> to
          open a certificate in a new browser tab.
        </p>
      </header>

      <LeavingCertificatesList
        certificates={certificates.map((c) => ({
          id: String(c._id),
          title: c.title,
          standard: c.standard ?? "",
          pdfPath: c.pdfPath,
        }))}
      />
    </div>
  );
}
