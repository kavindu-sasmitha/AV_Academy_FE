import {
  Scissors,
  SlidersHorizontal,
  Wand2,
  Music2,
  Type as TypeIcon,
  Layers,
  Palette,
  Play,
} from "lucide-react";

const TOOLS = [
  { icon: Scissors, label: "Cut" },
  { icon: Palette, label: "Grade" },
  { icon: Wand2, label: "Effects" },
  { icon: Music2, label: "Sound" },
  { icon: TypeIcon, label: "Titles" },
  { icon: Layers, label: "Layers" },
  { icon: SlidersHorizontal, label: "Mix" },
];

export default function ToolOrbit() {
  const radius = 150;

  return (
    <section className="border-b border-line bg-surface py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-10">
        <span className="timecode inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-teal">
          00:00:04:12 — THE TOOLKIT
        </span>
        <h2 className="mt-4 max-w-xl text-center font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
          Every skill orbits around one craft.
        </h2>
        <p className="mt-4 max-w-md text-center text-sm text-mist">
          Cutting, grading, sound and motion aren&apos;t separate subjects here
          — every lesson circles back to how they work together.
        </p>

        <div className="relative mt-16 flex h-[380px] w-[380px] items-center justify-center sm:h-[420px] sm:w-[420px]">
          <div className="absolute inset-0 rounded-full border border-line bg-void shadow-sm" />
          <div className="absolute inset-8 rounded-full border border-dashed border-line" />

          <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-teal text-white shadow-md">
            <Play size={26} fill="currentColor" strokeWidth={0} className="ml-1" />
          </div>

          <div className="absolute inset-0 animate-orbit">
            {TOOLS.map(({ icon: Icon, label }, i) => {
              const angle = (360 / TOOLS.length) * i;
              return (
                <div
                  key={label}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)` }}
                >
                  <div className="animate-orbit-reverse">
                    <div className="group -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1.5">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-void text-mist shadow-sm transition-colors group-hover:border-teal group-hover:text-teal">
                        <Icon size={18} strokeWidth={2} />
                      </div>
                      <span className="text-[11px] text-mist">{label}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
