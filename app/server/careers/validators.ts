import {z} from "zod"

export const careersSchema= z.object({
    id:z.string().optional(),
    position_en:z.string().min(1,"English postion is required"),
    position_ar:z.string().min(1,"Arabic postion is required"),
    description_en:z.string().min(1,"English description is required"),
    description_ar:z.string().min(1,"English description is required"),
    requirements_en:z.array(z.string()).length(1,"English requirements are required"),
    requirements_ar:z.array(z.string()).length(1,"Arabic requirements are required"),
    experience_en:z.string().min(1,"English experience is required"),
    experience_ar:z.string().min(1,"Arabic experience is required"),
    role_en:z.string().min(1,"English role is required"),
    role_ar:z.string().min(1,"Arabic role is required"),
    slug:z.string().min(1,"Slug is required"),
    image:z.string().min(1,"Image is required"),
    is_deleted:z.boolean().nullable()
})