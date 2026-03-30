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
import { InteractiveBackground } from "../../shared/interactivebackground";


type Locale = "en" | "ar";
interface PageProps {
  locale: Locale;
}

export default function Phonee({ locale }: PageProps) {
  return (
    <div>
      <InteractiveBackground cols={4} rows={22}>
      <HeroSectionMobile locale={locale} />
      <MissionSection locale={locale} />
      <ServicesSectionMobile locale={locale} />
      <PartnershipSection locale={locale} />
      <InfrastructureSection locale={locale} />
      <CTASection locale={locale} />
      <EngineSection locale={locale} />
      <AlphaOffers locale={locale} />
      <FutureVission locale={locale} />
      </InteractiveBackground>
      <Footer/>
    </div>
  );
}
