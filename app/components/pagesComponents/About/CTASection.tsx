"use client";
import React from "react";

export default function CTASection() {
  return (
    <section className="py-60 text-center px-6">
      <div className="reveal-up max-w-4xl mx-auto">
        <h2 className="text-5xl md:text-[7rem] font-[1000] uppercase tracking-tighter mb-16 leading-[0.85] italic">
          Ready to secure your{" "}
          <span className="text-cyan-500">digital legacy?</span>
        </h2>

        <button className="group relative px-16 py-6 bg-cyan-500 text-black font-black uppercase tracking-widest text-sm rounded-full hover:bg-white transition-all duration-500 overflow-hidden shadow-[0_0_30px_rgba(6,182,212,0.4)]">
          <span className="relative z-10">Start a Conversation</span>
        </button>
      </div>
    </section>
  );
}