"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import {
  CBSE_COMMITTEE_LINKS,
  CBSE_INFO_HREF,
  LEAVING_CERTIFICATES_HREF,
  PUBLIC_DISCLOSURE_HREF,
  cbseCommitteeLinkHref,
} from "@/lib/cbse-committee-links";

type SimpleLink = { href: string; label: string };

const simpleLinks: SimpleLink[] = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/achievements", label: "Achievements" },
  { href: "/admissions", label: "Admissions" },
  { href: "/facilities", label: "Labs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/notices", label: "Notices" },
  { href: "/contact", label: "Contact" },
];

function isCbseSectionActive(pathname: string) {
  return (
    pathname.startsWith(CBSE_INFO_HREF) ||
    pathname.startsWith(PUBLIC_DISCLOSURE_HREF) ||
    pathname.startsWith(LEAVING_CERTIFICATES_HREF)
  );
}

function navPillClass(active: boolean) {
  return [
    "inline-flex shrink-0 items-center whitespace-nowrap rounded-full px-2.5 py-1.5 text-[12px] font-medium leading-none tracking-tight transition-colors xl:px-3 xl:text-[13px]",
    active
      ? "bg-[color:var(--brand-very-light,rgba(15,118,110,0.08))] text-[color:var(--brand-dark,#0f172a)]"
      : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
  ].join(" ");
}

function NavLink({
  href,
  label,
  onNavigate,
}: {
  href: string;
  label: string;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const active = useMemo(() => (href === "/" ? pathname === "/" : pathname.startsWith(href)), [href, pathname]);
  return (
    <Link href={href} onClick={onNavigate} className={navPillClass(active)}>
      {label}
    </Link>
  );
}

function CbseDropdownLinks({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  return (
    <div className={className}>
      <Link
        href={PUBLIC_DISCLOSURE_HREF}
        onClick={onNavigate}
        className="block rounded-lg px-3 py-2.5 text-[13px] font-medium text-slate-800 hover:bg-slate-50 hover:text-slate-900"
      >
        Public disclosure
      </Link>
      <div className="mx-3 my-1 border-t border-slate-100" />
      <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
        Committee documents
      </div>
      {CBSE_COMMITTEE_LINKS.map((item) => {
        const href = cbseCommitteeLinkHref(item);
        const key = item.type === "page" ? item.href : `${item.folder}/${item.file}`;

        if (item.type === "page") {
          return (
            <Link
              key={key}
              href={href}
              onClick={onNavigate}
              className="block rounded-lg px-3 py-2 text-[13px] leading-snug text-slate-700 hover:bg-slate-50 hover:text-slate-900"
            >
              {item.label}
            </Link>
          );
        }

        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg px-3 py-2 text-[13px] leading-snug text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          >
            {item.label}
          </a>
        );
      })}
    </div>
  );
}

function DesktopNavBar() {
  const cbseActive = isCbseSectionActive(usePathname());

  return (
    <nav className="hidden w-full lg:block" aria-label="Main">
      <div className="flex w-full flex-wrap items-center justify-center gap-1 rounded-2xl border border-slate-200 bg-white/80 px-2 py-1.5 shadow-sm">
        {simpleLinks.slice(0, 8).map((l) => (
          <NavLink key={l.href} href={l.href} label={l.label} />
        ))}

        <div className="group relative">
          <Link href={CBSE_INFO_HREF} className={navPillClass(cbseActive)}>
            CBSE Info
          </Link>
          <div
            className={[
              "pointer-events-none absolute left-1/2 top-full z-50 w-[min(100vw-2rem,20rem)] -translate-x-1/2 pt-2 opacity-0 transition-opacity",
              "group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100",
            ].join(" ")}
          >
            <div className="rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black/5">
              <CbseDropdownLinks />
            </div>
          </div>
        </div>

        <NavLink href={simpleLinks[8].href} label={simpleLinks[8].label} />
      </div>
    </nav>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cbseSubOpen, setCbseSubOpen] = useState(false);
  const pathname = usePathname();
  const cbseActive = isCbseSectionActive(pathname);

  const closeMobile = () => {
    setOpen(false);
    setCbseSubOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="border-b border-slate-200">
        <div className="container-page space-y-2.5 py-2.5 sm:space-y-3 sm:py-3">
          <div className="flex items-center justify-between gap-3">
            <div className="min-w-0 max-w-[calc(100%-4.5rem)] sm:max-w-none">
              <LogoMark />
            </div>

            <button
              type="button"
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen((v) => !v)}
            >
              Menu
            </button>
          </div>

          <DesktopNavBar />

          {open ? (
            <div id="mobile-nav" className="border-t border-slate-200 pt-3 lg:hidden">
              <div className="flex flex-col gap-1">
                {simpleLinks.slice(0, 8).map((l) => (
                  <NavLink key={l.href} href={l.href} label={l.label} onNavigate={closeMobile} />
                ))}

                <div className="mt-1 rounded-xl border border-slate-200 bg-slate-50/80 p-1">
                  <div className="flex items-stretch gap-1 rounded-lg px-1 py-1">
                    <Link
                      href={CBSE_INFO_HREF}
                      onClick={closeMobile}
                      className={`${navPillClass(cbseActive)} min-h-9 flex-1 justify-center text-[13px]`}
                    >
                      CBSE Info
                    </Link>
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold leading-none text-slate-700 hover:bg-slate-100"
                      aria-expanded={cbseSubOpen}
                      aria-controls="mobile-cbse-committees"
                      onClick={() => setCbseSubOpen((v) => !v)}
                      aria-label={cbseSubOpen ? "Hide CBSE menu" : "Show CBSE menu"}
                    >
                      {cbseSubOpen ? "−" : "+"}
                    </button>
                  </div>
                  {cbseSubOpen ? (
                    <div id="mobile-cbse-committees" className="mt-1 border-t border-slate-200 pt-1">
                      <CbseDropdownLinks className="pb-1" onNavigate={closeMobile} />
                    </div>
                  ) : null}
                </div>

                <NavLink href={simpleLinks[8].href} label={simpleLinks[8].label} onNavigate={closeMobile} />
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="border-b border-slate-200 bg-slate-50/90">
        <div className="container-page flex min-w-0 items-center gap-2 py-1.5 sm:gap-3">
          <span className="shrink-0 rounded-full bg-[color:var(--brand)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            Admissions 2026–27
          </span>
          <div className="relative min-w-0 flex-1 overflow-hidden">
            <div className="animate-[ticker_22s_linear_infinite] whitespace-nowrap text-xs text-slate-700">
              Nursery to Grade 12 · CBSE English Medium · Quality education at an affordable fee · Activity-based
              learning · Strong values and discipline · Spacious campus with labs, library and sports facilities.
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
