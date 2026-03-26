import { 
  Lightbulb, LayoutList, FileText, 
  Calendar, Users, MapPin 
} from "lucide-react";
import GlassBlock from "./GlassBlock";

interface ServicesSectionProps {
  locale?: "en" | "ar";
}

export default function ServicesSection({ locale = "en" }: ServicesSectionProps) {
  const translations = {
    en: {
      mainTitle: "Pre-Production",
      items: [
        { title: "Concept", desc: "Core story idea.", icon: Lightbulb, pos: "top-12 left-12", delay: "0s" },
        { title: "Planning", desc: "Production roadmap.", icon: LayoutList, pos: "top-12 right-12", delay: "0.5s" },
        { title: "Script", desc: "Creative writing.", icon: FileText, pos: "bottom-12 left-12", delay: "1s" },
        { title: "Schedule", desc: "Precise calendar.", icon: Calendar, pos: "bottom-12 right-12", delay: "1.5s" },
        { title: "Talent", desc: "Professional team.", icon: Users, pos: "top-1/2 -translate-y-1/2 left-8", delay: "2s" },
        { title: "Locations", desc: "Perfect backdrop.", icon: MapPin, pos: "top-1/2 -translate-y-1/2 right-8", delay: "2.5s" },
      ]
    },
    ar: {
      mainTitle: "ما قبل الإنتاج",
      items: [
        { title: "المفهوم", desc: "فكرة القصة الجوهرية.", icon: Lightbulb, pos: "top-12 right-12", delay: "0s" },
        { title: "التخطيط", desc: "خارطة طريق الإنتاج.", icon: LayoutList, pos: "top-12 left-12", delay: "0.5s" },
        { title: "السيناريو", desc: "كتابة إبداعية.", icon: FileText, pos: "bottom-12 right-12", delay: "1s" },
        { title: "الجدولة", desc: "جدول زمني دقيق.", icon: Calendar, pos: "bottom-12 left-12", delay: "1.5s" },
        { title: "المواهب", desc: "فريق عمل محترف.", icon: Users, pos: "top-1/2 -translate-y-1/2 right-8", delay: "2s" },
        { title: "المواقع", desc: "خلفية تصوير مثالية.", icon: MapPin, pos: "top-1/2 -translate-y-1/2 left-8", delay: "2.5s" },
      ]
    },
  };

  const t = translations[locale];
  const isAr = locale === "ar";

  return (
    <>
      {/* إضافة الـ Keyframes داخل السكشن أو في ملف CSS العالمي */}
      <style jsx>{`
        @keyframes custom-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: custom-float 4s ease-in-out infinite;
        }
      `}</style>

      <section 
        className="relative h-screen w-screen flex flex-col items-center py-16 px-10 overflow-hidden bg-transparent"
        dir={isAr ? "rtl" : "ltr"}
      >
        {/* العنوان */}
        <div className="relative z-50 text-center pointer-events-none select-none">
          <h2 className="text-6xl md:text-8xl font-[1000] text-white uppercase tracking-tighter italic leading-none drop-shadow-sm">
            {t.mainTitle}
          </h2>
          <div className="h-[1px] w-32 bg-white/20 mx-auto mt-6" />
        </div>

        {/* توزيع البطاقات مع تأثير الطفو */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {t.items.map((service, index) => (
            <div
              key={index}
              className={`absolute ${service.pos} pointer-events-auto transition-all duration-500 hover:scale-110 animate-float`}
              style={{ 
                width: "240px",
                animationDelay: service.delay // جعل الحركة غير منتظمة بين البطاقات
              }}
            >
              <GlassBlock 
                align={service.pos.includes("right") ? "right" : "left"}
                icon={service.icon} 
                title={service.title} 
                desc={service.desc} 
              />
            </div>
          ))}
        </div>

        {/* تذييل السكشن */}
        <div className="absolute bottom-10 z-50 flex flex-col items-center opacity-20 pointer-events-none">
          <span className="text-[10px] font-mono text-white tracking-[1em] uppercase">
            Phase_01 // Discovery
          </span>
        </div>
      </section>
    </>
  );
}