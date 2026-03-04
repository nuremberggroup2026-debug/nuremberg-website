import { getFilteredApplications } from "@/app/server/applications/services";
import { deleteApplicationAction } from "../(actions)/deleteApplication";
import { ApplicationColumns } from "@/components/columns/application-columns";
import { Card, CardContent } from "@/components/ui/card";
import { FolderOpen } from "lucide-react";
import { getCareerNameAndIdById } from "@/app/server/careers/services";
import { ApplicationsDataTable } from "@/components/ApplicationsDataTable";
import { notFound } from "next/navigation";

interface Props {
  searchParams: Promise<{
    page?: number;
  }>;
  params: Promise<{ id: string }>;
}

async function Page({ params, searchParams }: Props) {
  const id = (await params).id;
  const searchParamsData = await searchParams;
  const page = Number(searchParamsData.page ?? 1);
  const careerResult = await getCareerNameAndIdById(id);

  if (!careerResult || !careerResult.data) {
    notFound();
  }  
  const careerDetails = careerResult.data;
  const filteredData = (await getFilteredApplications( id,page));

  return (
    <div className="flex flex-col justify-start items-start ml-5 md:ml-7 w-[88vw] md:w-[68vw] xl:w-[80vw]">
      <h1 className="text-2xl font-semibold mb-4 border-b p-1 w-full">
        Applications On {careerDetails.position_en}
      </h1>

      <div className="mt-4 mb-4 flex items-center gap-3"></div>

      { !filteredData.data || filteredData.data.length === 0 ? (
        <Card className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-50">
          <CardContent className="flex flex-col items-center text-center">
            <FolderOpen className="w-10 h-10 text-gray-400 mb-3" />
            <h3 className="text-gray-600 text-lg font-medium">
              No Applications Found
            </h3>
          </CardContent>
        </Card>
      ) : (
        <ApplicationsDataTable
          columns={ApplicationColumns}
          data={filteredData.data!}
          routeName="applicationById"
          deleteAction={deleteApplicationAction}
          totalPages={Math.ceil(filteredData.totalApplications / 10)}
          careerId={id}
        />
      )}
    </div>
  );
}

export default Page;
