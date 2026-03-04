"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";
import { registerAction } from "./(actions)/registerAction";
import { newUserSchema } from "@/app/server/users/validators";
import TextInput from "@/components/inputs/TextInput";
import EmailInput from "@/components/inputs/EmailInput";
import { toast } from "sonner";
import PasswordInput from "@/components/inputs/PasswordInput";
import { UserPlus, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

const clientRegisterSchema = newUserSchema;
type FormValues = z.infer<typeof clientRegisterSchema>;

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(clientRegisterSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    try {
      const result = await registerAction(data);
      if (!result.success) {
        toast.error(result.message ?? "REGISTRATION_FAILED");
        setLoading(false);
        return;
      }
      
      const signInResult = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: data.email,
        password: data.password,
      });

      if (signInResult?.error) {
        toast.error("Account created, but auto-login failed.");
        setLoading(false);
        return;
      }

      window.location.href = "/";
    } catch (err) {
      toast.error("CRITICAL_SYSTEM_ERROR");
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" });
  };

  return (
    <main className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 py-10">
      
      <div className="absolute w-150 h-150 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-162.5 relative">
        <div className="bg-black border border-white/10 rounded-2xl p-8 md:p-10 shadow-2xl">
          
        
          <div className="mb-8 text-left">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-cyan-500/10 rounded-xl mb-6">
              <UserPlus className="text-cyan-500" size={28} />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight uppercase">
              Register
            </h1>
            <p className="text-gray-500 text-[10px] font-mono mt-1 tracking-[0.2em] uppercase opacity-70">
              Alpha_Systems / New_Entity_Entry
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 ">
       
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInput
                register={register("first_name")}
                label="First Name"
                error={errors.first_name}
                className="text-gray-900"
              />
              <TextInput
                register={register("last_name")}
                label="Last Name"
                error={errors.last_name}
                className="text-gray-900"
              />
            </div>

            <EmailInput
              register={register("email")}
              label="Email Address"
              error={errors.email}
              className="text-gray-900"
            />

            <PasswordInput
              register={register("password")}
              label="Create Password"
              error={errors.password}
              className="text-gray-900"
            />

            <PasswordInput
              register={register("confirmPassword")}
              label="Confirm Password"
              error={errors.confirmPassword}
              className="text-gray-900"
            />

         
            <button
              disabled={loading}
              type="submit"
              className="w-full h-12 mt-4 bg-cyan-500 hover:bg-cyan-400 text-black font-[1000] text-sm uppercase tracking-widest rounded-lg transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              {loading ? (
                <Cpu className="animate-spin" size={20} />
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>

         
            <div className="my-6 flex items-center gap-4 w-full">
              <div className="flex-1 h-px bg-white/5" />
              <span className="text-[10px] font-black text-gray-300 font-bold uppercase border-b border-b-cyan-500 w-full text-center">OR</span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

        
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full h-12 flex justify-center items-center gap-3 border border-white/10 hover:bg-white/5 rounded-lg transition-all"
            >
              <FcGoogle size={20} />
              <span className="text-xs font-bold text-white tracking-wide uppercase">Continue With Google</span>
            </button>

        
            <p className="text-center text-[12px] text-gray-500 mt-6">
              Already have an account? {" "}
              <Link href="/login" className="text-cyan-500 font-bold hover:underline transition-all">
                Login 
              </Link>
            </p>
          </form>
        </div>

   
        <div className="mt-6 flex justify-between items-center px-4 opacity-30">
           <span className="text-[8px] font-mono text-gray-600 tracking-[0.4em]">ENCRYPTED_REGISTRATION_LINK</span>
           <span className="text-[8px] font-mono text-gray-600 tracking-tighter italic uppercase">Alpha_v4.0.1</span>
        </div>
      </div>
    </main>
  );
}