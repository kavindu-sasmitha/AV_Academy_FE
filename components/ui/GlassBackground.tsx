export default function GlassBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-void">
      <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-teal/25 blur-[120px]" />
      <div className="absolute right-[-10%] top-[20%] h-[380px] w-[380px] rounded-full bg-ember/20 blur-[130px]" />
      <div className="absolute bottom-[-15%] left-[20%] h-[460px] w-[460px] rounded-full bg-teal/10 blur-[140px]" />
      {/* faint grid to give the glass something to refract */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
    </div>
  );
}
