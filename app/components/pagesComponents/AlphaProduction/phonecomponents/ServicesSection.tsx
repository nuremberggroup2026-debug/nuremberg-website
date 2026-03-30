"use client";

import {
  Lightbulb,
  LayoutList,
  FileText,
  Calendar,
  Users,
  MapPin,
} from "lucide-react";

interface ServicesSectionMobileProps {
  locale: "en" | "ar";
}

export default function ServicesSectionMobile({
  locale,
}: ServicesSectionMobileProps) {
  const translations = {
    en: {
      mainTitle: "Pre-Production",
      items: [
        { title: "Concept", desc: "Core story idea.", icon: Lightbulb },
        { title: "Planning", desc: "Production roadmap.", icon: LayoutList },
        { title: "Script", desc: "Creative writing.", icon: FileText },
        { title: "Schedule", desc: "Precise calendar.", icon: Calendar },
        { title: "Talent", desc: "Professional team.", icon: Users },
        { title: "Locations", desc: "Perfect backdrop.", icon: MapPin },
      ],
    },
    ar: {
      mainTitle: "ما قبل الإنتاج",
      items: [
        { title: "المفهوم", desc: "فكرة القصة الجوهرية.", icon: Lightbulb },
        { title: "التخطيط", desc: "خارطة طريق الإنتاج.", icon: LayoutList },
        { title: "السيناريو", desc: "كتابة إبداعية.", icon: FileText },
        { title: "الجدولة", desc: "جدول زمني دقيق.", icon: Calendar },
        { title: "المواهب", desc: "فريق عمل محترف.", icon: Users },
        { title: "المواقع", desc: "خلفية تصوير مثالية.", icon: MapPin },
      ],
    },
  };

  const t = translations[locale];

  return (
    <section
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="h-screen w-full bg-black text-white px-6 py-14 flex flex-col justify-center"
    >
      <div className="max-w-sm mx-auto w-full">

        {/* Title */}
        <h2 className="text-3xl font-[1000] italic uppercase leading-tight">
          {t.mainTitle}
        </h2>

        <div className="w-12 h-[2px] bg-white/20 mt-5 mb-8" />

        {/* Grid بدل الفوضى */}
        <div className="grid grid-cols-2 gap-4">

          {t.items.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="p-4 bg-zinc-900/60 backdrop-blur-xl rounded-2xl border border-white/10 flex flex-col gap-3"
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
            Phase_01 // Discovery
          </span>
        </div>

      </div>
    </section>
  );
}