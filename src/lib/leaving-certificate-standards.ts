/** Standards / classes for leaving certificates (Grade 1 through Grade 12). */
export const LEAVING_CERTIFICATE_STANDARDS = [
  "Grade 1",
  "Grade 2",
  "Grade 3",
  "Grade 4",
  "Grade 5",
  "Grade 6",
  "Grade 7",
  "Grade 8",
  "Grade 9",
  "Grade 10",
  "Grade 11",
  "Grade 12",
] as const;

export type LeavingCertificateStandard = (typeof LEAVING_CERTIFICATE_STANDARDS)[number];

export function isLeavingCertificateStandard(value: string): value is LeavingCertificateStandard {
  return (LEAVING_CERTIFICATE_STANDARDS as readonly string[]).includes(value);
}

export function standardSortIndex(standard: string): number {
  const i = LEAVING_CERTIFICATE_STANDARDS.indexOf(standard as LeavingCertificateStandard);
  return i === -1 ? 999 : i;
}
