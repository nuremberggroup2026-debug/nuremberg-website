"use client";

import React, { useState } from "react";
import { Code2, Video, Fingerprint, Plus } from "lucide-react";
import { homeData } from "@/data/Homadata";
import { useLocale } from "next-intl";

export default function Services() {
  const locale = useLocale() as "en" | "ar";
  const data = homeData[locale]?.services || homeData.en.services;

  const [active, setActive] = useState(0);

  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 flex flex-col items-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-[1px] bg-cyan-500/40" />
            <span className="text-cyan-500 font-mono text-[9px] tracking-[0.5em] uppercase font-black">
              Elite_Capabilities
            </span>
            <div className="w-6 h-[1px] bg-cyan-500/40" />
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tight uppercase leading-none">
            {locale === "ar" ? "خدماتنا المميزة" : "Our "} 
            <span className="text-cyan-500 underline decoration-1 underline-offset-[10px] shadow-cyan-500">
              {locale === "ar" ? "" : "Premium"}
            </span> 
            {locale === "ar" ? "" : " Services"}
          </h2>
          
          <p className="mt-6 text-gray-500 text-xs md:text-sm font-medium max-w-lg italic leading-relaxed opacity-80">
            {locale === "ar" 
              ? "هندسة الإرث الرقمي من خلال الذكاء التقني وطرق الإبداع المتقنة."
              : "Engineering digital legacies through technical intelligence and creative masterclass."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* قائمة الخدمات */}
          <div className="lg:col-span-5 space-y-3">
            {data.map((service, index) => (
              <div 
                key={index}
                onMouseEnter={() => setActive(index)}
                className={`relative p-7 cursor-pointer rounded-xl transition-all duration-500 border-l-[3px] 
                  ${active === index 
                    ? 'bg-white/[0.02] border-cyan-500 translate-x-3 shadow-[15px_0_30px_rgba(6,182,212,0.1)]' 
                    : 'bg-transparent border-transparent hover:border-white/10'}`}
              >
                <div className="flex items-start gap-5">
                  <div className={`p-3 rounded-lg bg-[#0a0a0a] border transition-all duration-500 ${active === index ? 'border-cyan-500/50 scale-105 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'border-white/5'}`}>
                    {index === 0 && <Code2 className="text-cyan-400" size={24} />}
                    {index === 1 && <Video className="text-cyan-400" size={24} />}
                    {index === 2 && <Fingerprint className="text-cyan-400" size={24} />}
                  </div>
                  <div>
                    <h3 className={`text-xl font-black uppercase italic transition-colors ${active === index ? 'text-white' : 'text-white/30'}`}>
                      {service.title}
                    </h3>
                    <div className={`overflow-hidden transition-all duration-500 ${active === index ? 'max-h-20 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                      <p className="text-gray-400 text-xs leading-relaxed max-w-sm font-medium">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                </div>
                
                {active !== index && (
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 text-white/5">
                    <Plus size={16} />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* الصور */}
          <div className="lg:col-span-7 relative h-[550px] rounded-2xl overflow-hidden group shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/5">
            <div className="absolute inset-0 border-[10px] border-black/60 z-20 pointer-events-none" />
            
            {data.map((service, index) => (
              <div 
                key={index}
                className={`absolute inset-0 transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] transform
                  ${active === index ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
              >
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale-[0.1]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                
                <div className="absolute bottom-10 left-10 z-30">
                  <span className="bg-cyan-500 text-black text-[8px] font-black px-3 py-1 tracking-[0.2em] uppercase rounded-sm shadow-[0_0_15px_rgba(6,182,212,0.4)]">
                    {service.tag}
                  </span>
                  <div className="mt-4 flex items-center gap-3">
                     <div className="w-10 h-[1px] bg-cyan-500/40 shadow-[0_0_5px_#06b6d4]" />
                     <p className="text-white font-mono text-[9px] tracking-[0.4em] uppercase opacity-40 italic">
                        Reference_Project_0{index + 1}
                     </p>
                  </div>
                </div>
              </div>
            ))}
            <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] z-10" />
          </div>
        </div>

        <div className="mt-20 flex items-center justify-between border-t border-white/5 pt-8 opacity-40">
           <div className="flex gap-10">
              <span className="text-[8px] font-mono text-cyan-500 tracking-[0.3em] uppercase italic font-bold">Logic_Layer</span>
              <span className="text-[8px] font-mono text-cyan-500 tracking-[0.3em] uppercase italic font-bold">Visual_Matrix</span>
           </div>
           <p className="text-[8px] font-mono text-white tracking-[0.3em] uppercase">Alpha_Systems // 2026</p>
        </div>
      </div>
    </section>
  );
}