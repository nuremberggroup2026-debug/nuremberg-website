"use server";

import { authOptions } from "@/app/auth/authoptions";
import { NewProject } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { updateProject } from "@/app/server/projects/services";

export const updateProjectAction = async (
  id: string,
  data: Partial<NewProject>
) => {
  const session = await getServerSession(authOptions);
  try {
    if (!session)
      return {
        success: false,
        status: 401,
        message: "Please login",
      };

    if (session.user.role !== "admin")
      return {
        success: false,
        status: 403,
        message: "Your not allowed to perform this action",
      };

    const result = await updateProject(id, data);
    if (result.status === 201) {
      revalidatePath("/admin/dashboard/projects");
      return {
        success: true,
        status: result.status,
        message: result.message,
      };
    }

    return {
      success: false,
      status: result.status,
      message: result.message,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      message: "Error in updating project",
    };
  }
};
