"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPasswordAction } from "./(actions)/resetPasswordAction";
import { ShieldAlert, RefreshCcw, Lock, ArrowLeft, CheckCircle } from "lucide-react";

type ResetPasswordForm = {
  password: string;
  confirmPassword: string;
};

function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");
  const [form, setForm] = useState<ResetPasswordForm>({
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setMessage("");
    if (form.password !== form.confirmPassword) {
      setError("SECURITY_MISMATCH: Passwords do not match.");
      return;
    }
    if (!token) {
      setError("INVALID_TOKEN: Access denied.");
      return;
    }
    setLoading(true);
    try {
      const result = await resetPasswordAction(token, form.password);
      if (result.status === 201) {
        setMessage("SUCCESS: Password updated. Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("SYSTEM_FAILURE: Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative">
    
      <div className="absolute w-125 h-125 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-125 relative">
        <div className="bg-black border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
          
      
          <div className="mb-8 text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/10 rounded-xl mb-6">
              {message ? (
                <CheckCircle className="text-emerald-500 animate-pulse" size={28} />
              ) : (
                <RefreshCcw className="text-cyan-500" size={28} />
              )}
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase leading-none">
              Reset
            </h1>
            <p className="text-gray-500 text-[10px] font-mono mt-2 tracking-[0.2em] uppercase opacity-70">
              Update_Security_Credentials
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            {/* New Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full p-3.5 pl-10 rounded-lg border border-white/10 bg-white/3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-cyan-500 transition-colors"
                >
                  {showPassword ? <EyeIcon className="h-5 w-5" /> : <EyeSlashIcon className="h-5 w-5" /> }
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled={loading}
                  className="w-full p-3.5 pl-10 rounded-lg border border-white/10 bg-white/3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              </div>
            </div>

            {/* Error / Success Feedback */}
            {error && (
              <div className="flex items-center gap-2 text-[11px] font-mono text-red-400 bg-red-500/5 border border-red-500/20 p-3 rounded-lg uppercase tracking-tighter">
                <ShieldAlert size={14} />
                {error}
              </div>
            )}

            {message && (
              <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg text-center uppercase tracking-tighter animate-pulse">
                {message}
              </div>
            )}

            {/* Submit Button */}
            {!message && (
              <button
                disabled={loading}
                type="submit"
                className="group w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-black font-[1000] text-sm uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                    <span>Update Security Code</span>
                  </>
                )}
              </button>
            )}

            {/* Back Link */}
            <div className="text-center mt-6 pt-6 border-t border-white/5">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-cyan-500 uppercase tracking-widest transition-all"
              >
                <ArrowLeft size={14} />
                Return To Login
              </Link>
            </div>
          </form>
        </div>

        {/* Footer HUD info */}
        <div className="mt-6 flex justify-between items-center px-4 opacity-30">
           <span className="text-[8px] font-mono text-gray-600 tracking-[0.4em]">ALPHA_SECURE_OVERRIDE</span>
           <span className="text-[8px] font-mono text-gray-600 tracking-tighter italic uppercase">System_v4.0.1</span>
        </div>
      </div>
    </main>
  );
}

export default ResetPasswordPage;