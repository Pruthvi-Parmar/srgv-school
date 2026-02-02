"use client";

import { useEffect, useState } from "react";

type FeatureCardDto = {
  id: string;
  title: string;
  desc: string;
};

type AcademicsSettingsDto = {
  introText: string;
  guidelinesText: string;
  featureCards: FeatureCardDto[];
};

export function AdminAcademicsSettingsClient() {
  const [settings, setSettings] = useState<AcademicsSettingsDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/academics/settings", { cache: "no-store" });
      const data = (await res.json()) as AcademicsSettingsDto & { error?: string };
      if (!res.ok) throw new Error(data.error || "Failed to load settings");
      setSettings({
        introText: data.introText,
        guidelinesText: data.guidelinesText,
        featureCards: data.featureCards,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function save() {
    if (!settings) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/academics/settings", {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(settings),
      });
      const data = (await res.json().catch(() => ({}))) as { error?: string };
      if (!res.ok) throw new Error(data.error || "Save failed");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function updateFeatureCard(index: number, patch: Partial<FeatureCardDto>) {
    if (!settings) return;
    const cards = settings.featureCards.slice();
    cards[index] = { ...cards[index], ...patch };
    setSettings({ ...settings, featureCards: cards });
  }

  function addFeatureCard() {
    if (!settings) return;
    const id = `card-${Date.now()}`;
    setSettings({
      ...settings,
      featureCards: [...settings.featureCards, { id, title: "New point", desc: "" }],
    });
  }

  function removeFeatureCard(id: string) {
    if (!settings) return;
    setSettings({
      ...settings,
      featureCards: settings.featureCards.filter((c) => c.id !== id),
    });
  }

  if (loading && !settings) {
    return <div className="text-sm text-slate-600">Loading…</div>;
  }

  if (!settings) {
    return <div className="text-sm text-red-700">Unable to load academics content.</div>;
  }

  return (
    <div className="space-y-6">
      {error ? <div className="rounded-xl bg-red-50 p-3 text-sm text-red-700">{error}</div> : null}

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">Intro section</h2>
        <p className="mt-1 text-xs text-slate-600">
          Shown under the “Academics” heading as a short description.
        </p>
        <textarea
          value={settings.introText}
          onChange={(e) => setSettings({ ...settings, introText: e.target.value })}
          rows={4}
          className="mt-3 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">Feature cards</h2>
        <p className="mt-1 text-xs text-slate-600">
          These appear as four small cards (Concept-based, Experiential, etc.). You can edit or add points.
        </p>
        <div className="mt-4 space-y-3">
          {settings.featureCards.map((card, index) => (
            <div key={card.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Card {index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => removeFeatureCard(card.id)}
                  className="text-xs font-semibold text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <div className="mt-2 space-y-2">
                <input
                  value={card.title}
                  onChange={(e) => updateFeatureCard(index, { title: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Title"
                />
                <textarea
                  value={card.desc}
                  onChange={(e) => updateFeatureCard(index, { desc: e.target.value })}
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
                  placeholder="Description"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => addFeatureCard()}
            className="rounded-xl border border-dashed border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
          >
            + Add feature card
          </button>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-sm font-semibold text-slate-900">Guidelines block</h2>
        <p className="mt-1 text-xs text-slate-600">
          Text for “Student &amp; Parent guidelines” card at the bottom of the Academics page.
        </p>
        <textarea
          value={settings.guidelinesText}
          onChange={(e) => setSettings({ ...settings, guidelinesText: e.target.value })}
          rows={4}
          className="mt-3 w-full resize-none rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-slate-200"
        />
      </section>

      <div className="flex justify-end">
        <button
          type="button"
          disabled={saving}
          onClick={() => void save()}
          className="rounded-xl bg-[color:var(--brand)] px-5 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-60"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </div>
    </div>
  );
}

