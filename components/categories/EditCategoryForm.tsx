"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import {  categoriesSchema } from "@/app/server/categories/validators";
import {  z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import ImageUploader from "../ImageUpload";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";
import {  NewCategory } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
type CategoryFormValues = z.infer<typeof categoriesSchema>;

interface Props {
    category: NewCategory;
  action: (
    data: Partial<NewCategory>,id:string
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

function CreateCategoryForm({ action,category }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors,isSubmitting,isDirty },
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categoriesSchema),
    defaultValues: {
      category_name_en: category.category_name_en ?? "",
      category_name_ar: category.category_name_ar ?? "",
      category_description_en: category.category_description_en ?? "",
      category_description_ar: category.category_description_ar ?? "",
      category_logo: category.category_logo ?? "",
    },
  });
  const router = useRouter();
  const handleUploadComplete = (url: string) => {
    setValue("category_logo", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

   const watchedName = watch("category_name_en");
    useEffect(() => {
       const slug = (watchedName ?? "")
        .toLowerCase()
        .replace(/&/g, "and")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      setValue(
        "slug",
          slug,
       { shouldDirty: false, shouldValidate: false },
      );
    },[watchedName, setValue]);

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    try {
      const result = await action(data,category.id??"");
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
        return;
      } else if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
        return;
      } else if (result.status === 201) {
        toast.success(result.message);
        router.push("/admin/dashboard/categories");
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error In Updating The Category");
    }
  };

  return (
    <div className=" w-[93vw] md:w-[70vw] xl:w-[80vw] ml-2 md:ml-7">
      <h1 className=" border-b-2 text-[#050505] border-gray-800 text-3xl mb-3 ml-2 font-semibold ">
        Edit Category
      </h1>
      <Card className="w-full h-full pt-5">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">Edit Category Details</CardTitle>
          <CardDescription>
            Update the details of the category.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[50vw] xl:w-[40vw]">
            <TextInput
              register={register("category_name_en")}
              label="Name (EN)"
              error={errors.category_name_en}
            />
            <TextInput
              register={register("category_name_ar")}
              label="Name (AR)"
              error={errors.category_name_ar}
            />
            <TextareaInput
              register={register("category_description_en")}
              label="English Description"
              error={errors.category_description_en}
            />
            <TextareaInput
              register={register("category_description_ar")}
              label="Arabic Description"
              error={errors.category_description_ar}
            />

            <div>
              <Label className="block text-sm font-semibold text-gray-700 mb-1 ml-2">
                Category Image
              </Label>
              <ImageUploader
                initialImageUrl={watch("category_logo")}
                endpoint="categories"
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.category_logo && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2 ">
                  Logo is required
                </p>
              )}
            </div>
            <div className="flex flex-row justify-center gap-4 mt-10 mb-5">
              <Button type="submit" disabled={!isDirty || isSubmitting} className="bg-gray-800">
                {isSubmitting ? "Saving..." : "Save Change"}{" "}
              </Button>
              <Button
                disabled={isSubmitting}
                className="bg-gray-800"
                type="button"
                onClick={() => {
                  router.push("/admin/dashboard/categories");
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default CreateCategoryForm;
