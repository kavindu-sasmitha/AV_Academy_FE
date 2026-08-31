"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Clapperboard,
  LayoutGrid,
  FileQuestion,
  Video,
  BookOpen,
  LogOut,
  User as UserIcon,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const QUICK_LINKS = [
  { href: "/dashboard", label: "My courses", icon: LayoutGrid },
  { href: "/dashboard/exams", label: "Exam papers", icon: FileQuestion },
  { href: "/dashboard/videos", label: "Video tutorials", icon: Video },
  { href: "/dashboard/study-guide", label: "Study guide", icon: BookOpen },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (user.role === "admin") {
      // Admins manage the platform from /admin, not the student dashboard
      router.replace("/admin");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role === "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void text-mist">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-void text-chalk">
      <header className="border-b border-line/60 bg-surface/40 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal/10 text-teal">
              <Clapperboard size={16} />
            </span>
            <span className="font-display text-base font-semibold">AV Academy</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 text-sm text-mist sm:flex">
              <UserIcon size={14} />
              {user.name}
            </div>
            <button
              onClick={logout}
              className="flex items-center gap-1.5 rounded-full border border-line px-4 py-2 text-xs font-medium text-mist transition-colors hover:border-teal hover:text-teal"
            >
              <LogOut size={13} />
              Sign out
            </button>
          </div>
        </div>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-x-5 gap-y-2 px-6 pb-3">
          {QUICK_LINKS.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                  isActive ? "text-teal" : "text-mist hover:text-teal"
                }`}
              >
                <Icon size={13} />
                {label}
              </Link>
            );
          })}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
