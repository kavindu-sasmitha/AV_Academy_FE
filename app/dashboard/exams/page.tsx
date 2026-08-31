"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FileQuestion, X } from "lucide-react";
import api from "@/lib/api";
import type { ExamPaper, ExamResult } from "@/types";

export default function StudentExamsPage() {
  const [papers, setPapers] = useState<ExamPaper[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedPaper, setSelectedPaper] = useState<ExamPaper | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<ExamResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPaper) return;
    setLoading(true);
    api
      .get(`/exams/papers?page=${page}&limit=6`)
      .then((res) => {
        setPapers(res.data.data || []);
        setTotalPages(res.data.totalPage || 1);
      })
      .catch(() => toast.error("Failed to load exam papers"))
      .finally(() => setLoading(false));
  }, [page, selectedPaper]);

  const startExam = async (id: string) => {
    try {
      const res = await api.get(`/exams/papers/${id}`);
      setSelectedPaper(res.data.data);
      setAnswers({});
      setResult(null);
    } catch {
      toast.error("Failed to load exam paper");
    }
  };

  const submitExam = async () => {
    if (!selectedPaper) return;
    if (Object.keys(answers).length < selectedPaper.questions.length) {
      toast.error("Please answer all questions before submitting");
      return;
    }
    setSubmitting(true);
    try {
      const answersArray = selectedPaper.questions.map((_, idx) => answers[idx]);
      const res = await api.post("/exams/submit", {
        examPaperId: selectedPaper._id,
        answers: answersArray,
      });
      setResult({ score: res.data.score, passed: res.data.passed });
    } catch {
      toast.error("Failed to submit exam");
    } finally {
      setSubmitting(false);
    }
  };

  if (selectedPaper) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="overflow-hidden rounded-2xl border border-line/60 bg-surface">
          <div className="flex items-center justify-between border-b border-line/60 bg-surface2/60 px-6 py-4">
            <div>
              <h2 className="font-display text-lg font-semibold">{selectedPaper.title}</h2>
              <p className="mt-0.5 text-xs text-mist">
                {selectedPaper.questions?.length} questions
              </p>
            </div>
            <button
              onClick={() => setSelectedPaper(null)}
              className="flex items-center gap-1.5 text-xs font-medium text-mist hover:text-chalk"
            >
              <X size={14} /> Close
            </button>
          </div>

          <div className="space-y-7 p-6">
            {selectedPaper.questions?.map((q, qIdx) => (
              <div key={qIdx} className="border-b border-line/40 pb-6 last:border-0 last:pb-0">
                <p className="mb-4 text-sm font-medium leading-relaxed">
                  <span className="mr-1.5 font-semibold text-teal">{qIdx + 1}.</span>
                  {q.questionText}
                </p>

                {q.imageUrl && (
                  <div className="mb-4 max-w-[180px] rounded-xl border border-line/60 bg-void p-2">
                    <img
                      src={q.imageUrl}
                      alt={`Question ${qIdx + 1} sign`}
                      className="h-auto w-full rounded-lg object-contain"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {q.options?.map((opt, oIdx) => (
                    <label
                      key={oIdx}
                      className={`flex items-center gap-3 rounded-xl border p-3.5 text-xs font-medium transition-colors ${
                        answers[qIdx] === oIdx
                          ? "border-teal bg-teal/10 text-teal"
                          : "border-line/60 bg-void text-chalk hover:border-line"
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${qIdx}`}
                        checked={answers[qIdx] === oIdx}
                        onChange={() => setAnswers((prev) => ({ ...prev, [qIdx]: oIdx }))}
                        className="h-3.5 w-3.5 shrink-0 accent-teal"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col items-center justify-between gap-3 border-t border-line/60 bg-surface2/60 px-6 py-4 sm:flex-row">
            <span className="text-xs text-mist">
              {Object.keys(answers).length} / {selectedPaper.questions?.length} answered
            </span>
            <button
              onClick={submitExam}
              disabled={submitting}
              className="w-full rounded-full bg-teal px-8 py-2.5 text-xs font-semibold uppercase tracking-wide text-void disabled:opacity-60 sm:w-auto"
            >
              {submitting ? "Submitting..." : "Submit answers"}
            </button>
          </div>
        </div>

        {result && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-void/70 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-3xl border border-line/60 bg-surface p-8 text-center">
              <div className="text-5xl">{result.passed ? "🎉" : "😥"}</div>
              <h3 className="mt-4 font-display text-xl font-semibold">Exam evaluated</h3>
              <p className="mt-0.5 text-xs text-mist">Your performance result</p>

              <div className="mt-5 rounded-2xl border border-line/60 bg-void p-5">
                <div className="font-display text-4xl font-semibold text-teal">
                  {result.score}%
                </div>
              </div>

              <span
                className={`mt-4 inline-block rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest ${
                  result.passed
                    ? "border border-teal/40 bg-teal/10 text-teal"
                    : "border border-ember/40 bg-ember/10 text-ember"
                }`}
              >
                {result.passed ? "Passed" : "Failed"}
              </span>

              <button
                onClick={() => {
                  setSelectedPaper(null);
                  setResult(null);
                }}
                className="mt-6 w-full rounded-full bg-teal py-3 text-xs font-semibold uppercase tracking-wide text-void"
              >
                Back to exam papers
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Exam papers</h1>
      <p className="mt-1 text-sm text-mist">Practice theory exam papers before your real test.</p>

      {loading ? (
        <p className="mt-8 text-sm text-mist">Loading exam papers...</p>
      ) : papers.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line/60 py-14 text-center">
          <FileQuestion size={24} className="mx-auto text-mist" />
          <p className="mt-2 text-sm text-mist">No exam papers published yet.</p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {papers.map((paper) => (
              <div
                key={paper._id}
                className="flex flex-col rounded-2xl border border-line/60 bg-surface p-6"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border border-teal/20 bg-teal/10 text-teal">
                  <FileQuestion size={18} />
                </div>
                <h3 className="font-display text-base font-semibold">{paper.title}</h3>
                <p className="mt-1.5 flex-1 text-xs text-mist">
                  Practice this model paper before your final theory test.
                </p>
                <button
                  onClick={() => startExam(paper._id)}
                  className="mt-5 rounded-full bg-teal py-2.5 text-xs font-semibold uppercase tracking-wide text-void hover:bg-chalk"
                >
                  Start exam →
                </button>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-full border border-line px-4 py-2 text-xs font-medium text-mist disabled:opacity-40"
              >
                ← Prev
              </button>
              <span className="text-xs text-mist">
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-full border border-line px-4 py-2 text-xs font-medium text-mist disabled:opacity-40"
              >
                Next →
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
