"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    src: "/gallery/main-building.jpeg",
    title: "A vibrant, secure campus",
    subtitle: "Spacious courtyard with covered assembly area and school transport.",
  },
  {
    src: "/gallery/admission.jpeg",
    title: "Admissions open 2026–27",
    subtitle: "Nursery to Grade 12 · CBSE English Medium · Science & Commerce.",
  },
  {
    src: "/gallery/playground.jpeg",
    title: "Playground & sports",
    subtitle: "Track, basketball court and open play area for holistic growth.",
  },
];

export function HomeHeroCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  const current = slides[index];

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 text-white">
      <div className="relative h-[62vh] min-h-[420px] w-full md:h-[70vh]">
        <Image
          src={current.src}
          alt={current.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/85 via-slate-950/30 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      {/* controls */}
      <div className="absolute bottom-5 left-0 right-0">
        <div className="container-page flex justify-center">
          <div className="flex gap-2 rounded-full bg-black/30 px-3 py-2 backdrop-blur">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-8 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* subtle caption (optional) */}
      <div className="pointer-events-none absolute top-5 left-0 right-0 hidden md:block">
        <div className="container-page">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/30 px-3 py-1 text-xs font-semibold text-slate-100 backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-[color:var(--brand-2)]" />
            {current.title}
          </div>
        </div>
      </div>
    </div>
  );
}


