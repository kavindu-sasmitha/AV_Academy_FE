"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";

const SLIDES = [
  {
    src: "/image.png",
    alt: "Editing suite with dual color-grading monitors",
    title: "Pro Color Suite",
    desc: "Master industry-standard color grading workflows",
  },
  {
    src: "/image1.png",
    alt: "Editor working on a video timeline",
    title: "Timeline Precision",
    desc: "Learn cutting rhythm and narrative pacing",
  },
  {
    src: "/image2.png",
    alt: "Camera and production gear",
    title: "Cinematic Cinema Gear",
    desc: "Hands-on experience with production gear",
  },
  {
    src: "/image4.png",
    alt: "Student working through a course lesson",
    title: "Interactive Studio",
    desc: "Direct guidance from working industry editors",
  },
];

const SLIDE_DURATION = 4500;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % SLIDES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden border-b border-white/10 bg-void pt-28 text-chalk flex items-center justify-center">
      
      {/* ==================== FULL COVER BACKGROUND SLIDESHOW ==================== */}
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        {SLIDES.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 h-full w-full transition-all duration-1000 ease-in-out ${
              i === active
                ? "opacity-80 scale-100 filter-none"
                : "opacity-0 scale-105 blur-sm"
            }`}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i === 0}
              className="object-cover object-center"
            />
          </div>
        ))}

        {/* Minimal Subtle Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-void/90 via-void/40 to-transparent" />

        {/* Soft Ambient Glows */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-[500px] w-[500px] rounded-full bg-teal/15 blur-[140px]" />
      </div>

      {/* ==================== MAIN CONTENT ==================== */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 lg:px-10 lg:pb-28 w-full flex flex-col justify-between min-h-[70vh]">
        
        {/* Hero Text Area with Glass Card Overlay for readability */}
        <div className="max-w-2xl animate-fade-in pt-6">
          
          {/* Glass Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/40 bg-void/50 px-4 py-1.5 font-mono text-xs font-semibold tracking-widest text-teal backdrop-blur-xl shadow-[0_0_20px_rgba(47,230,201,0.2)]">
            <Sparkles size={13} className="animate-pulse" />
            00:00:00:01 — AV ACADEMY
          </span>

          <h1 className="mt-6 font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl text-chalk drop-shadow-md">
            Learn to cut, grade
            <br />
            and finish videos that
            <br />
            <span className="text-teal drop-shadow-[0_0_35px_rgba(47,230,201,0.8)]">
              actually get watched.
            </span>
          </h1>

          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-chalk/90 drop-shadow">
            Project-based video editing courses covering cutting rhythm, color
            grading, motion graphics and sound — taught by working editors,
            with lifetime access to every lesson you unlock.
          </p>

          {/* Liquid Glass CTA Buttons */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#packages"
              className="group flex items-center gap-2 rounded-full border border-teal/50 bg-teal/20 px-7 py-3.5 text-sm font-semibold text-teal backdrop-blur-xl shadow-[0_0_25px_rgba(47,230,201,0.3)] transition-all duration-300 hover:bg-teal hover:text-void hover:shadow-[0_0_40px_rgba(47,230,201,0.8)] hover:scale-105"
            >
              View course packages
              <ArrowRight
                size={16}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#instructor"
              className="rounded-full border border-white/20 bg-void/40 px-6 py-3.5 text-sm font-medium text-chalk backdrop-blur-xl transition-all duration-300 hover:bg-white/10 hover:border-white/40"
            >
              Meet the instructor
            </a>
          </div>
        </div>

        {/* Bottom Floating Crystal Glass Bar */}
        <div className="mt-16 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 rounded-2xl border border-white/20 bg-void/40 px-6 py-4 backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.4)]">
          <div>
            <p className="font-display text-base font-semibold text-chalk">
              {SLIDES[active].title}
            </p>
            <p className="text-xs text-mist font-mono mt-0.5">
              {SLIDES[active].desc}
            </p>
          </div>

          {/* Slide Progress Controls */}
          <div className="flex items-center gap-2.5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-10 bg-teal shadow-[0_0_15px_rgba(47,230,201,0.9)]"
                    : "w-3 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
