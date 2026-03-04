"use client";

import Canvass from "./robotsection/Canvas";
import gsap from "gsap";
import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { homeData } from "@/data/Homadata";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
  const locale = useLocale() as "en" | "ar"; // تحديد اللغة
  const [robotRotate, setRobotRotate] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  // اختيار المحتوى حسب اللغة
  const content = homeData[locale]?.section2 || homeData.en.section2;

  const alignClasses = [
    "items-start text-left ml-10",
    "items-end text-right mr-10",
    "items-start text-left ml-10",
  ];

  // إحداثيات حسب اللغة
  const positionsByLocale: Record<"en" | "ar", { x: string; y: string; rotate: string }[]> = {
    en: [
      { x: "64vw", y: "10vh", rotate: "left" },
      { x: "9vw", y: "110vh", rotate: "right" },
      { x: "64vw", y: "210vh", rotate: "left" },
    ],
    ar: [
      { x: "-64vw", y: "10vh", rotate: "right" },
      { x: "-9vw", y: "110vh", rotate: "left" },
      { x: "-64vw", y: "210vh", rotate: "right" },
    ],
  };
  const positions = positionsByLocale[locale];

  useGSAP(
    () => {
      // حركة رفع وخفض العنصر
      gsap.to(".canvass", {
        translateY: "8vh",
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        duration: 2,
      });

      const sections = content.map((item) => item.id);

      // Snap ScrollTrigger رئيسي
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        snap: {
          snapTo: (progress) => {
            const snapPoints = sections.length - 1;
            const step = 1 / snapPoints;
            const current = Math.round(progress / step) * step;
            const diff = Math.abs(progress - current);
            return diff > step * 0.25 ? current : progress;
          },
          duration: { min: 0.4, max: 0.7 },
          ease: "power2.out",
        },
      });

      sections.forEach((section, i) => {
        // ظهور النصوص عند الدخول
        ScrollTrigger.create({
          trigger: `.${section}`,
          start: "top center",
          once: true,
          onEnter: () => {
            gsap.fromTo(
              `.${section} .section-text`,
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, stagger: 0.15, duration: 1, ease: "power3.out", delay: 1 }
            );
          },
        });

        // حركة الروبوت عند الدخول والعودة
        ScrollTrigger.create({
          trigger: `.${section}`,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            gsap.to(".canvas", { x: positions[i].x, y: positions[i].y, duration: 1.5, ease: "expo.inOut" });
            setRobotRotate(positions[i].rotate);
          },
          onEnterBack: () => {
            gsap.to(".canvas", { x: positions[i].x, y: positions[i].y, duration: 1.5, ease: "expo.inOut" });
            setRobotRotate(positions[i].rotate);
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative w-full overflow-hidden font-sans">
      {/* عنصر الروبوت */}
      <div className="canvass relative z-10 pointer-events-none ">
        <section className="absolute  w-[45vw] h-[75vh] canvas flex items-center">
          <Canvass robotRotate={robotRotate} setRobotRotate={setRobotRotate} />
        </section>
      </div>

      {/* محتوى الأقسام */}
      {content.map((item, idx) => {
        const isRightAligned = idx % 2 !== 0;

        return (
          <section
            key={item.id}
            className={`${item.id} h-screen flex flex-col justify-center relative z-20 px-8 lg:px-32 ${alignClasses[idx]}`}
          >
            {/* الرقم الخلفي */}
            <div
              className={`absolute font-black text-[20vw] leading-none select-none pointer-events-none opacity-[0.03] text-cyan-500 z-0 ${
                isRightAligned ? "left-10" : "right-10"
              }`}
            >
              {item.num}
            </div>

            <div className={`max-w-4xl flex flex-col relative z-10 ${isRightAligned ? "items-end text-right" : "items-start text-left"}`}>
              {/* Label */}
              <div className="section-text flex items-center gap-3 opacity-0 mb-6">
                {!isRightAligned && <div className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4] animate-pulse" />}
                <span className="text-cyan-500 font-mono text-[10px] tracking-[0.6em] uppercase font-bold italic">
                  {item.label} _ {item.num}
                </span>
                {isRightAligned && <div className="h-2 w-2 bg-cyan-500 rounded-full shadow-[0_0_10px_#06b6d4] animate-pulse" />}
              </div>

              {/* العنوان */}
              <h1 className="section-text text-7xl text-white md:text-[8.5rem] font-[1000] italic uppercase tracking-tighter opacity-0 leading-[0.8] mb-10">
                {item.title.split(" ")[0]} <br />
                <span className="text-transparent" style={{ WebkitTextStroke: '1px #06b6d4' }}>
                  {item.title.split(" ")[1]}
                </span>
              </h1>

              {/* الوصف مع الشريط الجانبي */}
              <div className={`section-text flex flex-col opacity-0 ${isRightAligned ? "items-end" : "items-start"}`}>
                <div className="w-32 h-[2px] bg-cyan-500 shadow-[0_0_10px_#06b6d4] mb-8" />
                <div className={`border-cyan-500/20 max-w-xl ${isRightAligned ? "border-r-4 pr-8" : "border-l-4 pl-8"}`}>
                  <p className="text-gray-400 font-mono text-sm md:text-lg leading-relaxed uppercase tracking-tight italic">
                    {item.desc}
                  </p>
                </div>
                {/* HUD */}
                <div className="mt-8 flex gap-6 opacity-20 text-[8px] font-mono text-white uppercase tracking-[0.4em]">
                  <span>Status: Optimized</span>
                  <span>Sync: Stable</span>
                  <span>Active_Core: v4.2</span>
                </div>
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}