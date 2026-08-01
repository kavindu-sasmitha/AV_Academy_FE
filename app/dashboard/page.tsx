"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Lock, CheckCircle2, Clock, CreditCard } from "lucide-react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import type { Course, Enrollment } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState<string | null>(null);

  const loadData = async () => {
    try {
      const [coursesRes, enrollmentsRes] = await Promise.all([
        api.get("/courses"),
        api.get("/students/my-courses"),
      ]);
      setCourses(coursesRes.data.courses);
      setEnrollments(enrollmentsRes.data.enrollments);
    } catch (err: any) {
      toast.error("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enrollmentFor = (courseId: string) =>
    enrollments.find((e) => {
      const cId = typeof e.course === "string" ? e.course : e.course._id;
      return cId === courseId;
    });

  const handleEnroll = async (courseId: string) => {
    setEnrolling(courseId);
    try {
      await api.post(`/students/enroll/${courseId}`);
      toast.success("Requested! We'll unlock it once payment is confirmed.");
      loadData();
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Could not enroll");
    } finally {
      setEnrolling(null);
    }
  };

  if (loading) {
    return <p className="text-mist">Loading courses...</p>;
  }

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">My courses</h1>
      <p className="mt-1 text-sm text-mist">
        Enroll in a course, then wait for admin to confirm your payment.
      </p>

      {!user?.nic && (
        <div className="mt-6 flex items-center gap-3 rounded-xl border border-ember/40 bg-ember/10 px-5 py-4 text-sm text-chalk">
          <CreditCard size={18} className="shrink-0 text-ember" />
          <div className="flex-1">
            Complete your profile with your NIC before you can enroll in a course.
          </div>
          <Link
            href="/complete-profile"
            className="shrink-0 rounded-full bg-ember px-4 py-2 text-xs font-semibold text-void"
          >
            Complete profile
          </Link>
        </div>
      )}

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => {
          const enrollment = enrollmentFor(course._id);
          const status = enrollment
            ? enrollment.accessGranted
              ? "unlocked"
              : "pending"
            : "none";

          return (
            <div
              key={course._id}
              className="flex flex-col rounded-2xl border border-line/60 bg-surface p-6"
            >
              <h3 className="font-display text-lg font-semibold">{course.title}</h3>
              <p className="mt-2 flex-1 text-sm text-mist line-clamp-3">
                {course.description}
              </p>
              <p className="mt-4 font-display text-lg font-semibold text-teal">
                LKR {course.price.toLocaleString()}
              </p>

              {status === "unlocked" && (
                <Link
                  href={`/dashboard/courses/${course._id}`}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full bg-teal py-2.5 text-sm font-semibold text-void"
                >
                  <CheckCircle2 size={15} />
                  Go to lessons
                </Link>
              )}

              {status === "pending" && (
                <div className="mt-4 flex items-center justify-center gap-2 rounded-full border border-line py-2.5 text-sm text-mist">
                  <Clock size={15} />
                  Pending admin approval
                </div>
              )}

              {status === "none" && (
                <button
                  onClick={() => handleEnroll(course._id)}
                  disabled={enrolling === course._id || !user?.nic}
                  className="mt-4 flex items-center justify-center gap-2 rounded-full border border-line py-2.5 text-sm font-medium text-chalk transition-colors hover:border-teal hover:text-teal disabled:opacity-50"
                >
                  <Lock size={15} />
                  {enrolling === course._id ? "Requesting..." : "Enroll"}
                </button>
              )}
            </div>
          );
        })}
      </div>

      {courses.length === 0 && (
        <p className="mt-8 text-sm text-mist">No courses published yet — check back soon.</p>
      )}
    </div>
  );
}
