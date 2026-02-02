"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { LogoMark } from "@/components/LogoMark";

const links = [
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

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = useMemo(() => (href === "/" ? pathname === "/" : pathname.startsWith(href)), [
    href,
    pathname,
  ]);
  return (
    <Link
      href={href}
      className={[
        "rounded-full px-3 py-1.5 text-[13px] font-medium tracking-tight transition-colors",
        active
          ? "bg-[color:var(--brand-very-light,rgba(15,118,110,0.08))] text-[color:var(--brand-dark,#0f172a)]"
          : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
      ].join(" ")}
    >
      {label}
    </Link>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="border-b border-slate-200">
        {/* Mobile: reduce gap, ensure logo truncates, menu button always visible */}
        <div className="container-page flex min-w-0 items-center justify-between gap-2 py-2.5 sm:gap-4">
          {/* Logo container - allows truncation, prevents overflow */}
          <div className="min-w-0 flex-1 shrink">
            <LogoMark />
          </div>

          <nav className="hidden flex-1 items-center justify-center lg:flex">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white/70 px-2 py-1 shadow-sm">
              {links.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </div>
          </nav>

          {/* Menu button - fixed size, never shrinks, always visible */}
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
              {links.map((l) => (
                <NavLink key={l.href} href={l.href} label={l.label} />
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {/* admissions / news ticker */}
      <div className="border-b border-slate-200 bg-slate-50/90">
        {/* Mobile: reduce gap, ensure ticker doesn't cause overflow */}
        <div className="container-page flex min-w-0 items-center gap-2 py-1.5 sm:gap-3">
          {/* Badge - fixed size, never shrinks */}
          <span className="shrink-0 rounded-full bg-[color:var(--brand)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            Admissions 2026–27
          </span>
          {/* Ticker container - prevents horizontal overflow */}
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



