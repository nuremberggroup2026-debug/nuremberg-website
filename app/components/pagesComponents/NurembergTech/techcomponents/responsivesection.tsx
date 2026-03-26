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

const ResponsiveSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const laptopContentRef = useRef<HTMLDivElement>(null);
  const tabletContentRef = useRef<HTMLDivElement>(null);
  const phoneContentRef = useRef<HTMLDivElement>(null);

  const [activeStage, setActiveStage] = useState(0);
  const isAr = useLocale() === "ar";

  const STAGES = isAr
    ? [
        {
          title: "دقة سطح المكتب",
          desc: "استمتع بكامل قوة واجهات سطح المكتب عالية الجودة."
        },
        {
          title: "مرونة اللابتوب",
          desc: "أداء سلس ومثالي لبيئات العمل المتنقلة."
        },
        {
          title: "سلاسة التابلت",
          desc: "تصميمات تعمل باللمس لتجربة إبداعية مرنة."
        },
        {
          title: "بساطة الموبايل",
          desc: "استجابة مثالية تناسب استخدامك اليومي بيد واحدة."
        }
      ]
    : [
        {
          title: "Desktop Precision",
          desc: "Experience the full scale of high-fidelity desktop interfaces."
        },
        {
          title: "Laptop Agility",
          desc: "Seamless performance optimized for professional portable workflows."
        },
        {
          title: "Tablet Fluidity",
          desc: "Intuitive touch-first designs crafted for creative freedom."
        },
        {
          title: "Mobile Instinct",
          desc: "Pixel-perfect responsiveness for the palm of your hand."
        }
      ];

  useGSAP(() => {
    if (!sectionRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=600%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const currentStage = p < 0.25 ? 0 : p < 0.5 ? 1 : p < 0.75 ? 2 : 3;
          setActiveStage((prev) =>
            prev !== currentStage ? currentStage : prev
          );
        }
      }
    });

    tl.to(progressBarRef.current, { scaleX: 1, ease: "none" }, 0);

    tl.to(desktopContentRef.current, { yPercent: -88, ease: "none" }, 0)
      .to(laptopContentRef.current, { yPercent: -88, ease: "none" }, 0)
      .to(tabletContentRef.current, { yPercent: -85, ease: "none" }, 0)
      .to(phoneContentRef.current, { yPercent: -82, ease: "none" }, 0);
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="h-screen flex flex-col items-center bg-[#050505] overflow-hidden relative"
    >
      {/* Header */}
      <div className="w-full pt-[8vh] pb-[2vh] z-20">
        <StageHeader stage={STAGES[activeStage]} index={activeStage} />
      </div>

      {/* Devices */}
      <div className="relative w-full max-w-[1500px] flex-1 flex items-end justify-center gap-2 md:gap-6 pb-16 px-4 z-10">
        <DeviceFrame type="desktop" active={activeStage === 0}>
          <div ref={desktopContentRef} className="absolute top-0 left-0 w-full">
            <MockDeviceCanvas title={isAr ? "سطح المكتب" : "Nexus_OS Desktop"} />
          </div>
        </DeviceFrame>

        <DeviceFrame type="laptop" active={activeStage === 1}>
          <div ref={laptopContentRef} className="absolute top-0 left-0 w-full">
            <MockDeviceCanvas title={isAr ? "لابتوب" : "MacBook_Pro_16"} />
          </div>
        </DeviceFrame>

        <DeviceFrame type="tablet" active={activeStage === 2}>
          <div ref={tabletContentRef} className="absolute top-0 left-0 w-full">
            <MockDeviceCanvas title={isAr ? "تابلت" : "iPad_Air_M2"} />
          </div>
        </DeviceFrame>

        <DeviceFrame type="phone" active={activeStage === 3}>
          <div ref={phoneContentRef} className="absolute top-0 left-0 w-full">
            <MockDeviceCanvas title={isAr ? "موبايل" : "iPhone_16_Pro"} />
          </div>
        </DeviceFrame>
      </div>

      {/* Progress */}
      <div  className="absolute bottom-0 left-0 w-full h-[2px] bg-white/5 z-50">
        <div
          ref={progressBarRef}
          className="h-full bg-cyan-500 shadow-[0_0_15px_#06b6d4] origin-left scale-x-0"
        />

 
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1/4 bg-cyan-500/5 blur-[120px] pointer-events-none" />
    </section>
  );
};

export default ResponsiveSection;