"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { nurembergData } from "@/data/nurembergData";
import { useLocale } from "next-intl"; // أو أي hook ترجمة/locale عندك

export default function HeroSection() {
  const locale = useLocale() as "en" | "ar";
    const texts = nurembergData[locale]?.hero || nurembergData.en.hero;

  return (
    <section className="relative min-h-[90vh] flex items-center px-10 md:px-20 overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-cyan-400/10 to-transparent blur-[120px] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl">
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-[10px] font-mono tracking-widest text-white/60 uppercase">
            {texts.systemStatus}
          </span>
        </div>

        <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 italic tracking-tighter uppercase">
          {texts.mainTitle1} <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
            {texts.mainTitle2}
          </span>
        </h1>

        <p className="text-lg text-gray-400 max-w-2xl mb-12 leading-relaxed font-medium">
          {texts.description}{" "}
          <span className="text-cyan-400">{texts.highlight}</span>.
        </p>

        <button className="px-10 py-5 bg-cyan-400 text-black font-black italic tracking-widest rounded-xl hover:bg-white transition-all flex items-center gap-3 uppercase">
          {texts.cta} <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}