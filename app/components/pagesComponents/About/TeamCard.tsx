"use client";
import React from "react";

interface TeamProps {
  name: string;
  role: string;
  img: string;
}

export default function TeamCard({ name, role, img }: TeamProps) {
  return (
    <div className="reveal-up group">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[2.5rem] border border-white/10 mb-8 bg-zinc-900">
        <img
          src={img}
          className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-1000"
          alt={name}
        />
      </div>

      <p className="text-cyan-500 font-mono text-xs uppercase tracking-[0.3em] mb-2 font-black italic">
        {role}
      </p>

      <h4 className="text-3xl font-black uppercase tracking-tighter italic">
        {name}
      </h4>
    </div>
  );
}