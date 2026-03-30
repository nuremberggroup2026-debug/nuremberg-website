
import React from "react";
import { ArrowRight, LucideIcon } from "lucide-react";
import { aboutData } from "@/data/AboutData";
import { Locale } from "@/types";

interface DesktopProps {
  iconsMap: LucideIcon[];
  locale:Locale
}

export const DesktopSectorsGrid = ({  iconsMap, locale}: DesktopProps) => {
        const sectorsText = aboutData[locale]?.sectors || aboutData.en.sectors;
    
  return (
    <div className="hidden md:grid grid-cols-3 gap-8">
      {sectorsText.items.map((sector, idx) => {
        const Icon = iconsMap[idx];
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
            <div className="relative z-20 h-full p-10 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="text-cyan-500 group-hover:text-cyan-400 transition-colors duration-500">
                  <Icon size={28} />
                </div>
                <span className="text-[10px] font-mono text-gray-400 group-hover:text-cyan-500/70 transition-colors tracking-widest">
                  SEC_{sector.id}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-black text-white uppercase italic mb-4">{sector.title}</h3>
                <div className="max-h-0 opacity-0 group-hover:max-h-60 group-hover:opacity-100 overflow-hidden transition-all duration-700 ease-in-out">
                  <p className="text-gray-300 text-sm leading-relaxed mb-6">{sector.description}</p>
                  <div className="space-y-2">
                    {sector.features.map((feat: string) => (
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
            <div className={`absolute bottom-6 ${locale==="ar"?"left-6":"right-6"} opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 text-cyan-500 z-40`}>
              <ArrowRight size={24} className={`${locale==="ar"?"rotate-180":"rotate-0"}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
};