import { AdminLeavingCertificatesClient } from "@/components/admin/AdminLeavingCertificatesClient";

export default function AdminLeavingCertificatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Leaving Certificates</h1>
        <p className="mt-2 text-sm text-slate-600">
          Upload PDF leaving certificates for the public Leaving Certificates page. Delete removes the file from the
          server.
        </p>
      </div>
      <AdminLeavingCertificatesClient />
    </div>
  );
}
