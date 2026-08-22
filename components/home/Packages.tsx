import { Check, Zap } from "lucide-react";

const PACKAGES = [
  {
    name: "Starter Cut",
    price: "LKR 6,500",
    period: "one-time",
    highlight: false,
    features: ["Editing fundamentals & timeline logic", "8 core lessons", "Cutting rhythm & pacing module", "Community access"],
  },
  {
    name: "Pro Editor",
    price: "LKR 14,500",
    period: "one-time",
    highlight: true,
    badge: "Most Enrolled",
    features: ["Everything in Starter Cut", "Color grading module", "Motion graphics & titles", "1-on-1 project review", "Software download links included"],
  },
  {
    name: "Master Class",
    price: "LKR 24,900",
    period: "one-time",
    highlight: false,
    badge: "Full Access",
    features: ["Everything in Pro Editor", "Sound design & mixing module", "Client workflow & delivery specs", "Lifetime access to future lessons"],
  },
];

export default function Packages() {
  return (
    <section id="packages" className="border-b border-line bg-void py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="text-center">
          <span className="timecode inline-flex items-center rounded-full bg-teal/10 px-3 py-1 text-teal">
            00:00:19:00 — COURSE PACKAGES
          </span>
          <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-chalk sm:text-4xl">
            Pick a track, unlock the playlist.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm text-mist">
            Pay once, get approved, and every lesson in that package unlocks —
            videos and software downloads included.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.name}
              className={`flex flex-col rounded-2xl p-8 transition-all hover:-translate-y-1 ${
                pkg.highlight
                  ? "border-2 border-teal bg-void shadow-lg"
                  : "border border-line bg-void shadow-sm hover:shadow-md"
              }`}
            >
              {pkg.badge && (
                <span
                  className={`mb-4 inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
                    pkg.highlight ? "bg-teal text-white" : "bg-surface text-mist"
                  }`}
                >
                  <Zap size={12} fill="currentColor" />
                  {pkg.badge}
                </span>
              )}

              <h3 className="font-display text-xl font-semibold text-chalk">{pkg.name}</h3>
              <div className="mt-3 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-bold text-chalk">{pkg.price}</span>
                <span className="text-xs text-mist">/ {pkg.period}</span>
              </div>

              <ul className="mt-7 flex flex-1 flex-col gap-3 border-t border-line pt-6">
                {pkg.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-mist">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                      <Check size={12} strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="/register"
                className={`mt-8 rounded-full py-3 text-center text-sm font-semibold transition-all ${
                  pkg.highlight
                    ? "bg-teal text-white shadow-sm hover:bg-teal-dim hover:shadow-md"
                    : "border border-line text-chalk hover:border-teal hover:text-teal"
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
