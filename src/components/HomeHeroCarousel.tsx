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
    <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 text-white shadow-md">
      <div className="relative aspect-[16/9] w-full max-h-[440px]">
        <Image
          src={current.src}
          alt={current.title}
          fill
          priority
          className="object-cover opacity-80"
          sizes="(max-width: 1024px) 100vw, 40vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
      </div>
      <div className="pointer-events-none absolute inset-0 flex flex-col justify-end p-6 sm:p-8">
        <div className="max-w-md">
          <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-200/90">
            Shree Radhagovind Vidyamandir, Ninat
          </div>
          <h2 className="mt-2 text-xl font-semibold leading-snug sm:text-2xl">{current.title}</h2>
          <p className="mt-2 text-sm text-slate-100/90 sm:text-[15px]">{current.subtitle}</p>
        </div>
        <div className="mt-4 flex gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-white" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}


