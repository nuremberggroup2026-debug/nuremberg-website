"use client";

import Section2 from "@/app/components/pagesComponents/Home/section2";
import MissionVisionSection from "@/app/components/pagesComponents/Home/MissionVisionSection";
import HeroSection from "@/app/components/pagesComponents/Home/heroSection";
import HomeAbout from "@/app/components/pagesComponents/Home/HomeAbout";
import WhyUs from "@/app/components/pagesComponents/Home/WhyUs";
import CTA from "@/app/components/pagesComponents/Home/CTASection";
import Services from "@/app/components/pagesComponents/Home/Services";
import {InteractiveBackground} from "@/app/components/shared/interactivebackground"
export default function Page() {
  return (
<>
<InteractiveBackground>
      <HeroSection />
      <HomeAbout/>
      <Section2 />
      <Services/>
      <WhyUs/>
      <CTA/>
    
      </InteractiveBackground>

      </>
  );
}