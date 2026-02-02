import { AdminGalleryClient } from "@/components/admin/AdminGalleryClient";

export default function AdminGalleryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Gallery</h1>
        <p className="mt-2 text-sm text-slate-600">
          Add, reorder, or remove images displayed on the Gallery page.
        </p>
      </div>
      <AdminGalleryClient />
    </div>
  );
}

