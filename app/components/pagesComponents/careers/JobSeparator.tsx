import React from "react";

export const JobSeparator = ({ t }: { t: any }) => (
  <div className="relative py-16 flex items-center justify-center">
    <div className="absolute w-full h-[1px] bg-white/10" />
    <div className="absolute w-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
    <div className="relative bg-[#020202] border border-white/20 px-6 py-2 rounded-full flex items-center gap-4">
      <span className="text-[9px] font-mono text-white/40 uppercase tracking-[0.3em]">{t.nextSlot}</span>
      <div className="flex gap-1">
        <div className="w-1.5 h-1.5 bg-cyan-500 animate-pulse" />
        <div className="w-1.5 h-1.5 bg-cyan-500/50" />
        <div className="w-1.5 h-1.5 bg-cyan-500/20" />
      </div>
    </div>
  </div>
);