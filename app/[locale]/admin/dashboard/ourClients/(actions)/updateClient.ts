"use server";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/auth/authoptions";
import { NewClient } from "@/types";
import { updateClientById } from "@/app/server/clients/services";

export async function editClientAction(clientId:string,data: Partial<NewClient>) {
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

    const result = await updateClientById(clientId, data);

    if (result.status === 201) {
      revalidatePath(`/admin/dashboard/ourClients`);
      revalidatePath(`/ar/admin/dashboard/ourClients`);
      return { success: true, message: result.message, status: result.status };
    }
    return { success: false, message: result.message, status: result.status };
  } catch (error) {
    console.log("description_ar:banner?.description_ar??",error);
    
    return {success:false, message: "Error In Updating The Client", status: 500 };
  }
}
