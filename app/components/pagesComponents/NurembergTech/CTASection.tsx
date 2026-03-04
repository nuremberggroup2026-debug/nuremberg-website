"use client";

import React from "react";
import { ArrowRight, Globe, Zap } from "lucide-react";

export default function CTA() {
  return (
    <section className="bg-black py-32 overflow-hidden relative">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute top-10 w-full border-y border-white/5 py-4 bg-white/[0.02] -rotate-1 scale-105 overflow-hidden flex whitespace-nowrap z-0 opacity-50">
        <div className="flex animate-[marquee_30s_linear_infinite] items-center gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-white/20 font-mono text-[9px] tracking-[0.6em] uppercase">Core_Evolution</span>
              <span className="text-cyan-500/30 text-xs font-black italic uppercase">Alpha_Protocol</span>
              <Zap size={10} className="text-cyan-500/20" />
            </div>
          ))}
        </div>
        <div className="flex animate-[marquee_30s_linear_infinite] items-center gap-12">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="flex items-center gap-12">
              <span className="text-white/20 font-mono text-[9px] tracking-[0.6em] uppercase">Core_Evolution</span>
              <span className="text-cyan-500/30 text-xs font-black italic uppercase">Alpha_Protocol</span>
              <Zap size={10} className="text-cyan-500/20" />
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10 pt-20">
        
        <div className="relative inline-block mb-12 group">
           <div className="absolute -inset-2 bg-cyan-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity animate-pulse" />
           <div className="relative bg-black/50 backdrop-blur-md border border-cyan-500/40 px-8 py-3 rounded-full flex items-center gap-4 transition-all duration-500 group-hover:scale-105">
             <div className="relative">
                <Globe size={16} className="text-cyan-500 animate-[spin_8s_linear_infinite]" />
                <div className="absolute inset-0 bg-cyan-500 blur-sm opacity-50" />
             </div>
             <span className="text-white text-[11px] font-mono tracking-[0.4em] uppercase font-bold">
               Global_Reach: <span className="text-cyan-400">Online</span>
             </span>
           </div>
        </div>

        <h2 className="text-[14vw] md:text-[150px] font-[1000] text-white leading-[0.75] uppercase italic tracking-[-0.06em] mb-20 group cursor-default">
          <span className="inline-block transition-transform duration-700 group-hover:-translate-x-4">GET</span> 
          <span className="text-cyan-500 font-outline-2 text-transparent ml-4 transition-all duration-700 group-hover:text-cyan-500 group-hover:drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]">
            ALPHA
          </span> 
          <br /> 
          <span className="inline-block transition-transform duration-700 group-hover:translate-x-4">RESULTS.</span>
        </h2>

        <div className="flex flex-col items-center gap-8">
          <button className="group relative overflow-hidden bg-white px-14 py-7 rounded-full transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-[0_0_60px_rgba(6,182,212,0.4)]">
            <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]" />
            
            <div className="relative z-10 flex items-center gap-5 text-black font-black uppercase text-xs tracking-[0.4em]">
              Initiate Project
              <div className="bg-black/5 p-1 rounded-full group-hover:bg-black/20 transition-colors">
                <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform duration-500" />
              </div>
            </div>
          </button>
          
          <div className="flex items-center gap-6 opacity-40">
            <div className="h-[1px] w-12 bg-white/20" />
            <p className="text-white font-mono text-[9px] uppercase tracking-[0.6em] whitespace-nowrap">
              Secure_Handshake_2026
            </p>
            <div className="h-[1px] w-12 bg-white/20" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .font-outline-2 {
          -webkit-text-stroke: 1.5px #06b6d4;
        }
      `}</style>
    </section>
  );
}