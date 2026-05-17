/** Committee PDFs, pages, and nav helpers for CBSE Info. */

export type CbseCommitteeLink =
  | { type: "pdf"; folder: "pdfs"; file: string; label: string }
  | { type: "pdf"; folder: "disclosure"; file: string; label: string }
  | { type: "page"; href: string; label: string };

/** Quick-access committee documents (header dropdown + top of CBSE / disclosure pages). */
export const CBSE_COMMITTEE_LINKS: CbseCommitteeLink[] = [
  {
    type: "pdf",
    folder: "pdfs",
    file: "Anti Corporal Punishment Committee.pdf",
    label: "Anti corporal punishment committee",
  },
  {
    type: "pdf",
    folder: "pdfs",
    file: "Grievance Redressal Committee.pdf",
    label: "Grievance redressal committee",
  },
  {
    type: "pdf",
    folder: "pdfs",
    file: "Vishakha Committee 2026.pdf",
    label: "Vishakha / internal complaints committee",
  },
  {
    type: "pdf",
    folder: "pdfs",
    file: "POCSO COMMITTEE 2026.pdf",
    label: "POCSO / child protection committee",
  },
  {
    type: "pdf",
    folder: "disclosure",
    file: "member-of-trust-2026.pdf",
    label: "Our School Management Committee",
  },
  {
    type: "page",
    href: "/leaving-certificates",
    label: "Leaving certificates",
  },
];

export const PUBLIC_DISCLOSURE_HREF = "/public-disclosure";
export const CBSE_INFO_HREF = "/cbse-info";
export const LEAVING_CERTIFICATES_HREF = "/leaving-certificates";

export function publicPdfHref(filename: string) {
  return `/pdfs/${encodeURIComponent(filename)}`;
}

export function disclosurePdfHref(filename: string) {
  return `/disclosure/${encodeURIComponent(filename)}`;
}

export function cbseCommitteeLinkHref(item: CbseCommitteeLink): string {
  if (item.type === "page") return item.href;
  if (item.folder === "disclosure") return disclosurePdfHref(item.file);
  return publicPdfHref(item.file);
}
