import {z} from "zod"

export const categoriesSchema= z.object({
    id:z.string().optional(),
    category_name_en:z.string().min(1,"English category name is required"),
    category_name_ar:z.string().min(1,"Arabic category name is required"),
    category_description_en:z.string().min(1,"English description is required"),
    category_description_ar:z.string().min(1,"Arabic description is required"),
    category_logo:z.string().min(1,"Category logo is required"),
    slug:z.string().min(1,"Slug is required")
})