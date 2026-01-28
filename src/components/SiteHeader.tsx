"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { LogoMark } from "@/components/LogoMark";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/academics", label: "Academics" },
  { href: "/admissions", label: "Admissions" },
  { href: "/facilities", label: "Facilities" },
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
        "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
        active ? "bg-slate-100 text-slate-900" : "text-slate-700 hover:bg-slate-50 hover:text-slate-900",
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
        <div className="container-page flex items-center justify-between py-3">
          <LogoMark />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink key={l.href} href={l.href} label={l.label} />
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 lg:hidden"
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
        <div className="container-page flex items-center gap-3 py-1.5">
          <span className="rounded-full bg-[color:var(--brand)] px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-white">
            Admissions 2026–27
          </span>
          <div className="relative flex-1 overflow-hidden">
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



