import HeroSectionMobile from "./phonecomponents/HeroSection";
import MissionSection from "./phonecomponents/MissionSection";
import ServicesSectionMobile from "./phonecomponents/ServicesSection";
import PartnershipSection from "./phonecomponents/PartnershipSection";
import InfrastructureSection from "./phonecomponents/InfrastructureSection";
import CTASection from "./phonecomponents/CTASection";
import EngineSection from "./phonecomponents/EngineSection";
import AlphaOffers from "./phonecomponents/AlphaOffers";
import FutureVission from "./phonecomponents/FutureVission";
import Footer from "@/app/components/shared/footer/footer";


type Locale = "en" | "ar";
interface PageProps {
  locale: Locale;
}

export default function Phonee({ locale }: PageProps) {
  return (
    <div>
      <HeroSectionMobile locale={locale} />
      <MissionSection locale={locale} />
      <ServicesSectionMobile locale={locale} />
      <PartnershipSection locale={locale} />
      <InfrastructureSection locale={locale} />
      <CTASection locale={locale} />
      <EngineSection locale={locale} />
      <AlphaOffers locale={locale} />
      <FutureVission locale={locale} />
      <Footer/>
    </div>
  );
}
