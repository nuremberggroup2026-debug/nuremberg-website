import { register } from "@/app/server/users/services";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const result = await register(body);

    return NextResponse.json(result, { status: result.status });
  } catch (err) {
    console.error("error:", err);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
};
