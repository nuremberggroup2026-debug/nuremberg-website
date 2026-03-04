"use client";

import { useLocale } from "next-intl";
import { Layers, Database, Smartphone, ArrowUpRight, Zap, Globe, Briefcase } from "lucide-react";
import gsap from "gsap";
import { useRef, useEffect } from "react";
import { nurembergData } from "@/data\/nurembergData"; // ملف البيانات يحتوي النصوص فقط

export default function TechBentoGlow() {
  const locale = useLocale() as "en" | "ar";
  const data = nurembergData[locale].techData; // يحتوي النصوص فقط

  const gridRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardsRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "power4.out" }
      );

      const handleMouseMove = (e: MouseEvent) => {
        if (!gridRef.current || !spotlightRef.current) return;
        const rect = gridRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        gsap.to(spotlightRef.current, {
          x: x - 300,
          y: y - 300,
          duration: 0.8,
          opacity: 1
        });
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, gridRef);

    return () => ctx.revert();
  }, []);

  const onCardEnter = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card, { 
      borderColor: "rgba(6, 182, 212, 1)", 
      boxShadow: "0 0 25px rgba(6, 182, 212, 0.4), inset 0 0 15px rgba(6, 182, 212, 0.2)",
      scale: 1.01,
      duration: 0.3 
    });
  };

  const onCardLeave = (idx: number) => {
    const card = cardsRef.current[idx];
    if (!card) return;
    gsap.to(card, { 
      borderColor: "rgba(6, 182, 212, 0.4)", 
      boxShadow: "0 0 10px rgba(6, 182, 212, 0.1)",
      scale: 1,
      duration: 0.3 
    });
  };

  // أيقونات ثابتة في المكون
  const icons = [Layers, Database, Smartphone, Zap, Globe, Briefcase];

  return (
    <section className=" py-16 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-6xl md:text-8xl font-[1000] text-white italic uppercase tracking-tighter leading-none">
            {data.title}
          </h2>
        </div>

        <div ref={gridRef} className="relative grid grid-cols-1 md:grid-cols-4 auto-rows-[160px] gap-5">
          <div ref={spotlightRef} className="pointer-events-none absolute w-[600px] h-[600px] opacity-0 z-0 bg-[radial-gradient(circle,rgba(6,182,212,0.08)_0%,transparent 70%)]" />

          {data.cards.map((card, idx) => {
            const Icon = icons[idx]; // أيقونة ثابتة
            return (
              <div
                key={idx}
                ref={el => {cardsRef.current[idx] = el}}
                onMouseEnter={() => onCardEnter(idx)}
                onMouseLeave={() => onCardLeave(idx)}
                className={`group relative bg-[#050505] border-2 border-cyan-500/40 p-6 md:col-span-${card.colSpan} md:row-span-${card.rowSpan || 1} rounded-2xl flex flex-col justify-between shadow-[0_0_10px_rgba(6,182,212,0.1)] transition-all`}
              >
                <div className="relative z-10 flex items-center justify-between">
                  <Icon className="text-cyan-400" size={32} />
                  <h3 className="text-xl font-black text-white uppercase italic">{card.title}</h3>
                </div>
                {card.desc && <p className="text-white/40 text-xs mt-2">{card.desc}</p>}
                {card.action && (
                  <div className="p-4 rounded-xl border-2 border-cyan-500/50 group-hover:bg-cyan-500 group-hover:text-black transition-all flex justify-center items-center mt-2">
                    <ArrowUpRight size={28} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex justify-between items-center px-2">
          <div className="flex gap-4 items-center">
            <div className="h-2 w-2 rounded-full bg-cyan-500 animate-ping" />
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.3em] uppercase">{data.gridStatus}</span>
          </div>
          <span className="text-[10px] font-mono text-white/20 uppercase">{data.footer}</span>
        </div>
      </div>
    </section>
  );
}