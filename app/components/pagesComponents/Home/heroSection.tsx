"use client";

import { useLocale } from "next-intl";
import { homeData } from "@/data/Homadata";
import { MoveRight, Hexagon, Fingerprint, Command } from "lucide-react";
import gsap from "gsap";
import { useRef, useEffect } from "react";

export default function HeroSection() {
  const locale = useLocale() as "en" | "ar";
  const hero = homeData[locale].hero;
  const isArabic = locale === "ar";

  const sectionRef = useRef<HTMLElement>(null);
  const coreRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance Animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.from(coreRef.current, { opacity: 0, scale: 0.8, duration: 2 })
        .from(".tech-badge", { y: -50, opacity: 0, duration: 1 }, "-=1.5")
        .from(".main-title span", { y: 100, skewY: 7, opacity: 0, duration: 1.5, stagger: 0.2 }, "-=1");

      // Mouse parallax
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 40;

        if (coreRef.current) {
          gsap.to(coreRef.current, { x: -xPos * 2, y: -yPos * 2, duration: 1, ease: "power2.out" });
        }

        if (buttonRef.current) {
          const rect = buttonRef.current.getBoundingClientRect();
          const btnX = e.clientX - (rect.left + rect.width / 2);
          const btnY = e.clientY - (rect.top + rect.height / 2);

          if (Math.abs(btnX) < 100 && Math.abs(btnY) < 100) {
            gsap.to(buttonRef.current, { x: btnX * 0.3, y: btnY * 0.3, duration: 0.5 });
          } else {
            gsap.to(buttonRef.current, { x: 0, y: 0, duration: 0.5 });
          }
        }
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#020202] flex flex-col items-center justify-center overflow-hidden font-sans"
    >
      {/* Background CORE */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2
          ref={coreRef}
          className="text-[35vw] font-black text-white/[0.02] leading-none select-none tracking-tighter"
        >
          CORE
        </h2>
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <div className="tech-badge mb-12 flex items-center gap-6 px-6 py-2 border border-white/5 bg-white/[0.03] backdrop-blur-xl rounded-full">
          {hero.badge}
        </div>

        {/* Main Title */}
        <div className="main-title relative mb-16">
          <h1 className="text-[12vw] md:text-[9vw] font-[1000] leading-[1.05] tracking-[-0.08em] text-white uppercase relative z-20">
            <span className="block overflow-hidden">{hero.title[0]}</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 italic font-light block overflow-hidden">
              {hero.title[1]}
            </span>
          </h1>
        </div>

        {/* Info Cards */}
        <div className="info-card w-full max-w-4xl grid grid-cols-1 md:grid-cols-12 gap-1 px-1 bg-white/5 border border-white/10 backdrop-blur-md">
          {hero.cards.map((card, idx) => (
            <div
              key={idx}
              ref={idx === 2 ? buttonRef : null}
              className={`md:col-span-4 p-8 flex flex-col items-center justify-center ${
                idx === 2 ? "group cursor-pointer relative overflow-hidden" : ""
              }`}
            >
              <h3 className="text-cyan-500 font-mono text-[10px] tracking-widest uppercase mb-4 flex items-center gap-2">
                {idx === 0 && <Hexagon size={12} className="animate-spin-slow" />}
                {idx === 1 && <Fingerprint size={12} />}
                {card.title}
              </h3>
              <p className="text-gray-400 text-xs leading-relaxed uppercase font-medium">{card.desc}</p>

              {/* Hover effect for 3rd card */}
              {idx === 2 && (
                <div className="absolute inset-0 bg-cyan-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Side metadata */}
      <div className="absolute top-1/2 left-10 -translate-y-1/2 hidden xl:flex flex-col gap-12 text-white/20">
        <div className="side-metadata rotate-90 origin-left text-[10px] tracking-[1em] uppercase">Development</div>
        <div className="side-metadata rotate-90 origin-left text-[10px] tracking-[1em] uppercase text-cyan-500/40">Marketing</div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-12 left-0 w-full px-12 flex justify-between items-center opacity-30">
        <div className="font-mono text-[9px] text-white tracking-widest">BUILD_v2.26 // Amman_Node</div>
        <div className="w-32 h-[1px] bg-white/20 relative overflow-hidden">
          <div className="absolute top-0 left-0 h-full w-full bg-cyan-500 origin-left animate-load-progress" />
        </div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes load-progress {
          0% { transform: scaleX(0); }
          50% { transform: scaleX(1); transform-origin: left; }
          51% { transform-origin: right; }
          100% { transform: scaleX(0); transform-origin: right; }
        }
        .animate-load-progress {
          animation: load-progress 3s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
}