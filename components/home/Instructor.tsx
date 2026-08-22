import Image from "next/image";
import { BadgeCheck, Youtube, Instagram, Linkedin } from "lucide-react";

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
    <section id="instructor" className="border-b border-line bg-surface py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-[0.85fr_1fr] lg:px-10">
        {/* Photo */}
        <div className="relative mx-auto w-full max-w-md">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-line bg-void shadow-sm">
            <Image
              src={INSTRUCTOR.photo}
              alt={INSTRUCTOR.name}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="absolute -bottom-5 left-6 flex items-center gap-2 rounded-full border border-line bg-void px-4 py-2 text-xs font-medium text-chalk shadow-sm">
            <BadgeCheck size={15} className="text-teal" />
            Verified Working Editor
          </div>
        </div>

        {/* Copy */}
        <div className="mt-6 lg:mt-0">
          <span className="timecode inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-teal">
            00:00:13:05 — YOUR INSTRUCTOR
          </span>

          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
            {INSTRUCTOR.name}
          </h2>
          <p className="mt-1.5 text-sm font-semibold text-teal">{INSTRUCTOR.role}</p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-mist">{INSTRUCTOR.bio}</p>

          <div className="mt-9 flex flex-wrap gap-4 sm:gap-6">
            {INSTRUCTOR.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-line bg-void px-5 py-3.5 shadow-sm">
                <div className="font-display text-2xl font-bold text-chalk">{stat.value}</div>
                <div className="mt-0.5 text-xs text-mist">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-9 flex items-center gap-3">
            {[Youtube, Instagram, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-void text-mist shadow-sm transition-colors hover:border-teal hover:text-teal"
              >
                <Icon size={17} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
