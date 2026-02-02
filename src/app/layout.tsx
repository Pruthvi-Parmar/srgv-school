import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shree Radhagovind Vidyamandir, Ninat",
    template: "%s | Shree Radhagovind Vidyamandir, Ninat",
  },
  description:
    "CBSE affiliated English medium school in Ninat, Surat District. Quality education with strong values and all-round development.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shree Radhagovind Vidyamandir, Ninat",
    description:
      "CBSE affiliated English medium school in Ninat, Surat District. Quality education with strong values and all-round development.",
    type: "website",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/gallery/New-logo-1.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-slate-900`}
      >
        {children}
      </body>
    </html>
  );
}
