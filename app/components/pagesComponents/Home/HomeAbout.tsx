"use client";

import React from "react";
import { ArrowUpRight, Globe, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { homeData } from "@/data/Homadata";
import { useLocale } from "next-intl";

export default function HomeAbout() {
  const locale = useLocale() as "en" | "ar";
  const about = homeData[locale].aboutSection; // نفترض عملت قسم aboutSection في homeData
  const isArabic = locale === "ar";

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      {/* Background blur */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Image / Card */}
          <div className="lg:col-span-6 relative z-10 group">
            <div className="absolute -inset-4 border border-cyan-500/30 translate-x-6 translate-y-6 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-700" />
            
            <div className="relative h-[500px] md:h-[650px] w-full overflow-hidden rounded-sm border border-white/10 shadow-2xl">
              <img 
                src={about.image} 
                alt={about.imageAlt} 
                className="w-full h-full object-cover brightness-90 group-hover:scale-105 group-hover:brightness-110 transition-all duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Stats Cards */}
            <div className="absolute -bottom-8 -right-8 bg-[#050505] border border-cyan-500/40 p-8 rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] hidden md:block backdrop-blur-md group-hover:-translate-y-3 transition-transform duration-500">
              <div className="flex flex-col gap-5">
                {about.stats.map((stat, idx) => (
                  <div key={idx} className="flex items-center gap-4 border-b border-white/10 pb-4">
                    <div className="p-2 bg-cyan-500/10 rounded-lg">
                      {stat.icon === "Zap" && <Zap size={20} className="text-cyan-500" />}
                      {stat.icon === "ShieldCheck" && <ShieldCheck size={20} className="text-cyan-500" />}
                    </div>
                    <div>
                      <div className="text-white font-black text-xl leading-none">{stat.value}</div>
                      <div className="text-[8px] font-mono text-cyan-500/60 uppercase tracking-widest mt-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className={`lg:col-span-6 lg:pl-12 relative z-20 ${isArabic ? "text-right" : "text-left"}`}>
            <div className="relative mb-12">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-[1px] bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                <span className="text-cyan-500 font-mono text-[10px] tracking-[0.6em] uppercase font-black">
                  {about.label}
                </span>
              </div>
              <h2 className="text-5xl md:text-7xl font-[1000] text-white italic tracking-tighter leading-[0.85] uppercase">
                {about.title.split(" ").map((word, idx) =>
                  idx === 1 ? (
                    <span key={idx} className="text-transparent font-outline-cyan">{word} </span>
                  ) : (
                    <span key={idx}>{word} </span>
                  )
                )}
              </h2>
            </div>

            <div className="space-y-10">
              <p className="text-gray-300 text-lg md:text-xl font-medium leading-relaxed italic border-l-2 rtl:border-l-0 rtl:border-r-2 border-cyan-500/50 pl-6 rtl:pr-6 max-w-xl">
                {about.desc}
              </p>

              <div className="flex flex-wrap gap-4">
                {about.tags.map((tag, idx) => (
                  <div key={idx} className="px-4 py-1.5 border border-white/10 bg-white/[0.02] rounded-full flex items-center gap-2 transition-all hover:border-cyan-500/50">
                    <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                    <span className="text-white/70 font-mono text-[9px] uppercase tracking-widest">{tag}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <Link 
                  href={about.cta.link} 
                  className="group relative inline-flex items-center gap-8 bg-cyan-500 px-10 py-5 rounded-full transition-all duration-500 hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] overflow-hidden"
                >
                  <span className="relative z-10 text-black font-[1000] uppercase text-xs tracking-[0.2em]">
                    {about.cta.label}
                  </span>
                  <div className="bg-black text-white p-1.5 rounded-full transition-transform group-hover:rotate-45">
                    <ArrowUpRight size={18} />
                  </div>
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="mt-32 flex justify-between items-center opacity-30 border-t border-white/5 pt-8">
           <div className="text-[9px] font-mono text-white tracking-[0.4em] uppercase italic">
             {about.footer}
           </div>
           <Globe size={18} className="text-cyan-500 animate-[spin_12s_linear_infinite]" />
        </div>
      </div>

      <style jsx>{`
        .font-outline-cyan {
          -webkit-text-stroke: 1.5px #06b6d4;
        }
      `}</style>
    </section>
  );
}