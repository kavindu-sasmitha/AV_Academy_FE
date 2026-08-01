"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  Clapperboard,
  LayoutDashboard,
  Users,
  BookOpen,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/students", label: "Students", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
    } else if (user.role !== "admin") {
      // A student trying to reach /admin gets sent back to their own dashboard
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-void text-mist">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-void text-chalk">
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line/60 bg-surface/40 px-4 py-6 sm:flex">
        <Link href="/" className="mb-8 flex items-center gap-2 px-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-md bg-teal/10 text-teal">
            <Clapperboard size={16} />
          </span>
          <span className="font-display text-base font-semibold">AV Academy</span>
        </Link>

        <span className="mb-2 flex items-center gap-1.5 px-2 text-[11px] font-semibold uppercase tracking-wider text-mist">
          <ShieldCheck size={12} className="text-teal" />
          Admin
        </span>

        <nav className="flex flex-col gap-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-teal/10 text-teal"
                    : "text-mist hover:bg-surface2 hover:text-chalk"
                }`}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>

        <button
          onClick={logout}
          className="mt-auto flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-mist transition-colors hover:bg-surface2 hover:text-chalk"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </aside>

      <main className="flex-1 px-6 py-8 sm:px-10">{children}</main>
    </div>
  );
}
