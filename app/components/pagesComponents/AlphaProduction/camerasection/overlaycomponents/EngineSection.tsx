
interface Props {
  locale: "en" | "ar";
}

const translations = {
  en: {
    title: "WE ARE YOUR EYES THROUGH OUR LENS",
    description: 
      "Alpha Production was created to open your eyes to a whole new world. If you have a story, we will be your lens, bringing professional knowledge in technology and storytelling to every frame.",
    subText: "From initial guidance to budget optimization, we provide full support.",
    services: ["Content Creation", "Photography", "Production", "Editing", "Animation"],
  },
  ar: {
    title: "نحن عيونك من خلال عدستنا",
    description: 
      "تأسست ألفا برودكشن لتفتح عينيك على عالم جديد. إذا كان لديك قصة، فسنكون عدستك، سخرنا خبرتنا في التكنولوجيا والسرد القصصي لنضعها في كل إطار.",
    subText: "من التوجيه الأولي إلى تحسين الميزانية، نقدم دعماً كاملاً.",
    services: ["صناعة المحتوى", "التصوير", "الإنتاج", "المونتاج", "الرسوم المتحركة"],
  }
};

export default function BalancedTargetSection({ locale }: Props) {
  const t = translations[locale];
  const isAr = locale === "ar";

  return (
    <section className="relative h-screen w-screen flex items-center justify-center px-6 md:px-20 py-12 bg-transparent" dir={isAr ? "rtl" : "ltr"}>
      
      {/* الحاوية الزجاجية - ارتفاع محكم */}
      <div className="relative max-w-7xl w-full bg-zinc-900/40 backdrop-blur-xl border border-white/10 rounded-[2rem] overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-2xl overflow-hidden">
        
        {/* الجانب النصي - Padding مضغوط */}
        <div className="lg:col-span-7 p-8 md:p-12 space-y-6 flex flex-col justify-center">
          
          <h2 className="text-4xl md:text-5xl font-[1000] leading-[1] tracking-tighter uppercase italic text-white">
            {t.title}
          </h2>

          <div className="space-y-3">
            <p className="text-white/80 text-lg font-light leading-snug">
              {t.description}
            </p>
            <p className="text-white/30 text-xs italic tracking-wide">
              {t.subText}
            </p>
          </div>

          {/* الخدمات كـ Tags أصغر */}
          <div className="flex flex-wrap gap-2 pt-4">
            {t.services.map((s, i) => (
              <span key={i} className="px-3 py-1 border border-white/5 rounded-md text-[9px] font-mono uppercase tracking-[0.15em] text-cyan-400/60 bg-white/5">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* الجانب البصري - عرض سينمائي */}
        <div className="lg:col-span-5 relative min-h-[250px] lg:min-h-full border-l border-white/10">
          <img 
            src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop" 
            alt="Cinematography"
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.4] hover:scale-105 transition-transform duration-[4s]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          
          {/* كود تقني جانبي بسيط */}
          <div className="absolute bottom-6 right-6 text-cyan-500/20 font-mono text-[8px] uppercase tracking-[0.6em] vertical-text hidden md:block">
            ALPHA_CORE_SYSTEM
          </div>
        </div>
      </div>
    </section>
  );
}