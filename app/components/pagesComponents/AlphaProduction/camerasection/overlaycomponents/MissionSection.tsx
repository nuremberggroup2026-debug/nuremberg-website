"use client";
import { useEffect, useRef } from "react";
import { Globe, Zap } from "lucide-react";
import gsap from "gsap";
import { useInView } from "react-intersection-observer";

interface MissionSectionProps {
  locale?: "en" | "ar";
}

export default function MissionSection({ locale = "en" }: MissionSectionProps) {
  // مراقبة الدخول للسكشن لضمان عمله مع سكرول فايبر
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  const sectionRef = useRef<HTMLDivElement>(null);
  const leftBoxRef = useRef<HTMLDivElement>(null);
  const rightItemsRef = useRef<HTMLDivElement[]>([]);

  const translations = {
    en: {
      title: "OUR MISSION",
      highlight: "MISSION",
      description:
        "We bridge the gap between creative vision and technical execution. Our goal is to make your brand unforgettable through visual storytelling.",
      global: "GLOBAL_PRESENCE",
      elite: "ELITE_WORKFLOW",
    },
    ar: {
      title: "مهمتنا",
      highlight: "MISSION",
      description:
        "نجسر الفجوة بين الرؤية الإبداعية والتنفيذ التقني. هدفنا هو جعل علامتك التجارية لا تُنسى من خلال السرد البصري المتميز.",
      global: "الوجود_العالمي",
      elite: "سير_عمل_نخبوي",
    },
  };

  const t = translations[locale];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (inView) {
        const tl = gsap.timeline();

        // 1. تصفير الحالات الأولية
        tl.set(leftBoxRef.current, { opacity: 0, x: locale === "ar" ? 100 : -100, filter: "blur(10px)" });
        tl.set(rightItemsRef.current, { opacity: 0, x: locale === "ar" ? -50 : 50, filter: "blur(5px)" });

        // 2. أنميشن الصندوق الأيسر (الرئيسي)
        tl.to(leftBoxRef.current, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.8,
          ease: "expo.out",
        })
        // 3. أنميشن الأزرار اليمينية (Capsules) بتتابع سريع
        .to(rightItemsRef.current, {
          opacity: 1,
          x: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }, "-=0.4"); // يبدأ قبل انتهاء الأول قليلاً للتناغم

      } else {
        // إعادة الإخفاء عند الخروج (اختياري)
        gsap.set([leftBoxRef.current, rightItemsRef.current], { opacity: 0 });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [inView, locale]);

  const sideArea = "w-[38%] h-full flex flex-col justify-center px-8 md:px-16 pointer-events-none";

  return (
    <section 
      ref={(el) => { inViewRef(el); (sectionRef as any).current = el; }}
      dir={locale === "ar" ? "rtl" : "ltr"} 
      className="relative h-screen w-screen flex justify-between items-center bg-transparent overflow-hidden"
    >
      <div className={sideArea}>
        <div 
          ref={leftBoxRef}
          className="pointer-events-auto p-10 bg-zinc-900/50 backdrop-blur-xl rounded-[40px] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] opacity-0"
        >
          <h2 className="text-5xl font-[1000] italic mb-6 leading-tight uppercase">
            {t.title}
            <br />
           
          </h2>
          <p className="text-sm normal-case leading-loose text-gray-300 font-medium tracking-wide">
            {t.description}
          </p>
        </div>
      </div>

      <div className={`${sideArea} items-end space-y-6`}>
        {[
          { icon: Globe, text: t.global },
          { icon: Zap, text: t.elite }
        ].map((item, index) => (
          <div 
            key={index}
            ref={(el) => { if (el) rightItemsRef.current[index] = el; }}
            className="pointer-events-auto px-8 py-5 bg-zinc-900/80 backdrop-blur-md rounded-full border border-cyan-500/30 flex items-center gap-5 hover:border-cyan-500 transition-all opacity-0"
          >
            <item.icon size={22} className="text-cyan-500" />
            <span className="text-[11px] font-black tracking-[0.5em]">{item.text}</span>
          </div>
        ))}
      </div>
    </section>
  );
}