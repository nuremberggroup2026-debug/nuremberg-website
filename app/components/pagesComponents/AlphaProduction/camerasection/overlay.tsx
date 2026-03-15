"use client";
import HeroSection from "./overlaycomponents/HeroSection";
import ServicesSection from "./overlaycomponents/ServicesSection";
import PartnershipSection from "./overlaycomponents/PartnershipSection";
import MissionSection from "./overlaycomponents/MissionSection";
import InfrastructureSection from "./overlaycomponents/InfrastructureSection";
import CTASection from "./overlaycomponents/CTASection";
import EngineSection from "./overlaycomponents/EngineSection";
import Footer from "@/app/components/pagesComponents/AlphaProduction/footer";
import { Scroll } from "@react-three/drei";

interface Props {
  locale: "en" | "ar";
}

export default function Overlay({ locale }: Props) {
  const isAr = locale === "ar";

  return (
    <Scroll html>
      <div className="relative w-full min-h-screen flex flex-col text-white uppercase selection:bg-cyan-500 font-sans tracking-tight">
        
        <HeroSection locale={locale} />
        <ServicesSection locale={locale} />
        <PartnershipSection locale={locale} />
        <MissionSection locale={locale} />
        <InfrastructureSection locale={locale} />
        <CTASection locale={locale} />
        <EngineSection locale={locale} />

        {/* --- السكاشن الوهمية المضافة (بدل الألوان) --- */}

        {/* سكشن: الأرقام والإنجازات (بدل Red) */}
        <section className="h-screen flex flex-col justify-center px-10 md:px-20 bg-transparent">
          <div className="max-w-4xl">
            <h2 className="text-5xl md:text-8xl font-black mb-6 leading-none outline-text">
              {isAr ? "أرقامنا تتحدث" : "Numbers Speak"}
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
              <div>
                <p className="text-4xl md:text-6xl font-bold text-cyan-400">+500</p>
                <p className="text-sm opacity-60">{isAr ? "مشروع مكتمل" : "Projects Completed"}</p>
              </div>
              <div>
                <p className="text-4xl md:text-6xl font-bold text-cyan-400">24/7</p>
                <p className="text-sm opacity-60">{isAr ? "دعم فني" : "Technical Support"}</p>
              </div>
              <div>
                <p className="text-4xl md:text-6xl font-bold text-cyan-400">100%</p>
                <p className="text-sm opacity-60">{isAr ? "رضا العملاء" : "Client Satisfaction"}</p>
              </div>
            </div>
          </div>
        </section>

        {/* سكشن: اقتباس أو رؤية (بدل Yellow) */}
        <section className="h-screen flex flex-col justify-center items-center px-10 text-center bg-transparent">
          <div className="max-w-5xl">
            <span className="text-cyan-500 text-sm tracking-[0.3em] mb-4 block">
              {isAr ? "الرؤية المستقبلية" : "Future Vision"}
            </span>
            <blockquote className="text-3xl md:text-6xl font-light italic leading-tight lowercase">
              {isAr 
                ? "“نحن لا نصنع التكنولوجيا، نحن نبني الجسور نحو المستقبل بلمسة إبداعية لا تعرف الحدود.”" 
                : "“We don't just build technology, we build bridges to the future with a creative touch that knows no limits.”"}
            </blockquote>
          </div>
        </section>

        {/* سكشن: دعوة أخيرة للاستكشاف (بدل Green) */}
        <section className="h-screen flex flex-col justify-center px-10 md:px-20 bg-transparent">
          <div className="max-w-4xl">
            <h2 className="text-6xl md:text-9xl font-black mb-10 leading-none">
              {isAr ? "جاهز للبدء؟" : "Ready to Start?"}
            </h2>
            <div className="flex gap-6">
              <button className="px-8 py-4 bg-white text-black font-bold hover:bg-cyan-500 hover:text-white transition-colors duration-300">
                {isAr ? "تواصل معنا" : "Get in Touch"}
              </button>
              <button className="px-8 py-4 border border-white font-bold hover:bg-white hover:text-black transition-colors duration-300">
                {isAr ? "تحميل الملف" : "Download Kit"}
              </button>
            </div>
          </div>
        </section>

        <Footer locale={locale} />
      </div>
    </Scroll>
  );
}