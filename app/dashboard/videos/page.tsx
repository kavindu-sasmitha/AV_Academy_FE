"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Video as VideoIcon } from "lucide-react";
import api from "@/lib/api";
import type { VideoTutorial } from "@/types";

// FE's util re-used: accepts watch/short/embed links and returns an embed URL
function getYoutubeEmbedUrl(url: string) {
  if (!url) return "";
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : url;
}

export default function StudentVideosPage() {
  const [videos, setVideos] = useState<VideoTutorial[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get(`/videos/get-all?page=${page}&limit=6`)
      .then((res) => {
        setVideos(res.data.data || []);
        setTotalPages(res.data.totalPage || 1);
      })
      .catch(() => toast.error("Failed to load videos"))
      .finally(() => setLoading(false));
  }, [page]);

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Video tutorials</h1>
      <p className="mt-1 text-sm text-mist">Watch and learn your driving lessons.</p>

      {loading ? (
        <p className="mt-8 text-sm text-mist">Loading videos...</p>
      ) : videos.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-line/60 py-14 text-center">
          <VideoIcon size={24} className="mx-auto text-mist" />
          <p className="mt-2 text-sm text-mist">No videos uploaded yet.</p>
        </div>
      ) : (
        <>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((vid) => {
              const embedUrl = getYoutubeEmbedUrl(vid.videoUrl);
              return (
                <div
                  key={vid._id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-line/60 bg-surface transition-transform hover:-translate-y-0.5"
                >
                  <div className="relative h-48 shrink-0 bg-void">
                    {embedUrl ? (
                      <iframe
                        src={embedUrl}
                        title={vid.title}
                        className="h-full w-full border-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-xs text-mist">
                        No video URL available
                      </div>
                    )}
                    <div className="absolute left-3 top-3 z-10">
                      <span className="rounded-lg border border-teal/30 bg-void/90 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-teal">
                        {vid.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div>
                      <h3 className="line-clamp-1 font-display text-sm font-semibold">
                        {vid.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-xs text-mist">{vid.description}</p>
                    </div>
                    <a
                      href={vid.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-5 flex items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-xs font-semibold uppercase tracking-wide text-chalk hover:border-teal hover:text-teal"
                    >
                      Open on YouTube ↗
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex items-center justify-center gap-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded-full border border-line px-4 py-2 text-xs font-medium text-mist disabled:opacity-40"
              >
                ← Previous
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
