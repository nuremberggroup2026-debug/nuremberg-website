"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "@/app/server/users/validators";
import { toast } from "sonner";
import PasswordInput from "@/components/inputs/PasswordInput";
import EmailInput from "@/components/inputs/EmailInput";
import { LockKeyhole, ShieldCheck } from "lucide-react";

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });

      if (!result?.ok) {
        toast.error("Access Denied: Please check your credentials.");
      } else {
        toast.success("Identity Verified. Welcome.");
        window.location.href = "/";
      }
    } catch (err) {
      toast.error("System Error: Failed to establish connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
   const result= await signIn("google", { callbackUrl: "/" });
   if(result?.ok) return toast.success("Identity Verified. Welcome.")
    if(!result?.ok) return toast.error("Error In Login")
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
      
      <div className="absolute w-125 h-125 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-150 relative">
     
        <div className="bg-black border border-white/10 rounded-2xl p-10 shadow-2xl">
          
       
          <div className="mb-10 text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/10 rounded-xl mb-6">
              <ShieldCheck className="text-cyan-500" size={28} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">
              Login
            </h1>
            <p className="text-gray-500 text-sm font-mono mt-1 tracking-widest uppercase opacity-70">
              Alpha_Systems_Secure_Gateway
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-5">
             
              <div className="flex flex-col gap-1">
                <EmailInput
                  register={register("email")}
                  label="Email Address"
                  error={errors.email}
                  className="text-gray-900"
                />
              </div>

              <div className="flex flex-col gap-1">
                <PasswordInput
                  register={register("password")}
                  label="Password"
                  error={errors.password}
                  className="text-gray-900"
                />
              </div>
            </div>

          
            <button
              disabled={loading}
              type="submit"
              className="w-full h-12 mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-black text-sm uppercase tracking-[0.1em] rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
              ) : (
                <>
                  <LockKeyhole size={18} />
                  <span>Login</span>
                </>
              )}
            </button>

      
            <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-white/5">
              <Link 
                href="/forgot-password" 
                className="text-[11px] font-mono text-gray-500 hover:text-cyan-500 text-center transition-colors uppercase tracking-widest"
              >
                Forget Password?
              </Link>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full h-12 flex justify-center items-center gap-3 border border-white/10 hover:bg-white/5 rounded-lg transition-all"
              >
                <FcGoogle size={20} />
                <span className="text-xs font-bold text-white tracking-wide uppercase">Login with Google</span>
              </button>

              <p className="text-center text-[12px] text-gray-500 mt-2">
                New to the system? {" "}
                <Link href="/register" className="text-cyan-500 font-bold hover:underline">
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>

    
        <div className="mt-6 flex justify-between items-center px-4 opacity-40">
           <span className="text-[9px] font-mono text-gray-600 tracking-tighter">SECURE_LINK_ENCRYPTED</span>
           <span className="text-[9px] font-mono text-gray-600 tracking-tighter italic">V 4.0.1</span>
        </div>
      </div>
    </main>
  );
};

export default Login;