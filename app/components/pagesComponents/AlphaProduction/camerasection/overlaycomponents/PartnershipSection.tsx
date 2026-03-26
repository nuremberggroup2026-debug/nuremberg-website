import { 
  Settings, 
  Video, 
  Mic, 
  Sun, 
  Sparkles,
  Handshake
} from "lucide-react";
import GlassBlock from "./GlassBlock";

interface ProductionSectionProps {
  locale: "en" | "ar";
}

export default function ProductionSection({ locale }: ProductionSectionProps) {
  const isAr = locale === "ar";

  const translations = {
    en: {
      mainTitle: "Production",
      items: [
        { title: "Management", desc: "Overseeing the entire workflow.", icon: Settings, pos: "top-12 left-12", delay: "0s" },
        { title: "Directing", desc: "Visionary leadership on set.", icon: Video, pos: "top-12 right-12", delay: "0.5s" },
        { title: "Recording", desc: "High-fidelity video & audio.", icon: Mic, pos: "bottom-12 left-12", delay: "1s" },
        { title: "Lighting", desc: "Atmospheric visual depth.", icon: Sun, pos: "bottom-12 right-12", delay: "1.5s" },
        { title: "Styling", desc: "Makeup & wardrobe prep.", icon: Sparkles, pos: "top-1/2 -translate-y-1/2 left-8", delay: "2s" },
        { title: "Assistance", desc: "Essential ground support.", icon: Handshake, pos: "top-1/2 -translate-y-1/2 right-8", delay: "2.5s" },
      ],
    },
    ar: {
      mainTitle: "خدمات الإنتاج",
      items: [
        { title: "إدارة الإنتاج", desc: "الإشراف الكامل على العمل.", icon: Settings, pos: "top-12 right-12", delay: "0s" },
        { title: "الإخراج", desc: "قيادة الرؤية الفنية.", icon: Video, pos: "top-12 left-12", delay: "0.5s" },
        { title: "التسجيل", desc: "التقاط فائق الدقة.", icon: Mic, pos: "bottom-12 right-12", delay: "1s" },
        { title: "الإضاءة", desc: "خلق عمق بصري.", icon: Sun, pos: "bottom-12 left-12", delay: "1.5s" },
        { title: "التجهيز", desc: "المكياج والأزياء.", icon: Sparkles, pos: "top-1/2 -translate-y-1/2 right-8", delay: "2s" },
        { title: "الدعم", desc: "المساعدة اللوجستية.", icon: Handshake, pos: "top-1/2 -translate-y-1/2 left-8", delay: "2.5s" },
      ],
    },
  };

  const t = translations[locale];

  return (
    <>
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
        {/* العنوان الرئيسي: نفس التصميم السابق (Bold, Italic, White) */}
        <div className="relative z-50 text-center pointer-events-none select-none">
          <h2 className="text-6xl md:text-5xl font-[1000] text-white uppercase tracking-tighter italic leading-none drop-shadow-sm">
            {t.mainTitle}
          </h2>
          <div className="h-[1px] w-32 bg-white/20 mx-auto mt-6" />
        </div>

        {/* توزيع البطاقات في الهوامش لترك المركز لمجسم الـ 3D */}
        <div className="absolute inset-0 w-full h-full pointer-events-none">
          {t.items.map((service, index) => (
            <div
              key={index}
              className={`absolute ${service.pos} pointer-events-auto transition-transform duration-500 hover:scale-110 animate-float`}
              style={{ 
                width: "240px",
                animationDelay: service.delay 
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

        {/* تذييل تقني خفيف */}
        <div className="absolute bottom-10 z-50 flex flex-col items-center opacity-20 pointer-events-none">
          <span className="text-[10px] font-mono text-white tracking-[1em] uppercase">
            Phase_02 // Execution
          </span>
        </div>
      </section>
    </>
  );
}