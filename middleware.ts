import { NextRequest, NextResponse } from "next/server";

// Coarse-grained protection: just checks a token cookie exists.
// Fine-grained role checks (student vs admin) happen client-side in
// app/dashboard/layout.tsx and app/admin/layout.tsx via useAuth(), since
// the role lives in the JWT payload / DB, not something middleware can
// cheaply verify without hitting the backend on every request.
const PROTECTED_PREFIXES = ["/dashboard", "/admin", "/complete-profile"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const isProtected = PROTECTED_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  if (!isProtected) return NextResponse.next();

  const token = req.cookies.get("token")?.value;
  if (!token) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/complete-profile"],
};
