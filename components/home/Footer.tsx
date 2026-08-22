import { Clapperboard } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-void py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 sm:flex-row lg:px-10">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-teal/10 text-teal">
            <Clapperboard size={14} />
          </span>
          <span className="font-display text-sm font-semibold text-chalk">AV Academy</span>
        </div>
        <p className="timecode text-mist">© {new Date().getFullYear()} AV ACADEMY — ALL RIGHTS RESERVED</p>
      </div>
    </footer>
  );
}
