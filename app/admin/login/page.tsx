"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) {
    if (error.name === "AbortError") {
      return "Supabase took too long to respond. Check your Vercel environment variables and Supabase project status.";
    }

    return error.message;
  }

  return "Something went wrong while signing in. Please try again.";
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError("Invalid credentials. Please try again.");
        setLoading(false);
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (err) {
      setError(getErrorMessage(err));
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1a1210] px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-black uppercase tracking-tighter text-[#f03a2b] leading-none">
            La Casa<br />Mascota
          </h1>
          <p className="mt-3 text-sm uppercase tracking-[0.2em] text-white/40">
            Admin Portal
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white/5 border border-white/10 rounded-2xl p-8 space-y-5"
        >
          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#f03a2b] transition-colors"
              placeholder="admin@lacasamascota.com"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-[0.15em] text-white/50 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 outline-none focus:border-[#f03a2b] transition-colors"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <div className="bg-[#f03a2b]/10 border border-[#f03a2b]/30 rounded-xl px-4 py-3 text-sm text-[#f03a2b]">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#f03a2b] text-white font-bold uppercase tracking-[0.15em] rounded-xl py-3.5 transition-all hover:bg-[#c52e1e] disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center mt-6 text-xs text-white/20">
          La Casa Mascota Admin · Restricted Access
        </p>
      </div>
    </div>
  );
}
