"use client";
import { Globe, Zap } from "lucide-react";

interface MissionSectionProps {
  locale?: "en" | "ar"; // يدعم الإنجليزية أو العربية
}

export default function MissionSection({ locale = "en" }: MissionSectionProps) {
  const sideArea =
    "w-[38%] h-full flex flex-col justify-center px-8 md:px-16 pointer-events-none";

  // ترجمات النصوص
  const translations = {
    en: {
      title: "OUR MISSION",
      highlight: "MISSION",
      description:
        "We bridge the gap between creative vision and technical execution. Our goal is to make your brand unforgettable through visual storytelling.",
      global: "GLOBAL_PRESENCE",
      elite: "ELITE_WORKFLOW",
    },
    ar: {
      title: "مهمتنا",
      highlight: "MISSION",
      description:
        "نجسر الفجوة بين الرؤية الإبداعية والتنفيذ التقني. هدفنا هو جعل علامتك التجارية لا تُنسى من خلال السرد البصري المتميز.",
      global: "الوجود_العالمي",
      elite: "سير_عمل_نخبوي",
    },
  };

  const t = translations[locale];

  return (
    <section dir={locale === "ar" ? "rtl" : "ltr"} className="h-screen w-screen flex justify-between items-center">
      <div className={sideArea}>
        <div className="pointer-events-auto p-10 bg-zinc-900/50 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
          <h2 className="text-5xl font-[1000] italic mb-6 leading-tight uppercase">
            {t.title}
            <br />
            <span className="text-cyan-500">{t.highlight}</span>
          </h2>
          <p className="text-sm normal-case leading-loose text-gray-300 font-medium tracking-wide">
            {t.description}
          </p>
        </div>
      </div>

      <div className={`${sideArea} items-end space-y-6`}>
        <div className="pointer-events-auto px-8 py-5 bg-zinc-900/80 backdrop-blur-md rounded-full border border-cyan-500/30 flex items-center gap-5 hover:border-cyan-500 transition-all">
          <Globe size={22} className="text-cyan-500" />
          <span className="text-[11px] font-black tracking-[0.5em]">{t.global}</span>
        </div>
        <div className="pointer-events-auto px-8 py-5 bg-zinc-900/80 backdrop-blur-md rounded-full border border-cyan-500/30 flex items-center gap-5 hover:border-cyan-500 transition-all">
          <Zap size={22} className="text-cyan-500" />
          <span className="text-[11px] font-black tracking-[0.5em]">{t.elite}</span>
        </div>
      </div>
    </section>
  );
}