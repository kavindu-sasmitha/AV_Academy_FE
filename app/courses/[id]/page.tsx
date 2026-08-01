"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Play, Lock, Clock, Download, ArrowLeft } from "lucide-react";
import Link from "next/link";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import GlassBackground from "@/components/ui/GlassBackground";
import type { Course, Lesson } from "@/types";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const { user } = useAuth();
  const [course, setCourse] = useState<Course | null>(null);
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollMessage, setEnrollMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/courses/${params.id}`);
        setCourse(res.data.course);
        setLessons(res.data.lessons);

        // If logged in, try the access-aware playlist endpoint to see
        // whether the video links / downloads should be unlocked.
        if (user) {
          try {
            const lessonRes = await api.get(`/lessons/course/${params.id}`);
            setHasAccess(lessonRes.data.hasAccess);
            setLessons(lessonRes.data.lessons);
          } catch {
            // not enrolled / not approved yet — public lesson list stands
          }
        }
      } catch {
        // course not found — leave course as null, render fallback below
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [params.id, user]);

  const handleEnroll = async () => {
    if (!user) {
      window.location.href = "/login";
      return;
    }
    setEnrolling(true);
    try {
      const res = await api.post(`/students/enroll/${params.id}`);
      setEnrollMessage(res.data.message);
    } catch (err: any) {
      setEnrollMessage(err?.response?.data?.message || "Something went wrong");
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <>
        <GlassBackground />
        <main className="flex min-h-screen items-center justify-center text-mist">
          Loading course...
        </main>
      </>
    );
  }

  if (!course) {
    return (
      <>
        <GlassBackground />
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 text-mist">
          <p>Course not found.</p>
          <Link href="/" className="text-teal hover:underline">
            Back to courses
          </Link>
        </main>
      </>
    );
  }

  return (
    <>
      <GlassBackground />
      <main className="mx-auto max-w-5xl px-6 py-16 lg:px-10">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-chalk"
        >
          <ArrowLeft size={15} /> Back to courses
        </Link>

        {/* Glass hero card */}
        <div className="grid gap-8 rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-[0_8px_60px_-20px_rgba(0,0,0,0.6)] backdrop-blur-2xl lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div className="flex flex-col justify-center">
            <span className="timecode">
              {hasAccess ? "ACCESS UNLOCKED" : "PREVIEW MODE"}
            </span>
            <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              {course.title}
            </h1>
            <p className="mt-4 text-sm leading-relaxed text-mist">
              {course.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="font-display text-2xl font-semibold text-teal">
                LKR {course.price.toLocaleString()}
              </span>
              <span className="text-xs text-mist">one-time payment</span>
            </div>

            {!hasAccess && (
              <button
                onClick={handleEnroll}
                disabled={enrolling}
                className="mt-7 w-fit rounded-full bg-teal px-6 py-3 text-sm font-semibold text-void transition-transform hover:scale-[1.03] disabled:opacity-60"
              >
                {enrolling ? "Requesting..." : "Enroll in this course"}
              </button>
            )}
            {enrollMessage && (
              <p className="mt-3 max-w-sm rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-mist backdrop-blur-md">
                {enrollMessage}
              </p>
            )}
          </div>

          <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5 lg:aspect-auto">
            {course.thumbnail ? (
              <Image
                src={course.thumbnail}
                alt={course.title}
                fill
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-mist">
                No thumbnail
              </div>
            )}
          </div>
        </div>

        {/* Playlist */}
        <div className="mt-12">
          <span className="timecode">LESSON PLAYLIST</span>
          <h2 className="mt-3 font-display text-2xl font-semibold">
            {lessons.length} lesson{lessons.length !== 1 ? "s" : ""}
          </h2>

          <div className="mt-6 flex flex-col gap-3">
            {lessons.map((lesson, i) => {
              const locked = !hasAccess;
              return (
                <div
                  key={lesson._id}
                  className={`flex items-center gap-4 rounded-2xl border border-white/10 p-4 backdrop-blur-xl transition-colors ${
                    locked ? "bg-white/[0.03]" : "bg-white/[0.07] hover:bg-white/[0.1]"
                  }`}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 font-mono text-xs text-mist">
                    {String(i + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-chalk">{lesson.title}</h3>
                    {lesson.description && (
                      <p className="mt-0.5 text-xs text-mist">{lesson.description}</p>
                    )}
                  </div>

                  {locked ? (
                    <Lock size={16} className="shrink-0 text-mist" />
                  ) : (
                    <div className="flex shrink-0 items-center gap-3">
                      {lesson.downloads && lesson.downloads.length > 0 && (
                        <span className="flex items-center gap-1 text-xs text-mist">
                          <Download size={13} /> {lesson.downloads.length}
                        </span>
                      )}
                      <a
                        href={lesson.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-9 w-9 items-center justify-center rounded-full bg-teal text-void transition-transform hover:scale-105"
                      >
                        <Play size={14} fill="currentColor" strokeWidth={0} />
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </main>
    </>
  );
}
