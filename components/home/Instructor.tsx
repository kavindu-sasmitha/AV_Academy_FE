import Image from "next/image";
import { BadgeCheck, Youtube, Instagram, Linkedin, Sparkles } from "lucide-react";

const INSTRUCTOR = {
  name: "Asanka C Haththasinghe",
  role: "Lead Instructor — Video Editing & Motion",
  photo: "/instructor.png",
  bio: "8+ years cutting for independent films, YouTube channels and client brand work. Teaches the same workflow used on paid projects — no shortcuts, no filler.",
  stats: [
    { value: "500+", label: "Students taught" },
    { value: "16+", label: "Years editing" },
    { value: "100+", label: "Client projects" },
  ],
};

export default function Instructor() {
  return (
    <section id="instructor" className="relative overflow-hidden border-b border-line/60 bg-void py-24 text-chalk">
      
      {/* Background Liquid Glass Lighting */}
      <div className="pointer-events-none absolute left-10 top-1/2 h-[450px] w-[450px] -translate-y-1/2 rounded-full bg-teal/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-10 bottom-10 h-[350px] w-[350px] rounded-full bg-ember/10 blur-[130px]" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.85fr_1fr] lg:px-10">
        
        {/* Left: Glass Frame Photo Container */}
        <div className="relative mx-auto w-full max-w-md group [perspective:1000px]">
          
          {/* Glass Card Outer Frame */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/20 bg-surface/30 p-2 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.6)] transition-all duration-500 ease-out group-hover:scale-[1.02] group-hover:-translate-y-2 group-hover:border-teal/50 group-hover:shadow-[0_30px_70px_rgba(47,230,201,0.25)]">
            
            {/* Glass Surface Light Reflection */}
            <div className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-tr from-white/10 via-transparent to-transparent opacity-80" />

            {/* Photo Container */}
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-surface2">
              <Image
                src={INSTRUCTOR.photo}
                alt={INSTRUCTOR.name}
                fill
                className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Inner Gradient Overlay */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-void/80 via-transparent to-transparent" />
            </div>
          </div>

          {/* Floating Liquid Glass Badge */}
          <div className="absolute -bottom-5 left-1/2 z-30 -translate-x-1/2 sm:left-6 sm:translate-x-0 flex items-center gap-2 rounded-full border border-teal/40 bg-void/80 px-5 py-2.5 text-xs font-semibold text-chalk backdrop-blur-xl shadow-[0_10px_25px_rgba(47,230,201,0.25)]">
            <BadgeCheck size={16} className="text-teal animate-pulse" />
            <span>Verified Working Editor</span>
          </div>
        </div>

        {/* Right: Copy & Details */}
        <div className="mt-6 lg:mt-0">
          
          {/* Timecode Badge */}
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-widest text-teal backdrop-blur-md shadow-[0_0_15px_rgba(47,230,201,0.15)]">
            <Sparkles size={13} className="animate-pulse" />
            00:00:13:05 — YOUR INSTRUCTOR
          </span>

          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
            {INSTRUCTOR.name}
          </h2>
          
          <p className="mt-1.5 text-sm font-semibold tracking-wide text-teal">
            {INSTRUCTOR.role}
          </p>

          <p className="mt-6 max-w-lg font-body text-base leading-relaxed text-mist">
            {INSTRUCTOR.bio}
          </p>

          {/* Liquid Glass Stats Cards */}
          <div className="mt-9 flex flex-wrap gap-4 sm:gap-6">
            {INSTRUCTOR.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col rounded-2xl border border-white/10 bg-surface/40 px-5 py-3.5 backdrop-blur-md transition-all duration-300 hover:border-teal/40 hover:bg-surface2/60"
              >
                <div className="font-display text-2xl font-bold text-chalk">
                  {stat.value}
                </div>
                <div className="mt-0.5 font-mono text-xs text-mist">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-10 flex items-center gap-3">
            {[Youtube, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-mist backdrop-blur-md transition-all duration-300 hover:border-teal/60 hover:bg-teal/10 hover:text-teal hover:shadow-[0_0_20px_rgba(47,230,201,0.3)] hover:scale-110"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
