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
    <section
      className="w-full min-h-screen  bg-black flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-12 gap-8"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* النص */}
      <div className="flex-1 flex flex-col gap-4">
        <h2 className="text-2xl md:text-4xl font-[1000] italic text-white tracking-tight">
          {t.title}
        </h2>
        <p className="text-white/80 text-base md:text-lg leading-relaxed">
          {t.description}
        </p>
        <p className="text-white/30 text-xs italic tracking-wide">
          {t.subText}
        </p>

        {/* الخدمات كـ Tags أصغر */}
        <div className="flex flex-wrap gap-2 pt-2">
          {t.services.map((s, i) => (
            <span
              key={i}
              className="px-3 py-1 border border-white/10 rounded-md text-[10px] md:text-[11px] font-mono uppercase tracking-[0.1em] text-cyan-400/60 bg-white/5"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* الصورة */}
      <div className="flex-1 relative w-full min-h-[200px] md:min-h-[300px] rounded-xl overflow-hidden border border-white/10">
        <img
          src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?q=80&w=2070&auto=format&fit=crop"
          alt="Cinematography"
          className="absolute inset-0 w-full h-full object-cover grayscale brightness-[0.4] transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-4 right-4 text-cyan-500/20 font-mono text-[8px] uppercase tracking-[0.6em] hidden md:block">
          ALPHA_CORE_SYSTEM
        </div>
      </div>
    </section>
  );
}