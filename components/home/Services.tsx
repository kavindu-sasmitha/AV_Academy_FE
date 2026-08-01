"use client";

import { useState } from "react";
import { Scissors, Palette, Sparkles, Volume2, Play } from "lucide-react";

const SERVICES = [
  {
    icon: Scissors,
    title: "Narrative editing",
    desc: "Cutting rhythm, pacing and structure — turning raw footage into a story that holds attention.",
  },
  {
    icon: Palette,
    title: "Color grading",
    desc: "Reading scopes, matching shots and building a consistent look across a full timeline.",
  },
  {
    icon: Sparkles,
    title: "Motion graphics",
    desc: "Titles, lower-thirds and transitions built from scratch, not just template drops.",
  },
  {
    icon: Volume2,
    title: "Sound design",
    desc: "Dialogue cleanup, mixing and scoring so a cut feels finished, not just visually done.",
  },
];

export default function Services() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="services" className="relative overflow-hidden border-b border-line/60 bg-void py-24 text-chalk">
      
      {/* Background Ambient Glows */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-[500px] w-[500px] rounded-full bg-teal/10 blur-[140px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[400px] w-[400px] rounded-full bg-ember/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Timecode Header */}
        <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-widest text-teal backdrop-blur-md shadow-[0_0_15px_rgba(47,230,201,0.15)]">
          <Sparkles size={13} className="animate-pulse" />
          00:00:08:20 — WHAT YOU LEARN
        </span>

        <h2 className="mt-4 max-w-lg font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
          Four disciplines, one finished cut.
        </h2>

        {/* Liquid Glass Video Player Showcase */}
        <div className="mt-12 relative w-full overflow-hidden rounded-3xl border border-white/20 bg-surface/30 p-2 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-void">
            
            {/* Embedded YouTube Video Screen */}
            {isPlaying ? (
              <iframe
                src="https://www.youtube.com/embed/Byp3WE6m8gk?autoplay=1"
                title="How To Fix MEDIA OFFLINE Error In Premiere Pro"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              /* Custom Liquid Glass Thumbnail Overlay */
              <div className="group relative h-full w-full cursor-pointer" onClick={() => setIsPlaying(true)}>
                <img
                  src="https://img.youtube.com/vi/Byp3WE6m8gk/maxresdefault.jpg"
                  alt="Premiere Pro Media Offline Tutorial"
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Glass Gradient Protection */}
                <div className="absolute inset-0 bg-gradient-to-t from-void/90 via-void/30 to-transparent" />

                {/* Glowing Glass Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-teal/40 bg-teal/20 text-teal backdrop-blur-lg shadow-[0_0_50px_rgba(47,230,201,0.6)] transition-all duration-300 group-hover:scale-110 group-hover:bg-teal group-hover:text-void group-hover:shadow-[0_0_70px_rgba(47,230,201,0.9)]">
                    <Play size={32} fill="currentColor" strokeWidth={0} className="ml-1" />
                  </div>
                </div>

                {/* Video Title Glass Label */}
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between rounded-2xl border border-white/15 bg-void/60 px-6 py-4 backdrop-blur-md">
                  <div>
                    <span className="font-mono text-xs text-teal font-semibold uppercase tracking-wider">
                      Free Tutorial Lesson
                    </span>
                    <h3 className="font-display text-base sm:text-lg font-semibold text-chalk mt-0.5">
                      How To Fix MEDIA OFFLINE Error In Premiere Pro
                    </h3>
                  </div>
                  <span className="hidden sm:inline-block rounded-full border border-teal/30 bg-teal/10 px-4 py-2 font-mono text-xs font-semibold text-teal backdrop-blur-md">
                    Watch Now
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Services 4-Column Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative flex flex-col gap-4 rounded-3xl border border-white/15 bg-surface/40 p-7 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-teal/50 hover:bg-surface2/60 hover:shadow-[0_20px_40px_rgba(47,230,201,0.15)]"
            >
              {/* Liquid Reflection Line */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-60" />

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-teal/30 bg-teal/10 text-teal backdrop-blur-md shadow-[0_0_15px_rgba(47,230,201,0.2)] transition-transform duration-300 group-hover:scale-110">
                <Icon size={22} strokeWidth={2} />
              </div>

              <h3 className="font-display text-lg font-semibold text-chalk transition-colors group-hover:text-teal">
                {title}
              </h3>
              
              <p className="text-sm leading-relaxed text-mist font-body">
                {desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
