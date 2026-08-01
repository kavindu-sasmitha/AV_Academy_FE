"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { Clapperboard, Mail, Lock } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleAfterLogin = (role: string, needsProfile?: boolean) => {
    if (needsProfile) {
      router.push("/complete-profile");
    } else if (role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = await login(email, password);
      toast.success(`Welcome back, ${user.name}`);
      handleAfterLogin(user.role);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };

  const googleConfigured = !!process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  return (
    <main className="flex min-h-screen items-center justify-center bg-void px-6 py-24 text-chalk">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
            <Clapperboard size={20} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold">Welcome back</h1>
          <p className="mt-1 text-sm text-mist">Sign in to continue your courses</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="text-xs text-mist">Email</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
              <Mail size={15} className="text-mist" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-mist">Password</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
              <Lock size={15} className="text-mist" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-teal py-3 text-sm font-semibold text-void transition-colors hover:bg-chalk disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        {googleConfigured && (
          <>
            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-line" />
              <span className="text-xs text-mist">or</span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <div className="flex justify-center">
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  if (!credentialResponse.credential) {
                    toast.error("Google sign-in failed");
                    return;
                  }
                  try {
                    const { user, needsProfileCompletion } = await loginWithGoogle(
                      credentialResponse.credential
                    );
                    toast.success(`Signed in as ${user.name}`);
                    handleAfterLogin(user.role, needsProfileCompletion);
                  } catch (err: any) {
                    toast.error(err.response?.data?.message || "Google sign-in failed");
                  }
                }}
                onError={() => toast.error("Google sign-in failed")}
                theme="filled_black"
                shape="pill"
                width="320"
              />
            </div>
          </>
        )}

        <p className="mt-8 text-center text-sm text-mist">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-teal hover:underline">
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}
