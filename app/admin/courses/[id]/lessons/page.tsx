"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2, X } from "lucide-react";
import api from "@/lib/api";
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { Lesson, Download as DownloadLink } from "@/types";

const EMPTY_DOWNLOAD: DownloadLink = { os: "windows", label: "", url: "" };

export default function AdminLessonsPage({ params }: { params: { id: string } }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    order: 0,
    youtubeUrl: "",
    downloads: [EMPTY_DOWNLOAD] as DownloadLink[],
  });

  const load = async () => {
    const res = await api.get(`/lessons/course/${params.id}`);
    setLessons(res.data.lessons);
  };

  useEffect(() => {
    load();
  }, [params.id]);

  const updateDownload = (i: number, field: keyof DownloadLink, value: string) => {
    const next = [...form.downloads];
    next[i] = { ...next[i], [field]: value } as DownloadLink;
    setForm({ ...form, downloads: next });
  };

  const addDownloadRow = () =>
    setForm({ ...form, downloads: [...form.downloads, { ...EMPTY_DOWNLOAD }] });

  const removeDownloadRow = (i: number) =>
    setForm({ ...form, downloads: form.downloads.filter((_, idx) => idx !== i) });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/lessons", {
        course: params.id,
        title: form.title,
        description: form.description,
        order: Number(form.order),
        youtubeUrl: form.youtubeUrl,
        downloads: form.downloads.filter((d) => d.label && d.url),
      });
      setForm({ title: "", description: "", order: lessons.length + 1, youtubeUrl: "", downloads: [EMPTY_DOWNLOAD] });
      setShowForm(false);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const deleteLesson = async (id: string) => {
    if (!confirm("Delete this lesson?")) return;
    await api.delete(`/lessons/${id}`);
    await load();
  };

  return (
    <div className="flex min-h-screen bg-void">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between">
          <div>
            <span className="timecode">PLAYLIST EDITOR</span>
            <h1 className="mt-3 font-display text-2xl font-semibold">Lessons</h1>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="flex items-center gap-2 rounded-full bg-teal px-4 py-2.5 text-sm font-semibold text-void hover:bg-chalk"
          >
            <Plus size={15} /> Add lesson
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={submit}
            className="mt-6 flex max-w-xl flex-col gap-4 rounded-2xl border border-line/60 bg-surface p-6"
          >
            <input
              placeholder="Lesson title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
            />
            <textarea
              placeholder="Description"
              rows={2}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="resize-none rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                placeholder="Order (1, 2, 3...)"
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
                className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
              />
              <input
                placeholder="YouTube URL (unlisted)"
                required
                value={form.youtubeUrl}
                onChange={(e) => setForm({ ...form, youtubeUrl: e.target.value })}
                className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="text-xs text-mist">Software downloads (per OS)</label>
                <button
                  type="button"
                  onClick={addDownloadRow}
                  className="text-xs text-teal hover:underline"
                >
                  + add row
                </button>
              </div>
              <div className="mt-2 flex flex-col gap-2">
                {form.downloads.map((d, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <select
                      value={d.os}
                      onChange={(e) => updateDownload(i, "os", e.target.value)}
                      className="rounded-lg border border-line bg-void px-2 py-2 text-xs outline-none focus:border-teal"
                    >
                      <option value="windows">Windows</option>
                      <option value="mac">Mac</option>
                      <option value="linux">Linux</option>
                      <option value="other">Other</option>
                    </select>
                    <input
                      placeholder="Label (e.g. Premiere Pro)"
                      value={d.label}
                      onChange={(e) => updateDownload(i, "label", e.target.value)}
                      className="flex-1 rounded-lg border border-line bg-void px-3 py-2 text-xs outline-none focus:border-teal"
                    />
                    <input
                      placeholder="Download URL"
                      value={d.url}
                      onChange={(e) => updateDownload(i, "url", e.target.value)}
                      className="flex-1 rounded-lg border border-line bg-void px-3 py-2 text-xs outline-none focus:border-teal"
                    />
                    <button
                      type="button"
                      onClick={() => removeDownloadRow(i)}
                      className="text-mist hover:text-ember"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-teal py-2.5 text-sm font-semibold text-void hover:bg-chalk disabled:opacity-60"
            >
              {saving ? "Saving..." : "Add lesson"}
            </button>
          </form>
        )}

        <div className="mt-8 flex flex-col gap-3">
          {lessons.map((lesson, i) => (
            <div
              key={lesson._id}
              className="flex items-center justify-between rounded-xl border border-line/60 bg-surface p-4"
            >
              <div>
                <p className="text-sm font-medium">
                  {i + 1}. {lesson.title}
                </p>
                <p className="mt-0.5 text-xs text-mist">
                  {lesson.downloads?.length || 0} download link(s)
                </p>
              </div>
              <button
                onClick={() => deleteLesson(lesson._id)}
                className="flex items-center gap-1.5 rounded-full border border-ember/40 px-3 py-1.5 text-xs text-ember hover:bg-ember/10"
              >
                <Trash2 size={13} />
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
