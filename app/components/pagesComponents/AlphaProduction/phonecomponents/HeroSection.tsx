"use client";

interface HeroSectionMobileProps {
  locale: "en" | "ar";
}

export default function HeroSectionMobile({
  locale,
}: HeroSectionMobileProps) {
  const messages = {
    en: {
      title: "ALPHA",
      highlight: "PRODUCTION",
      subtitle: "We Tell Your Story",
      description: `Alpha Production delivers standout visual content that helps your brand communicate effectively.`,
      cta: "Explore",
    },
    ar: {
      title: "ألفا",
      highlight: "للإنتاج",
      subtitle: "نروي قصتك",
      description: `نقدم محتوى بصري يساعد علامتك التجارية على التواصل بفعالية.`,
      cta: "استكشف",
    },
  };

  const t = messages[locale];

  return (
    <section className="h-screen w-full bg-black text-white flex items-center justify-center px-6">
      <div className="w-full max-w-sm">

        {/* Title */}
        <h1 className="text-4xl font-black leading-tight uppercase">
          {t.title}
          <br />
          <span className="text-cyan-500">{t.highlight}</span>
        </h1>

        {/* Subtitle */}
        <p className="text-cyan-500/80 text-xs tracking-[0.4em] mt-3 uppercase">
          {t.subtitle}
        </p>

        {/* Divider */}
        <div className="w-10 h-[2px] bg-cyan-500 mt-6 mb-6" />

        {/* Description */}
        <p className="text-gray-400 text-sm leading-6">
          {t.description}
        </p>

        {/* CTA */}
        <button className="mt-8 w-full py-3 bg-cyan-500 text-black font-bold text-sm rounded-md">
          {t.cta}
        </button>

      </div>
    </section>
  );
}