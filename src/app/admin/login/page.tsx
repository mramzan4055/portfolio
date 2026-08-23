"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, ArrowRight, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (data.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(data.error || "Authentication failed");
      }
    } catch {
      setError("Network or server error during authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-[#070709]">
      <div className="glass-panel-elevated p-8 sm:p-12 rounded-3xl max-w-md w-full flex flex-col gap-8 border border-white/10 shadow-2xl">
        <div className="flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#dfb15b] to-[#a27429] flex items-center justify-center text-black shadow-gold mb-2">
            <Shield className="w-7 h-7" />
          </div>
          <h1 className="text-2xl font-display font-bold text-white tracking-tight">
            CMS Admin Authentication
          </h1>
          <p className="text-xs text-platinum-400 font-mono">
            Enter administrative passphrase to access the portfolio content management system.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-mono uppercase text-platinum-400 flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#dfb15b]" />
              <span>Admin Passphrase</span>
            </label>
            <input
              type="password"
              required
              placeholder="••••••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/[0.04] border border-white/[0.1] text-sm text-white placeholder-platinum-600 focus:outline-none focus:border-[#dfb15b] transition-colors font-mono"
            />
          </div>

          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/30 text-red-300 text-xs font-mono">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-full bg-gradient-to-r from-[#dfb15b] to-[#c7963b] text-black font-bold text-xs uppercase tracking-widest hover:shadow-gold hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Access CMS Console</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        <div className="pt-4 border-t border-white/[0.06] text-center">
          <p className="text-[11px] text-platinum-500 font-mono">
            Access is controlled by the <code className="text-white">ADMIN_SECRET_KEY</code> environment variable.
          </p>
        </div>
      </div>
    </div>
  );
}
