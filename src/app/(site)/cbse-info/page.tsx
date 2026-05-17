import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CBSE Info — Public Disclosure",
  description:
    "CBSE public disclosure: general information, documents, and academic disclosures for Shree Radhagovind Vidyamandir, Ninat.",
};

function ExternalDocLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-[color:var(--brand)] underline decoration-[color:var(--brand)]/30 underline-offset-2 hover:decoration-[color:var(--brand)]"
    >
      {children}
    </a>
  );
}

/** PDFs uploaded under `/public/pdfs/` (synced from repo `pdfs/`). */
function pdfHref(filename: string) {
  return `/pdfs/${encodeURIComponent(filename)}`;
}

function DisclosureLinkCell({ href }: { href: string | string[] }) {
  if (Array.isArray(href)) {
    return (
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {href.map((h) => (
          <ExternalDocLink key={h} href={h}>
            VIEW
          </ExternalDocLink>
        ))}
      </div>
    );
  }
  return <ExternalDocLink href={href}>VIEW</ExternalDocLink>;
}

export default function CbseInfoPage() {
  const base = "/disclosure";

  return (
    <div className="container-page py-10 sm:py-12">
      <nav className="text-xs font-medium uppercase tracking-wide text-slate-500">
        <Link href="/" className="hover:text-[color:var(--brand)]">
          Home
        </Link>
        <span className="px-2 text-slate-300">/</span>
        <span className="text-slate-900">Public Disclosure</span>
      </nav>

      <header className="mt-4 border-b border-slate-200 pb-6">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">Public Disclosure</h1>
        <p className="mt-2 text-sm text-slate-600">
          Mandatory public disclosure under CBSE norms. Use <span className="font-semibold">VIEW</span> to open a
          document in a new browser tab. Committee PDFs and leaving certificates are also listed under the{" "}
          <span className="font-semibold">CBSE Info</span> menu in the site header (hover on desktop, + on mobile).
        </p>
      </header>

      <div className="mt-10 space-y-12">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">A : GENERAL INFORMATION</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-12 px-3 py-3 font-semibold text-slate-700">SL No.</th>
                  <th className="min-w-[220px] px-3 py-3 font-semibold text-slate-700">INFORMATION</th>
                  <th className="px-3 py-3 font-semibold text-slate-700">DETAILS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  ["1", "NAME OF THE SCHOOL", "Shree Radhagovind Vidyamandir, Ninat"],
                  ["2", "AFFILIATION NO. (IF APPILCABLE)", "430185"],
                  ["3", "SCHOOL CODE (IF APPLICABLE)", "10168"],
                  [
                    "4",
                    "COMPLETE ADDRESS WITH PIN CODE",
                    "At & Post: Ninat, Via: Sarbhon, Ta: Bardoli, Dist: Surat, Pin code: 394350",
                  ],
                  ["5", "PRINCIPAL NAME", "Mrs. Deepa Kalpesh Joshi"],
                  ["6", "PRINCIPAL QULIFICATION", "MSC, B.Ed."],
                  ["7", "SCHOOL EMAIL ID", "ninatsrgv@gmail.com"],
                  ["8", "CONTACT DETAILS (LANDLINE/MOBILE)", "9714477644"],
                ].map(([sl, label, detail]) => (
                  <tr key={sl} className="align-top">
                    <td className="px-3 py-3 font-medium text-slate-500">{sl}</td>
                    <td className="px-3 py-3 font-medium text-slate-800">{label}</td>
                    <td className="px-3 py-3">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">B : DOCUMENTS AND INFORMATION</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-12 px-3 py-3 font-semibold text-slate-700">SL NO.</th>
                  <th className="min-w-[260px] px-3 py-3 font-semibold text-slate-700">DOCUMENTS AND INFORMATION</th>
                  <th className="px-3 py-3 font-semibold text-slate-700">LINKS OF UPLOADED DOCUMENTS IN OUR WEBSITE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {(
                  [
                    [
                      "1",
                      "COPIES OF AFFILIATION/UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY",
                      pdfHref(
                        "COPIES OF AFFILIATION:UPGRADATION LETTER AND RECENT EXTENSION OF AFFILIATION, IF ANY.pdf",
                      ),
                    ],
                    [
                      "2",
                      "COPIES OF SOCIETIES/TRUST/COMPANY REGISTRATION/RENEWAL CERTIFICATE, AS APPLICABLE",
                      `${base}/copies-societies-trust-company-registration-renewal-certificate-as-applicable.pdf`,
                    ],
                    [
                      "3",
                      "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT./UT",
                      pdfHref(
                        "COPY OF NO OBJECTION CERTIFICATE (NOC) ISSUED, IF APPLICABLE, BY THE STATE GOVT.:UT.pdf",
                      ),
                    ],
                    [
                      "4",
                      "COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE",
                      pdfHref("COPY OF VALID BUILDING SAFETY CERTIFICATE AS PER THE NATIONAL BUILDING CODE.pdf"),
                    ],
                    [
                      "5",
                      "COPY OF VALID FIRE SAFETY CERTIFICATE ISSUED BY THE COMPETENT AUTHORITY",
                      pdfHref("Fire Safety.pdf"),
                    ],
                    [
                      "6",
                      "COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES",
                      [
                        pdfHref("COPIES OF VALID WATER, HEALTH AND SANITATION CERTIFICATES.pdf"),
                        pdfHref("water report school 2026.pdf"),
                      ],
                    ],
                  ]
                ).map(([sl, label, href]) => (
                  <tr key={String(sl)} className="align-top">
                    <td className="px-3 py-3 font-medium text-slate-500">{sl}</td>
                    <td className="px-3 py-3 font-medium text-slate-800">{label}</td>
                    <td className="px-3 py-3">
                      <DisclosureLinkCell href={href} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">C : RESULT AND ACADEMICS</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[720px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-12 px-3 py-3 font-semibold text-slate-700">SL No.</th>
                  <th className="min-w-[220px] px-3 py-3 font-semibold text-slate-700">DOCUMENTS AND INFORMATION</th>
                  <th className="px-3 py-3 font-semibold text-slate-700">LINKS OF UPLOADED DOCUMENTS IN OUR WEBSITE</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                <tr className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">1</td>
                  <td className="px-3 py-3 font-medium text-slate-800">FEE STRUCTURE OF THE SCHOOL</td>
                  <td className="px-3 py-3">
                    <DisclosureLinkCell href={pdfHref("FEE STRUCTURE OF THE SCHOOL.pdf")} />
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">2</td>
                  <td className="px-3 py-3 font-medium text-slate-800">ANNUAL ACADEMIC CALENDAR</td>
                  <td className="px-3 py-3">
                    <DisclosureLinkCell href={pdfHref("ANNUAL ACADEMIC CALENDAR.pdf")} />
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">3</td>
                  <td className="px-3 py-3 font-medium text-slate-800">LIST OF SCHOOL MANAGEMENT COMMITTEE (SMC)</td>
                  <td className="px-3 py-3">
                    <ExternalDocLink href={`${base}/smc-2026.pdf`}>VIEW</ExternalDocLink>
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">4</td>
                  <td className="px-3 py-3 font-medium text-slate-800">
                    LIST OF PARENTS TEACHERS ASSOCIATION (PTA) MEMBERS
                  </td>
                  <td className="px-3 py-3">
                    <ExternalDocLink href={`${base}/pta-2026.pdf`}>VIEW</ExternalDocLink>
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">5</td>
                  <td className="px-3 py-3 font-medium text-slate-800">
                    LIST THREE YEAR&apos;S RESULT OF THE BOARD EXAMINATION AS PER APPLICABLILITY
                  </td>
                  <td className="px-3 py-3">
                    <a
                      href="#board-examination-results"
                      className="font-semibold text-[color:var(--brand)] underline decoration-[color:var(--brand)]/30 underline-offset-2 hover:decoration-[color:var(--brand)]"
                    >
                      VIEW
                    </a>
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">6</td>
                  <td className="px-3 py-3 font-medium text-slate-800">MEMBER OF TRUST</td>
                  <td className="px-3 py-3">
                    <ExternalDocLink href={`${base}/member-of-trust-2026.pdf`}>VIEW</ExternalDocLink>
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">7</td>
                  <td className="px-3 py-3 font-medium text-slate-800">CO-CURRICULAR ACTIVITIES (2026–27)</td>
                  <td className="px-3 py-3">
                    <DisclosureLinkCell href={pdfHref("CO-CURRICULAR ACTIVITIES  2026-27.pdf")} />
                  </td>
                </tr>
                <tr className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">8</td>
                  <td className="px-3 py-3 font-medium text-slate-800">
                    TEACHERS INFORMATION (LIST OF TEACHING &amp; NON-TEACHING STAFF)
                  </td>
                  <td className="px-3 py-3">
                    <ExternalDocLink href={pdfHref("Teachers info. 2026.pdf")}>VIEW</ExternalDocLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">D : STAFF (TEACHING)</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-12 px-3 py-3 font-semibold text-slate-700">SL No.</th>
                  <th className="min-w-[200px] px-3 py-3 font-semibold text-slate-700">INFORMATION</th>
                  <th className="px-3 py-3 font-semibold text-slate-700">DETAILS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  ["1", "PRINCIPAL", "Mrs. Deepa Kalpesh Joshi"],
                  ["2", "TOTAL NO. OF TEACHER", "27"],
                  ["", "PGT", "7"],
                  ["", "TGT", "7"],
                  ["", "PRT", "7"],
                  ["", "PET", "1"],
                  ["", "NTT", "3"],
                  ["", "Admin", "1"],
                  ["3", "TEACHERS SECTIONS RATIO", "1:1.5"],
                  ["4", "DETAILS OF SPECIAL EDUCATOR", "Chesta Chauhan"],
                  ["5", "DETAILS OF COUNSELOR AND WELLNESS TEACHER", "Chesta Chauhan"],
                ].map((row, i) => (
                  <tr key={`${row[1]}-${i}`} className="align-top">
                    <td className="px-3 py-3 font-medium text-slate-500">{row[0] || ""}</td>
                    <td className="px-3 py-3 font-medium text-slate-800">{row[1]}</td>
                    <td className="px-3 py-3 text-slate-500">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">E : SCHOOL INFRASTRUCTURE</h2>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="w-12 px-3 py-3 font-semibold text-slate-700">SL No.</th>
                  <th className="min-w-[220px] px-3 py-3 font-semibold text-slate-700">INFORMATION</th>
                  <th className="px-3 py-3 font-semibold text-slate-700">DETAILS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {[
                  ["1", "TOTAL CAMPUS AREA OF THE SCHOOL", "14913 Sq.mtr"],
                  ["2", "NO. AND SIZE OF THE CLASS ROOMS (IN SQ FT / MTR)", "21"],
                  ["3", "NO. AND SIZE OF LABORATORIES", "6 laboratories"],
                  ["4", "INTERNET FACILITY", "Yes"],
                  ["5", "NO. OF GIRLS TOILETS", "16"],
                  ["6", "NO. OF BOYS TOILETS", "16"],
                ].map(([sl, label, detail]) => (
                  <tr key={sl} className="align-top">
                    <td className="px-3 py-3 font-medium text-slate-500">{sl}</td>
                    <td className="px-3 py-3 font-medium text-slate-800">{label}</td>
                    <td className="px-3 py-3 text-slate-500">{detail}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div id="board-examination-results" className="scroll-mt-28 space-y-12">
          <section>
            <h2 className="text-lg font-semibold text-slate-900">RESULT CLASS: X</h2>
            <p className="mt-1 text-xs text-slate-500">
              Board examination outcomes by year (figures as per school records).
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-3 py-3 font-semibold text-slate-700">SL No.</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">YEAR</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">NO. OF REGISTERED STUDENTS</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">NO. OF STUDENTS PASSED</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">PASS PERCENTAGE</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">REMARKS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {[
                    ["2025", "29", "23", "79.31"],
                    ["2024", "25", "21", "84.00"],
                    ["2023", "33", "31", "93.94"],
                    ["2022", "31", "31", "100.00"],
                    ["2021", "16", "16", "100.00"],
                    ["2020", "35", "30", "85.71"],
                    ["2019", "30", "24", "80.00"],
                    ["2018", "51", "43", "84.31"],
                    ["2017", "45", "45", "100.00"],
                    ["2016", "33", "33", "100.00"],
                  ].map(([year, reg, passed, pct], i) => (
                    <tr key={year} className="align-top">
                      <td className="px-3 py-3 font-medium text-slate-500">{i + 1}</td>
                      <td className="px-3 py-3 font-medium text-slate-800">{year}</td>
                      <td className="px-3 py-3">{reg}</td>
                      <td className="px-3 py-3">{passed}</td>
                      <td className="px-3 py-3">{pct}</td>
                      <td className="px-3 py-3 text-slate-500">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-slate-900">RESULT CLASS: XII</h2>
            <p className="mt-1 text-xs text-slate-500">
              Board examination outcomes by year (figures as per school records).
            </p>
            <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
              <table className="w-full min-w-[720px] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-3 py-3 font-semibold text-slate-700">SL No.</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">YEAR</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">NO. OF REGISTERED STUDENTS</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">NO. OF STUDENTS PASSED</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">PASS PERCENTAGE</th>
                    <th className="px-3 py-3 font-semibold text-slate-700">REMARKS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {[
                    ["2025", "20", "11", "55.00"],
                    ["2024", "20", "13", "65.00"],
                    ["2023", "17", "15", "88.24"],
                    ["2022", "27", "27", "100.00"],
                    ["2021", "18", "18", "100.00"],
                    ["2020", "34", "27", "79.41"],
                    ["2019", "11", "6", "54.55"],
                    ["2018", "17", "16", "94.12"],
                    ["2017", "28", "15", "53.57"],
                    ["2016", "28", "20", "71.43"],
                  ].map(([year, reg, passed, pct], i) => (
                    <tr key={year} className="align-top">
                      <td className="px-3 py-3 font-medium text-slate-500">{i + 1}</td>
                      <td className="px-3 py-3 font-medium text-slate-800">{year}</td>
                      <td className="px-3 py-3">{reg}</td>
                      <td className="px-3 py-3">{passed}</td>
                      <td className="px-3 py-3">{pct}</td>
                      <td className="px-3 py-3 text-slate-500">—</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
