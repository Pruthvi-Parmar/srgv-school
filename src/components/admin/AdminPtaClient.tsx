"use client";

import { useEffect, useState } from "react";

type PtaDto = {
  id: string;
  name: string;
  role: string;
  address: string;
  photo?: string;
  order: number;
};

export function AdminPtaClient() {
  const [items, setItems] = useState<PtaDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState("");
  const [order, setOrder] = useState("");
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/pta", { cache: "no-store" });
      const data = (await res.json()) as PtaDto[] & { error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to load PTA members");
      setItems(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load PTA members");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!editingId) {
      setName("");
      setRole("");
      setAddress("");
      setPhoto("");
      setOrder("");
      return;
    }
    const current = items.find((i) => i.id === editingId);
    if (!current) return;
    setName(current.name);
    setRole(current.role);
    setAddress(current.address);
    setPhoto(current.photo ?? "");
    setOrder(current.order.toString());
  }, [editingId, items]);

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const payload = {
        name,
        role,
        address,
        photo: photo || undefined,
        order: order ? Number(order) : undefined,
      };
      const isEdit = !!editingId;
      const res = await fetch(isEdit ? `/api/admin/pta/${editingId}` : "/api/admin/pta", {
        method: isEdit ? "PUT" : "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Save failed");
      setEditingId(null);
      setName("");
      setRole("");
      setAddress("");
      setPhoto("");
      setOrder("");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this PTA member?")) return;
    setError(null);
    try {
      const res = await fetch(`/api/admin/pta/${id}`, { method: "DELETE" });
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
            {editingId ? "Edit PTA member" : "New PTA member"}
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
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Role</span>
            <input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">Address</span>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={3}
              className="mt-1 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Photo path (optional)
            </span>
            <input
              value={photo}
              onChange={(e) => setPhoto(e.target.value)}
              placeholder="/gallery/governance/pta-1.jpeg"
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Order (optional)
            </span>
            <input
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              type="number"
              min={1}
              className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
            />
          </label>

          {error ? <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

          <button
            type="button"
            disabled={saving || !name.trim() || !role.trim() || !address.trim()}
            onClick={() => void save()}
            className="w-full rounded-xl bg-[color:var(--brand)] px-4 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
          >
            {saving ? "Saving…" : editingId ? "Save changes" : "Add PTA member"}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm font-semibold text-slate-900">PTA members</div>
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
          <div className="mt-4 text-sm text-slate-600">No PTA members yet.</div>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((m) => (
              <div
                key={m.id}
                className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:flex-row sm:items-start sm:justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-sm font-semibold text-slate-900">{m.name}</div>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                      #{m.order}
                    </span>
                  </div>
                  <div className="mt-1 text-xs font-medium text-slate-600">{m.role}</div>
                  <div className="mt-1 text-xs text-slate-700">{m.address}</div>
                  {m.photo ? (
                    <div className="mt-1 text-xs text-slate-500">{m.photo}</div>
                  ) : null}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingId(m.id)}
                    className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void remove(m.id)}
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

