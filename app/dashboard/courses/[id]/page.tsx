"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Play, Download, Lock, Monitor } from "lucide-react";
import api from "@/lib/api";
import type { Lesson } from "@/types";

function getYoutubeEmbedUrl(url: string) {
  // Accepts full watch URLs, youtu.be short links, or raw video IDs
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  const videoId = match ? match[1] : url;
  return `https://www.youtube.com/embed/${videoId}`;
}

export default function CoursePlaylistPage({ params }: { params: { id: string } }) {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [hasAccess, setHasAccess] = useState(false);
  const [active, setActive] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/lessons/course/${params.id}`)
      .then((res) => {
        setLessons(res.data.lessons);
        setHasAccess(res.data.hasAccess);
        const firstUnlocked = res.data.lessons.find((l: Lesson) => !l.locked);
        setActive(firstUnlocked || null);
      })
      .catch(() => toast.error("Failed to load lessons"))
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) return <p className="text-mist">Loading playlist...</p>;

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-line/60 bg-surface py-20 text-center">
        <Lock size={28} className="text-mist" />
        <h2 className="mt-4 font-display text-lg font-semibold">This course is locked</h2>
        <p className="mt-1 max-w-sm text-sm text-mist">
          Enroll from your dashboard and wait for admin to confirm your payment.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
      {/* Player + downloads */}
      <div>
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-line/60 bg-surface">
          {active?.youtubeUrl ? (
            <iframe
              key={active._id}
              src={getYoutubeEmbedUrl(active.youtubeUrl)}
              title={active.title}
              className="h-full w-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center text-mist">
              Select a lesson to play
            </div>
          )}
        </div>

        {active && (
          <div className="mt-5">
            <h1 className="font-display text-xl font-semibold">{active.title}</h1>
            {active.description && (
              <p className="mt-2 text-sm leading-relaxed text-mist">{active.description}</p>
            )}

            {active.downloads && active.downloads.length > 0 && (
              <div className="mt-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-mist">
                  Software downloads
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  {active.downloads.map((d, i) => (
                    <a
                      key={i}
                      href={d.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm transition-colors hover:border-teal hover:text-teal"
                    >
                      <Monitor size={14} />
                      {d.label}
                      <span className="text-xs text-mist">({d.os})</span>
                      <Download size={13} />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Playlist */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-mist">
          Playlist ({lessons.length})
        </p>
        {lessons.map((lesson) => (
          <button
            key={lesson._id}
            onClick={() => !lesson.locked && setActive(lesson)}
            disabled={lesson.locked}
            className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
              active?._id === lesson._id
                ? "border-teal bg-teal/10 text-teal"
                : "border-line/60 bg-surface text-chalk hover:border-line"
            } ${lesson.locked ? "opacity-50" : ""}`}
          >
            {lesson.locked ? <Lock size={14} /> : <Play size={14} />}
            <span className="flex-1">{lesson.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
