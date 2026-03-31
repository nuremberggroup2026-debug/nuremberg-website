import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { sendEmailAction } from "./(actions)/sendEmailAction";
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
import { generatePageMetadata } from "@/lib/constants/metadata";

type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{
    locale: Locale;
  }>;
}

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export async function generateMetadata({params}:PageProps) {
  const locale= (await params).locale
  return generatePageMetadata("about-us",locale)
  
}

export default async function NeuralCoreAbout({ params }: PageProps) {
  const { locale } = await params;
  const [team, clients] = await Promise.all([
    (await getAllMembersBylocale(locale)).data,
    (await getAllClientsByLocale(locale)).data,
  ]);

  return (
    <InteractiveBackground>
      <HeroSection locale={locale} />
      <AboutSectors locale={locale} />
      <DNASection locale={locale} />
      <ProcessSection locale={locale} />
      {team && <TeamSection locale={locale} team={team} />}
      {clients && <OurClientsSection locale={locale} clients={clients} />}
      <FormSection action={sendEmailAction} locale={locale} />
    </InteractiveBackground>
  );
}
