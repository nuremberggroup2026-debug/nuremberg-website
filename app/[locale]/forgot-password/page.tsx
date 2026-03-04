"use client";

import React, { useState } from "react";
import Link from "next/link";
import { forgotPasswordAction } from "./(actions)/forgotPasswordAction";
import { KeyRound, Mail, ArrowLeft, Send, CheckCircle2 } from "lucide-react";

function Page() {
  const [form, setForm] = useState<{ email: string }>({
    email: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    if (!form.email.includes("@")) {
      setMessage("Please enter a valid system email.");
      setLoading(false);
      return;
    }
    try {
      const result = await forgotPasswordAction(form.email);
      if (result.status === 201 || result.status === 409) {
        setSuccess(true);
      } else {
        setMessage(result.message);
      }
    } catch (error) {
      setMessage("An error occurred while sending the link.");
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
              {success ? (
                <CheckCircle2 className="text-emerald-500" size={28} />
              ) : (
                <KeyRound className="text-cyan-500" size={28} />
              )}
            </div>
            
            <h1 className="text-3xl font-black text-white tracking-tight uppercase leading-none">
              {success ? "Link Sent" : "Recover"}
            </h1>
            <p className="text-gray-500 text-[10px] font-mono mt-2 tracking-[0.2em] uppercase opacity-70">
              {success ? "Dispatch_Successful" : "Access_Restoration_Protocol"}
            </p>
          </div>

          {!success ? (
            <form onSubmit={onSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">
                   Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="name@alpha-sys.com"
                    className="w-full p-3.5 pl-10 rounded-lg border border-white/10 bg-white/3 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" size={16} />
                </div>
              </div>

              {message && (
                <div className="text-[11px] font-mono text-red-400 bg-red-500/5 border border-red-500/20 p-3 rounded-lg text-center uppercase tracking-tighter">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-cyan-500 hover:bg-cyan-400 text-black font-[1000] text-sm uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={16} />
                    <span>Send Reset Link</span>
                  </>
                )}
              </button>
            </form>
          ) : (
     
            <div className="space-y-6">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <p className="text-sm text-gray-400 leading-relaxed font-mono">
                  If an account matches <span className="text-white underline">{form.email}</span>, an encrypted recovery link has been dispatched to your terminal.
                </p>
              </div>
              <button 
                onClick={() => setSuccess(false)}
                className="w-full py-3 text-[11px] font-bold text-gray-500 hover:text-white uppercase tracking-widest transition-colors"
              >
                Try different email
              </button>
            </div>
          )}

          
          <div className="text-center mt-8 pt-6 border-t border-white/5">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 text-[11px] font-bold text-gray-500 hover:text-cyan-500 uppercase tracking-widest transition-all"
            >
              <ArrowLeft size={14} />
              Return to Login
            </Link>
          </div>
        </div>

       
        <div className="mt-6 flex justify-between items-center px-4 opacity-30">
           <span className="text-[8px] font-mono text-gray-600 tracking-[0.4em]">AUTH_RECOVERY_MOD</span>
           <span className="text-[8px] font-mono text-gray-600 tracking-tighter uppercase font-bold italic">Alpha Systems</span>
        </div>
      </div>
    </main>
  );
}

export default Page;