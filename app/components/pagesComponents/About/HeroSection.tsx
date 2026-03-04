"use client";
import React from "react";
import { useLocale } from "next-intl"; // <-- لاختيار اللغة
import { aboutData } from "@/data/AboutData"; // ملف البيانات للصفحة

export default function HeroSection() {
  const locale = useLocale() as "en" | "ar";
  const content = aboutData[locale]?.hero || aboutData.en.hero;

  return (
    <section className="relative min-h-[90vh] w-full flex items-center px-6 md:px-20 ">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent opacity-40" />
      </div>

      <div className="relative z-10 max-w-5xl">
        <div className="flex items-center gap-4 mb-10 reveal-up">
          <div className="h-[2px] w-12 bg-cyan-500 shadow-[0_0_10px_#06b6d4]" />
          <span className="text-cyan-400 font-mono text-xs tracking-[0.4em] uppercase font-black">
            {content.manifesto}
          </span>
        </div>

        <h1 className="text-5xl md:text-8xl font-[1000] uppercase tracking-tighter reveal-up leading-[0.9] italic">
          {content.titleLine1} <br />
          <span className="text-cyan-500">{content.titleLine2}</span>
        </h1>

        <p className="mt-10 text-gray-400 text-lg md:text-xl reveal-up max-w-2xl leading-relaxed font-mono uppercase tracking-tight">
          {content.descriptionLine1} <br />
          {content.descriptionLine2}
        </p>
      </div>
    </section>
  );
}