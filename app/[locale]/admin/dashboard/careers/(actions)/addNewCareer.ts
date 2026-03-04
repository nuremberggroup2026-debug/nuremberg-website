"use server";

import { authOptions } from "@/app/auth/authoptions";
import { addNewCareer } from "@/app/server/careers/services";
import {  NewCareer } from "@/types";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

export const addCareerAction = async (data: NewCareer) => {
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
        message: "You are not allowed to perfor this action",
      };

    const result = await addNewCareer(data);
    if (result.status === 201){
       revalidatePath("/admin/dashboard/careers")
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
      message: "Error in adding the Career",
    };
  }
};
