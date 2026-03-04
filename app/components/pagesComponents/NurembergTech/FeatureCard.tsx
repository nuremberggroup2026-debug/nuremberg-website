"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
  tag: string;
}

export default function FeatureCard({
  icon: Icon,
  title,
  desc,
  tag,
}: FeatureCardProps) {
  return (
    <div className="group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-cyan-400/50 transition-all duration-500 hover:-translate-y-2">
      <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity">
        <Icon size={80} className="text-cyan-400" />
      </div>
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-2xl bg-cyan-400/10 flex items-center justify-center mb-6 text-cyan-400 group-hover:bg-cyan-400 group-hover:text-black transition-all">
          <Icon size={24} />
        </div>
        <span className="text-[10px] font-mono text-cyan-400 tracking-[0.3em] uppercase">
          {tag}
        </span>
        <h3 className="text-2xl font-bold mt-2 mb-4 text-white uppercase italic tracking-tighter">
          {title}
        </h3>
        <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}