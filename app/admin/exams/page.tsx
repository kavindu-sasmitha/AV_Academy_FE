"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Plus, Trash2, FileQuestion } from "lucide-react";
import api from "@/lib/api";
import type { ExamPaper, ExamQuestion } from "@/types";

const emptyQuestion = (): ExamQuestion => ({
  questionText: "",
  imageUrl: "",
  options: ["", "", "", ""],
  correctOptionIndex: 0,
});

export default function AdminExamsPage() {
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState<ExamQuestion[]>([emptyQuestion()]);

  // Papers ලිස්ට් එක load කරගන්නවා (page/limit වැඩි කරලා ඔක්කොම ගන්නවා)
  const load = async () => {
    setLoading(true);
    try {
      const res = await api.get("/exams/papers?page=1&limit=100");
      setPapers(res.data.data || []);
    } catch {
      toast.error("Failed to load exam papers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const addQuestionRow = () => setQuestions((q) => [...q, emptyQuestion()]);

  const updateQuestion = (idx: number, patch: Partial<ExamQuestion>) => {
    setQuestions((q) => q.map((item, i) => (i === idx ? { ...item, ...patch } : item)));
  };

  const updateOption = (qIdx: number, oIdx: number, value: string) => {
    setQuestions((q) =>
      q.map((item, i) =>
        i === qIdx
          ? { ...item, options: item.options.map((o, j) => (j === oIdx ? value : o)) }
          : item
      )
    );
  };

  const resetForm = () => {
    setTitle("");
    setQuestions([emptyQuestion()]);
  };

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/exams/create", { title, questions });
      toast.success("Exam paper published");
      resetForm();
      setShowForm(false);
      await load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to publish exam");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this exam paper?")) return;
    try {
      await api.delete(`/exams/papers/${id}`);
      toast.success("Exam paper deleted");
      await load();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to delete exam paper");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <span className="timecode">THEORY TESTS</span>
          <h1 className="mt-3 font-display text-2xl font-semibold">Exam papers</h1>
          <p className="mt-1 text-sm text-mist">
            Build MCQ practice papers for students to attempt from their dashboard.
          </p>
        </div>
        <button
          onClick={() => setShowForm((s) => !s)}
          className="flex items-center gap-2 rounded-full bg-teal px-4 py-2.5 text-sm font-semibold text-void hover:bg-chalk"
        >
          <Plus size={15} /> New paper
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handlePublish}
          className="mt-6 max-w-2xl space-y-6 rounded-2xl border border-line/60 bg-surface p-6"
        >
          <div>
            <label className="mb-1 block text-xs font-semibold text-mist">
              Exam paper title
            </label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g., Light Vehicle Theory Test - 01"
              className="w-full rounded-lg border border-line bg-void px-4 py-2.5 text-sm outline-none focus:border-teal"
            />
          </div>

          <div className="space-y-5 border-t border-line/60 pt-5">
            <h3 className="text-sm font-semibold text-chalk">Questions</h3>

            {questions.map((q, qIdx) => (
              <div
                key={qIdx}
                className="relative space-y-3 rounded-xl border border-line/60 bg-void p-4"
              >
                <span className="absolute right-4 top-3 text-xs font-semibold text-mist">
                  #{qIdx + 1}
                </span>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-mist">
                    Question
                  </label>
                  <input
                    required
                    value={q.questionText}
                    onChange={(e) => updateQuestion(qIdx, { questionText: e.target.value })}
                    placeholder="Type the question here..."
                    className="w-full rounded-lg border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-teal"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-semibold text-mist">
                    Sign image URL <span className="font-normal text-mist/70">(optional)</span>
                  </label>
                  <input
                    type="url"
                    value={q.imageUrl || ""}
                    onChange={(e) => updateQuestion(qIdx, { imageUrl: e.target.value })}
                    placeholder="https://.../u-turn.png"
                    className="w-full rounded-lg border border-line bg-surface px-4 py-2 text-sm outline-none focus:border-teal"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx}>
                      <label className="mb-0.5 block text-[10px] text-mist">
                        Option {oIdx + 1}
                      </label>
                      <input
                        required
                        value={opt}
                        onChange={(e) => updateOption(qIdx, oIdx, e.target.value)}
                        placeholder={`Answer choice ${oIdx + 1}`}
                        className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm outline-none focus:border-teal"
                      />
                    </div>
                  ))}
                </div>

                <div className="w-full pt-1 md:w-1/2">
                  <label className="mb-1 block text-xs font-semibold text-mist">
                    Correct answer
                  </label>
                  <select
                    value={q.correctOptionIndex}
                    onChange={(e) =>
                      updateQuestion(qIdx, { correctOptionIndex: parseInt(e.target.value) })
                    }
                    className="w-full rounded-lg border border-line bg-surface px-3 py-1.5 text-sm outline-none focus:border-teal"
                  >
                    <option value={0}>Option 1 is correct</option>
                    <option value={1}>Option 2 is correct</option>
                    <option value={2}>Option 3 is correct</option>
                    <option value={3}>Option 4 is correct</option>
                  </select>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={addQuestionRow}
              className="rounded-full border border-line px-4 py-2.5 text-sm text-chalk hover:border-teal hover:text-teal"
            >
              + Add question
            </button>
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-full bg-teal py-2.5 text-sm font-semibold text-void hover:bg-chalk disabled:opacity-60"
            >
              {saving ? "Publishing..." : "Publish exam paper"}
            </button>
          </div>
        </form>
      )}

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold">Published papers</h2>

        {loading ? (
          <p className="mt-4 text-sm text-mist">Loading exam papers...</p>
        ) : papers.length === 0 ? (
          <div className="mt-4 rounded-2xl border border-dashed border-line/60 py-10 text-center">
            <FileQuestion size={22} className="mx-auto text-mist" />
            <p className="mt-2 text-sm text-mist">No exam papers published yet.</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {papers.map((p) => (
              <div key={p._id} className="rounded-2xl border border-line/60 bg-surface p-5">
                <h3 className="font-display text-base font-semibold">{p.title}</h3>
                <p className="mt-1 text-xs text-mist">
                  {p.questions?.length || 0} questions
                </p>
                <button
                  onClick={() => handleDelete(p._id)}
                  className="mt-4 flex items-center gap-1.5 rounded-full border border-ember/40 px-3 py-1.5 text-xs text-ember hover:bg-ember/10"
                >
                  <Trash2 size={13} /> Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
