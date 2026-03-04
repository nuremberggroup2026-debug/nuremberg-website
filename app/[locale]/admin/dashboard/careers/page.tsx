
import { CareersColumns } from "@/components/columns/careers-columns";
import { DataTable } from "@/components/data-table";
import { deleteCareerAction } from "./(actions)/deleteCareer";
import NavigationButton from "@/components/NavigationButton";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getAllCareers } from "@/app/server/careers/services";
import { NewCareer } from "@/types";

export default async function CourseTable() {
  const allCareers = (await getAllCareers()).data || [];

  return (
    <main className="flex flex-col justify-center items-center ml-7 w-[88vw] md:w-[60vw] xl:w-[80vw]">
      <div className="flex flex-col justify-start items-start mb-6 border-b border-gray-300 w-full">
        <h1 className="text-lg md:text-2xl font-bold">Careers</h1>
        <h2 className="text-sm md:text-lg text-gray-600">
          A list of Careers.
        </h2>
      </div>

      {allCareers.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Careers Found
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              You Haven’t Added Any Career Yet.
            </p>
            <NavigationButton
              routeName="newCareer"
              value="Add New Career"
            />
          </CardContent>
        </Card>
      ) : (
        <>
          <DataTable
            columns={CareersColumns}
            data={allCareers}
            routeName="careers"
            deleteAction={deleteCareerAction}
          />
          <NavigationButton
            routeName="newCareer"
            value="Add New Career"
          />
        </>
      )}
    </main>
  );
}


