import HeroSection from "./overlaycomponents/HeroSection";
import ServicesSection from "./overlaycomponents/ServicesSection";
import PartnershipSection from "./overlaycomponents/PartnershipSection";
import MissionSection from "./overlaycomponents/MissionSection";
import InfrastructureSection from "./overlaycomponents/InfrastructureSection";
import CTASection from "./overlaycomponents/CTASection";
import EngineSection from "./overlaycomponents/EngineSection";
import AlphaOffers from "@/app/components/pagesComponents/AlphaProduction/camerasection/overlaycomponents/VideoAlphaOffers"
import Footer from "@/app/components/shared/footer/footer";
import FutureVission from "@/app/components/pagesComponents/AlphaProduction/camerasection/overlaycomponents/FutureVission"
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
                <MissionSection locale={locale} />
                        <div className="  h-[50vh]"></div>


        <ServicesSection locale={locale} />
        <div className=" h-[50vh]"></div>
        <PartnershipSection locale={locale} />
                <div className=" h-[50vh]"></div>

        <InfrastructureSection locale={locale} />
                        <div className=" h-[50vh]"></div>

        <CTASection locale={locale} />
        <EngineSection locale={locale} />

        <AlphaOffers locale={locale}/>

      <FutureVission locale={locale}/>

<div className=" h-screen flex flex-col items-end justify-end">
        <Footer locale={locale} />
        </div>
      </div>
    </Scroll>
  );
}