"use client";
import React from "react";

interface GlassBlockProps {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  title: string;
  desc: string;
  align?: "left" | "right";
}

export default function GlassBlock({
  icon: Icon,
  title,
  desc,
  align = "left",
}: GlassBlockProps) {
  return (
    <div className={`group pointer-events-auto mb-8 w-full max-w-sm ${align === "right" ? "text-right" : "text-left"}`}>
      <div className="p-6 rounded-2xl bg-zinc-900/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/50 transition-all duration-500 shadow-2xl">
        <div className={`flex items-center gap-4 mb-3 ${align === "right" ? "flex-row-reverse" : ""}`}>
          <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500 transition-colors">
            <Icon size={20} className="text-cyan-500 group-hover:text-black" />
          </div>
          <h3 className="text-xl md:text-2xl font-[1000] italic tracking-tighter text-white uppercase">
            {title}
          </h3>
        </div>
        <p className="text-[11px] text-white/50 tracking-wider leading-relaxed uppercase font-medium">
          {desc}
        </p>
      </div>
    </div>
  );
}