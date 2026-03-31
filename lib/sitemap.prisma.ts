import prisma from "@/lib/prisma";

/**
 * Careers
 */
export async function fetchCareerIds(): Promise<Array<{ id: string }>> {
  try {
    return await prisma.careers.findMany({
      select: { id: true },
    });
  } catch (err) {
    console.error("Error fetching career ids:", err);
    return [];
  }
}