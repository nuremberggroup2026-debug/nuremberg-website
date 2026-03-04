"use client";
import React from "react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function DNACard({ icon, title, desc }: CardProps) {
  return (
    <div className="group p-12 border border-white/5 bg-[#111111] hover:border-cyan-500/30 transition-all duration-700 rounded-[2rem] reveal-up">
      <div className="text-cyan-500 mb-8 transform group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="text-2xl font-black uppercase mb-4 tracking-tight group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>
      <p className="text-gray-400 text-sm leading-relaxed font-mono">
        {desc}
      </p>
    </div>
  );
}