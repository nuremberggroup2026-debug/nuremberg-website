"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { projectsSchema } from "@/app/server/projects/validators";
import { boolean, z } from "zod";
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
import { NewProject } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FormSelect from "../inputs/SelectorInput";
type ProjectFormValues = z.infer<typeof projectsSchema>;

interface Props {
    project: NewProject
  categories: { id: string; category_name_en: string }[] | null;
  action: (
   id:string, data: NewProject,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

function EditProjectForm({ action,categories,project }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectsSchema),
    defaultValues:{
        project_name_en: project.project_name_en ??"",
        project_name_ar: project.project_name_ar ??"",
        project_description_en: project.project_description_en ??"",
        project_description_ar: project.project_description_ar ??"",
        category_id: project.category_id ??"",
        project_image: project.project_image ??"",
        slug: project.slug ??""
    }
  });
  const router = useRouter();
  const handleUploadComplete = (url: string) => {
    setValue("project_image", url, { shouldValidate: true,shouldDirty:true });
  };

  const categoryOptions= categories?.map((category)=>({
    label: category.category_name_en,
    value: category.id
  })) ?? [];

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const watchedName = watch("project_name_en");
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


  const onSubmit: SubmitHandler<ProjectFormValues> = async (data) => {
    try {
      const result = await action(project.id??"",data);
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
        router.push("/admin/dashboard/projects");
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error In Creating The Project");
    }
  };

  return (
    <div className=" w-[93vw] md:w-[70vw] xl:w-[80vw] ml-2 md:ml-7">
      <h1 className=" border-b-2 text-[#050505] border-gray-800 text-3xl mb-3 ml-2 font-semibold ">
        Edit Project
      </h1>
      <Card className="w-full h-full pt-5">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            Edit Project Details
          </CardTitle>
          <CardDescription>
            Fill out the required fields below to edit the project.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-[50vw] xl:w-[40vw]"
          >

            <FormSelect control={control} name="category_id" label="Category" error={errors.category_id} options={categoryOptions} />
          
            <TextInput
              register={register("project_name_en")}
              label="Name (EN)"
              error={errors.project_name_en}
            />
            <TextInput
              register={register("project_name_ar")}
              label="Name (AR)"
              error={errors.project_name_ar}
            />
            <TextareaInput
              register={register("project_description_en")}
              label="English Description"
              error={errors.project_description_en}
            />
            <TextareaInput
              register={register("project_description_ar")}
              label="Arabic Description"
              error={errors.project_description_ar}
            />

            <div>
              <Label className="block text-sm font-semibold text-gray-700 mb-1 ml-2">
                Project Image
              </Label>
              <ImageUploader
                initialImageUrl={watch("project_image")}
                endpoint="projects"
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.project_image && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2 ">
                  Logo is required
                </p>
              )}
            </div>
            <div className="flex flex-row justify-center gap-4 mt-10 mb-5">
              <Button
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="bg-gray-800"
              >
                {isSubmitting ? "Saving..." : "Save Change"}{" "}
              </Button>
              <Button
                disabled={isSubmitting}
                className="bg-gray-800"
                type="button"
                onClick={() => {
                  router.push("/admin/dashboard/projects");
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

export default EditProjectForm;
