import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { listGalleryItems } from "@/lib/data";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos from campus facilities, labs and events at SRVM, Ninat.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const items = await listGalleryItems();
  const gallery = items.map((g) => ({ src: g.src, title: g.title }));

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
