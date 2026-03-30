"use client";
import React, { useState } from "react";
import { ChevronDown, ArrowRight, LucideIcon } from "lucide-react";
import { Monitor, Video, BarChart3 } from "lucide-react";
import { useRouter } from "next/navigation";

import { aboutData } from "@/data/AboutData";
import { Locale } from "@/types";

interface MobileProps {
  locale: Locale;
}

export const MobileSectorsAccordion = ({ locale }: MobileProps) => {
    const sectorsText = aboutData[locale]?.sectors || aboutData.en.sectors;
    const iconsMap = [Monitor, Video, BarChart3];
  const [activeIdx, setActiveIdx] = useState<number | null>(0);
  const router= useRouter()

  return (
    <div className="flex flex-col gap-4 md:hidden">
      {sectorsText.items.map((sector, idx) => {
        const Icon = iconsMap[idx];
        const isOpen = activeIdx === idx;
        return (
          <div
            key={sector.id}
            className={`overflow-hidden transition-all duration-500 border ${
              isOpen ? "border-cyan-500/50 bg-[#0A0A0A]" : "border-white/5 bg-transparent"
            }`}
          >
            <button
              onClick={() => setActiveIdx(isOpen ? null : idx)}
              className="w-full flex items-center justify-between py-12 px-8 text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`${isOpen ? "text-cyan-500" : "text-gray-500"} transition-colors`}>
                  <Icon size={22} />
                </div>
                <span className={`text-base font-bold uppercase italic tracking-tight ${isOpen ? "text-white" : "text-gray-400"}`}>
                  {sector.title}
                </span>
              </div>
              <ChevronDown size={18} className={`text-cyan-500 transition-transform duration-500 ${isOpen ? "rotate-180" : ""}`} />
            </button>

            <div className={`transition-all duration-500 ease-in-out ${isOpen ? "max-h-[800px] opacity-100" : "max-h-0 opacity-0"}`}>
              <div className="relative h-48 w-full overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-1000"
                  style={{
                    backgroundImage: `url(${sector.image})`,
                    transform: isOpen ? "scale(1)" : "scale(1.1)",
                  }}
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0A0A0A] via-transparent to-transparent" />
                <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay" />
              </div>

              <div className="px-5 pb-8 -mt-4 relative z-10">
                <p className="text-gray-300 text-sm leading-relaxed mb-6">{sector.description}</p>
                <div className="space-y-3">
                  {sector.features.map((feat: string) => (
                    <div key={feat} className="flex items-center gap-3 bg-white/5 p-3 border border-white/5">
                      <div className="w-1 h-1 bg-cyan-500 shadow-[0_0_8px_#06b6d4]" />
                      <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{feat}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-between items-center border-t border-white/5 pt-4">
                  <span className="text-[9px] font-mono text-cyan-500/50"></span>
                  <button onClick={()=>{router.push("/alpha-production")}}><ArrowRight size={18} className={`text-cyan-500 ${locale === "en" ? "rotate-0" : "rotate-180"}`} /></button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};