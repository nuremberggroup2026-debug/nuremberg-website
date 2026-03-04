"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "@/app/auth/authoptions";
import { addNewClient } from "@/app/server/clients/services";
import { NewClient } from "@/types/index";

export async function addClientAction(data: NewClient) {
  try {
    const session = await getServerSession(authOptions);
    // ❗ Not logged in
    if (!session) {
      return {
        success: false,
        status: 401,
        message: "Please log in first.",
      };
    }

    // ❗ Not admin
    if (session.user.role !== "admin") {
      return {
        success: false,
        status: 403,
        message: "You are not allowed to perform this action.",
      };
    }

    const result = await addNewClient(data);

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/ourClients`);
      revalidatePath(`/ar/admin/dashboard/ourClients`);

      return { success: true, message: result.message, status: result.status };
    }
    return { success: false, message: result.message, status: result.status };
  } catch (error) {
    console.log("error: ",error);
    
    return { success: false, message: "Error In Adding Client", status: 500 };
  }
}
