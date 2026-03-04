import prisma from "@/lib/prisma";
import { Locale, type NewCategory } from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const addNewCategory = async (data: NewCategory) => {
  try {
    const result = await prisma.categories.create({ data });
    revalidateTag("categories", "max");
    return {
      data: result,
      message: "Category Added Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Adding The Category",
      status: 500,
    };
  }
};

export const getAllCategories = unstable_cache(
  async () => {
    try {
      const result = await prisma.categories.findMany({});
      if (result.length === 0)
        return { data: null, message: "There Are No Categories", status: 200 };

      return {
        data: result,
        message: "All Categories",
        status: 200,
      };
    } catch (error) {
      return {
        data: null,
        message: "Error In Getting The Categories",
        status: 500,
      };
    }
  },

  ["all-categories"],
  {
    // Tag for revalidating from anywhere in the app
    tags: ["categories"],

    // Revalidate cache every 1 hour
    revalidate: 3600,
  },
);

export const getCategoriesNameAndId= async ()=>{
  try {
    const result = await prisma.categories.findMany({
      select:{id:true,category_name_en:true}
    })
    return {
      data: result,
      message: "Categories Retrieved Successfully",
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      message: "Error In Retrieving The Categories",
      status: 500,
    };
  }
}

export const getCategoryById = (id: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.categories.findUnique({ where: { id } });

        if (!result)
          return {
            data: null,
            message: `There Is No Category With This ID: ${id}`,
            status: 200,
          };

        return {
          data: result,
          message: `The Category With This ID: ${id}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error In Getting The Category",
          status: 500,
        };
      }
    },
    [`category-by-id-${id}`],
    {
      tags: ["categories"],
      revalidate: 3600,
    },
  )();

export const getCategoryBySlug = (slug: string) =>
  unstable_cache(
    async (slug: string) => {
      try {
        const result = await prisma.categories.findUnique({ where: { slug } });

        if (!result)
          return {
            data: null,
            message: `There Is No Category With This slug: ${slug}`,
            status: 200,
          };

        return {
          data: result,
          message: `The Category With This slug: ${slug}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: error,
          message: "Error In Getting The Category",
          status: 500,
        };
      }
    },
    [`category-by-slug-${slug}`],
    { tags: ["categories"], revalidate: 3600 },
  );

export const updateCategory = async (
  category_id: string,
  data: Partial<NewCategory>,
) => {
  try {
    const existing = await prisma.categories.findUnique({
      where: { id: category_id },
    });
    if (!existing)
      return {
        data: null,
        message: `There Is No Category With This ID: ${category_id}`,
        status: 409,
      };

    const result = await prisma.categories.update({
      where: { id: category_id },
      data,
    });
    revalidateTag("categories", "max");
    return {
      data: result,
      message: `Category Updated Successfully`,
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Updating The Category",
      status: 500,
    };
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const existing = await prisma.categories.findUnique({
      where: { id },
      select: { id: true, category_logo: true },
    });
    if (!existing)
      return {
        data: null,
        message: `There Is No Category With This ID: ${id}`,
        status: 409,
      };

    const result = await prisma.categories.delete({
      where: { id },
    });
    const logoKey = existing.category_logo?.split("/f/")[1];
    if (logoKey) {
      await utapi.deleteFiles(logoKey);
    }
    revalidateTag("categories", "max");
    return {
      data: result,
      message: `Category Deleted Successfully`,
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Deleting The Category",
      status: 500,
    };
  }
};

export const getAllCategoriesByLocale = (locale: Locale) => 
  unstable_cache(
    async () => {
      try {
        const result = await prisma.categories.findMany({});
        const translatedCategories = result.map((category:NewCategory) => {
          return {
            id: category.id,
            name:
              locale === "en"
                ? category.category_name_en
                : category.category_name_ar,
            description:
              locale === "en"
                ? category.category_description_en
                : category.category_description_ar,
            category_logo: category.category_logo,
            slug: category.slug,
          };
        });

        return {
          data: translatedCategories,
          message: "All Categories",
          status: 200,
        }
      } catch (error) {
        return {
          data: null,
          message: "Error fetching categories",
          status: 500,
        };
      }
    },
    [`all-categories-by-locale-${locale}`],
    { tags: ["categories"], revalidate: 3600 },
  )();

export const getCategoryByIdAndLocale = async (id: string, locale: Locale) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.categories.findUnique({
          where: { id },
        });

        if (!result)
          return {
            data: null,
            message: `There Is No Category With This ID: ${id}`,
            status: 200,
          };

        const transletedCategory = {
          id: result.id,
          name:
            locale === "en" ? result.category_name_en : result.category_name_ar,
          description:
            locale === "en"
              ? result.category_description_en
              : result.category_description_ar,
          category_logo: result.category_logo,
          slug: result.slug,
        };
        return {
          data: transletedCategory,
          message: `The Category With This ID: ${id}`,
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error fetching category",
          status: 500,
        };
      }
    },
    [`category-by-id-and-locale-${id}-${locale}`],
    { tags: ["categories"], revalidate: 3600 },
  )()


