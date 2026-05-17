import { CBSE_COMMITTEE_LINKS, cbseCommitteeLinkHref } from "@/lib/cbse-committee-links";

export function CommitteeDocumentsSection() {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
      <h2 className="text-lg font-semibold text-slate-900">Committee documents</h2>
      <p className="mt-1 text-sm text-slate-600">
        Open any committee document in a new browser tab. These are also available from the{" "}
        <span className="font-semibold text-slate-800">CBSE Info</span> menu in the site header.
      </p>
      <ul className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
        {CBSE_COMMITTEE_LINKS.map((item) => {
          const href = cbseCommitteeLinkHref(item);
          const key = item.type === "page" ? item.href : `${item.folder}/${item.file}`;

          return (
            <li key={key}>
              {item.type === "page" ? (
                <a
                  href={href}
                  className="flex items-center justify-between gap-4 py-3.5 text-sm font-medium text-slate-800 transition-colors hover:text-[color:var(--brand)]"
                >
                  <span>{item.label}</span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[color:var(--brand)]">
                    Open page →
                  </span>
                </a>
              ) : (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-4 py-3.5 text-sm font-medium text-slate-800 transition-colors hover:text-[color:var(--brand)]"
                >
                  <span>{item.label}</span>
                  <span className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[color:var(--brand)]">
                    View PDF →
                  </span>
                </a>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
