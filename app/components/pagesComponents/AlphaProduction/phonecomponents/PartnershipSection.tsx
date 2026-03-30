"use client";

import {
  Settings,
  Video,
  Mic,
  Sun,
  Sparkles,
  Handshake,
} from "lucide-react";

interface ProductionSectionMobileProps {
  locale: "en" | "ar";
}

export default function ProductionSectionMobile({
  locale,
}: ProductionSectionMobileProps) {
  const isAr = locale === "ar";

  const translations = {
    en: {
      mainTitle: "Production",
      items: [
        { title: "Management", desc: "Overseeing the entire workflow.", icon: Settings },
        { title: "Directing", desc: "Visionary leadership on set.", icon: Video },
        { title: "Recording", desc: "High-fidelity video & audio.", icon: Mic },
        { title: "Lighting", desc: "Atmospheric visual depth.", icon: Sun },
        { title: "Styling", desc: "Makeup & wardrobe prep.", icon: Sparkles },
        { title: "Assistance", desc: "Essential ground support.", icon: Handshake },
      ],
    },
    ar: {
      mainTitle: "خدمات الإنتاج",
      items: [
        { title: "إدارة الإنتاج", desc: "الإشراف الكامل على العمل.", icon: Settings },
        { title: "الإخراج", desc: "قيادة الرؤية الفنية.", icon: Video },
        { title: "التسجيل", desc: "التقاط فائق الدقة.", icon: Mic },
        { title: "الإضاءة", desc: "خلق عمق بصري.", icon: Sun },
        { title: "التجهيز", desc: "المكياج والأزياء.", icon: Sparkles },
        { title: "الدعم", desc: "المساعدة اللوجستية.", icon: Handshake },
      ],
    },
  };

  const t = translations[locale];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="h-screen w-full bg-black text-white px-6 py-14 flex flex-col justify-center relative overflow-hidden"
    >
      {/* خلفية خفيفة تعطي نفس الإحساس */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.06),_transparent_70%)]" />

      <div className="relative z-10 max-w-sm mx-auto w-full">

        {/* Title */}
        <h2 className="text-3xl font-[1000] italic uppercase leading-tight">
          {t.mainTitle}
        </h2>

        <div className="w-12 h-[2px] bg-white/20 mt-5 mb-8" />

        {/* Grid */}
        <div className="grid grid-cols-2 gap-4">

          {t.items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="p-4 rounded-2xl bg-zinc-900/60 backdrop-blur-xl border border-white/10 flex flex-col gap-3 transition-transform duration-300 active:scale-95"
              >
                <Icon size={18} className="text-cyan-500" />

                <div>
                  <h3 className="text-sm font-bold">
                    {item.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 mt-1 leading-5">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

        {/* Footer */}
        <div className="mt-10 text-center opacity-30">
          <span className="text-[10px] font-mono tracking-[0.4em] uppercase">
            Phase_02 // Execution
          </span>
        </div>

      </div>
    </section>
  );
}