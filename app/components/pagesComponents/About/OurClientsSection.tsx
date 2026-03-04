"use client";

import React from "react";
import { aboutData } from "@/data/AboutData";
import { useLocale } from "next-intl";



import type {translatedClients} from "@/types/index"

interface Props {
  clients: translatedClients[];
}





export default function ClientsSection({clients}:Props) {
    const locale = useLocale() as "en" | "ar";
  const texts = aboutData[locale]?.clients || aboutData.en.clients;



  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-20">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-[1px] w-12 bg-cyan-500/40" />
            <span className="text-[11px] font-mono text-cyan-500 tracking-[0.5em] uppercase font-bold">
              {texts.label}
            </span>
            <div className="h-[1px] w-12 bg-cyan-500/40" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
            {texts.headingPrefix} <span className="text-cyan-500">{texts.headingHighlight}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 items-center">
          {clients.map((client, index) => (
            <div 
              key={index} 
              className="group relative flex items-center justify-center transition-all duration-300"
            >
              <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150" />
              
              <img 
                src={client.logo} 
                alt="Client Logo" 
                className="h-8 md:h-10 w-auto relative z-10 brightness-0 invert opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300"
              />
            </div>
          ))}
        </div>

        <div className="mt-24 flex flex-col items-center">
            <div className="text-[9px] font-mono text-gray-500 tracking-[0.3em] uppercase flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
              {texts.footerNote}
              <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
            </div>
        </div>
      </div>
    </section>
  );
}