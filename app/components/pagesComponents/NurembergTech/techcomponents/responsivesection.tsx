"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItem {
  id: number;
  title: string;
  imageUrl: string;
}

interface MockWebsiteContentProps {
  title: string;
  items: ProjectItem[];
}

// --- Data ---
const PROJECTS: ProjectItem[] = [
  { id: 1, title: "Modern Studio", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=500" },
  { id: 2, title: "UI Experience", imageUrl: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=500" },
  { id: 3, title: "Architecture", imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=500" },
  { id: 4, title: "Digital Art", imageUrl: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=500" },
  { id: 5, title: "Mobile App", imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=500" },
];

const STAGES = [
  { title: "Desktop Precision", desc: "Crafting large-scale experiences for the modern workspace." },
  { title: "Laptop Agility", desc: "Powerful performance optimized for professional portability." },
  { title: "Tablet Fluidity", desc: "Intuitive touch interfaces designed for creative freedom." },
  { title: "Mobile Instinct", desc: "Pixel-perfect designs for the most personal device." }
];

const ResponsiveSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const tabletRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  
  const [activeStage, setActiveStage] = useState(0);

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;
          if (p < 0.25) setActiveStage(0);
          else if (p < 0.5) setActiveStage(1);
          else if (p < 0.75) setActiveStage(2);
          else setActiveStage(3);
        }
      },
    });

    tl.to(desktopRef.current, { yPercent: -92, ease: "none" }, 0)
      .to(laptopRef.current, { yPercent: -92, ease: "none" }, 0)
      .to(tabletRef.current, { yPercent: -80, ease: "none" }, 0)
      .to(phoneRef.current, { yPercent: -60, ease: "none" }, 0);

  }, { scope: sectionRef });

  return (
    <div className="w-full  font-sans">
   

      <section ref={sectionRef} className="h-screen flex flex-col items-center justify-center overflow-hidden relative">
        
        <div className="absolute top-16 md:top-24 text-center z-50 w-full px-6 pointer-events-none">
          <div className="inline-flex items-center gap-4 mb-4 opacity-50">
             <div className="h-[1px] w-12 bg-cyan-400" />
             <span className="text-cyan-400 font-mono text-[10px] tracking-[0.4em] uppercase font-bold italic">Module_0{activeStage + 1}</span>
             <div className="h-[1px] w-12 bg-cyan-400" />
          </div>
          
          <div className="relative h-32 overflow-hidden">
            <h2 key={activeStage} className="text-white text-5xl md:text-8xl font-[1000] italic tracking-tighter uppercase leading-none animate-in fade-in slide-in-from-bottom-8 duration-700">
              {STAGES[activeStage].title}
            </h2>
            <p className="text-white/30 font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] mt-4 max-w-xl mx-auto">
              {STAGES[activeStage].desc}
            </p>
          </div>
        </div>

        <div className="relative w-full max-w-[1400px] h-[65vh] mt-32 flex items-end justify-center gap-4 md:gap-8 pb-12 px-6">
          
          {/* iMac Desktop */}
          <div className={`hidden lg:flex flex-col items-center w-1/3 mb-10 transition-all duration-700 ${activeStage === 0 ? 'scale-105 opacity-100' : 'scale-95 opacity-20'}`}>
            <div className="relative w-full aspect-video bg-[#151515] rounded-2xl p-3 border border-white/5 shadow-2xl overflow-hidden ring-1 ring-white/10">
              <div className="relative w-full h-full overflow-hidden bg-white rounded-lg">
                <div ref={desktopRef} className="absolute top-0 left-0 w-full">
                  <MockWebsiteContent title="iMac 24-inch" items={PROJECTS} />
                </div>
              </div>
            </div>
            <div className="w-20 h-14 bg-zinc-800" style={{ clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' }}></div>
            <div className="w-40 h-1 bg-zinc-700 rounded-full shadow-lg"></div>
          </div>

          {/* MacBook Laptop */}
          <div className={`relative w-1/3 mb-4 hidden md:block transition-all duration-700 ${activeStage === 1 ? 'scale-105 opacity-100' : 'scale-95 opacity-20'}`}>
            <div className="relative w-full aspect-[16/10] bg-[#1a1a1a] border-[10px] border-[#222] rounded-t-2xl shadow-2xl overflow-hidden ring-1 ring-white/5">
              <div className="relative w-full h-full overflow-hidden bg-zinc-50">
                <div ref={laptopRef} className="absolute top-0 left-0 w-full">
                  <MockWebsiteContent title="MacBook Pro" items={PROJECTS} />
                </div>
              </div>
            </div>
            <div className="w-[110%] h-3 bg-gradient-to-b from-zinc-700 to-black -ml-[5%] rounded-b-lg border-t border-white/10 shadow-xl"></div>
          </div>

          {/* iPad Pro */}
          <div className={`relative w-40 md:w-52 aspect-[3/4.2] bg-[#0f0f0f] border-[10px] border-[#1a1a1a] rounded-[2.8rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] overflow-hidden mb-3 ring-1 ring-white/20 transition-all duration-700 ${activeStage === 2 ? 'scale-105 opacity-100' : 'scale-95 opacity-20'}`}>
            <div className="relative w-full h-full overflow-hidden bg-white rounded-[2rem]">
              <div ref={tabletRef} className="absolute top-0 left-0 w-full">
                <MockWebsiteContent title="iPad Pro" items={PROJECTS} />
              </div>
            </div>
          </div>

          {/* iPhone 16 Pro */}
          <div className={`relative w-28 md:w-34 h-[220px] md:h-[280px] bg-[#0c0c0c] border-[7px] border-[#1f1f1f] rounded-[2.8rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] overflow-hidden mb-1 shrink-0 ring-1 ring-white/20 transition-all duration-700 ${activeStage === 3 ? 'scale-105 opacity-100' : 'scale-95 opacity-20'}`}>
            <div className="relative w-full h-full overflow-hidden bg-white rounded-[2.3rem]">
              <div ref={phoneRef} className="absolute top-0 left-0 w-full">
                <MockWebsiteContent title="iPhone 16 Pro" items={PROJECTS} />
              </div>
            </div>
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 md:w-12 h-4 bg-black rounded-full z-40 border border-white/5 shadow-inner"></div>
          </div>

        </div>
      </section>
    </div>
  );
};

const MockWebsiteContent: React.FC<MockWebsiteContentProps> = ({ title, items }) => {
  return (
    <div className="w-full flex flex-col bg-white min-h-[400vh]">
      <nav className="w-full h-12 px-4 flex items-center justify-between border-b border-zinc-100 bg-white/90 backdrop-blur-md sticky top-0 z-10">
        <span className="text-[8px] font-black uppercase tracking-widest text-zinc-900">{title}</span>
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-zinc-200"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
        </div>
      </nav>
      
      <div className="p-4 space-y-6">
        <div className="py-4 border-b border-zinc-50">
          <div className="w-6 h-[2px] bg-cyan-400 mb-3"></div>
          <h3 className="text-xl font-black text-black leading-tight tracking-tighter uppercase italic">The Collection</h3>
        </div>

        {[...items, ...items, ...items, ...items].map((project, index) => (
          <div key={`${project.id}-${index}`} className="group w-full rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 transition-all hover:border-cyan-400/30">
            <div className="aspect-[4/3] w-full overflow-hidden">
              <img src={project.imageUrl} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            <div className="p-4 bg-white">
              <div className="flex justify-between items-center">
                <h4 className="text-[10px] font-black text-black uppercase tracking-tight">{project.title}</h4>
                <div className="w-4 h-4 rounded-full border border-zinc-100 flex items-center justify-center">
                   <ArrowUpRight size={8} className="text-zinc-400" />
                </div>
              </div>
              <p className="text-[8px] text-zinc-400 mt-1 font-mono">Build_v2.06</p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="h-[200px] w-full bg-zinc-950 flex flex-col items-center justify-center p-6 text-center">
        <p className="text-[7px] text-white/20 uppercase tracking-[0.4em]">End of Transmission</p>
      </div>
    </div>
  );
};

export default ResponsiveSection;