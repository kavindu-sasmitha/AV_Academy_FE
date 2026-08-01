"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Search, CreditCard, Mail, Phone, Lock, Unlock } from "lucide-react";
import api from "@/lib/api";

interface StudentResult {
  _id: string;
  name: string;
  email: string;
  nic: string;
  phone?: string;
}

interface EnrollmentDetail {
  _id: string;
  course: { _id: string; title: string; price: number };
  paymentStatus: "pending" | "paid";
  amountPaid: number;
  accessGranted: boolean;
}

export default function AdminStudentsPage() {
  const [nic, setNic] = useState("");
  const [results, setResults] = useState<StudentResult[]>([]);
  const [selected, setSelected] = useState<StudentResult | null>(null);
  const [enrollments, setEnrollments] = useState<EnrollmentDetail[]>([]);
  const [searching, setSearching] = useState(false);
  const [busyCourseId, setBusyCourseId] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nic.trim()) return;
    setSearching(true);
    setSelected(null);
    try {
      const res = await api.get(`/admin/students/search?nic=${encodeURIComponent(nic)}`);
      setResults(res.data.students);
      if (res.data.students.length === 0) {
        toast("No students found with that NIC", { icon: "🔍" });
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Search failed");
    } finally {
      setSearching(false);
    }
  };

  const openStudent = async (student: StudentResult) => {
    setSelected(student);
    try {
      const res = await api.get(`/admin/students/${student._id}`);
      setEnrollments(res.data.enrollments);
    } catch {
      toast.error("Failed to load student details");
    }
  };

  const toggleAccess = async (courseId: string, grant: boolean) => {
    if (!selected) return;
    setBusyCourseId(courseId);
    try {
      const action = grant ? "grant-access" : "revoke-access";
      await api.put(`/admin/students/${selected._id}/courses/${courseId}/${action}`, {});
      toast.success(grant ? "Access granted" : "Access revoked");
      openStudent(selected);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setBusyCourseId(null);
    }
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Search students</h1>
      <p className="mt-1 text-sm text-mist">Find a student by NIC to review payments and unlock courses.</p>

      <form onSubmit={handleSearch} className="mt-6 flex max-w-md gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
          <CreditCard size={15} className="text-mist" />
          <input
            value={nic}
            onChange={(e) => setNic(e.target.value)}
            placeholder="Search by NIC..."
            className="w-full bg-transparent text-sm outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={searching}
          className="flex items-center gap-1.5 rounded-lg bg-teal px-4 py-2.5 text-sm font-semibold text-void disabled:opacity-60"
        >
          <Search size={14} />
          Search
        </button>
      </form>

      <div className="mt-8 grid gap-8 lg:grid-cols-[320px_1fr]">
        {/* Results list */}
        <div className="flex flex-col gap-2">
          {results.map((s) => (
            <button
              key={s._id}
              onClick={() => openStudent(s)}
              className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                selected?._id === s._id
                  ? "border-teal bg-teal/10"
                  : "border-line/60 bg-surface hover:border-line"
              }`}
            >
              <p className="text-sm font-medium">{s.name}</p>
              <p className="mt-0.5 text-xs text-mist">NIC: {s.nic}</p>
            </button>
          ))}
        </div>

        {/* Selected student detail */}
        {selected && (
          <div className="rounded-2xl border border-line/60 bg-surface p-6">
            <h2 className="font-display text-lg font-semibold">{selected.name}</h2>
            <div className="mt-3 flex flex-col gap-1.5 text-sm text-mist">
              <span className="flex items-center gap-2">
                <Mail size={13} /> {selected.email}
              </span>
              <span className="flex items-center gap-2">
                <CreditCard size={13} /> {selected.nic}
              </span>
              {selected.phone && (
                <span className="flex items-center gap-2">
                  <Phone size={13} /> {selected.phone}
                </span>
              )}
            </div>

            <h3 className="mt-6 text-xs font-semibold uppercase tracking-wider text-mist">
              Course enrollments
            </h3>
            <div className="mt-3 flex flex-col gap-3">
              {enrollments.length === 0 && (
                <p className="text-sm text-mist">No enrollment requests yet.</p>
              )}
              {enrollments.map((e) => (
                <div
                  key={e._id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line/60 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium">{e.course.title}</p>
                    <p className="text-xs text-mist">
                      LKR {e.course.price.toLocaleString()} ·{" "}
                      {e.accessGranted ? "Access granted" : "Awaiting approval"}
                    </p>
                  </div>
                  {e.accessGranted ? (
                    <button
                      onClick={() => toggleAccess(e.course._id, false)}
                      disabled={busyCourseId === e.course._id}
                      className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-mist transition-colors hover:border-ember hover:text-ember disabled:opacity-60"
                    >
                      <Lock size={13} />
                      Revoke
                    </button>
                  ) : (
                    <button
                      onClick={() => toggleAccess(e.course._id, true)}
                      disabled={busyCourseId === e.course._id}
                      className="flex items-center gap-1.5 rounded-full bg-teal px-4 py-2 text-xs font-semibold text-void disabled:opacity-60"
                    >
                      <Unlock size={13} />
                      Grant access
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
