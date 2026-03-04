"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Code2, Terminal, Cpu } from "lucide-react";
import { useLocale } from "next-intl";
import { nurembergData } from "@/data/nurembergData"; // ملف الترجمات

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function CyberProgrammingSection() {
  const containerRef = useRef(null);
  const locale = useLocale() as "en" | "ar";
  const texts = nurembergData[locale]?.section || nurembergData.en.section;

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 70%",
        toggleActions: "play none none reverse",
      },
    });

    tl.fromTo(
      ".glass-panel",
      { opacity: 0, y: 50, rotateX: -15 },
      { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: "expo.out" }
    ).fromTo(
      ".floating-image",
      { x: 100, opacity: 0, scale: 0.8 },
      { x: 0, opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" },
      "-=1"
    );

    gsap.to(".floating-image", {
      y: 20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative py-32 px-6 overflow-hidden min-h-[750px] flex items-center"
    >
      {/* خلفيات زينة */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-600/10 blur-[150px] rounded-full" />

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* المحتوى النصي */}
        <div className="lg:col-span-6 space-y-8 glass-panel">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 backdrop-blur-md">
            <Terminal size={16} className="text-cyan-400" />
            <span className="text-[11px] font-mono text-cyan-400 uppercase tracking-[0.3em]">
              {texts.status}
            </span>
          </div>

          <h2 className="text-6xl md:text-8xl font-[1000] text-white italic uppercase tracking-tighter leading-none">
            {texts.title1} <br />
            <span className="text-transparent" style={{ WebkitTextStroke: "1px #06b6d4" }}>
              {texts.title2}
            </span>
          </h2>

          <div className="space-y-6 max-w-xl">
            <p className="text-white/50 text-xl font-light leading-relaxed border-l-2 border-cyan-500/30 pl-6">
              {texts.description} <span className="text-white">{texts.highlight}</span>
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              {texts.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-1 border border-white/10 rounded-md text-[10px] font-mono text-white/40 uppercase tracking-widest"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-8">
            <button className="group relative flex items-center gap-6 p-1 pr-8 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-500">
              <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-black group-hover:rotate-45 transition-transform duration-500">
                <ArrowUpRight size={24} />
              </div>
              <div className="text-left">
                <p className="text-white font-black italic uppercase tracking-tighter text-xl leading-none">
                  {texts.ctaTitle}
                </p>
                <p className="text-[9px] font-mono text-cyan-500/60 uppercase mt-1 tracking-widest">
                  {texts.ctaSubtitle}
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* الصورة والنصوص الثانوية */}
        <div className="lg:col-span-6 relative floating-image">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#080808] rounded-[2rem] p-4 border border-white/10 overflow-hidden">
              <div className="flex items-center justify-between mb-4 px-4 py-2 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/20" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                  <div className="w-3 h-3 rounded-full bg-green-500/20" />
                </div>
                <div className="text-[10px] font-mono text-white/20 uppercase tracking-widest">
                  compiler_output.log
                </div>
              </div>

              <div className="relative h-[450px] rounded-xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt="Code Debugging"
                />
                <div className="absolute inset-0 bg-cyan-900/10 mix-blend-overlay" />
                <div className="absolute bottom-6 left-6 right-6 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-xl">
                  <div className="flex items-center gap-4">
                    <Code2 className="text-cyan-400" size={20} />
                    <div>
                      <p className="text-white font-bold text-sm uppercase italic leading-none">
                        Main.ts
                      </p>
                      <p className="text-[9px] font-mono text-white/40 mt-1 uppercase">
                        Ready to compile...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-10 -right-10 w-32 h-32 border border-cyan-500/20 rounded-full animate-spin-slow flex items-center justify-center">
            <Cpu className="text-cyan-500/20" size={40} />
          </div>
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
}