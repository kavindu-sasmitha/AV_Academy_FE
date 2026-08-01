"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Users, BookOpen, Clock, Wallet, CheckCircle2 } from "lucide-react";
import api from "@/lib/api";
import type { Enrollment } from "@/types";

interface Stats {
  totalStudents: number;
  totalCourses: number;
  pendingApprovals: number;
  approvedEnrollments: number;
  totalRevenue: number;
}

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [pending, setPending] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [statsRes, pendingRes] = await Promise.all([
        api.get("/admin/dashboard"),
        api.get("/admin/enrollments/pending"),
      ]);
      setStats(statsRes.data);
      setPending(pendingRes.data.pending);
    } catch {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (studentId: string, courseId: string) => {
    setApproving(`${studentId}-${courseId}`);
    try {
      await api.put(`/admin/students/${studentId}/courses/${courseId}/grant-access`, {});
      toast.success("Access granted");
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to grant access");
    } finally {
      setApproving(null);
    }
  };

  if (loading) return <p className="text-mist">Loading dashboard...</p>;

  const cards = [
    { label: "Total students", value: stats?.totalStudents ?? 0, icon: Users },
    { label: "Total courses", value: stats?.totalCourses ?? 0, icon: BookOpen },
    { label: "Pending approvals", value: stats?.pendingApprovals ?? 0, icon: Clock },
    { label: "Approved enrollments", value: stats?.approvedEnrollments ?? 0, icon: CheckCircle2 },
    {
      label: "Total revenue",
      value: `LKR ${(stats?.totalRevenue ?? 0).toLocaleString()}`,
      icon: Wallet,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Dashboard</h1>
      <p className="mt-1 text-sm text-mist">Overview of students, courses and payments.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {cards.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl border border-line/60 bg-surface p-5">
            <Icon size={18} className="text-teal" />
            <p className="mt-3 font-display text-2xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-mist">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-semibold">Pending enrollment requests</h2>
        <div className="mt-4 flex flex-col gap-3">
          {pending.length === 0 && (
            <p className="text-sm text-mist">Nothing pending — all caught up.</p>
          )}
          {pending.map((enrollment) => {
            const student: any = typeof enrollment.student === "object" ? enrollment.student : null;
            const course: any = typeof enrollment.course === "object" ? enrollment.course : null;
            const studentId = student?._id || student?.id;
            const courseId = course?._id;
            const key = `${studentId}-${courseId}`;

            return (
              <div
                key={enrollment._id}
                className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-line/60 bg-surface px-5 py-4"
              >
                <div>
                  <p className="text-sm font-medium">{student?.name}</p>
                  <p className="text-xs text-mist">
                    NIC: {student?.nic || "—"} · {course?.title}
                  </p>
                </div>
                <button
                  onClick={() => studentId && courseId && handleApprove(studentId, courseId)}
                  disabled={approving === key}
                  className="rounded-full bg-teal px-4 py-2 text-xs font-semibold text-void disabled:opacity-60"
                >
                  {approving === key ? "Granting..." : "Grant access"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
