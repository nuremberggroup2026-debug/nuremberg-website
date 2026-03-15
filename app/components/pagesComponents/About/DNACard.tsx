"use client";
import React from "react";

interface CardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export default function DNACard({ icon, title, desc }: CardProps) {
  return (
    <div className="group p-12 border border-white/5 bg-[#030303] rounded-[2rem] transition-all duration-700 
                    hover:border-cyan-500/40 hover:shadow-[0_0_25px_rgba(6,182,212,0.3)] hover:scale-105">
      
      {/* أيقونة */}
      <div className="text-cyan-500 mb-8 transform transition-transform duration-500 group-hover:scale-110">
        {icon}
      </div>

      {/* العنوان */}
      <h3 className="text-2xl font-black uppercase mb-4 tracking-tight text-white group-hover:text-cyan-400 transition-colors">
        {title}
      </h3>

      {/* الوصف */}
      <p className="text-gray-400 text-sm leading-relaxed font-mono">
        {desc}
      </p>
    </div>
  );
}