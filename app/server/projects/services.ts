import prisma from "@/lib/prisma";
import { Locale, NewProject ,GetProject, NewCategory} from "@/types";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

type ProjectType=  {
  id?: string;
  project_name_en: string;
  project_name_ar: string;
  project_description_en: string | null;
  project_description_ar: string | null;
  category_id: string;
  project_image: string | null;
  slug: string;
  categories: NewCategory
};


export const addNewProject = async (data: NewProject) => {
  try {
    const result = await prisma.projects.create({ data });
    revalidateTag("projects", "max");
    return {
      data: result,
      message: "Project Has Been Added Successfully",
      status: 201,
    };
  } catch (error) {
    return { data: error, message: "Error In Adding The Project", status: 500 };
  }
};

export const getAllProjects = unstable_cache(
  async () => {
    try {
      const result = await prisma.projects.findMany({
        include: {
          categories: {select: {
            category_name_en: true,
            id: true}},
        },
      });

      if (!result)
        return {
          data: null,
          message: `There Are No Projects`,
          status: 200,
        };

      return { data: result, message: "All Projects", status: 200 };
    } catch (error) {
      return { data: null, message: "Error In Getting Projects", status: 500 };
    }
  },
  ["all-projects"],
  { tags: ["projects"], revalidate: 3600 },
);

export const getProjectById = (id: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.projects.findUnique({
          where: { id },
          include: { categories: true },
        });

        if (!result)
          return {
            data: null,
            message: `No Project With This ID:${id}`,
            status: 200,
          };
        return {
          data: result,
          message: `Project With This ID:${id}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: `Error In Getting The Project`,
          status: 200,
        };
      }
    },
    [`project-by-id-${id}`],
    { tags: ["projects"], revalidate: 3600 },
  )();

export const getProjectBySlug = (slug: string) =>
  unstable_cache(
    async (slug: string) => {
      try {
        const result = await prisma.projects.findUnique({
          where: { slug },
          include: { categories: true },
        });

        if (!result)
          return {
            data: null,
            message: `No Project With This Slug:${slug}`,
            status: 200,
          };
        return {
          data: result,
          message: `Project With This Slug:${slug}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: error,
          message: `Error In Getting The Project`,
          status: 200,
        };
      }
    },
    [`project-by-slug-${slug}`],
    { tags: ["all-projects"], revalidate: 3600 },
  );

export const getProjectByCategoryId = (categoryId: string) =>
  unstable_cache(
    async (categoryId: string) => {
      try {
        const result = await prisma.projects.findMany({
          where: { category_id: categoryId },
          include: { categories: true },
        });
        if (!result)
          return {
            data: null,
            message: `No Project With This Category ID:${categoryId}`,
            status: 200,
          };
        return {
          data: result,
          message: `Project With This Category ID:${categoryId}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: error,
          message: `Error In Getting The Project`,
          status: 200,
        };
      }
    },
    [`project-by-category-id-${categoryId}`],
    { tags: ["project"], revalidate: 3600 },
  );

export const updateProject = async (id: string, data: Partial<NewProject>) => {
  try {
    const exsiting = await prisma.projects.findUnique({ where: { id } });

    if (!exsiting)
      return { data: null, message: "Project Not Found", status: 200 };

    const result = await prisma.projects.update({ where: { id }, data });
    revalidateTag("projects", "max");
    return {
      data: result,
      message: "Project Has Been Updated Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Updating The Project",
      status: 500,
    };
  }
};

export const deleteProject = async (id: string) => {
  try {
    const exsiting = await prisma.projects.findUnique({
      where: { id },
      select: { id: true, project_image: true },
    });

    if (!exsiting)
      return { data: null, message: "Project Not Found", status: 200 };

    const result = await prisma.projects.delete({ where: { id } });
    const imageKey = exsiting.project_image?.split("/f/")[1];
    if (imageKey) {
      await utapi.deleteFiles(imageKey);
    }
    revalidateTag("projects", "max");
    return {
      data: result,
      message: "Project Has Been Deleted Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In deleting The Project",
      status: 500,
    };
  }
};

export const getAllProjectsByLocale = (locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.projects.findMany({
          include: {
            categories: {
              select: {
                category_name_en: true,
                category_name_ar: true,
                category_description_en: true,
                category_description_ar: true,
                category_logo:true,
                slug:true
              },
            },
          },
        });
        const translatedProjects = result.map((project:ProjectType) => {
          return {
            id: project.id,
            project_image: project.project_image,
            project_slug: project.slug,
            project_name:
              locale === "en"
                ? project.project_name_en
                : project.project_name_ar,
            project_description:
              locale === "en"
                ? project.project_description_en
                : project.project_description_ar,
            category_name:
              locale === "en"
                ? project.categories?.category_name_en
                : project.categories?.category_name_ar,
            category_id: project.category_id,
            category_description:
              locale === "en"
                ? project.categories?.category_description_en
                : project.categories?.category_description_ar,
          };
        });
        return {
          data: translatedProjects,
          message: "Projects fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error In Fetching Projects By Locale",
          status: 500,
        };
      }
    },
    [`projects-by-locale-${locale}`],
    { tags: ["projects"], revalidate: 3600 },
  )();

export const getProjectByIdAndLocale = async (id: string, locale: Locale) =>
  unstable_cache(async () => {
    try {
      const result = await prisma.projects.findUnique({
        where: { id },
        include: {
          categories: {
            select: {
              category_name_en: true,
              category_name_ar: true,
              category_description_en: true,
              category_description_ar: true,
            },
          },
        },
      });

      if (!result)
        return {
          data: null,
          message: "Project Not Found",
          status: 409,
        };

      return {
        data: {
          id: result.id,
          project_image: result.project_image,
          project_slug: result.slug,
          project_name:
            locale === "en" ? result.project_name_en : result.project_name_ar,
          project_description:
            locale === "en"
              ? result.project_description_en
              : result.project_description_ar,
          category_name:
            locale === "en"
              ? result.categories?.category_name_en
              : result.categories?.category_name_ar,
          category_id: result.category_id,
          category_description:
            locale === "en"
              ? result.categories?.category_description_en
              : result.categories?.category_description_ar,
        },
      };
    } catch (error) {
      return {
        data: null,
        message: "Error In Fetching The Project By Locale",
        status: 500,
      };
    }
  })()
