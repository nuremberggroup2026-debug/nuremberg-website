import { getCategoriesNameAndId, getCategoryById } from "@/app/server/categories/services";
import { updateProjectAction } from "../(actions)/editProject";
import { notFound } from "next/navigation";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { getProjectById } from "@/app/server/projects/services";

async function Page(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;
  const project = (await getProjectById(id)); 
  const category= await getCategoriesNameAndId()
  if (!project || !project.data) {
    notFound();
  }

  return (
    <EditProjectForm
      project={project.data}
      action={updateProjectAction}
      categories={category.data}
    />
  );
}

export default Page;
