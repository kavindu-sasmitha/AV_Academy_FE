"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Sparkles } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Instructor", href: "#instructor" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 sm:px-8 transition-all duration-300">
      <nav
        className={`w-full max-w-7xl rounded-full border border-white/15 transition-all duration-500 ${
          scrolled
            ? "bg-void/60 backdrop-blur-xl shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-teal/30 py-3 px-6"
            : "bg-surface/30 backdrop-blur-md shadow-lg py-4 px-8 border-line/60"
        }`}
      >
        <div className="flex items-center justify-between">
          
          {/* Logo with Liquid Glow */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full border border-teal/40 bg-teal/20 p-1.5 backdrop-blur-md shadow-[0_0_15px_rgba(47,230,201,0.3)] transition-all duration-300 group-hover:scale-110 group-hover:border-teal/60 group-hover:shadow-[0_0_25px_rgba(47,230,201,0.6)]">
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/20 via-transparent to-transparent opacity-80" />
              
              <Image
                src="/logo.png"
                alt="AV Academy Logo"
                width={28}
                height={28}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight text-chalk transition-colors group-hover:text-teal">
              AV <span className="text-teal">Academy </span>
            </span>
          </Link>

          {/* Nav Links with Glass Hover Pills */}
          <ul className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 backdrop-blur-lg md:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block rounded-full px-5 py-2 text-xs font-medium text-mist transition-all duration-300 hover:bg-white/10 hover:text-chalk hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden rounded-full border border-line/80 bg-surface/40 px-5 py-2 text-xs font-medium text-mist backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-surface2 hover:text-chalk sm:block"
            >
              Sign in
            </Link>
            
            <Link
              href="/register"
              className="group flex items-center gap-1.5 rounded-full border border-teal/40 bg-teal/20 px-5 py-2 text-xs font-semibold text-teal backdrop-blur-md shadow-[0_0_20px_rgba(47,230,201,0.25)] transition-all duration-300 hover:bg-teal hover:text-void hover:shadow-[0_0_30px_rgba(47,230,201,0.6)] hover:scale-105"
            >
              <Sparkles size={13} className="transition-transform group-hover:rotate-12" />
              Enroll now
            </Link>
          </div>

        </div>
      </nav>
    </header>
  );
}
