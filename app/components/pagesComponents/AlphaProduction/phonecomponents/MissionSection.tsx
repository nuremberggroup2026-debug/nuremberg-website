"use client";

import { Globe, Zap } from "lucide-react";

interface MissionSectionMobileProps {
  locale: "en" | "ar";
}

export default function MissionSectionMobile({
  locale,
}: MissionSectionMobileProps) {
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
    <section
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="h-screen w-full relative flex items-center justify-center px-6 bg-black overflow-hidden"
    >
      {/* خلفية خفيفة مثل الأصل */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.08),_transparent_70%)]" />

      <div className="relative z-10 w-full max-w-sm flex flex-col gap-10">

        {/* BOX الرئيسي (نفس فكرة الديسكتوب) */}
        <div className="p-6 bg-zinc-900/60 backdrop-blur-xl rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(0,0,0,0.6)]">

          <h2 className="text-3xl font-[1000] italic leading-tight uppercase mb-4">
            {t.title.split(" ")[0]}{" "}
            <span className="text-cyan-500">{t.highlight}</span>
          </h2>

          <p className="text-gray-300 text-sm leading-6">
            {t.description}
          </p>
        </div>

        {/* CAPSULES بس بشكل مناسب للموبايل */}
        <div className="flex flex-col gap-4">

          <div className="flex items-center justify-between px-5 py-4 bg-zinc-900/70 backdrop-blur-md rounded-full border border-cyan-500/20">
            <div className="flex items-center gap-3">
              <Globe size={18} className="text-cyan-500" />
              <span className="text-[11px] font-black tracking-[0.3em]">
                {t.global}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 py-4 bg-zinc-900/70 backdrop-blur-md rounded-full border border-cyan-500/20">
            <div className="flex items-center gap-3">
              <Zap size={18} className="text-cyan-500" />
              <span className="text-[11px] font-black tracking-[0.3em]">
                {t.elite}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}