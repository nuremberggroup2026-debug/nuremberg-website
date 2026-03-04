import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

import HeroSection from "@/app/components/pagesComponents/About/HeroSection";
import DNASection from "@/app/components/pagesComponents/About/DNASection";
import ProcessSection from "@/app/components/pagesComponents/About/ProcessSection";
import TeamSection from "@/app/components/pagesComponents/About/TeamSection";
import FormSection from "@/app/components/pagesComponents/About/FormSection";
import OurClientsSection from "@/app/components/pagesComponents/About/OurClientsSection";
import AboutSectors from "@/app/components/pagesComponents/About/AboutSector";
import { InteractiveBackground } from "@/app/components/shared/interactivebackground";
import { getAllMembersBylocale } from "@/app/server/ourTeam/services";
import { getAllClientsByLocale } from "@/app/server/clients/services";



type Locale = "en" | "ar";
interface PageProps {
  params: {
    locale: Locale;
  };
}


if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default async function NeuralCoreAbout({ params }: PageProps) {
  const { locale } = await params;
  const team = (await getAllMembersBylocale(locale)).data ?? [];
    const clients = (await getAllClientsByLocale(locale)).data ?? [];





  return (
    <InteractiveBackground>
   
        <HeroSection />
        <AboutSectors />
        <DNASection />
        <ProcessSection />
        <TeamSection team={team} />
        <OurClientsSection clients={clients} />
        <FormSection />
    </InteractiveBackground>
  );
}
