"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

// TODO: replace with real studio / student-work photos.
const SLIDES = [
  { src: "/image.png", alt: "Editing suite with dual color-grading monitors", title: "Pro Color Suite", desc: "Master industry-standard color grading workflows" },
  { src: "/image1.png", alt: "Editor working on a video timeline", title: "Timeline Precision", desc: "Learn cutting rhythm and narrative pacing" },
  { src: "/image2.png", alt: "Camera and production gear", title: "Cinematic Gear", desc: "Hands-on experience with production gear" },
  { src: "/image4.png", alt: "Student working through a course lesson", title: "Interactive Studio", desc: "Direct guidance from working industry editors" },
];

const SLIDE_DURATION = 4500;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % SLIDES.length), SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="border-b border-line bg-void pt-32 pb-20 lg:pb-28">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.05fr_1fr] lg:px-10">
        {/* Left: copy */}
        <div className="animate-fade-in">
          <span className="timecode inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-teal">
            00:00:00:01 — AV ACADEMY
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-tight text-chalk sm:text-5xl lg:text-6xl">
            Learn to cut, grade
            <br />
            and finish videos that
            <br />
            <span className="text-teal">actually get watched.</span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-mist">
            Project-based video editing courses covering cutting rhythm, color
            grading, motion graphics and sound — taught by working editors,
            with lifetime access to every lesson you unlock.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#packages"
              className="group flex items-center gap-2 rounded-full bg-teal px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-dim hover:shadow-md"
            >
              View course packages
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#instructor"
              className="text-sm font-medium text-mist underline decoration-line underline-offset-4 transition-colors hover:text-chalk"
            >
              Meet the instructor
            </a>
          </div>
        </div>

        {/* Right: rotating image card */}
        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-surface shadow-sm">
            {SLIDES.map((slide, i) => (
              <Image
                key={slide.src}
                src={slide.src}
                alt={slide.alt}
                fill
                priority={i === 0}
                className={`object-cover transition-opacity duration-1000 ease-in-out ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Caption bar */}
          <div className="mt-5 flex items-center justify-between rounded-xl border border-line bg-surface px-5 py-3.5">
            <div>
              <p className="font-display text-sm font-semibold text-chalk">{SLIDES[active].title}</p>
              <p className="mt-0.5 text-xs text-mist">{SLIDES[active].desc}</p>
            </div>
            <div className="flex items-center gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Show slide ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === active ? "w-7 bg-teal" : "w-2.5 bg-line hover:bg-mist"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
