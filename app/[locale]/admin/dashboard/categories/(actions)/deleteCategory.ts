"use server";

import { authOptions } from "@/app/auth/authoptions";
import { deleteCategory } from "@/app/server/categories/services";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";


export const deleteCategoryAction = async (categoryId: string) => {
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

    const result = await deleteCategory(categoryId);

   if (result.status === 201){
          revalidatePath("/admin/dashboard/categories")
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
      message: "Error in deleting the category",
    };
  }
};
