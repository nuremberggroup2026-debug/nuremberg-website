"use client";

import { ArrowUpRight,  Zap, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { homeData } from "@/data/Homadata";
import { useLocale } from "next-intl";

export default function HomeAbout() {
  const locale = useLocale() as "en" | "ar";
  const about = homeData[locale].aboutSection;
  const isArabic = locale === "ar";

  return (
    <section className="py-32 px-6 bg-[#030303] text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.05),transparent_70%)]" />
      
      <div className="max-w-7xl mx-auto relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-2 relative">
          
          <div className="lg:col-span-7 relative group">
            <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-transparent blur-xl opacity-50 group-hover:opacity-100 transition duration-1000`} />
            
            <div className="relative aspect-[16/10] overflow-hidden border border-white/10">
              <img 
                src={about.image} 
                alt={about.imageAlt} 
                className="w-full h-full object-cover contrast-125 group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
              />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
            </div>

            <div className={`absolute bottom-8 ${isArabic ? "-right-4" : "-left-4"} bg-black/80 backdrop-blur-xl border border-cyan-500/50 p-6 hidden md:block shadow-[10px_10px_0px_#06b6d4]`}>
               <div className="space-y-4">
                  {about.stats.map((stat, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="text-cyan-500">
                        {stat.icon === "Zap" ? <Zap size={18} /> : <ShieldCheck size={18} />}
                      </div>
                      <div>
                        <div className="text-xl font-black leading-none">{stat.value}</div>
                        <div className="text-[9px] uppercase tracking-tighter text-gray-500">{stat.label}</div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* Section 2: The Content (Span 5) */}
          <div className={`lg:col-span-5 flex flex-col justify-center ${isArabic ? "lg:pr-16 text-right" : "lg:pl-16 text-left"}`}>
            <div className="space-y-8">
              <div>
     
                <h2 className="text-5xl md:text-7xl font-black uppercase leading-[0.9] tracking-tighter mb-8">
                  {about.title.split(" ").map((word, i) => (
                    <span key={i} className={i % 2 !== 0 ? "text-transparent font-outline-cyan block" : "block"}>
                      {word}
                    </span>
                  ))}
                </h2>
              </div>

              <p className="text-gray-400 text-lg font-light leading-relaxed border-cyan-500/20 border-l-2 pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pr-6">
                {about.desc}
              </p>

              <div className={`flex flex-wrap gap-2 justify-start`}>
                {about.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-mono text-gray-500 border border-white/5 px-3 py-1 bg-white/[0.02]">
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <Link 
                  href={`${about.cta.link}#contact-form`} 
                  className="relative inline-flex items-center group overflow-hidden border border-cyan-500 px-8 py-4 transition-all duration-300 hover:bg-cyan-500"
                >
                  <span className="relative z-10 text-cyan-500 group-hover:text-black font-bold text-xs uppercase tracking-widest transition-colors duration-300">
                    {about.cta.label}
                  </span>
                  <ArrowUpRight className={`relative z-10 ml-4 group-hover:text-black text-cyan-500 transition-colors ${isArabic ? "mr-4 ml-0 rotate-[-90deg] group-hover:rotate-0" : ""}`} size={18} />
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Decorative Footer */}
        <div className="mt-24 flex items-center gap-4 opacity-20 group cursor-default">
           <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-white to-transparent" />
           <div className="font-mono text-[9px] tracking-[1em] uppercase animate-pulse">
             {about.footer}
           </div>
           <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent via-white to-transparent" />
        </div>
      </div>

      <style jsx>{`
        .font-outline-cyan {
          -webkit-text-stroke: 1px rgba(6, 182, 212, 0.8);
          text-shadow: 0 0 15px rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </section>
  );
}