import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Labs",
  description: "Laboratories at SRVM, Ninat including Physics, Chemistry, Biology, Maths, Computer and Language labs.",
};

const labs = [
  {
    title: "Physics Lab",
    image: "/gallery/physics-lab.jpeg",
    items: ["Hands-on experiments", "Concept-based learning", "Modern equipment and apparatus"],
  },
  {
    title: "Chemistry Lab",
    image: "/gallery/chemistry-lab.jpeg",
    items: ["Well-equipped stations", "Safety-focused practicals", "Reagent storage and organization"],
  },
  {
    title: "Biology Lab",
    image: "/gallery/bio-lab.jpeg",
    items: ["Models and specimens", "Observation-based learning", "Microscopes and anatomical charts"],
  },
  {
    title: "Maths Lab",
    image: "/gallery/maths-lab.jpeg",
    items: ["Activity-based learning", "Concrete to abstract concepts", "Geometric models and manipulatives"],
  },
  {
    title: "Computer Lab",
    image: "/gallery/computer-lab.jpeg",
    items: ["Student-computer ratio suited for practice", "Digital learning resources", "Interactive smart boards"],
  },
  {
    title: "Language Lab",
    image: "/gallery/language-lab.jpeg",
    items: ["Listening and speaking practice", "IELTS-style activities", "Audio-visual learning tools"],
  },
];

export default function LabsPage() {
  return (
    <div className="container-page py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Laboratories</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Our well-equipped laboratories provide hands-on learning experiences, helping students move beyond theoretical knowledge to practical understanding and real-world application.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {labs.map((lab) => (
            <div key={lab.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={lab.image}
                  alt={lab.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-sm font-semibold text-slate-900">{lab.title}</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                  {lab.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


