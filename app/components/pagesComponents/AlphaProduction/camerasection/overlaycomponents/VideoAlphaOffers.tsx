import { 
  Tv, Globe, Youtube, Film, Music, Layers, 
  Calendar, UserCheck, Users, PlayCircle, BookOpen, Sparkles 
} from "lucide-react";

interface AlphaOffersProps {
  locale: "en" | "ar";
}

export default function AlphaOffers({ locale }: AlphaOffersProps) {
  const offers = {
    en: {
      mainTitle: "Videos Alpha Offers",
      items: [
        { title: "Commercials", icon: Tv, offset: "-top-6 left-[5%]" },
        { title: "Web Marketing", icon: Globe, offset: "top-2 left-[20%]" },
        { title: "Online Ads", icon: Youtube, offset: "-top-2 left-[35%]" },
        { title: "Film Making", icon: Film, offset: "top-6 left-[50%]" },
        { title: "Music Videos", icon: Music, offset: "-top-6 left-[65%]" },
        { title: "Animation & Design", icon: Layers, offset: "top-2 left-[80%]" },
        
        { title: "Event Coverage", icon: Calendar, offset: "bottom-6 right-[5%]" },
        { title: "Testimonials", icon: UserCheck, offset: "-bottom-2 right-[20%]" },
        { title: "Recruiting Videos", icon: Users, offset: "bottom-2 right-[35%]" },
        { title: "Training & Demos", icon: PlayCircle, offset: "-bottom-6 right-[50%]" },
        { title: "Narrative Pieces", icon: BookOpen, offset: "bottom-2 right-[65%]" },
        { title: "Case Studies", icon: Sparkles, offset: "-bottom-6 right-[80%]" },
      ],
    },
    ar: {
      mainTitle: "عروض ألفا للإنتاج",
      items: [
        { title: "الإعلانات التجارية", icon: Tv, offset: "-top-6 right-[5%]" },
        { title: "التسويق الرقمي", icon: Globe, offset: "top-2 right-[20%]" },
        { title: "إعلانات الإنترنت", icon: Youtube, offset: "-top-2 right-[35%]" },
        { title: "صناعة الأفلام", icon: Film, offset: "top-6 right-[50%]" },
        { title: "الفيديو كليب", icon: Music, offset: "-top-6 right-[65%]" },
        { title: "الرسوم المتحركة", icon: Layers, offset: "top-2 right-[80%]" },
        
        { title: "تغطية الفعاليات", icon: Calendar, offset: "bottom-6 left-[5%]" },
        { title: "فيديوهات التوصية", icon: UserCheck, offset: "-bottom-2 left-[20%]" },
        { title: "فيديوهات التوظيف", icon: Users, offset: "bottom-2 left-[35%]" },
        { title: "التدريب والعروض", icon: PlayCircle, offset: "-bottom-6 left-[50%]" },
        { title: "القطع السردية", icon: BookOpen, offset: "bottom-2 left-[65%]" },
        { title: "دراسات الحالة", icon: Sparkles, offset: "-bottom-6 left-[80%]" },
      ],
    },
  };

  const t = offers[locale];

  return (
    <section 
      className="relative h-screen w-screen flex flex-col justify-center items-center py-10 px-6 md:px-20  overflow-hidden"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* عنوان ضخم وثابت خلف المحتوى - تم تصغيره قليلاً ليتناسب مع الارتفاع الجديد */}
      <h2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[15vw] font-[1000] tracking-tighter uppercase text-white opacity-[0.02] pointer-events-none z-0">
        Alpha
      </h2>

      {/* منطقة البطاقات - تم تقليل الـ gap */}
      <div className="relative w-full h-full max-w-7xl flex flex-col gap-4 md:gap-0 z-10">
        
        {/* الموجة الأولى (الأعلى) - تم تقليل الارتفاع h-[30vh] */}
        <div className="relative w-full md:h-[30vh] flex md:flex-row flex-col items-center justify-center md:items-start md:gap-0 gap-4">
          {t.items.slice(0, 6).map((item, index) => (
            <div
              key={index}
              className={`relative md:absolute p-4 md:p-5 bg-zinc-950/20 backdrop-blur-lg border border-white/5 rounded-2xl md:rounded-3xl flex flex-col items-center text-center gap-3 md:gap-4 transition-all hover:bg-zinc-800/30 hover:border-cyan-500/30 hover:scale-105 group ${item.offset} z-10`}
              style={{
                width: "180px", // تصغير العرض قليلاً للمساعدة في ضغط التصميم
                transform: `translateZ(${index % 2 === 0 ? '5px' : '-5px'})`,
              }}
            >
              <item.icon 
                size={24} 
                className="text-cyan-500 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all" 
              />
              
              <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase text-gray-200 group-hover:text-white leading-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>

        {/* الموجة الثانية (الأسفل) - تم تقليل الارتفاع h-[30vh] */}
        <div className="relative w-full md:h-[30vh] flex md:flex-row flex-col items-center justify-center md:items-end md:gap-0 gap-4 mt-6 md:mt-0">
          {t.items.slice(6).map((item, index) => (
            <div
              key={index}
              className={`relative md:absolute p-4 md:p-5 bg-zinc-950/20 backdrop-blur-lg border border-white/5 rounded-2xl md:rounded-3xl flex flex-col items-center text-center gap-3 md:gap-4 transition-all hover:bg-zinc-800/30 hover:border-cyan-500/30 hover:scale-105 group ${item.offset} z-10`}
              style={{
                width: "180px",
                transform: `translateZ(${index % 2 === 0 ? '-5px' : '5px'})`,
              }}
            >
              <item.icon 
                size={24} 
                className="text-cyan-500 opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all" 
              />
              
              <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase text-gray-200 group-hover:text-white leading-tight">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}