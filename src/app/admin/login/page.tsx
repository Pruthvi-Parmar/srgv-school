import { Suspense } from "react";
import { AdminLoginClient } from "@/components/admin/AdminLoginClient";

export const dynamic = "force-dynamic";

export default function AdminLoginPage() {
  return (
    <div className="grid min-h-dvh place-items-center bg-slate-50 px-4">
      <Suspense fallback={<div className="text-sm text-slate-600">Loading…</div>}>
        <AdminLoginClient />
      </Suspense>
    </div>
  );
}


