import { MetadataRoute } from "next";
import { fetchCareerIds } from "@/lib/sitemap.prisma";

const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages = [
    { url: `${SITE_URL}/en`, lastModified: now },

    { url: `${SITE_URL}/about-us`, lastModified: now },

    { url: `${SITE_URL}/alpha-production`, lastModified: now },

    { url: `${SITE_URL}/nuremberg-tech`, lastModified: now },

    { url: `${SITE_URL}/careers`, lastModified: now },

    { url: `${SITE_URL}/application-form`, lastModified: now },
   
  ];

  const careerIds = await fetchCareerIds();

  const applicationPages = careerIds.flatMap((career) => [
    {
      url: `${SITE_URL}/application-form/${career.id}`,
      lastModified: now,
    },
  ]);

  return [...staticPages, ...applicationPages];
}