

import React from "react";
import HeroSection from "@/app/components/pagesComponents/NurembergTech/HeroSection";
import FeaturesSection from "@/app/components/pagesComponents/NurembergTech/FeaturesSection";
import Responsivesection from "@/app/components/pagesComponents/NurembergTech/techcomponents/responsivesection";
import ProjectsArchive from "@/app/components/pagesComponents/NurembergTech/ProjectsArchive";
import CTASection from "@/app/components/pagesComponents/NurembergTech/CTASection";
import SystemsTechSection from "@/app/components/pagesComponents/NurembergTech/SystemsTechSection"
import ImpactHero from "@/app/components/pagesComponents/NurembergTech/ImpactHero";
import {InteractiveBackground} from "@/app/components/shared/interactivebackground"
import { getAllProjectsByLocale } from "@/app/server/projects/services";

type Locale = "en" | "ar";
interface PageProps {
  params: {
    locale: Locale;
  };
}


export default async function TechPage({ params }: PageProps) {
    const { locale } = await params;










const projects = (await getAllProjectsByLocale(locale)).data ?? [];




  return (
    <InteractiveBackground>
      <HeroSection />
      <ImpactHero/>
      <SystemsTechSection/>
      <FeaturesSection />
      <Responsivesection />
      {projects.length>0&&<ProjectsArchive projects={projects} />}
      <CTASection />
      </InteractiveBackground>
  );
}