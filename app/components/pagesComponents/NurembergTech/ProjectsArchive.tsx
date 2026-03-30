
import ProjectsSection from "@/app/components/pagesComponents/NurembergTech/techcomponents/projectssection";
import type { Locale, translatedProjects } from "@/types/index";

interface Props {
  projects: translatedProjects[];
  locale:Locale
}

export default function ProjectsArchive({ projects,locale }: Props) {
  const isAr = locale === "ar";
  return (
    <section className="py-32">
      <div className="px-10 md:px-20 mb-20 flex justify-center items-center gap-8">
        <h2 className="text-5xl font-black italic tracking-tighter uppercase">
          {isAr ? (
            <div className="flex flex-row justify-center">
              {" "}
              <p className="text-white">مشاريع </p>{" "}
              <p className="text-cyan-400 px-1.5">مختارة</p>
            </div>
          ) : (
            <div className="flex flex-row justify-center" >
              {" "}
              <p className="text-white">Selected </p>{" "}
              <p className="text-cyan-400 px-1.5">Projects</p>
            </div>
          )}
        </h2>


        
      </div>

      <ProjectsSection projects={projects} isAr={isAr} />
    </section>
  );
}