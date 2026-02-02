"use client";

import { useEffect, useState } from "react";

type AchievementDto = {
  id: string;
  title: string;
  description: string;
  year?: string;
};

export function AdminAchievementsClient() {
  const [items, setItems] = useState<AchievementDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/achievements", { cache: "no-store" });
      const data = (await res.json()) as AchievementDto[] & { error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to load achievements");
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load achievements");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!editingId) {
      setTitle("");
      setYear("");
      setDescription("");
      return;
    }
    const current = items.find((i) => i.id === editingId);
    if (!current) return;
    setTitle(current.title);
    setYear(current.year ?? "");
    setDescription(current.description);
  }, [editingId, items]);

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const payload = { title, description, year: year || undefined };
      const isEdit = !!editingId;
      const res = await fetch(isEdit ? `/api/admin/achievements/${editingId}` : "/api/admin/achievements", {
        method: isEdit ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Save failed");
      setEditingId(null);
      setTitle("");
      setYear("");
      setDescription("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this achievement?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/achievements/${id}`, { method: "DELETE" });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Delete failed");
      if (editingId === id) setEditingId(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed");
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-900">
            {editingId ? "Edit achievement" : "New achievement"}
          </div>
          {editingId ? (
            <button
              type="button"
              onClick={() => setEditingId(null)}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
          ) : null}
        </div>

        <div className="mt-4 space-y-3">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Title</span>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Year (optional)</span>
            <input
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              placeholder="e.g. 2023-24"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Description</span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={6}
              className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>

          {error ? <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

          <button
            type="button"
            disabled={saving || !title.trim() || !description.trim()}
            onClick={() => void save()}
            className="w-full rounded-xl bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add achievement"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-900">Achievements</div>
          <button
            type="button"
            onClick={() => void load()}
            className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="mt-4 text-sm text-slate-600">Loading…</div>
        ) : items.length === 0 ? (
          <div className="mt-4 text-sm text-slate-600">No achievements added yet.</div>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((a) => (
              <div
                key={a.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-slate-900">{a.title}</div>
                    {a.year ? (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                        {a.year}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm text-slate-700 whitespace-pre-line">{a.description}</p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(a.id)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void remove(a.id)}
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

