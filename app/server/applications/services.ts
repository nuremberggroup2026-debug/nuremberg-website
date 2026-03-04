import prisma from "@/lib/prisma";
import { type NewApplication } from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const addNewApplication = async (data: NewApplication) => {
  try {
    const result = await prisma.applications.create({ data });
    revalidateTag("applications", "max");
    return {
      data: result,
      message: "Your Application Was Submitted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Submitting Your Application",
      status: 500,
    };
  }
};

export const getAllApplications = unstable_cache(
  async () => {
    try {
      const result = await prisma.applications.findMany({});
      return { data: result, messsage: "All Applications", status: 200 };
    } catch (error) {
      return {
        data: error,
        messsage: "Error in getting All Applications",
        status: 500,
      };
    }
  },
  ["all-applications"],
  { tags: ["applications"], revalidate: 3600 },
);

export const getApplicationsByCareerId = (careerId: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.applications.findMany({
          where: { career_id: careerId },
          include: { careers: { select: { position_en: true } } },
        });
        return {
          data: result,
          messsage: `All Applications With This Career Id: ${careerId}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          messsage: `Error In Getting Applications With This Career Id: ${careerId}`,
          status: 500,
        };
      }
    },
    [`application-by-career-id-${careerId}`],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  )();

export const getApplicationsByApplicationId = (applicationId: string) =>
  unstable_cache(
    async (applicationId: string) => {
      try {
        const result = await prisma.applications.findMany({
          where: { id: applicationId },
        });
        return {
          data: result,
          messsage: `Application With This Id: ${applicationId}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: error,
          messsage: `Error In Getting Application  This Id: ${applicationId}`,
          status: 500,
        };
      }
    },
    [`application-by-application-id-${applicationId}`],
    {
      tags: ["applications"],
      revalidate: 3600,
    },
  );

export const deleteApplication = async (id: string) => {
  try {
    const existing = await prisma.applications.findUnique({
      where: { id },
      select: { id: true, cv: true },
    });
    if (!existing)
      return {
        data: null,
        message: `There Is No Application With This ID: ${id}`,
        status: 409,
      };

    const result = await prisma.applications.delete({
      where: { id },
    });

    const fileKey = existing.cv.split("/f/")[1]; // upload thing requeried the the file key, so i can`t just send the full url to delete the file, i have to get the file key
    const deleteFile = await utapi.deleteFiles(fileKey);
    revalidateTag("applications", "max");
    return {
      data: result,
      message: `Application Deleted Successfully`,
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleting The Application",
      status: 500,
    };
  }
};

export const getFilteredApplications = async (
  career_id: string,
  page: number,
) => {
  const limit = 10;
  const skip = limit * (page - 1);
  try {
    const numberOfApplications = await prisma.applications.count({
      where: { career_id },
    });
    const result = await prisma.applications.findMany({
      where: { career_id },
      skip,
      take: limit,
    });
    return {
      totalApplications: numberOfApplications,
      data: result,
      message: "Filtered Applications",
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error in getting filtered applications",
      status: 500,
    };
  }
};

export const getApplicationById = async (id: string) => {
  try {
    const result = await prisma.applications.findUnique({
      where: { id },
      include: { careers: true },
    });
    if (!result)
      return {
        data: null,
        message: `There Is No Application With This ID: ${id}`,
        status: 409,
      };
    return {
      data: result,
      message: `Application With This ID: ${id}`,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error In Getting The Application",
      status: 500,
    };
  }
};

export const markApplicationAsShown = async (id: string) => {
  try {
    const existing = await prisma.applications.findUnique({
      where: { id },
    });
    if (!existing) {
      return {
        data: null,
        message: `There Is No Application With This ID: ${id}`,
        status: 409,
      };
    }
    const result = await prisma.applications.update({
      where: { id },
      data: { is_shown: true },
    });
    revalidateTag("applications", "max");
    return {
      data: result,
      message: `Application Marked As Shown Successfully`,
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Marking Application As Shown",
      status: 500,
    };
  }
};
