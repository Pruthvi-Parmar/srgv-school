import type { Metadata } from "next";
import Link from "next/link";
import { CommitteeDocumentsSection } from "@/components/CommitteeDocumentsSection";
import { PublicDisclosureTables } from "@/components/PublicDisclosureTables";
import { PUBLIC_DISCLOSURE_HREF } from "@/lib/cbse-committee-links";

export const metadata: Metadata = {
  title: "CBSE Info",
  description:
    "CBSE committee documents, leaving certificates, and public disclosure for Shree Radhagovind Vidyamandir, Ninat.",
};

export default function CbseInfoPage() {
  return (
    <div className="container-page py-10 sm:py-12">
      <nav className="text-xs font-medium uppercase tracking-wide text-slate-500">
        <Link href="/" className="hover:text-[color:var(--brand)]">
          Home
        </Link>
        <span className="px-2 text-slate-300">/</span>
        <span className="text-slate-900">CBSE Info</span>
      </nav>

      <header className="mt-4 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">CBSE Info</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Committee documents and mandatory CBSE public disclosure. Use <span className="font-semibold">VIEW</span> to
          open documents in a new tab. The same disclosure is also on the{" "}
          <Link href={PUBLIC_DISCLOSURE_HREF} className="font-semibold text-[color:var(--brand)] hover:underline">
            public disclosure
          </Link>{" "}
          page.
        </p>
      </header>

      <div className="mt-8 space-y-10">
        <CommitteeDocumentsSection />
        <PublicDisclosureTables />
      </div>
    </div>
  );
}
