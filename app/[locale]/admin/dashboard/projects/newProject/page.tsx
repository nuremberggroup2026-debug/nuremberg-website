import CreateProjectForm from "@/components/projects/NewProjectForm";
import React from "react";
import { addProjectAction } from "../(actions)/addNewProject";
import { getCategoriesNameAndId } from "@/app/server/categories/services";
async function page() {

  const categories= await getCategoriesNameAndId();
  return (
    <div className="w-full">
      <CreateProjectForm action={addProjectAction} categories={categories.data} />
    </div>
  );
}

export default page;
