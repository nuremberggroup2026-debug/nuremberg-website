"use client";
import HeroSection from "./overlaycomponents/HeroSection";
import ServicesSection from "./overlaycomponents/ServicesSection";
import PartnershipSection from "./overlaycomponents/PartnershipSection";
import MissionSection from "./overlaycomponents/MissionSection";
import InfrastructureSection from "./overlaycomponents/InfrastructureSection";
import CTASection from "./overlaycomponents/CTASection";
import EngineSection from "./overlaycomponents/EngineSection";
import GradientDivider from "./overlaycomponents/GradientDivider";
import Footer from "@/app/components/pagesComponents/AlphaProduction/footer";
interface Props{
  locale: "en" | "ar";
}

export default function Overlay({locale}:Props) {
  return (
    <div className="relative w-screen text-white uppercase overflow-x-hidden selection:bg-cyan-500 font-sans tracking-tight">
      <HeroSection locale={locale} />
      <ServicesSection  locale={locale}/>
      <PartnershipSection  locale={locale}/>
      <MissionSection locale={locale} />
      <InfrastructureSection locale={locale} />
      <CTASection locale={locale} />
      <EngineSection locale={locale} />
      <div className=" h-[20vh] w-full"></div>
      <Footer locale={locale} />
    </div>
  );
}