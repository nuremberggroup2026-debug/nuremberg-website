"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLocale } from "next-intl";

import { DeviceFrame } from "@/app/components/pagesComponents/NurembergTech/responsive/DeviceFrame";
import { MockDeviceCanvas } from "@/app/components/pagesComponents/NurembergTech/responsive/MockWebsiteCanvas";
import { StageHeader } from "@/app/components/pagesComponents/NurembergTech/responsive/StageHeader";

gsap.registerPlugin(ScrollTrigger);

const ResponsiveMobileSection: React.FC = () => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const isAr = useLocale() === "ar";

  const STAGES = isAr
    ? [
        { title: "دقة سطح المكتب", desc: "تجربة بصرية متكاملة" },
        { title: "مرونة اللابتوب", desc: "أداء احترافي متنقل" },
        { title: "سلاسة التابلت", desc: "إبداع يعمل باللمس" },
        { title: "بساطة الموبايل", desc: "استجابة مثالية بيدك" }
      ]
    : [
        { title: "Desktop Precision", desc: "Full-scale visual power" },
        { title: "Laptop Agility", desc: "Pro workflow on the go" },
        { title: "Tablet Fluidity", desc: "Creative touch freedom" },
        { title: "Mobile Instinct", desc: "Pixel-perfect response" }
      ];

  const DEVICE_TYPES = ["desktop", "laptop", "tablet", "phone"] as const;

  useGSAP(() => {
    // Type-safe: cast to HTMLDivElement[]
    const devices = gsap.utils.toArray<HTMLDivElement>(".mobile-device-wrapper");

    // Main timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
        snap: {
          snapTo: 1 / (DEVICE_TYPES.length - 1),
          duration: 0.5,
          ease: "power2.inOut"
        },
        onUpdate: (self) => {
          const stage = Math.round(self.progress * (DEVICE_TYPES.length - 1));
          if (stage !== activeStage) setActiveStage(stage);
        }
      }
    });

    // Initial position for all devices except first
    gsap.set(devices.slice(1), { yPercent: 100, opacity: 0, scale: 0.6 });

    // Sequential animation
    devices.forEach((device, i) => {
      if (i < devices.length - 1) {
        tl.to(device, { yPercent: -100, opacity: 0, scale: 1.2, ease: "power2.inOut" }, i)
          .to(devices[i + 1], { yPercent: 0, opacity: 1, scale: 1, ease: "power2.out" }, i);
      }
    });
  }, { scope: triggerRef });

  return (
    <section ref={triggerRef} className="h-screen w-full bg-[#050505] overflow-hidden flex flex-col relative">
      
      {/* 1. Header (Fixed Height) */}
      <div className="h-[25vh] flex items-end px-6 pb-6 z-40 relative">
        <StageHeader stage={STAGES[activeStage]} index={activeStage} />
      </div>

      {/* 2. Content Area (Flexible) */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        {DEVICE_TYPES.map((type, idx) => (
          <div 
            key={type} 
            className="mobile-device-wrapper absolute inset-0 flex items-center justify-center p-4"
            style={{ zIndex: 10 + idx }}
          >
            {/* Scaling Layer */}
            <div 
              className="w-full flex items-center justify-center"
              style={{
                transform: 
                  type === 'desktop' ? 'scale(0.42)' : 
                  type === 'laptop' ? 'scale(0.52)' : 
                  type === 'tablet' ? 'scale(0.75)' : 'scale(1)',
                width: type === 'desktop' || type === 'laptop' ? '180%' : '100%'
              }}
            >
              <DeviceFrame type={type} active={activeStage === idx}>
                <div className="w-full h-full min-h-[450px] bg-[#0a0a0a] overflow-hidden">
                  <MockDeviceCanvas title={isAr ? STAGES[idx].title : type.toUpperCase()} />
                </div>
              </DeviceFrame>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Navigation / Progress Bar */}
      <div className="h-[10vh] flex flex-col items-center justify-center gap-4 z-50">
        <div className="flex gap-3">
          {STAGES.map((_, i) => (
            <div 
              key={i}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeStage === i ? "w-10 bg-cyan-500 shadow-[0_0_15px_#06b6d4]" : "w-3 bg-white/10"
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono text-white/20 tracking-[0.5em] uppercase">
          Nexus_OS / Stage 0{activeStage + 1}
        </span>
      </div>

      {/* Ambiance Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03)_0%,transparent 70%)] pointer-events-none" />
    </section>
  );
};

export default ResponsiveMobileSection;