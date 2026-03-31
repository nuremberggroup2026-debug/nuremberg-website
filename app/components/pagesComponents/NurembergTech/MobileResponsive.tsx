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
      { title1: "دقة", title2: "العرض", desc: "استمتع بكامل قوة واجهات سطح المكتب عالية الجودة." },
      { title1: "مرونة", title2: "اللابتوب", desc: "أداء سلس ومثالي لبيئات العمل المتنقلة." },
      { title1: "سلاسة", title2: "التابلت", desc: "تصميمات تعمل باللمس لتجربة إبداعية مرنة." },
      { title1: "بساطة", title2: "الموبايل", desc: "استجابة مثالية تناسب استخدامك اليومي بيد واحدة." }
    ]
  : [
      { title1: "Desktop", title2: "Precision", desc: "Experience the full scale of high-fidelity desktop interfaces." },
      { title1: "Laptop", title2: "Agility", desc: "Seamless performance optimized for professional portable workflows." },
      { title1: "Tablet", title2: "Fluidity", desc: "Intuitive touch-first designs crafted for creative freedom." },
      { title1: "Mobile", title2: "Instinct", desc: "Pixel-perfect responsiveness for the palm of your hand." }
    ];

  const DEVICE_TYPES = ["desktop", "laptop", "tablet", "phone"] as const;

  const SCALE_MAP: Record<string, number> = {
    desktop: 0.85,
    laptop: 0.85,
    tablet: 0.75,
    phone: 0.85
  };

  useGSAP(() => {
    const devices = gsap.utils.toArray<HTMLDivElement>(".mobile-device-wrapper");

    // initial state
    gsap.set(devices, { yPercent: 100, opacity: 0, scale: 0.7 });
    gsap.set(devices[0], {
      yPercent: 0,
      opacity: 1,
      scale: SCALE_MAP[DEVICE_TYPES[0]],
      zIndex: 100
    });

    const handleUpdate = (progress: number) => {
      const stage = Math.round(progress * (DEVICE_TYPES.length - 1));
      setActiveStage(stage);

      devices.forEach((device, i) => {
        if (i === stage) {
          gsap.to(device, {
            opacity: 1,
            scale: SCALE_MAP[DEVICE_TYPES[i]],
            yPercent: 0,
            zIndex: 100,
            overwrite: "auto"
          });
        } else if (i < stage) {
          gsap.to(device, {
            opacity: 0,
            scale: 1.2,
            yPercent: -100,
            zIndex: 90 - i,
            overwrite: "auto"
          });
        } else {
          gsap.to(device, {
            opacity: 0,
            scale: 0.7,
            yPercent: 100,
            zIndex: 90 - i,
            overwrite: "auto"
          });
        }
      });
    };

    const mm = gsap.matchMedia();

    // 📱 Mobile (snap ON)
    mm.add("(max-width: 767px)", () => {
      gsap.timeline({
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
          onUpdate: (self) => handleUpdate(self.progress)
        }
      });
    });

    // 💻 Desktop (snap OFF)
    mm.add("(min-width: 768px)", () => {
      gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "+=400%",
          pin: true,
          scrub: 1,
          onUpdate: (self) => handleUpdate(self.progress)
        }
      });
    });

    return () => mm.revert();
  }, { scope: triggerRef });

  return (
    <section ref={triggerRef} className="h-screen w-full bg-[#050505] overflow-hidden flex flex-col relative">
      
      {/* Header */}
      <div className="h-[25vh] flex items-end px-6 pb-6 z-40 relative">
        <StageHeader stage={STAGES[activeStage]} isAr={isAr} index={activeStage} />
      </div>

      {/* Devices */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden">
        {DEVICE_TYPES.map((type, idx) => (
          <div
            key={type}
            className="mobile-device-wrapper absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 100 - idx }}
          >
            <div
              className="w-full flex items-center justify-center"
              style={{
                transform: `scale(${SCALE_MAP[type]})`,
                width: type === "desktop" || type === "laptop" ? "180%" : "100%"
              }}
            >
              <DeviceFrame type={type} active={activeStage === idx}>
                <div className="w-full h-full min-h-[450px] bg-[#0a0a0a] overflow-hidden">
                  <MockDeviceCanvas
                    title={isAr ? STAGES[idx].title2+ STAGES[idx].title2 : type.toUpperCase()}
                  />
                </div>
              </DeviceFrame>
            </div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div className="h-[10vh] flex flex-col items-center justify-center gap-4 z-50">
        <div className="flex gap-3">
          {STAGES.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 transition-all duration-500 rounded-full ${
                activeStage === i
                  ? "w-10 bg-cyan-500 shadow-[0_0_15px_#06b6d4]"
                  : "w-3 bg-white/10"
              }`}
            />
          ))}
        </div>
        <span className="text-[10px] font-mono text-white/20 tracking-[0.5em] uppercase">
          Nexus_OS / Stage 0{activeStage + 1}
        </span>
      </div>

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
};

export default ResponsiveMobileSection;