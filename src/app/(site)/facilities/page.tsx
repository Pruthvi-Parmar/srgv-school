import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Facilities",
  description: "Facilities at SRVM, Ninat including labs, sports areas, transport and hostel.",
};

const facilities = [
  {
    title: "Playground",
    image: "/gallery/playground.jpeg",
    items: ["Marked tracks for athletics", "Open green field for games and activities"],
  },
  {
    title: "Basketball Court",
    image: "/gallery/basketball.jpeg",
    items: ["Dedicated court", "Encourages teamwork and sportsmanship"],
  },
  {
    title: "Physics Lab",
    image: "/gallery/physics-lab.jpeg",
    items: ["Hands-on experiments", "Concept-based learning"],
  },
  {
    title: "Chemistry Lab",
    image: "/gallery/chemistry-lab.jpeg",
    items: ["Well-equipped stations", "Safety-focused practicals"],
  },
  {
    title: "Biology Lab",
    image: "/gallery/bio-lab.jpeg",
    items: ["Models and specimens", "Observation-based learning"],
  },
  {
    title: "Maths Lab",
    image: "/gallery/maths-lab.jpeg",
    items: ["Activity-based learning", "Concrete to abstract concepts"],
  },
  {
    title: "Computer Lab",
    image: "/gallery/computer-lab.jpeg",
    items: ["Student-computer ratio suited for practice", "Digital learning resources"],
  },
  {
    title: "Language Lab",
    image: "/gallery/language-lab.jpeg",
    items: ["Listening and speaking practice", "IELTS-style activities"],
  },
  {
    title: "Sports Lab",
    image: "/gallery/sports-lab.jpeg",
    items: ["Indoor equipment storage", "Table tennis and other games"],
  },
  {
    title: "Library",
    image: "/gallery/library.jpeg",
    items: ["Reading zones", "Reference and story books"],
  },
];

export default function FacilitiesPage() {
  return (
    <div className="container-page py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Facilities</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Our campus is designed to support learning, exploration, fitness and student well-being—so every child can grow with confidence.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {facilities.map((f) => (
            <div key={f.title} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={f.image}
                  alt={f.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-sm font-semibold text-slate-900">{f.title}</h2>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
                  {f.items.map((it) => (
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


