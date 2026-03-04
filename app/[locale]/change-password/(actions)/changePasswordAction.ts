"use server";
import { changePassword } from "@/app/server/users/services";

export const changePasswordAction = async (
  oldPassword: string,
  newPassword: string,
  user_id: string
) => {
  try {
    const result = await changePassword(oldPassword, newPassword, user_id);

    if (!result) {
      return {
        data: null,
        message: "Unexpected empty response from changePassword",
        status: 500,
      };
    }

    return {
      data: result.data,
      message: result.message,
      status: result.status,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error in changing the password",
      status: 500,
    };
  }
};
