"use client";
import React from "react";
import { Monitor, Video, BarChart3, ArrowRight } from "lucide-react";
import { useLocale } from "next-intl";
import { aboutData } from "@/data/AboutData";

export default function AboutSectors() {
  const locale = useLocale() as "en" | "ar";
  const sectorsText = aboutData[locale]?.sectors || aboutData.en.sectors;

  // استيراد الأيقونات هنا في الملف الأساسي
  const iconsMap = [Monitor, Video, BarChart3];

  return (
    <section className=" py-28 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Title Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-cyan-500/40" />
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase font-bold">
              {sectorsText.titleSectionLabel}
            </span>
            <div className="h-[1px] w-8 bg-cyan-500/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            {sectorsText.titleLine1} <span className="text-cyan-500">{sectorsText.titleLine2}</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {sectorsText.items.map((sector, idx) => {
            const Icon = iconsMap[idx]; // اختر الأيقونة المناسبة حسب الترتيب

            return (
              <div 
                key={sector.id}
                className="group relative h-[500px] bg-[#080808] border border-white/5 overflow-hidden cursor-pointer"
              >
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700 scale-105 group-hover:scale-100 brightness-50 group-hover:brightness-75 grayscale group-hover:grayscale-0"
                  style={{ backgroundImage: `url(${sector.image})` }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />

                <div className="relative z-20 h-full p-8 md:p-10 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="text-cyan-500 group-hover:text-cyan-400 transition-colors duration-500">
                      <Icon size={28} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-cyan-500/70 transition-colors tracking-widest">
                      SEC_{sector.id}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white uppercase italic mb-4">
                      {sector.title}
                    </h3>
                    
                    <div className="max-h-0 opacity-0 group-hover:max-h-60 group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
                      <p className="text-gray-300 text-sm leading-relaxed mb-6">
                        {sector.description}
                      </p>
                      <div className="space-y-2">
                        {sector.features.map((feat) => (
                          <div key={feat} className="flex items-center gap-3">
                            <div className="w-1.5 h-[1.5px] bg-cyan-500" />
                            <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 border border-white/5 opacity-0 group-hover:opacity-100 group-hover:border-cyan-500/50 transition-all duration-500 z-30" />
                <div className="absolute bottom-6 right-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-cyan-500 z-40">
                  <ArrowRight size={24} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-20 text-center opacity-20">
            <span className="text-[8px] font-mono text-white tracking-[0.8em] uppercase">
              {sectorsText.footerNote}
            </span>
        </div>
      </div>
    </section>
  );
}