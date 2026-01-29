"use client";

import Image from "next/image";
import { useState } from "react";

export type GalleryItem = { src: string; title: string };

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((g) => (
          <button
            key={g.src}
            type="button"
            onClick={() => setActive(g)}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="relative aspect-[4/3] bg-slate-100">
              <Image
                src={g.src}
                alt={g.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <div className="p-4">
              {/* <div className="text-sm font-semibold text-slate-900">{g.title}</div> */}
            </div>
          </button>
        ))}
      </div>

      {active ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setActive(null)}
        >
          <div
            className="relative max-h-full w-full max-w-5xl overflow-hidden rounded-2xl bg-black/90"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[60vh] w-full sm:h-[70vh]">
              <Image
                src={active.src}
                alt={active.title}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 px-4 py-3 text-xs text-slate-100">
              <div className="font-semibold">{active.title}</div>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="rounded-lg border border-white/30 px-3 py-1 text-xs font-semibold hover:bg-white/10"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}



