"use client";
import React, { RefObject } from "react";
import { ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";

interface HeroSectionProps {
  heroRef: RefObject<HTMLDivElement | null>;
  arrowsContainer: RefObject<HTMLDivElement | null>;
  scrollToScene: () => void;
}

export default function HeroSection({
  heroRef,
  arrowsContainer,
  scrollToScene,
}: HeroSectionProps) {
  const locale = useLocale();

  // النصوص حسب اللغة
  const messages: Record<string, Record<string, string>> = {
    en: {
      title: "ALPHA PROD.",
      highlight: "PROD.",
      subtitle: "We Tell Your Story",
      start: "Start Experience",
      description: `Alpha Production was established to 
      redefine your visual perspective. We guide you through every creative phase, leveraging
      professional mastery to ensure your story is told with precision.`,
    },
    ar: {
      title: "ألفا",
      highlight: "الإنتاج",
      subtitle: "نروي قصتك",
      start: "ابدأ التجربة",
      description: `تأسست ألفا للإنتاج لإعادة تعريف رؤيتك البصرية. 
      نحن نرشدك خلال كل مرحلة إبداعية، مستفيدين من الخبرة المهنية لضمان سرد قصتك بدقة.`,
    },
  };

  const t = messages[locale as keyof typeof messages];

  return (
    <div
      ref={heroRef}
      className="h-screen w-full relative flex flex-col items-center justify-center snap-start"
    >
      {/* خلفية */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      >
        <div className="absolute inset-0 bg-black/75 bg-[radial-gradient(circle_at_center,_transparent_10%,_#000000_100%)]" />
      </div>

      {/* المحتوى */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="space-y-4">
          <h1 className="text-white text-[11vw] md:text-[8vw] font-[1000] italic leading-none tracking-tighter uppercase">
            {t.title}{" "}
            <span className="text-cyan-500">{t.highlight}</span>
          </h1>
          <p className="text-cyan-500/80 text-sm md:text-xl tracking-[1.2em] font-light uppercase">
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-xl mx-auto p-6 border-t border-white/10">
          <p className="text-gray-400 text-[11px] md:text-xs leading-[2] font-medium tracking-wide">
            {t.description.split("\n").map((line, idx) => (
              <span key={idx} className="block">
                {line.trim()}
              </span>
            ))}
          </p>
        </div>

        <div
          onClick={scrollToScene}
          className=" flex flex-col items-center gap-4 group cursor-pointer"
        >
          <span className="text-[9px] font-black tracking-[0.6em] text-cyan-500 animate-pulse uppercase">
            {t.start}
          </span>
          <div ref={arrowsContainer} className="flex flex-col items-center">
            <ChevronDown size={28} className="arrow-icon text-cyan-500 -mb-4" />
            <ChevronDown size={28} className="arrow-icon text-cyan-500/40 -mb-4" />
            <ChevronDown size={28} className="arrow-icon text-cyan-500/10" />
          </div>
        </div>
      </div>
    </div>
  );
}