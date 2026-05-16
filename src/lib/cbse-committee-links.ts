/** Committee PDFs under `/public/pdfs/` — used in site header (CBSE Info hover / mobile submenu). */
export const CBSE_COMMITTEE_LINKS = [
  {
    file: "Anti Corporal Punishment Committee.pdf",
    label: "Anti corporal punishment committee",
  },
  {
    file: "Grievance Redressal Committee.pdf",
    label: "Grievance redressal committee",
  },
  {
    file: "Vishakha Committee 2026.pdf",
    label: "Vishakha / internal complaints committee",
  },
  {
    file: "POSCO COMMITTEE .pdf",
    label: "POSCO / child protection committee",
  },
] as const;

export function publicPdfHref(filename: string) {
  return `/pdfs/${encodeURIComponent(filename)}`;
}
