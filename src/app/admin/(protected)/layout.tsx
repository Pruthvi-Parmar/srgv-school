import { redirect } from "next/navigation";
import Link from "next/link";
import { isAdminRequestAuthed } from "@/lib/auth";
import { AdminLogoutButton } from "@/components/admin/AdminLogoutButton";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdminRequestAuthed())) redirect("/admin/login");

  return (
    <div className="min-h-dvh bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-page flex items-center justify-between py-4">
          <Link href="/admin" className="text-sm font-semibold text-slate-900">
            Admin Panel
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/admin/notices" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">
              Notices
            </Link>
            <Link href="/admin/settings" className="rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-50">
              Settings
            </Link>
            <AdminLogoutButton />
          </nav>
        </div>
      </header>
      <main className="container-page py-10">{children}</main>
    </div>
  );
}


