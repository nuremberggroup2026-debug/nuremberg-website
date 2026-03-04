"use client";
import { Cpu, HardDrive, Monitor, Disc } from "lucide-react";
import GlassBlock from "./GlassBlock";

interface InfrastructureSectionProps {
  locale: "en" | "ar";
}

export default function InfrastructureSection({ locale }: InfrastructureSectionProps) {
  const sideArea =
    "w-[38%] h-full flex flex-col justify-center px-8 md:px-16 pointer-events-none";

  // =======================
  // الترجمات داخل الملف
  // =======================
  const translations = {
    en: {
      computeTitle: "COMPUTE",
      computeDesc: "High-performance render farms for ultra-fast 3D processing.",
      storageTitle: "STORAGE",
      storageDesc: "Secure redundancy for all raw cinematic assets.",
      gradingTitle: "GRADING",
      gradingDesc: "Reference-level color monitoring for flawless visual output.",
      acousticsTitle: "ACOUSTICS",
      acousticsDesc: "Master-grade sound labs for immersive spatial audio.",
    },
    ar: {
      computeTitle: "الحوسبة",
      computeDesc: "مزارع معالجة عالية الأداء لتسريع معالجة الرسوم الثلاثية الأبعاد.",
      storageTitle: "التخزين",
      storageDesc: "نسخ احتياطي آمن لجميع المواد السينمائية الخام.",
      gradingTitle: "تصحيح الألوان",
      gradingDesc: "مراقبة ألوان احترافية لضمان إخراج بصري مثالي.",
      acousticsTitle: "الصوتيات",
      acousticsDesc: "مختبرات صوتية متقدمة لتجربة صوتية غامرة.",
    },
  };

  const t = translations[locale]; // نختار الترجمات المناسبة حسب locale

  return (
    <section className="h-screen w-screen flex justify-between items-center px-4">
      <div className={sideArea}>
        <GlassBlock
          icon={Cpu}
          title={t.computeTitle}
          desc={t.computeDesc}
        />
        <GlassBlock
          icon={HardDrive}
          title={t.storageTitle}
          desc={t.storageDesc}
        />
      </div>
      <div className={`${sideArea} items-end`}>
        <GlassBlock
          align="right"
          icon={Monitor}
          title={t.gradingTitle}
          desc={t.gradingDesc}
        />
        <GlassBlock
          align="right"
          icon={Disc}
          title={t.acousticsTitle}
          desc={t.acousticsDesc}
        />
      </div>
    </section>
  );
}