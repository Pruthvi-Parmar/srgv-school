import type { Metadata } from "next";
import Image from "next/image";
import { listLabs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Labs",
  description:
    "Laboratories at SRVM, Ninat including Physics, Chemistry, Biology, Maths, Computer and Language labs.",
};

export const dynamic = "force-dynamic";

export default async function LabsPage() {
  const labs = await listLabs();

  return (
    <div className="container-page py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Laboratories</h1>
        <p className="mt-3 text-sm leading-7 text-slate-600">
          Our well-equipped laboratories provide hands-on learning experiences, helping students move beyond
          theoretical knowledge to practical understanding and real-world application.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {labs.map((lab) => (
            <div key={String(lab._id)} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
              <div className="relative aspect-[4/3] bg-slate-100">
                <Image
                  src={lab.image}
                  alt={lab.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className="p-5">
                <h2 className="text-sm font-semibold text-slate-900">{lab.name}</h2>
                <p className="mt-3 text-sm text-slate-700">{lab.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


