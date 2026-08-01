"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CreditCard, Phone, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function CompleteProfilePage() {
  const { completeProfile, user } = useAuth();
  const router = useRouter();
  const [nic, setNic] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await completeProfile(nic, phone);
      toast.success("Profile completed — you can now enroll in courses");
      router.push("/dashboard");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-void px-6 py-24 text-chalk">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-teal/10 text-teal">
            <ShieldCheck size={20} />
          </span>
          <h1 className="mt-4 font-display text-2xl font-semibold">One more step</h1>
          <p className="mt-1 text-sm text-mist">
            {user ? `Hi ${user.name}, ` : ""}we need your NIC before you can enroll in a course.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-4">
          <div>
            <label className="text-xs text-mist">NIC number</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
              <CreditCard size={15} className="text-mist" />
              <input
                required
                value={nic}
                onChange={(e) => setNic(e.target.value)}
                placeholder="200012345678"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-mist">Phone (optional)</label>
            <div className="mt-1.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 focus-within:border-teal">
              <Phone size={15} className="text-mist" />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="077 123 4567"
                className="w-full bg-transparent text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-full bg-teal py-3 text-sm font-semibold text-void transition-colors hover:bg-chalk disabled:opacity-60"
          >
            {submitting ? "Saving..." : "Save and continue"}
          </button>
        </form>
      </div>
    </main>
  );
}
