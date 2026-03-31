import React from "react";
import HeroSection from "@/app/components/pagesComponents/NurembergTech/HeroSection";
import FeaturesSection from "@/app/components/pagesComponents/NurembergTech/FeaturesSection";
import Responsivesection from "@/app/components/pagesComponents/NurembergTech/techcomponents/responsivesection";
import ProjectsArchive from "@/app/components/pagesComponents/NurembergTech/ProjectsArchive";
import CTASection from "@/app/components/pagesComponents/Home/CTASection";
import SystemsTechSection from "@/app/components/pagesComponents/NurembergTech/SystemsTechSection";
import ImpactHero from "@/app/components/pagesComponents/NurembergTech/ImpactHero";
import { InteractiveBackground } from "@/app/components/shared/interactivebackground";
import { getAllProjectsByLocale } from "@/app/server/projects/services";
import MobileResponsive from "@/app/components/pagesComponents/NurembergTech/MobileResponsive"
import { generatePageMetadata } from "@/lib/constants/metadata";
type Locale = "en" | "ar";
interface PageProps {
  params: Promise<{
    locale: Locale;
  }>
}

export async function generateMetadata({params}:PageProps) {
  const locale= (await params).locale
  return generatePageMetadata("nuremberg-tech",locale)
  
}

export default async function TechPage({ params }: PageProps) {
  const { locale } = await params;
  const projects = (await getAllProjectsByLocale(locale)).data ?? [];

  return (
    <InteractiveBackground>
      <HeroSection locale={locale} />
      <ImpactHero locale={locale}  />
      <SystemsTechSection locale={locale}  />
      <FeaturesSection locale={locale}  />
      {projects.length>0 && <ProjectsArchive projects={projects} locale={locale} />} 
  <div className="hidden  md:block">
      <Responsivesection  />
       </div>
       <div className="block md:hidden">
         <MobileResponsive  />
       </div>
      <CTASection locale={locale}  />
    </InteractiveBackground>
  );
}
