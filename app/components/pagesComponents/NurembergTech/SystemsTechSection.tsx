"use client";

import gsap from "gsap";
import { useRef, useEffect } from "react";
import { nurembergData } from "@/data/nurembergData"; 
import {
  Database, Users, Cloud, Globe, Smartphone, Briefcase
} from "lucide-react";

type Locale = "en" | "ar";
interface PageProps {
  locale: Locale;
}

export default function TechBentoGlow({ locale }: PageProps) {
  const data = nurembergData[locale].techData;

  const gridRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power4.out" }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const onCardEnter = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card, { 
      boxShadow: "0 0 20px rgba(6, 182, 212, 0.4)", 
      borderColor: "rgba(6,182,212,1)",
      duration: 0.3
    });
  };

  const onCardLeave = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card, { 
      boxShadow: "0 0 8px rgba(6, 182, 212, 0.1)", 
      borderColor: "rgba(6,182,212,0.4)",
      duration: 0.3
    });
  };

  const icons = [Database, Users, Cloud, Globe, Smartphone, Briefcase];

  return (
    <section className="py-16 px-4 md:px-10 bg-black">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl md:text-6xl font-[1000] text-white italic uppercase tracking-tighter leading-none">
          {data.title}
        </h2>
      </div>

      {/* Grid جديد للبطاقات */}
      <div 
        ref={gridRef} 
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
      >
        {data.cards.map((card: any, idx: number) => {
          const Icon = icons[idx % icons.length]; 
          return (
            <div
              key={idx}
              ref={el => {cardsRef.current[idx] = el}}
              onMouseEnter={() => onCardEnter(idx)}
              onMouseLeave={() => onCardLeave(idx)}
              className="group bg-[#050505] border-2 border-cyan-500/40 rounded-2xl p-5 flex flex-col justify-between shadow-[0_0_8px_rgba(6,182,212,0.1)] transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.4)]"
            >
              <div className="flex items-center gap-4">
                <Icon size={28} className="text-cyan-400" />
                <h3 className="text-lg md:text-xl font-black text-white uppercase italic">{card.title}</h3>
              </div>
              {card.desc && <p className="text-white/40 text-sm mt-2">{card.desc}</p>}
            </div>
          );
        })}
      </div>

      {/* Footer Info */}
      <div className="mt-8 flex flex-col sm:flex-row justify-between items-center px-2 text-xs text-white/30 gap-2 sm:gap-0">
        <div className="flex gap-2 items-center">
          <div className="h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
          <span className="font-mono tracking-[0.2em] uppercase">{data.gridStatus}</span>
        </div>
        <span className="font-mono uppercase">{data.footer}</span>
      </div>
    </section>
  );
}