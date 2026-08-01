"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Settings2, Trash2 } from "lucide-react";
import api from "@/lib/api";
import AdminSidebar from "@/components/admin/AdminSidebar";
import type { Course } from "@/types";

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", thumbnail: "", price: "" });
  const [saving, setSaving] = useState(false);

  const load = async () => {
    const res = await api.get("/courses");
    setCourses(res.data.courses);
  };

  useEffect(() => {
    load();
  }, []);

  const createCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/courses", { ...form, price: Number(form.price), isPublished: true });
      setForm({ title: "", description: "", thumbnail: "", price: "" });
      setShowForm(false);
      await load();
    } finally {
      setSaving(false);
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Delete this course and all its lessons?")) return;
    await api.delete(`/courses/${id}`);
    await load();
  };

  return (
    <div className="flex min-h-screen bg-void">
      <AdminSidebar />
      <main className="flex-1 p-10">
        <div className="flex items-center justify-between">
          <div>
            <span className="timecode">VIDEO SETS</span>
            <h1 className="mt-3 font-display text-2xl font-semibold">Courses</h1>
          </div>
          <button
            onClick={() => setShowForm((s) => !s)}
            className="flex items-center gap-2 rounded-full bg-teal px-4 py-2.5 text-sm font-semibold text-void hover:bg-chalk"
          >
            <Plus size={15} /> New course
          </button>
        </div>

        {showForm && (
          <form
            onSubmit={createCourse}
            className="mt-6 grid max-w-lg gap-4 rounded-2xl border border-line/60 bg-surface p-6"
          >
            <input
              placeholder="Course title"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
            />
            <textarea
              placeholder="Description"
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="resize-none rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
            />
            <input
              placeholder="Thumbnail image URL"
              value={form.thumbnail}
              onChange={(e) => setForm({ ...form, thumbnail: e.target.value })}
              className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
            />
            <input
              placeholder="Price (LKR)"
              type="number"
              required
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
            />
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-teal py-2.5 text-sm font-semibold text-void hover:bg-chalk disabled:opacity-60"
            >
              {saving ? "Creating..." : "Create course"}
            </button>
          </form>
        )}

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((c) => (
            <div key={c._id} className="rounded-2xl border border-line/60 bg-surface p-5">
              <h3 className="font-display text-base font-semibold">{c.title}</h3>
              <p className="mt-1 line-clamp-2 text-xs text-mist">{c.description}</p>
              <p className="mt-3 text-sm text-teal">LKR {c.price.toLocaleString()}</p>

              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/admin/courses/${c._id}/lessons`}
                  className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-xs text-mist hover:border-teal hover:text-teal"
                >
                  <Settings2 size={13} /> Manage lessons
                </Link>
                <button
                  onClick={() => deleteCourse(c._id)}
                  className="flex items-center gap-1.5 rounded-full border border-ember/40 px-3 py-1.5 text-xs text-ember hover:bg-ember/10"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
