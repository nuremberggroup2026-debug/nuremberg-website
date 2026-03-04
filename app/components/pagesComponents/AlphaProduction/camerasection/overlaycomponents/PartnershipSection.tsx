"use client";
import { Users, PenTool, BarChart, Rocket } from "lucide-react";
import GlassBlock from "./GlassBlock";

interface PartnershipSectionProps {
  locale: "en" | "ar";
}

export default function PartnershipSection({ locale }: PartnershipSectionProps) {
  const sideArea =
    "w-[38%] h-full flex flex-col justify-center px-8 md:px-16 pointer-events-none";

  // =======================
  // الترجمات داخل الملف
  // =======================
  const translations = {
    en: {
      partnershipTitle: "PARTNERSHIP",
      partnershipDesc: "We don't just work for you; we work with you to align vision with market reality.",
      creativeTitle: "CREATIVE",
      creativeDesc: "Our creative labs develop unique concepts that break the digital noise.",
      analysisTitle: "ANALYSIS",
      analysisDesc: "Every shot is data-driven, ensuring high engagement and conversion rates.",
      launchTitle: "LAUNCH",
      launchDesc: "Full support during the project release to ensure maximum visual impact.",
    },
    ar: {
      partnershipTitle: "الشراكة",
      partnershipDesc: "نحن لا نعمل من أجلك فقط، بل نعمل معك لمواءمة الرؤية مع واقع السوق.",
      creativeTitle: "الإبداع",
      creativeDesc: "مختبراتنا الإبداعية تطور مفاهيم فريدة تكسر ضوضاء الرقمية.",
      analysisTitle: "التحليل",
      analysisDesc: "كل لقطة مبنية على البيانات لضمان تفاعل مرتفع ومعدلات تحويل عالية.",
      launchTitle: "الإطلاق",
      launchDesc: "دعم كامل أثناء إصدار المشروع لضمان أقصى تأثير بصري.",
    },
  };

  const t = translations[locale]; // نختار الترجمات حسب locale

  return (
    <section className="h-screen w-screen flex justify-between items-center">
      <div className={sideArea}>
        <GlassBlock
          icon={Users}
          title={t.partnershipTitle}
          desc={t.partnershipDesc}
        />
        <GlassBlock
          icon={PenTool}
          title={t.creativeTitle}
          desc={t.creativeDesc}
        />
      </div>
      <div className={`${sideArea} items-end`}>
        <GlassBlock
          align="right"
          icon={BarChart}
          title={t.analysisTitle}
          desc={t.analysisDesc}
        />
        <GlassBlock
          align="right"
          icon={Rocket}
          title={t.launchTitle}
          desc={t.launchDesc}
        />
      </div>
    </section>
  );
}