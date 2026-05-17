"use client";

import { useEffect, useMemo, useState } from "react";
import { LEAVING_CERTIFICATE_STANDARDS, standardSortIndex } from "@/lib/leaving-certificate-standards";

type LeavingCertificateDto = {
  id: string;
  title: string;
  standard: string;
  pdfPath: string;
  order: number;
  createdAt: string;
};

export function AdminLeavingCertificatesClient() {
  const [items, setItems] = useState<LeavingCertificateDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [studentName, setStudentName] = useState("");
  const [standard, setStandard] = useState<string>(LEAVING_CERTIFICATE_STANDARDS[0]);
  const [file, setFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);
  const [filterStandard, setFilterStandard] = useState<string>("all");

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/leaving-certificates", { cache: "no-store" });
      const data = (await res.json()) as LeavingCertificateDto[] & { error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to load leaving certificates");
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load leaving certificates");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  const UNASSIGNED = "Unassigned";

  const filteredItems = useMemo(() => {
    const list =
      filterStandard === "all"
        ? items
        : items.filter((c) =>
            filterStandard === UNASSIGNED ? !c.standard?.trim() : c.standard === filterStandard,
          );
    return [...list].sort((a, b) => {
      const std = standardSortIndex(a.standard) - standardSortIndex(b.standard);
      if (std !== 0) return std;
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    });
  }, [items, filterStandard]);

  async function save() {
    if (!studentName.trim() || !file || !standard) {
      setError("Enter student name, select standard, and choose a PDF file");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("title", studentName.trim());
      formData.append("standard", standard);
      formData.append("file", file);
      const res = await fetch("/api/admin/leaving-certificates", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Upload failed");
      setStudentName("");
      setFile(null);
      const input = document.getElementById("lc-file") as HTMLInputElement | null;
      if (input) input.value = "";
      setFilterStandard(standard);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this leaving certificate? The PDF file will be removed from the server.")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/leaving-certificates/${id}`, { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Delete failed");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-1">
        <div className="text-sm font-semibold text-slate-900">Add leaving certificate</div>
        <p className="mt-1 text-xs text-slate-600">
          Upload one PDF per student. Choose the standard (class) the student was in when leaving.
        </p>

        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Standard</span>
          <select
            value={standard}
            onChange={(e) => setStandard(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-slate-200"
          >
            {LEAVING_CERTIFICATE_STANDARDS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </label>

        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Student name</span>
          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            placeholder="e.g. Rahul Patel"
          />
        </label>

        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">PDF file</span>
          <input
            id="lc-file"
            type="file"
            accept="application/pdf,.pdf"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            className="mt-1 w-full text-sm text-slate-700 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm file:font-medium file:text-slate-800"
          />
        </label>

        {error ? <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

        <button
          type="button"
          disabled={saving || !studentName.trim() || !file}
          onClick={() => void save()}
          className="mt-4 w-full rounded-xl bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
        >
          {saving ? "Uploading…" : "Upload certificate"}
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-semibold text-slate-900">Uploaded certificates</div>
          <div className="flex flex-wrap items-center gap-2">
            <label className="flex items-center gap-2 text-xs text-slate-600">
              <span className="font-semibold uppercase tracking-wide">Filter</span>
              <select
                value={filterStandard}
                onChange={(e) => setFilterStandard(e.target.value)}
                className="rounded-lg border border-slate-200 bg-white px-2 py-1.5 text-sm text-slate-800"
              >
                <option value="all">All standards</option>
                <option value={UNASSIGNED}>Unassigned (no standard)</option>
                {LEAVING_CERTIFICATE_STANDARDS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="button"
              onClick={() => void load()}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <div className="mt-4 text-sm text-slate-600">Loading…</div>
        ) : filteredItems.length === 0 ? (
          <div className="mt-4 text-sm text-slate-600">
            {items.length === 0 ? "No certificates yet." : "No certificates for this standard."}
          </div>
        ) : (
          <div className="mt-4 space-y-3">
            {filteredItems.map((c) => (
              <div
                key={c.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <div className="text-sm font-semibold text-slate-900">{c.title}</div>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                      {c.standard || "—"}
                    </span>
                  </div>
                  <div className="mt-1 truncate text-xs text-slate-500">{c.pdfPath}</div>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <a
                    href={c.pdfPath}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-[color:var(--brand)] hover:bg-slate-50"
                  >
                    VIEW
                  </a>
                  <button
                    type="button"
                    onClick={() => void remove(c.id)}
                    className="rounded-lg border border-red-200 bg-white px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
