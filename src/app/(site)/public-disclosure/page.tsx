import type { Metadata } from "next";
import Link from "next/link";
import { PublicDisclosureTables } from "@/components/PublicDisclosureTables";
import { CBSE_INFO_HREF } from "@/lib/cbse-committee-links";

export const metadata: Metadata = {
  title: "Public Disclosure",
  description:
    "CBSE mandatory public disclosure: general information, documents, academics, staff, and infrastructure for Shree Radhagovind Vidyamandir, Ninat.",
};

export default function PublicDisclosurePage() {
  return (
    <div className="container-page py-10 sm:py-12">
      <nav className="text-xs font-medium uppercase tracking-wide text-slate-500">
        <Link href="/" className="hover:text-[color:var(--brand)]">
          Home
        </Link>
        <span className="px-2 text-slate-300">/</span>
        <Link href={CBSE_INFO_HREF} className="hover:text-[color:var(--brand)]">
          CBSE Info
        </Link>
        <span className="px-2 text-slate-300">/</span>
        <span className="text-slate-900">Public Disclosure</span>
      </nav>

      <header className="mt-4 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Public Disclosure</h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          Mandatory public disclosure under CBSE norms. Use <span className="font-semibold">VIEW</span> to open a
          document in a new browser tab. Committee documents are on the{" "}
          <Link href={CBSE_INFO_HREF} className="font-semibold text-[color:var(--brand)] hover:underline">
            CBSE Info
          </Link>{" "}
          page.
        </p>
      </header>

      <div className="mt-8">
        <PublicDisclosureTables />
      </div>
    </div>
  );
}
