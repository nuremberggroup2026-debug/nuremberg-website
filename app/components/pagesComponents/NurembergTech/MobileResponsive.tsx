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

  // Scale mapping for devices (Desktop & Laptop أكبر)
  const SCALE_MAP: Record<string, number> = {
    desktop: 0.85,
    laptop: 0.85,
    tablet: 0.75,
    phone: .85
  };

  useGSAP(() => {
    const devices = gsap.utils.toArray<HTMLDivElement>(".mobile-device-wrapper");

    // Hide all initially
    gsap.set(devices, { yPercent: 100, opacity: 0, scale: 0.7 });
    gsap.set(devices[0], { yPercent: 0, opacity: 1, scale: SCALE_MAP[DEVICE_TYPES[0]], zIndex: 100 });

    // Timeline with onUpdate controlling visibility for all devices
    gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current,
        start: "top top",
        end: "+=400%",
        pin: true,
        scrub: 1,
        snap: { snapTo: 1 / (DEVICE_TYPES.length - 1), duration: 0.5, ease: "power2.inOut" },
        onUpdate: (self) => {
          const stage = Math.round(self.progress * (DEVICE_TYPES.length - 1));
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
        }
      }
    });
  }, { scope: triggerRef });

  return (
    <section ref={triggerRef} className="h-screen w-full bg-[#050505] overflow-hidden flex flex-col relative">
      
      {/* Header */}
      <div className="h-[25vh] flex items-end px-6 pb-6 z-40 relative">
        <StageHeader stage={STAGES[activeStage]} index={activeStage} />
      </div>

      {/* Device Content */}
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
                  <MockDeviceCanvas title={isAr ? STAGES[idx].title : type.toUpperCase()} />
                </div>
              </DeviceFrame>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation / Progress */}
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

      {/* Ambient Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.03)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
};

export default ResponsiveMobileSection;