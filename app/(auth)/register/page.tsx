"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { GoogleLogin } from "@react-oauth/google";
import toast from "react-hot-toast";
import { Clapperboard, Mail, Lock, User, CreditCard, Phone } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function RegisterPage() {
  const { register, loginWithGoogle } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", nic: "", phone: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const update = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const user = await register(form);
      toast.success(`Welcome, ${user.name}! Browse courses to get started.`);
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Registration failed");
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
          <h1 className="mt-4 font-display text-2xl font-semibold">Create your account</h1>
          <p className="mt-1 text-sm text-mist">Start with a free account, enroll when ready</p>
        </div>

        {googleConfigured && (
          <>
            <div className="mt-8 flex justify-center">
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
                    toast.success(`Welcome, ${user.name}`);
                    router.push(needsProfileCompletion ? "/complete-profile" : "/dashboard");
                  } catch (err: any) {
                    toast.error(err.response?.data?.message || "Google sign-in failed");
                  }
                }}
                onError={() => toast.error("Google sign-in failed")}
                theme="filled_black"
                shape="pill"
                width="320"
                text="signup_with"
              />
            </div>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-line" />
              <span className="text-xs text-mist">or use email</span>
              <div className="h-px flex-1 bg-line" />
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="text-xs text-mist">Full name</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
              <User size={15} className="text-mist" />
              <input
                required
                value={form.name}
                onChange={update("name")}
                placeholder="Your full name"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-mist">Email</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
              <Mail size={15} className="text-mist" />
              <input
                type="email"
                required
                value={form.email}
                onChange={update("email")}
                placeholder="you@example.com"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-mist">NIC number</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
              <CreditCard size={15} className="text-mist" />
              <input
                required
                value={form.nic}
                onChange={update("nic")}
                placeholder="200012345678"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
            <p className="mt-1 text-[11px] text-mist">
              Used by admin to verify your identity and course payments.
            </p>
          </div>

          <div>
            <label className="text-xs text-mist">Phone (optional)</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
              <Phone size={15} className="text-mist" />
              <input
                value={form.phone}
                onChange={update("phone")}
                placeholder="077 123 4567"
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
                minLength={6}
                value={form.password}
                onChange={update("password")}
                placeholder="At least 6 characters"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-teal py-3 text-sm font-semibold text-void transition-colors hover:bg-chalk disabled:opacity-60"
          >
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-mist">
          Already have an account?{" "}
          <Link href="/login" className="text-teal hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}
