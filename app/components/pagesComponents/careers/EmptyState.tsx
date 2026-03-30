import React from "react";
import { Radar, Mail, Cpu } from "lucide-react";
import { Locale } from "@/types";

const t = {
  en: {
    dir: "ltr",
    font: "font-sans",
    tag: "System_Careers",
    title: "Active",
    title2: "Protocols",
    subtitle: "We are seeking elite minds to scale our production ecosystem. Initialize your journey below.",
    role: "Role",
    exp: "Experience",
    requirements: "Qualifications",
    applyBtn: "Apply For Position",
    nextSlot: "Next Slot",
  noJobsTitle: "No Open Positions",
noJobsTitle2: "",
noJobsDesc: "There are no job openings at the moment. Please check back later.",
    generalApply: "General Application",
    lastScan: "Last Scan: March 2026",
  },
  ar: {
    dir: "rtl",
    font: "font-sans", 
    tag: "وظائف_النظام",
    title: "بروتوكولات",
    title2: "التوظيف",
    subtitle: "نبحث عن عقول نخبويّة لتطوير منظومتنا الإنتاجية. ابدأ رحلتك التقنية معنا الآن.",
    role: "التخصص",
    exp: "الخبرة",
    requirements: "المتطلبات الأساسية",
    applyBtn: "تقديم الطلب",
    nextSlot: "الوظيفة التالية",
    noJobsTitle: "لا توجد وظائف حالياً",
noJobsTitle2: "",
noJobsDesc: "لا توجد وظائف شاغرة حالياً. يرجى التحقق مرة أخرى لاحقاً.",
    generalApply: "طلب توظيف عام",
    lastScan: "آخر فحص: مارس 2026",
  }
};

export const EmptyState = ({ locale }: { locale: Locale }) => {

    return (
    
  <div className="py-44 flex flex-col items-center justify-center text-center space-y-10 relative">
    {/* Radar Animation Background */}
    <div className="absolute inset-0 flex items-center justify-center -z-10 opacity-20">
      <div className="w-[300px] h-75 md:w-150 md:h-[600px] border border-cyan-500/20 rounded-full animate-ping" />
      <div className="absolute w-[200px] h-50 md:w-100 md:h-100 border border-cyan-500/10 rounded-full animate-pulse" />
    </div>

    <div className="p-8 bg-cyan-500/5 rounded-full border border-cyan-500/20 text-cyan-500">
      <Radar size={60} className="animate-pulse" />
    </div>

    <div className="space-y-4 max-w-xl px-4">
      <h3 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter leading-none">
        {t[`${locale}`].noJobsTitle} <span className="text-cyan-500">{t[`${locale}`].noJobsTitle2}</span>
      </h3>
      <p className="text-white/40 text-lg font-light leading-relaxed">
        {t[`${locale}`].noJobsDesc}
      </p>
    </div>

  
  </div>
);
}