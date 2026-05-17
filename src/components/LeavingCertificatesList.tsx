"use client";

import { useMemo, useState } from "react";
import { LEAVING_CERTIFICATE_STANDARDS, standardSortIndex } from "@/lib/leaving-certificate-standards";

export type LeavingCertificateItem = {
  id: string;
  title: string;
  standard: string;
  pdfPath: string;
};

export function LeavingCertificatesList({ certificates }: { certificates: LeavingCertificateItem[] }) {
  const UNASSIGNED = "Unassigned";

  const standardsWithCerts = useMemo(() => {
    const set = new Set(certificates.map((c) => (c.standard?.trim() ? c.standard : UNASSIGNED)));
    const fromList = LEAVING_CERTIFICATE_STANDARDS.filter((s) => set.has(s));
    const extras = set.has(UNASSIGNED) ? [UNASSIGNED] : [];
    return [...fromList, ...extras].sort((a, b) => standardSortIndex(a) - standardSortIndex(b));
  }, [certificates]);

  const [selectedStandard, setSelectedStandard] = useState<string>(() => standardsWithCerts[0] ?? "");

  const filtered = useMemo(() => {
    if (!selectedStandard) return [];
    return certificates
      .filter((c) => (c.standard?.trim() || UNASSIGNED) === selectedStandard)
      .sort((a, b) => a.title.localeCompare(b.title, undefined, { sensitivity: "base" }));
  }, [certificates, selectedStandard]);

  return (
    <div className="mt-8 space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <label className="block max-w-xs">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Select standard</span>
          <select
            value={selectedStandard}
            onChange={(e) => setSelectedStandard(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-200"
          >
            {standardsWithCerts.length === 0 ? (
              <option value="">No certificates uploaded yet</option>
            ) : (
              standardsWithCerts.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))
            )}
          </select>
        </label>
        {selectedStandard ? (
          <p className="text-sm text-slate-600">
            Showing <span className="font-semibold text-slate-900">{filtered.length}</span> certificate
            {filtered.length === 1 ? "" : "s"} for <span className="font-semibold text-slate-900">{selectedStandard}</span>
          </p>
        ) : null}
      </div>

      <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[640px] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="w-12 px-3 py-3 font-semibold text-slate-700">SL No.</th>
              <th className="px-3 py-3 font-semibold text-slate-700">STUDENT NAME</th>
              <th className="px-3 py-3 font-semibold text-slate-700">CERTIFICATE</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {standardsWithCerts.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-8 text-center text-slate-500">
                  No leaving certificates uploaded yet.
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-3 py-8 text-center text-slate-500">
                  No certificates for {selectedStandard} yet.
                </td>
              </tr>
            ) : (
              filtered.map((cert, index) => (
                <tr key={cert.id} className="align-top">
                  <td className="px-3 py-3 font-medium text-slate-500">{index + 1}</td>
                  <td className="px-3 py-3 font-medium text-slate-800">{cert.title}</td>
                  <td className="px-3 py-3">
                    <a
                      href={cert.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[color:var(--brand)] underline decoration-[color:var(--brand)]/30 underline-offset-2 hover:decoration-[color:var(--brand)]"
                    >
                      VIEW
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
