"use client";
import { useLocale } from "next-intl";
import { homeData } from "@/data/Homadata";
import { Code, Video, TrendingUp } from "lucide-react";import gsap from "gsap";
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
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Entrance Animation
      tl.from(coreRef.current, { opacity: 0, scale: 0.8, duration: 2.5 })
        .from(".tech-badge", { y: -50, opacity: 0, duration: 1 }, "-=1.8")
        .from(".main-title span", { y: 100, skewY: 5, opacity: 0, duration: 1.5, stagger: 0.2 }, "-=1.2")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 1 }, "-=0.8")
        .from(".cta-container", { opacity: 0, y: 20, duration: 1 }, "-=0.6")
        .from(".info-card", { scale: 0.9, opacity: 0, duration: 1, stagger: 0.1 }, "-=0.5");

      // Mouse Parallax
      const handleMouseMove = (e: MouseEvent) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 40;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 40;
        
        if (coreRef.current) {
          gsap.to(coreRef.current, { x: -xPos * 1.5, y: -yPos * 1.5, duration: 1.2 });
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
      dir={isArabic ? "rtl" : "ltr"}
      className="relative min-h-screen w-full mt-14 md:mt-0 bg-[#020202] flex flex-col items-center justify-center overflow-hidden font-sans pt-20"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <h2 ref={coreRef} className="text-[35vw] font-black text-white/[0.02] leading-none select-none tracking-tighter uppercase">
          CORE
        </h2>
        <div className="absolute w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl px-6 flex flex-col items-center text-center">
        {/* Badge */}
      
        {/* Main Title */}
        <div className="main-title mb-8">
          <h1 className="text-[11vw] md:text-[8vw] font-[1000] leading-[1] tracking-[-0.05em] text-white uppercase">
           <span className={`${isArabic ? "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic font-extralight" : "block overflow-hidden"}`}>
  {isArabic ? hero.title[1] : hero.title[0]}
</span>

<span className={`${isArabic ? "block " : "text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 italic font-extralight px-4"}`}>
  {isArabic ? hero.title[0] : hero.title[1]}
</span>
          </h1>
        </div>

        {/* Description Text */}
        <p className="hero-desc max-w-2xl text-gray-400 text-base md:text-lg mb-10 leading-relaxed font-light">
          {hero.description}
        </p>



    

        {/* Info Cards Grid */}
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-1 bg-white/5 border border-white/10 backdrop-blur-md mb-10">
          {hero.cards.map((card, idx) => (
            <div key={idx} className="info-card p-10 flex flex-col items-center justify-center group hover:bg-white/[0.02] transition-colors relative">
              <div className="text-cyan-500 mb-6">
                {idx === 0 && <Code size={28} className="animate-spin-slow" />}
                {idx === 1 && <Video size={28} />}
                {idx === 2 && <TrendingUp size={28} className="group-hover:-translate-y-2 transition-transform" />}
              </div>
              <h3 className="text-white font-mono text-xs tracking-[0.2em] uppercase mb-4">{card.title}</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed uppercase max-w-[200px]">{card.desc}</p>
              
              {/* Bottom line indicator */}
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-500 group-hover:w-full transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

 

      <style jsx>{`
        .animate-spin-slow { animation: spin 8s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </section>
  );
}