"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/api";
import type { User } from "@/types";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  loginWithGoogle: (idToken: string) => Promise<{ user: User; needsProfileCompletion: boolean }>;
  register: (data: {
    name: string;
    email: string;
    nic: string;
    phone?: string;
    password: string;
  }) => Promise<User>;
  completeProfile: (nic: string, phone?: string) => Promise<User>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const refreshUser = async () => {
    const token = Cookies.get("token");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch {
      Cookies.remove("token");
      setUser(null);
    }
  };

  useEffect(() => {
    refreshUser().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const res = await api.post("/auth/login", { email, password });
    Cookies.set("token", res.data.token, { expires: 7 });
    setUser(res.data.user);
    return res.data.user as User;
  };

  const loginWithGoogle = async (idToken: string) => {
    const res = await api.post("/auth/google", { idToken });
    Cookies.set("token", res.data.token, { expires: 7 });
    setUser(res.data.user);
    return {
      user: res.data.user as User,
      needsProfileCompletion: !!res.data.needsProfileCompletion,
    };
  };

  const register = async (data: {
    name: string;
    email: string;
    nic: string;
    phone?: string;
    password: string;
  }) => {
    const res = await api.post("/auth/register", data);
    Cookies.set("token", res.data.token, { expires: 7 });
    setUser(res.data.user);
    return res.data.user as User;
  };

  const completeProfile = async (nic: string, phone?: string) => {
    const res = await api.patch("/auth/complete-profile", { nic, phone });
    setUser(res.data.user);
    return res.data.user as User;
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, loginWithGoogle, register, completeProfile, logout, refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
