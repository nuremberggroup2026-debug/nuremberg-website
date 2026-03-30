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
        { title: "Commercials", icon: Tv },
        { title: "Web Marketing", icon: Globe },
        { title: "Online Ads", icon: Youtube },
        { title: "Film Making", icon: Film },
        { title: "Music Videos", icon: Music },
        { title: "Animation & Design", icon: Layers },
        { title: "Event Coverage", icon: Calendar },
        { title: "Testimonials", icon: UserCheck },
        { title: "Recruiting Videos", icon: Users },
        { title: "Training & Demos", icon: PlayCircle },
        { title: "Narrative Pieces", icon: BookOpen },
        { title: "Case Studies", icon: Sparkles },
      ],
    },
    ar: {
      mainTitle: "عروض ألفا للإنتاج",
      items: [
        { title: "الإعلانات التجارية", icon: Tv },
        { title: "التسويق الرقمي", icon: Globe },
        { title: "إعلانات الإنترنت", icon: Youtube },
        { title: "صناعة الأفلام", icon: Film },
        { title: "الفيديو كليب", icon: Music },
        { title: "الرسوم المتحركة", icon: Layers },
        { title: "تغطية الفعاليات", icon: Calendar },
        { title: "فيديوهات التوصية", icon: UserCheck },
        { title: "فيديوهات التوظيف", icon: Users },
        { title: "التدريب والعروض", icon: PlayCircle },
        { title: "القطع السردية", icon: BookOpen },
        { title: "دراسات الحالة", icon: Sparkles },
      ],
    },
  };

  const t = offers[locale];

  return (
    <section
      className="relative w-full min-h-screen flex flex-col items-center justify-start px-4 py-12 bg-black overflow-hidden"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      {/* العنوان */}
      <h2 className="text-2xl md:text-3xl font-[900] uppercase italic text-white mb-8 text-center">
        {t.mainTitle}
      </h2>

      {/* شبكة الكروت مستقيمة */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 w-full max-w-md md:max-w-lg">
        {t.items.map((item, index) => (
          <div
            key={index}
            className="relative p-4 bg-zinc-900/60 backdrop-blur-md border border-white/10 rounded-2xl flex flex-col items-center text-center gap-3 transition-transform duration-300 hover:scale-105"
          >
            <item.icon size={28} className="text-cyan-500" />
            <span className="text-[10px] md:text-sm font-bold uppercase text-white leading-tight">
              {item.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}