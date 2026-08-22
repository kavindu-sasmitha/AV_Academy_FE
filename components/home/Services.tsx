"use client";

import { useState } from "react";
import { Scissors, Palette, Sparkles, Volume2, Play } from "lucide-react";

const SERVICES = [
  { icon: Scissors, title: "Narrative editing", desc: "Cutting rhythm, pacing and structure — turning raw footage into a story that holds attention." },
  { icon: Palette, title: "Color grading", desc: "Reading scopes, matching shots and building a consistent look across a full timeline." },
  { icon: Sparkles, title: "Motion graphics", desc: "Titles, lower-thirds and transitions built from scratch, not just template drops." },
  { icon: Volume2, title: "Sound design", desc: "Dialogue cleanup, mixing and scoring so a cut feels finished, not just visually done." },
];

export default function Services() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="services" className="border-b border-line bg-void py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <span className="timecode inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-teal">
          00:00:08:20 — WHAT YOU LEARN
        </span>
        <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
          Four disciplines, one finished cut.
        </h2>

        {/* Video showcase */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
          <div className="relative aspect-video w-full overflow-hidden bg-chalk">
            {isPlaying ? (
              <iframe
                src="https://www.youtube.com/embed/Byp3WE6m8gk?autoplay=1"
                title="How To Fix MEDIA OFFLINE Error In Premiere Pro"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="group relative h-full w-full cursor-pointer" onClick={() => setIsPlaying(true)}>
                <img
                  src="https://img.youtube.com/vi/Byp3WE6m8gk/maxresdefault.jpg"
                  alt="Premiere Pro Media Offline Tutorial"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-teal shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play size={30} fill="currentColor" strokeWidth={0} className="ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-xl bg-white/95 px-5 py-3.5 backdrop-blur-sm">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal">Free Tutorial Lesson</span>
                    <h3 className="mt-0.5 font-display text-base font-semibold text-chalk sm:text-lg">
                      How To Fix MEDIA OFFLINE Error In Premiere Pro
                    </h3>
                  </div>
                  <span className="hidden rounded-full bg-teal/10 px-4 py-2 text-xs font-semibold text-teal sm:inline-block">
                    Watch Now
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services grid */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group flex flex-col gap-4 rounded-2xl border border-line bg-void p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-teal/40 hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-teal/10 text-teal">
                <Icon size={20} strokeWidth={2} />
              </div>
              <h3 className="font-display text-lg font-semibold text-chalk">{title}</h3>
              <p className="text-sm leading-relaxed text-mist">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
