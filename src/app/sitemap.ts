import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  // Use env var if set, otherwise default to production domain
  const base =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null) ||
    "https://srgvninat.in";
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now },
    { url: `${base}/about`, lastModified: now },
    { url: `${base}/academics`, lastModified: now },
    { url: `${base}/achievements`, lastModified: now },
    { url: `${base}/admissions`, lastModified: now },
    { url: `${base}/facilities`, lastModified: now },
    { url: `${base}/gallery`, lastModified: now },
    { url: `${base}/notices`, lastModified: now },
    { url: `${base}/contact`, lastModified: now },
  ];
}


