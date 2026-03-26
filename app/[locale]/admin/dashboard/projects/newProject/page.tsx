import CreateProjectForm from "@/components/projects/NewProjectForm";
import React from "react";
import { addProjectAction } from "../(actions)/addNewProject";
async function page() {

  return (
    <div className="w-full">
      <CreateProjectForm action={addProjectAction}  />
    </div>
  );
}

export default page;
