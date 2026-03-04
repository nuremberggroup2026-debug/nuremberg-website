"use client";

import React, { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { changePasswordAction } from "./(actions)/changePasswordAction";
import { ShieldCheck, Key, Lock, ArrowLeft, RefreshCcw } from "lucide-react";

type changePassword = {
  oldPassword: string;
  password: string;
  confirmPassword: string;
};

function Page() {
  const router = useRouter();
  const [form, setForm] = useState<changePassword>({
    oldPassword: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const { data: session } = useSession();
  const user_id = session?.user.id;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!user_id) {
      setError("AUTH_ERROR: Current Password Is Incorrect.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("MISMATCH: Passwords Not Matched.");
      return;
    }
    setLoading(true);
    setError("");

    try {
      const result = await changePasswordAction(
        form.oldPassword,
        form.password,
        user_id
      );
      if (result.status !== 201) {
        setError(result.message ?? "FAILED: Update rejected.");
        setLoading(false);
        return;
      }
      setMessage("SUCCESS: Security credentials updated.");
        setMessage("");
        router.push("/");
  
    } catch (err) {
      setError("CRITICAL: Internal security failure.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative">
      <div className="absolute w-125 h-125 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-150 relative">
        <div className="bg-black border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
          

          <div className="mb-10 text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/10 rounded-xl mb-6">
              <ShieldCheck className="text-cyan-500" size={28} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase leading-none">
              Security
            </h1>
            <p className="text-gray-500 text-[10px] font-mono mt-2 tracking-[0.2em] uppercase opacity-70">
              Update_Access_Credentials
            </p>
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="oldPassword"
                  value={form.oldPassword}
                  onChange={handleChange}
                  required
                  className="w-full p-3.5 pl-10 rounded-lg border border-white/10 bg-white/3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              </div>
            </div>
            <div className="py-1 flex items-center gap-4">
              <div className="flex-1 h-px bg-cyan-500" />
              <span className="text-[12px] font-mono text-cyan-500 uppercase italic">New Password</span>
              <div className="flex-1 h-px bg-cyan-500" />
            </div>

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
                  className="w-full p-3.5 pl-10 rounded-lg border border-white/10 bg-white/3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all"
                />
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
              </div>
            </div>

      
            {error && (
              <div className="text-[11px] font-mono text-red-400 bg-red-500/5 border border-red-500/20 p-3 rounded-lg text-center uppercase tracking-tighter animate-shake">
                {error}
              </div>
            )}
            {message && (
              <div className="text-[11px] font-mono text-emerald-400 bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg text-center uppercase tracking-tighter">
                {message}
              </div>
            )}

            <button
              disabled={loading}
              type="submit"
              className="group w-full h-12 mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-[1000] text-sm uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              {loading ? (
                <RefreshCcw className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Execute Change</span>
                  <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                </>
              )}
            </button>

            {/* رابط العودة */}
            <div className="text-center mt-6 pt-6 border-t border-white/5">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-cyan-500 uppercase tracking-widest transition-all"
              >
                <ArrowLeft size={14} />
                Return to Home
              </Link>
            </div>
          </form>
        </div>

     
        <div className="mt-6 flex justify-between items-center px-4 opacity-20">
           <span className="text-[8px] font-mono text-gray-600 tracking-[0.4em]">SECURITY_LINK_ENCRYPTED</span>
           <span className="text-[8px] font-mono text-gray-600 italic">V 4.0.1</span>
        </div>
      </div>
    </main>
  );
}

export default Page;