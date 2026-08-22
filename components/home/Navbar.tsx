"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Instructor", href: "#instructor" },
  { label: "Packages", href: "#packages" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ${
        scrolled ? "border-line bg-void/95 backdrop-blur-md shadow-sm" : "border-transparent bg-void"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-teal/10">
            <Image src="/logo.png" alt="AV Academy" width={22} height={22} className="object-contain" priority />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-chalk">
            AV <span className="text-teal">Academy</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-sm font-medium text-mist transition-colors hover:text-chalk"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full border border-line px-5 py-2 text-sm font-medium text-chalk transition-colors hover:border-teal hover:text-teal sm:block"
          >
            Sign in
          </Link>
          <Link
            href="/register"
            className="rounded-full bg-teal px-5 py-2 text-sm font-semibold text-white shadow-sm transition-all hover:bg-teal-dim hover:shadow-md"
          >
            Enroll now
          </Link>
        </div>
      </nav>
    </header>
  );
}
