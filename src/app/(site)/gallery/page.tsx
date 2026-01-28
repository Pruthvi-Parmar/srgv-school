import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from campus facilities, labs and events at SRVM, Ninat.",
};

const gallery = [
  { src: "/gallery/main-building.jpeg", title: "School Campus" },
  { src: "/gallery/banner.jpeg", title: "School Banner" },
  { src: "/gallery/playground.jpeg", title: "Playground" },
  { src: "/gallery/basketball.jpeg", title: "Basketball Court" },
  { src: "/gallery/language-lab.jpeg", title: "Language Lab" },
  { src: "/gallery/computer-lab.jpeg", title: "Computer Lab" },
  { src: "/gallery/maths-lab.jpeg", title: "Maths Lab" },
  { src: "/gallery/physics-lab.jpeg", title: "Physics Lab" },
  { src: "/gallery/chemistry-lab.jpeg", title: "Chemistry Lab" },
  { src: "/gallery/bio-lab.jpeg", title: "Biology Lab" },
  { src: "/gallery/sports-lab.jpeg", title: "Sports Lab" },
  { src: "/gallery/library.jpeg", title: "Library" },
  { src: "/gallery/admission.jpeg", title: "Admissions 2026–27" },
];

export default function GalleryPage() {
  return (
    <div className="container-page py-12">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Gallery</h1>
          <p className="mt-3 text-sm text-slate-600">
            Glimpses of our campus, classrooms, laboratories, sports facilities and student life.
          </p>
        </div>
      </div>

      <GalleryGrid items={gallery} />
    </div>
  );
}


