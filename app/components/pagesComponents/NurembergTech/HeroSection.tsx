import { ArrowRight, ArrowUpLeft } from "lucide-react";
import { nurembergData } from "@/data/nurembergData";
import Link from "next/link";

type Locale = "en" | "ar";
interface PageProps {
  locale: Locale;
}

export default function HeroSection({ locale }: PageProps) {
  const texts = nurembergData[locale]?.hero || nurembergData.en.hero;

  return (
    <section className="relative min-h-[100vh] md:min-h-[90vh] flex items-center px-6 sm:px-10 md:px-20 overflow-hidden py-20 ">
      {/* Background Gradient - Responsive Opacity */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-l from-cyan-400/10 to-transparent blur-[80px] md:blur-[120px] opacity-30 md:opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl w-full">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 md:gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full bg-white/5 border border-white/10 mb-6 md:mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
          </span>
          <span className="text-[9px] md:text-[10px] font-mono tracking-[0.15em] md:tracking-widest text-white/60 uppercase">
            {texts.systemStatus}
          </span>
        </div>

        {/* Main Title - Responsive Font Sizes */}
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black leading-[1.1] md:leading-[0.9] mb-6 md:mb-8 italic tracking-tighter uppercase break-words">
          {texts.mainTitle1} 
          <span className="block md:inline-block">
            <br className="hidden md:block" />
            <span className="text-transparent  bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-600 drop-shadow-[0_0_15px_rgba(34,211,238,0.3)]">
              {" "}{texts.mainTitle2}
            </span>
          </span>
        </h1>

        {/* Description - Adjusted Max Width for Mobile */}
        <p className="text-base md:text-lg text-gray-400 max-w-xl md:max-w-2xl mb-10 md:mb-12 leading-relaxed font-medium">
          {texts.description}{" "}
          <span className="text-cyan-400">{texts.highlight}</span>.
        </p>

      <Link href={"/about-us#contact-form"}>
      <button  className="group relative flex items-center gap-6 p-5 pr-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all duration-500">
              
              <div className="text-left">
                <p className="text-white font-black italic uppercase tracking-tighter text-xl leading-none">
                  {texts.cta}
                </p>
              </div>
              <div className={`w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-black ${locale==="ar"?"group-hover:-rotate-45":"group-hover:rotate-45"} transition-transform duration-500`}>
                <ArrowUpLeft size={24} className={`${locale==="ar"?"":"rotate-90"}`} />
              </div>
            </button></Link>

      </div>

      {/* Side HUD Decor for Mobile - Optional logic */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-32 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent hidden md:block" />
    </section>
  );
}