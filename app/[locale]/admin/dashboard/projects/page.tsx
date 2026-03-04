
import { ProjectsColumns } from "@/components/columns/projects-columns";
import { DataTable } from "@/components/data-table";
import { deleteProjectAction } from "./(actions)/deleteProject";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllProjects } from "@/app/server/projects/services";



export default async function ProjectTable() {
  const allProjects = (await getAllProjects()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      {/* Header */}
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Projects</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Projects.
        </h2>
      </div>

      {/* Conditional rendering */}
      {allProjects.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Projects Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Project Yet.
            </p>
            <NavigationButton
              routeName="newProject"
              value="Add New Project"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={ProjectsColumns}
            data={allProjects}
            routeName="projects"
            deleteAction={deleteProjectAction}
          />
          <NavigationButton
            routeName="newProject"
            value="Add New Project"
          />
        </>
      )}
    </main>
  );
}


