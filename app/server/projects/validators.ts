import { z } from "zod";

export const projectsSchema = z.object({
  id: z.string().optional(),
  project_name_en: z.string().min(1, "English Name is required"),
  project_name_ar: z.string().min(1, "Arabic Name is required"),
  project_description_en: z.string().min(1, "English description is required").nullable(),
  project_description_ar: z.string().min(1, "Arabic description is required").nullable(),
  category_id: z.string().min(1, "Category is required"),
  project_image: z.string().min(1, "Image is required").nullable(),
  slug: z.string().min(1, "Slug is required"),
});
