import Link from "next/link";

export function SiteFooter({
  contact,
}: {
  contact: { phone: string; email: string; address: string };
}) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-900">Shree Radhagovind Vidyamandir, Ninat</div>
          <p className="text-sm text-slate-600">
            A CBSE affiliated English medium school focused on values, discipline, and holistic development.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-900">Quick links</div>
          <div className="grid gap-2 text-sm text-slate-700">
            <Link href="/about" className="hover:text-slate-900">
              About Us
            </Link>
            <Link href="/admissions" className="hover:text-slate-900">
              Admissions
            </Link>
            <Link href="/facilities" className="hover:text-slate-900">
              Facilities
            </Link>
            <Link href="/notices" className="hover:text-slate-900">
              Notices
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-slate-900">Contact</div>
          <div className="space-y-2 text-sm text-slate-700">
            <div>
              <span className="text-slate-600">Phone:</span>{" "}
              <a href={`tel:${contact.phone}`} className="font-medium text-slate-900">
                {contact.phone}
              </a>
            </div>
            <div>
              <span className="text-slate-600">Email:</span>{" "}
              <a href={`mailto:${contact.email}`} className="font-medium text-slate-900">
                {contact.email}
              </a>
            </div>
            <div className="text-slate-600">{contact.address}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <div className="container-page flex flex-col items-start justify-between gap-2 py-4 text-xs text-slate-600 md:flex-row">
          <div>© {new Date().getFullYear()} Shree Radhagovind Vidyamandir, Ninat. All rights reserved.</div>
          <Link href="/admin" className="hover:text-slate-900">
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}


