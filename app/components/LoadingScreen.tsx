"use client";
import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { Terminal, Cpu, ShieldCheck, Activity } from "lucide-react";

export default function LoadingScreen({ onFinished }: { onFinished: () => void }) {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("INITIALIZING_CORE");

  const statusMessages = [
    "INITIALIZING_CORE",
    "ESTABLISHING_SECURE_CONNECTION",
    "LOADING_NEURAL_NETWORKS",
    "DECRYPTING_ASSETS",
    "SYSTEM_READY"
  ];

  useEffect(() => {
    // أنيميشن عداد التحميل
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    // تغيير رسائل الحالة بناءً على التقدم
    if (progress < 25) setStatus(statusMessages[0]);
    else if (progress < 50) setStatus(statusMessages[1]);
    else if (progress < 75) setStatus(statusMessages[2]);
    else if (progress < 95) setStatus(statusMessages[3]);
    else setStatus(statusMessages[4]);

    // أنيميشن الخروج باستخدام GSAP
    if (progress === 100) {
      const tl = gsap.timeline({
        onComplete: onFinished
      });

      tl.to(".loading-content", { opacity: 0, y: -20, duration: 0.5, delay: 0.5 })
        .to(".loading-bar-container", { scaleX: 0, duration: 0.8, ease: "power4.inOut" })
        .to(".loading-bg", { opacity: 0, duration: 0.8 });
    }

    return () => clearInterval(timer);
  }, [progress]);

  return (
    <div className="loading-bg fixed inset-0 z-[9999] bg-[#020202] flex items-center justify-center font-mono overflow-hidden">
      
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>

      <div className="loading-content relative w-full max-w-md px-10 text-center">
        
        <div className="relative mb-12 flex justify-center">
          <div className="absolute inset-0 bg-cyan-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="relative w-20 h-20 border border-cyan-500/30 rounded-full flex items-center justify-center bg-black">
            <Cpu className="text-cyan-400 animate-spin-slow" size={32} />
            <div className="absolute inset-0 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-end">
              <span className="text-cyan-500 text-[10px] tracking-[0.3em] font-black uppercase">
                {status}
              </span>
              <span className="text-white text-xs font-bold">{progress}%</span>
            </div>
            
            <div className="loading-bar-container w-full h-[2px] bg-white/5 relative overflow-hidden">
              <div 
                className="absolute top-0 left-0 h-full bg-cyan-500 shadow-[0_0_10px_#06b6d4] transition-all duration-100 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="flex justify-center gap-6 opacity-30">
            <div className="flex items-center gap-2">
              <Activity size={10} className="text-cyan-400" />
              <span className="text-[8px] text-white uppercase tracking-widest leading-none">Net_Stable</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={10} className="text-cyan-400" />
              <span className="text-[8px] text-white uppercase tracking-widest leading-none">Enc_Active</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-10 left-10 w-4 h-4 border-t border-l border-cyan-500/40" />
      <div className="absolute top-10 right-10 w-4 h-4 border-t border-r border-cyan-500/40" />
      <div className="absolute bottom-10 left-10 w-4 h-4 border-b border-l border-cyan-500/40" />
      <div className="absolute bottom-10 right-10 w-4 h-4 border-b border-r border-cyan-500/40" />
    </div>
  );
}