"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BookOpen, FileQuestion, Video, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const LINKS = [
  { href: "/admin", label: "Pending requests", icon: LayoutDashboard },
  { href: "/admin/students", label: "Search students", icon: Users },
  { href: "/admin/courses", label: "Courses", icon: BookOpen },
  { href: "/admin/exams", label: "Exam papers", icon: FileQuestion },
  { href: "/admin/videos", label: "Video tutorials", icon: Video },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="flex h-screen w-60 shrink-0 flex-col border-r border-line/60 bg-surface p-5">
      <span className="font-display text-lg font-semibold">AV Academy</span>
      <span className="mt-0.5 text-xs text-mist">Admin panel</span>

      <nav className="mt-8 flex flex-col gap-1">
        {LINKS.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                active
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
        className="mt-auto flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-mist transition-colors hover:bg-surface2 hover:text-ember"
      >
        <LogOut size={16} />
        Log out
      </button>
    </aside>
  );
}
