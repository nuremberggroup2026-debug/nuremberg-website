"use client";

import React from "react";
import ProjectsSection from "@/app/components/pagesComponents/NurembergTech/techcomponents/projectssection";
import type { translatedProjects} from "@/types/index"



interface Props {
  projects: translatedProjects[];
}


export default function ProjectsArchive({projects}:Props) {
  console.log(projects)
  return (
    <section className="py-32 ">
      <div className="px-10 md:px-20 mb-20 flex items-center gap-8">
        <h2 className="text-5xl font-black italic tracking-tighter uppercase">
          Selected_Projects.
        </h2>
        <div className="h-[1px] flex-grow" />
        <span className="font-mono text-[10px] text-cyan-400 tracking-widest">
          QUERY: SUCCESS_V2.0
        </span>
      </div>

      <ProjectsSection projects={projects} />
    </section>
  );
}
