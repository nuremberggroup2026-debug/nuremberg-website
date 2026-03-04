import prisma from "@/lib/prisma";
import { Locale, type NewBanner } from "@/types/index";
import { revalidateTag, unstable_cache } from "next/cache";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const addNewBanner = async (data: NewBanner) => {
  try {
    const result = await prisma.banners.create({
      data: {
        alt: data.alt,
        image: data.image,
        description_en: data.description_en,
        description_ar: data.description_ar,
      },
    });

    revalidateTag("banners", "max");
    return {
      data: result,
      message: "Banner Added Successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error In Adding The Banner",
      status: 500,
    };
  }
};

export const getAllBanners = unstable_cache(
  async () => {
    try {
      const result = await prisma.banners.findMany({});

      return {
        data: result,
        message: "Banners fetched successfully",
        status: 200,
      };
    } catch (error) {
      return {
        data: [],
        message: "Error fetching banners",
        status: 500,
      };
    }
  },
  ["all-banners"],
  { tags: ["banners"], revalidate: 3600 },
);

export const getBannerById = (id: string) =>
  unstable_cache(
    async () => {
      try {
        const result = await prisma.banners.findUnique({
          where: { id },
        });

        if (!result)
          return { data: null, message: "Banner not found", status: 409 };

        return {
          data: result,
          message: "Banner fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error fetching banner",
          status: 500,
        };
      }
    },
    [`banner-by-id-${id}`],
    { tags: ["banners"], revalidate: 3600 },
  )();

export const updateBanner = async (id: string, data: Partial<NewBanner>) => {
  try {
    const existing = await prisma.banners.findUnique({ where: { id } });

    if (!existing)
      return { data: null, message: "Banner not found", status: 409 };

    const result = await prisma.banners.update({
      where: { id },
      data,
    });

    revalidateTag("banners", "max");
    return {
      data: result,
      message: "Banner updated successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error updating banner",
      status: 500,
    };
  }
};

export const deleteBanner = async (id: string) => {
  try {
    const existing = await prisma.banners.findUnique({
      where: { id },
      select: { image: true, id: true },
    });

    if (!existing)
      return { data: null, message: "Banner not found", status: 409 };

    const result = await prisma.banners.delete({
      where: { id },
    });
    const imageKey = existing.image?.split("/f/")[1];
    if (imageKey) {
      await utapi.deleteFiles(imageKey);
    }
    revalidateTag("banners", "max");
    return {
      data: result,
      message: "Banner deleted successfully",
      status: 201,
    };
  } catch (error) {
    return {
      data: error,
      message: "Error deleting banner",
      status: 500,
    };
  }
};

export const getBannersByLocale = async (locale: Locale) => 
  unstable_cache(
    async () => {
      try {
        const result = await prisma.banners.findMany({});
        const tarnslatedBanner = result.map((banner:NewBanner) => {
          return {
            image: banner.image,
            description:
              locale === "en" ? banner.description_en : banner.description_ar,
            alt: banner.alt,
            id: banner.id,
          };
        });
        return {
          data: tarnslatedBanner,
          message: "Banners fetched successfully",
          status: 200,
        };
      } catch (error) {
        return {
          data: null,
          message: "Error In Fetching Banners By Locale",
          status: 500,
        };
      }
    },
    [`banners-by-locale-${locale}`],
    { tags: ["banners"], revalidate: 3600 },
  );

