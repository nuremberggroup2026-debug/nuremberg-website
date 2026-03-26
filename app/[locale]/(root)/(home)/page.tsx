
import Section2 from "@/app/components/pagesComponents/Home/section2";
import HeroSection from "@/app/components/pagesComponents/Home/heroSection";
import HomeAbout from "@/app/components/pagesComponents/Home/HomeAbout";
import WhyUs from "@/app/components/pagesComponents/Home/WhyUs";
import CTA from "@/app/components/pagesComponents/Home/CTASection";
import Services from "@/app/components/pagesComponents/Home/Services";
import {InteractiveBackground} from "@/app/components/shared/interactivebackground"
type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}
export default async function Page({ params }: PageProps) {
   const { locale } = await params;
  return (
<>
<InteractiveBackground>
      <HeroSection  />
      <HomeAbout  />
      <Section2  locale={locale} />
      <Services />
      <WhyUs  locale={locale}/>
      <CTA  locale={locale}/>
    
      </InteractiveBackground>

      </>
  );
}