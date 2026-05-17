/** Items under CBSE Info in the site header (committee PDFs + leaving certificates page). */
export const CBSE_COMMITTEE_LINKS = [
  {
    type: "pdf" as const,
    file: "Anti Corporal Punishment Committee.pdf",
    label: "Anti corporal punishment committee",
  },
  {
    type: "pdf" as const,
    file: "Grievance Redressal Committee.pdf",
    label: "Grievance redressal committee",
  },
  {
    type: "pdf" as const,
    file: "Vishakha Committee 2026.pdf",
    label: "Vishakha / internal complaints committee",
  },
  {
    type: "pdf" as const,
    file: "POCSO COMMITTEE 2026.pdf",
    label: "POCSO / child protection committee",
  },
  {
    type: "page" as const,
    href: "/leaving-certificates",
    label: "Leaving certificates",
  },
];

export function publicPdfHref(filename: string) {
  return `/pdfs/${encodeURIComponent(filename)}`;
}

export const LEAVING_CERTIFICATES_HREF = "/leaving-certificates";
