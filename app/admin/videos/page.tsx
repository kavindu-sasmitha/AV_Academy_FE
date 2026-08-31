"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, Video as VideoIcon } from "lucide-react";
import api from "@/lib/api";
import type { VideoCategory, VideoTutorial } from "@/types";

const CATEGORY_LABELS: Record<VideoCategory, string> = {
  PRACTICAL: "Practical test tips",
  THEORY: "Theory lessons",
  ROAD_RULES: "Road rules & signs",
};

export default function AdminVideosPage() {
  const [videos, setVideos] = useState<VideoTutorial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    category: "PRACTICAL" as VideoCategory,
  });

  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/videos/get-all?page=1&limit=100");
      setVideos(res.data.data || []);
    } catch {
      toast.error("Failed to load videos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/videos/add", form);
      toast.success("Video tutorial published");
      setForm({ title: "", description: "", videoUrl: "", category: "PRACTICAL" });
      setShowForm(false);
      await load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add video");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this video?")) return;
    try {
      await api.delete(`/videos/delete/${id}`);
      toast.success("Video deleted");
      await load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete video");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="timecode">TUTORIAL LIBRARY</span>
          <h1 className="mt-3 font-display text-2xl font-semibold">Video tutorials</h1>
          <p className="mt-1 text-sm text-mist">
            Publish standalone YouTube clips students can watch from their dashboard.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 rounded-full bg-teal px-4 py-2.5 text-sm font-semibold text-void hover:bg-chalk"
        >
          <Plus size={15} /> New video
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleAdd}
          className="mt-6 grid max-w-lg gap-4 rounded-2xl border border-line/60 bg-surface p-6"
        >
          <input
            placeholder="Video title"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
          />
          <textarea
            placeholder="Description"
            rows={3}
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="resize-none rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
          />
          <input
            placeholder="YouTube video URL"
            type="url"
            required
            value={form.videoUrl}
            onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
            className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
          />
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as VideoCategory })}
            className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
          >
            {(Object.keys(CATEGORY_LABELS) as VideoCategory[]).map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={saving}
            className="rounded-full bg-teal py-2.5 text-sm font-semibold text-void hover:bg-chalk disabled:opacity-60"
          >
            {saving ? "Publishing..." : "Publish video"}
          </button>
        </form>
      )}

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold">Published videos</h2>

        {loading ? (
          <p className="mt-4 text-sm text-mist">Loading videos...</p>
        ) : videos.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-line/60 py-10 text-center">
            <VideoIcon size={22} className="mx-auto text-mist" />
            <p className="mt-2 text-sm text-mist">No videos uploaded yet.</p>
          </div>
        ) : (
          <div className="mt-4 overflow-hidden rounded-2xl border border-line/60 bg-surface">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-line/60 bg-surface2 text-xs text-mist">
                  <th className="p-3 font-semibold">Title</th>
                  <th className="p-3 font-semibold">Category</th>
                  <th className="p-3 font-semibold">URL</th>
                  <th className="p-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/40">
                {videos.map((v) => (
                  <tr key={v._id} className="hover:bg-surface2/50">
                    <td className="p-3 font-medium">{v.title}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal">
                        {CATEGORY_LABELS[v.category]}
                      </span>
                    </td>
                    <td className="max-w-[220px] truncate p-3 text-mist">
                      <a
                        href={v.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-teal hover:underline"
                      >
                        {v.videoUrl}
                      </a>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDelete(v._id)}
                        className="flex items-center gap-1.5 rounded-full border border-ember/40 px-3 py-1.5 text-xs text-ember hover:bg-ember/10"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
