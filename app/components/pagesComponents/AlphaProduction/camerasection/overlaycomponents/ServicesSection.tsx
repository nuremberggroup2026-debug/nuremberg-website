"use client";
import { Target, Camera, Scissors, Layers } from "lucide-react";
import GlassBlock from "./GlassBlock";

interface ServicesSectionProps {
  locale?: "en" | "ar"; // يدعم الإنجليزية أو العربية
}

export default function ServicesSection({ locale = "en" }: ServicesSectionProps) {
  const sideArea =
    "w-[38%] h-full flex flex-col justify-center px-8 md:px-16 pointer-events-none";

  // ترجمات النصوص
  const translations = {
    en: [
      { title: "STRATEGY", desc: "Defining your narrative and target audience before we even hit record." },
      { title: "FILMING", desc: "Capture every detail with our state-of-the-art 8K cinematic workflow." },
      { title: "POST_PROD", desc: "Precision editing and color grading that turns footage into emotion." },
      { title: "MOTION", desc: "Advanced visual effects and 3D graphics to amplify your brand." },
    ],
    ar: [
      { title: "استراتيجية", desc: "تحديد سردك والجمهور المستهدف قبل البدء في التصوير." },
      { title: "التصوير", desc: "التقاط كل التفاصيل باستخدام سير عمل سينمائي بدقة 8K." },
      { title: "مرحلة_ما بعد الإنتاج", desc: "تحرير دقيق وتصحيح ألوان يحوّل اللقطات إلى تجربة عاطفية." },
      { title: "الحركة", desc: "تأثيرات بصرية متقدمة ورسومات ثلاثية الأبعاد لتعزيز علامتك التجارية." },
    ],
  };

  const t = translations[locale];

  return (
    <section dir={locale === "ar" ? "rtl" : "ltr"} className="h-screen w-screen flex justify-between items-center px-4">
      <div className={sideArea}>
        <GlassBlock icon={Target} title={t[0].title} desc={t[0].desc} />
        <GlassBlock icon={Camera} title={t[1].title} desc={t[1].desc} />
      </div>
      <div className={`${sideArea} items-end`}>
        <GlassBlock align="right" icon={Scissors} title={t[2].title} desc={t[2].desc} />
        <GlassBlock align="right" icon={Layers} title={t[3].title} desc={t[3].desc} />
      </div>
    </section>
  );
}