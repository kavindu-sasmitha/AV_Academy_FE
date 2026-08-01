import { Check, Sparkles, Zap } from "lucide-react";

const PACKAGES = [
  {
    name: "Starter Cut",
    price: "LKR 6,500",
    period: "one-time",
    highlight: false,
    features: [
      "Editing fundamentals & timeline logic",
      "8 core lessons",
      "Cutting rhythm & pacing module",
      "Community access",
    ],
  },
  {
    name: "Pro Editor",
    price: "LKR 14,500",
    period: "one-time",
    highlight: true,
    badge: "Most Enrolled",
    features: [
      "Everything in Starter Cut",
      "Color grading module",
      "Motion graphics & titles",
      "1-on-1 project review",
      "Software download links included",
    ],
  },
  {
    name: "Master Class",
    price: "LKR 24,900",
    period: "one-time",
    highlight: false,
    badge: "Full Access",
    features: [
      "Everything in Pro Editor",
      "Sound design & mixing module",
      "Client workflow & delivery specs",
      "Lifetime access to future lessons",
    ],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="relative overflow-hidden border-b border-line/60 bg-void py-24 text-chalk">
      
      {/* Background Liquid Glass Lighting */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-teal/10 blur-[150px]" />
      <div className="pointer-events-none absolute right-10 top-1/4 h-[350px] w-[350px] rounded-full bg-ember/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
        
        {/* Header Section */}
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-widest text-teal backdrop-blur-md shadow-[0_0_15px_rgba(47,230,201,0.15)]">
            <Sparkles size={13} className="animate-pulse" />
            00:00:19:00 — COURSE PACKAGES
          </span>
          
          <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
            Pick a track, unlock the playlist.
          </h2>
          
          <p className="mx-auto mt-4 max-w-md font-body text-sm text-mist">
            Pay once, get approved, and every lesson in that package unlocks —
            videos and software downloads included.
          </p>
        </div>

        {/* Liquid Glass Package Cards Grid */}
        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`group relative flex flex-col rounded-3xl p-8 backdrop-blur-xl transition-all duration-500 ease-out hover:-translate-y-3 hover:scale-[1.02] ${
                pkg.highlight
                  ? "border-2 border-teal/80 bg-surface2/60 shadow-[0_20px_60px_rgba(47,230,201,0.25)] hover:shadow-[0_30px_80px_rgba(47,230,201,0.4)]"
                  : "border border-white/15 bg-surface/40 hover:border-white/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
              }`}
            >
              {/* Glass Reflection Surface Highlight */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-tr from-white/5 via-transparent to-transparent opacity-80" />

              {/* Badge */}
              {pkg.badge && (
                <div className="mb-4 w-fit">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-xs font-semibold backdrop-blur-md ${
                      pkg.highlight
                        ? "bg-teal text-void shadow-[0_0_15px_rgba(47,230,201,0.6)]"
                        : "border border-white/20 bg-white/10 text-chalk"
                    }`}
                  >
                    <Zap size={12} fill="currentColor" />
                    {pkg.badge}
                  </span>
                </div>
              )}

              {/* Package Title & Price */}
              <h3 className="font-display text-2xl font-semibold text-chalk">{pkg.name}</h3>
              
              <div className="mt-4 flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold tracking-tight text-chalk">
                  {pkg.price}
                </span>
                <span className="font-mono text-xs text-mist">/ {pkg.period}</span>
              </div>

              {/* Features List */}
              <ul className="mt-8 flex flex-1 flex-col gap-3.5 border-t border-line/60 pt-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-mist">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/20 text-teal backdrop-blur-md">
                      <Check size={13} strokeWidth={2.5} />
                    </span>
                    <span className="group-hover:text-chalk transition-colors">{f}</span>
                  </li>
                ))}
              </ul>

              {/* Glass Action Button */}
              <a
                href="/register"
                className={`mt-8 flex items-center justify-center rounded-full py-3.5 text-center text-sm font-semibold transition-all duration-300 ${
                  pkg.highlight
                    ? "bg-teal text-void shadow-[0_0_25px_rgba(47,230,201,0.4)] hover:bg-chalk hover:shadow-[0_0_35px_rgba(255,255,255,0.6)] hover:scale-105"
                    : "border border-white/20 bg-white/5 text-chalk backdrop-blur-md hover:bg-teal/20 hover:border-teal/60 hover:text-teal hover:shadow-[0_0_20px_rgba(47,230,201,0.3)]"
                }`}
              >
                Enroll in this package
              </a>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
