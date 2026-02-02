"use client";

import Link from "next/link";
import { useState } from "react";
import { school } from "@/lib/content";

export function HomeHeroOverlay() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    // Wrapper covers hero and lets us vertically center the card.
    <div className="pointer-events-none absolute inset-0">
      {/* Mobile: center card; Desktop: align left inside page container for natural margin */}
      <div className="container-page flex h-full items-center justify-center sm:justify-start">
        {/* Card uses full width on mobile and max-w on larger screens to keep layout consistent */}
        <div className="pointer-events-auto relative w-full max-w-xl rounded-3xl border border-white/10 bg-black/30 p-6 text-white shadow-lg backdrop-blur sm:p-8">
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="absolute right-3 top-3 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/30 bg-black/30 text-xs font-semibold text-white hover:bg-black/50"
            aria-label="Close"
          >
            ×
          </button>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-2)]" />
            Admissions 2026–27 open
          </div>
          {/* Mobile: center text for better readability; desktop keeps original alignment */}
          <h1 className="mt-4 text-center text-2xl font-semibold tracking-tight sm:text-left sm:text-4xl">
            {school.name}
          </h1>
          <p className="mt-3 text-center text-sm leading-7 text-slate-100/90 sm:text-left sm:text-base">
            {school.tagline} Founded in {school.established}.
          </p>
          {/* Mobile: full-width stacked buttons, desktop: inline buttons */}
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
            <Link
              href="/admissions"
              className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100 sm:w-auto"
            >
              Admissions
            </Link>
            <Link
              href="/contact"
              className="inline-flex w-full items-center justify-center rounded-xl border border-white/30 bg-transparent px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              Contact us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

