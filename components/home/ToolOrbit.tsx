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

// Icons represent editing functions
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
  const radius = 150; // px, distance of each icon from center

  return (
    <section className="relative overflow-hidden border-b border-line/60 bg-void py-24 text-chalk">
      {/* Ambient Lighting for Glass Effect */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[120px]" />
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-[300px] w-[300px] rounded-full bg-ember/5 blur-[100px]" />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 lg:px-10">
        
        {/* Timecode Badge */}
        <span className="font-mono text-xs uppercase tracking-widest text-teal bg-teal/10 border border-teal/20 px-3 py-1 rounded-full backdrop-blur-md">
          00:00:04:12 — THE TOOLKIT
        </span>

        {/* Heading */}
        <h2 className="mt-4 max-w-xl text-center font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
          Every skill orbits around one craft.
        </h2>
        
        {/* Description */}
        <p className="mt-4 max-w-md text-center font-body text-sm text-mist">
          Cutting, grading, sound and motion aren&apos;t separate subjects here
          — every lesson circles back to how they work together.
        </p>

        {/* Orbit Canvas */}
        <div className="relative mt-16 flex h-[380px] w-[380px] items-center justify-center sm:h-[420px] sm:w-[420px]">
          
          {/* Glass Outer Ring */}
          <div className="absolute inset-0 rounded-full border border-line/80 bg-surface/30 backdrop-blur-md shadow-[inset_0_0_30px_rgba(255,255,255,0.02)]" />
          
          {/* Inner Guide Ring */}
          <div className="absolute inset-8 rounded-full border border-dashed border-line/60" />

          {/* Liquid Center Hub */}
          <div className="relative z-20 flex h-20 w-20 items-center justify-center rounded-full border border-teal/40 bg-teal/20 text-teal backdrop-blur-lg shadow-[0_0_50px_-5px_rgba(47,230,201,0.5)] transition-transform duration-300 hover:scale-110 cursor-pointer">
            <Play size={26} fill="currentColor" strokeWidth={0} className="ml-1 drop-shadow-[0_0_12px_rgba(47,230,201,0.8)]" />
          </div>

          {/* Rotating Orbit Container */}
          <div className="absolute inset-0 animate-orbit">
            {TOOLS.map(({ icon: Icon, label }, i) => {
              const angle = (360 / TOOLS.length) * i;
              return (
                <div
                  key={label}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    transform: `rotate(${angle}deg) translate(${radius}px) rotate(-${angle}deg)`,
                  }}
                >
                  <div className="animate-orbit-reverse">
                    <div className="group -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2 cursor-pointer">
                      
                      {/* Glass Tool Card */}
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-line/80 bg-surface/50 backdrop-blur-md text-mist transition-all duration-300 group-hover:bg-surface2/80 group-hover:border-teal group-hover:text-teal group-hover:shadow-[0_0_20px_rgba(47,230,201,0.35)] group-hover:-translate-y-1">
                        <Icon size={20} strokeWidth={1.8} />
                      </div>

                      {/* Tool Label */}
                      <span className="text-[11px] font-mono text-mist transition-colors duration-300 group-hover:text-chalk">
                        {label}
                      </span>

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
