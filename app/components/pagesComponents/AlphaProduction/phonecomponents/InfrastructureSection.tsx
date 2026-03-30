"use client";

import {
  Scissors,
  Type,
  Layers,
  Music,
  Cpu,
  Share2,
} from "lucide-react";

interface PostProductionSectionMobileProps {
  locale: "en" | "ar";
}

export default function PostProductionSectionMobile({
  locale,
}: PostProductionSectionMobileProps) {
  const isAr = locale === "ar";

  const translations = {
    en: {
      mainTitle: "Post-Production",
      items: [
        { title: "Video Editing", desc: "Crafting the perfect visual flow.", icon: Scissors },
        { title: "Motion Graphics", desc: "Dynamic titles and VFX magic.", icon: Type },
        { title: "Sound Design", desc: "Custom scores and spatial audio.", icon: Music },
        { title: "3D & VFX", desc: "Special effects and 3D magic.", icon: Layers },
        { title: "Encoding", desc: "Optimizing for every platform.", icon: Cpu },
        { title: "Distribution", desc: "Full delivery to global networks.", icon: Share2 },
      ],
    },
    ar: {
      mainTitle: "ما بعد الإنتاج",
      items: [
        { title: "تحرير الفيديو", desc: "صياغة التدفق البصري المثالي.", icon: Scissors },
        { title: "الجرافيك المتحرك", desc: "عناوين ديناميكية ومؤثرات.", icon: Type },
        { title: "هندسة الصوت", desc: "تأليف موسيقي وهندسة صوتية.", icon: Music },
        { title: "المؤثرات البصرية", desc: "سحر الأبعاد الثلاثية والـ VFX.", icon: Layers },
        { title: "المعالجة والترميز", desc: "تحسين الجودة لكل المنصات.", icon: Cpu },
        { title: "التوزيع الرقمي", desc: "توصيل المحتوى للعالم.", icon: Share2 },
      ],
    },
  };

  const t = translations[locale];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="h-screen w-full bg-black text-white px-6 py-14 flex flex-col justify-center relative overflow-hidden"
    >
      {/* خلفية أدق (أخف من production) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,255,255,0.04),_transparent_70%)]" />

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
                className="p-4 rounded-2xl bg-zinc-900/50 backdrop-blur-lg border border-white/10 flex flex-col gap-3"
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
            Phase_03 // Finalization
          </span>
        </div>

      </div>
    </section>
  );
}