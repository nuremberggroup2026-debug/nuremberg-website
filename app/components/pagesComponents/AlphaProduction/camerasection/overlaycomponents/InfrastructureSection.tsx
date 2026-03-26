import { 
  Scissors, 
  Type, 
  Layers, 
  Music, 
  Cpu, 
  Share2 
} from "lucide-react";
import GlassBlock from "./GlassBlock";

interface PostProductionSectionProps {
  locale: "en" | "ar";
}

export default function PostProductionSection({ locale }: PostProductionSectionProps) {
  const isAr = locale === "ar";

  const translations = {
    en: {
      mainTitle: "Post-Production",
      items: [
        { title: "Video Editing", desc: "Crafting the perfect visual flow.", icon: Scissors, pos: "top-12 left-12", delay: "0s" },
        { title: "Motion Graphics", desc: "Dynamic titles and VFX magic.", icon: Type, pos: "top-12 right-12", delay: "0.5s" },
        { title: "Sound Design", desc: "Custom scores and spatial audio.", icon: Music, pos: "bottom-12 left-12", delay: "1s" },
        { title: "3D & VFX", desc: "Special effects and 3D magic.", icon: Layers, pos: "bottom-12 right-12", delay: "1.5s" },
        { title: "Encoding", desc: "Optimizing for every platform.", icon: Cpu, pos: "top-1/2 -translate-y-1/2 left-8", delay: "2s" },
        { title: "Distribution", desc: "Full delivery to global networks.", icon: Share2, pos: "top-1/2 -translate-y-1/2 right-8", delay: "2.5s" },
      ],
    },
    ar: {
      mainTitle: "ما بعد الإنتاج",
      items: [
        { title: "تحرير الفيديو", desc: "صياغة التدفق البصري المثالي.", icon: Scissors, pos: "top-12 right-12", delay: "0s" },
        { title: "الجرافيك المتحرك", desc: "عناوين ديناميكية ومؤثرات.", icon: Type, pos: "top-12 left-12", delay: "0.5s" },
        { title: "هندسة الصوت", desc: "تأليف موسيقي وهندسة صوتية.", icon: Music, pos: "bottom-12 right-12", delay: "1s" },
        { title: "المؤثرات البصرية", desc: "سحر الأبعاد الثلاثية والـ VFX.", icon: Layers, pos: "bottom-12 left-12", delay: "1.5s" },
        { title: "المعالجة والترميز", desc: "تحسين الجودة لكل المنصات.", icon: Cpu, pos: "top-1/2 -translate-y-1/2 right-8", delay: "2s" },
        { title: "التوزيع الرقمي", desc: "توصيل المحتوى للعالم.", icon: Share2, pos: "top-1/2 -translate-y-1/2 left-8", delay: "2.5s" },
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
        {/* العنوان: تطابق كامل مع السكاشن السابقة */}
        <div className="relative z-50 text-center pointer-events-none select-none">
          <h2 className="text-6xl md:text-8xl font-[1000] text-white uppercase tracking-tighter italic leading-none drop-shadow-sm">
            {t.mainTitle}
          </h2>
          <div className="h-[1px] w-32 bg-white/20 mx-auto mt-6" />
        </div>

        {/* توزيع البطاقات في أطراف الشاشة */}
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

        {/* تذييل السكشن التقني */}
        <div className="absolute bottom-10 z-50 flex flex-col items-center opacity-20 pointer-events-none">
          <span className="text-[10px] font-mono text-white tracking-[1em] uppercase">
            Phase_03 // Finalization
          </span>
        </div>
      </section>
    </>
  );
}