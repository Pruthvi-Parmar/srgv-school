"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { LogoMark } from "@/components/LogoMark";
import { CBSE_COMMITTEE_LINKS, publicPdfHref } from "@/lib/cbse-committee-links";

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

const cbseHref = "/cbse-info";

function navPillClass(active: boolean) {
  return [
    "rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight transition-colors",
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

function CommitteePdfLinks({ className }: { className?: string }) {
  return (
    <div className={className}>
      {CBSE_COMMITTEE_LINKS.map((item) => (
        <a
          key={item.file}
          href={publicPdfHref(item.file)}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg px-3 py-2 text-[13px] text-slate-700 hover:bg-slate-50 hover:text-slate-900"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [cbseSubOpen, setCbseSubOpen] = useState(false);
  const pathname = usePathname();
  const cbseActive = pathname.startsWith(cbseHref);

  const closeMobile = () => {
    setOpen(false);
    setCbseSubOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="border-b border-slate-200">
        <div className="container-page flex min-w-0 items-center justify-between gap-2 py-2.5 sm:gap-4">
          <div className="min-w-0 flex-1 shrink">
            <LogoMark />
          </div>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-2 py-1 shadow-sm">
              {simpleLinks.slice(0, 8).map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />
              ))}

              <div className="group relative">
                <Link href={cbseHref} className={navPillClass(cbseActive)}>
                  CBSE Info
                </Link>
                <div
                  className={[
                    "absolute left-0 top-full z-50 hidden min-w-[260px] pt-1",
                    "group-hover:block group-focus-within:block",
                  ].join(" ")}
                >
                  <div className="rounded-xl border border-slate-200 bg-white py-1 shadow-lg ring-1 ring-black/5">
                    <div className="border-b border-slate-100 px-3 py-2 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Committee documents
                    </div>
                    <CommitteePdfLinks />
                  </div>
                </div>
              </div>

              <NavLink href={simpleLinks[8].href} label={simpleLinks[8].label} />
            </div>
          </nav>

          <button
            type="button"
            className="shrink-0 inline-flex items-center justify-center rounded-full border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>

        {open ? (
          <div id="mobile-nav" className="border-t border-slate-200 bg-white lg:hidden">
            <div className="container-page flex flex-col gap-1 py-3">
              {simpleLinks.slice(0, 8).map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} onNavigate={closeMobile} />
              ))}

              <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-1">
                <div className="flex items-center justify-between gap-2 rounded-lg px-2 py-1">
                  <Link href={cbseHref} onClick={closeMobile} className={`${navPillClass(cbseActive)} inline-flex flex-1 justify-center`}>
                    CBSE Info
                  </Link>
                  <button
                    type="button"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-lg font-semibold text-slate-700 hover:bg-slate-100"
                    aria-expanded={cbseSubOpen}
                    aria-controls="mobile-cbse-committees"
                    onClick={() => setCbseSubOpen((v) => !v)}
                    aria-label={cbseSubOpen ? "Hide committee documents" : "Show committee documents"}
                  >
                    {cbseSubOpen ? "−" : "+"}
                  </button>
                </div>
                {cbseSubOpen ? (
                  <div id="mobile-cbse-committees" className="mt-1 border-t border-slate-200 pt-1">
                    <div className="px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                      Open in new tab
                    </div>
                    <CommitteePdfLinks className="pb-1" />
                  </div>
                ) : null}
              </div>

              <NavLink href={simpleLinks[8].href} label={simpleLinks[8].label} onNavigate={closeMobile} />
            </div>
          </div>
        ) : null}
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
