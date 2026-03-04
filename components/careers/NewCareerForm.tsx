"use client";

import  { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { careersSchema } from "@/app/server/careers/validators";
import ImageUploader from "@/components/ImageUpload";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import { z } from "zod";
import Button2 from "@/components/ui/Button2";
import Button1 from "@/components/ui/Button1";
import MultiInputForm from "../inputs/MultiInput";

type CareerFormValues = z.infer<typeof careersSchema>;

interface Props {
  action: (
    data: CareerFormValues,
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

export default function CreateCareerForm({ action }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<CareerFormValues>({
    resolver: zodResolver(careersSchema),
    defaultValues:{
        requirements_ar:[],
        requirements_en:[],
        is_deleted:false
    }
  });
  

  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };
  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };
  const watchedTitle = watch("position_en");
  useEffect(() => {
    const slug = (watchedTitle ?? "")
      .toLowerCase()
      .replace(/&/g, "and")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

    setValue("slug", slug, { shouldDirty: false, shouldValidate: false });
  }, [watchedTitle, setValue]);

  const onSubmit = async (data: CareerFormValues) => {
    try {
      const result = await action(data);
      if (result.status === 401) {
        toast.error(result.message);
        router.push("/login");
        return;
      }

      if (result.status === 403) {
        toast.error(result.message);
        router.push("/");
        return;
      }

      if (result.status === 201) {
        toast.success(result.message);
        router.push("/admin/dashboard/careers");
        return;
      }

      toast.error(result.message);
    } catch (err) {
      toast.error("Error In Creating The Career");
    }
  };

  return (
    <main className="w-full max-w-6xl px-4 sm:px-6 md:px-8">
      <h1 className="border-b-2 border-gray-800 text-3xl font-semibold text-gray-800 mb-4 pb-1">
        Add New Career
      </h1>

      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            New Career Details
          </CardTitle>
          <CardDescription>
            Fill out the required fields below to create a new career.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full lg:w-2/3"
            aria-busy={isSubmitting}
          >
            <div className="flex flex-col w-full gap-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                  register={register("position_en")}
                  label="Position (EN)"
                  error={errors.position_en}
                />
                <TextInput
                  register={register("position_ar")}
                  label="Position (AR)"
                  error={errors.position_ar}
                />
              </div>
              <div className="flex flex-col gap-4">
                <TextareaInput
                  register={register("description_en")}
                  label="Description (EN)"
                  error={errors.description_en}
                />
                <TextareaInput
                  register={register("description_ar")}
                  label="Description (AR)"
                  error={errors.description_ar}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                  register={register("experience_en")}
                  label="Experience (EN)"
                  error={errors.position_en}
                />
                <TextInput
                  register={register("experience_ar")}
                  label="Experience (AR)"
                  error={errors.experience_en}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <TextInput
                  register={register("role_en")}
                  label="Role (EN)"
                  error={errors.role_en}
                />
                <TextInput
                  register={register("role_ar")}
                  label="Role (AR)"
                  error={errors.role_ar}
                />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <MultiInputForm
                  control={control}
                  label="Requirements (EN)"
                  name="requirements_en"
                  error={errors.requirements_en}
                />
                <MultiInputForm
                  control={control}
                  label="Requirements (AR)"
                  name="requirements_ar"
                  error={errors.requirements_ar}
                />
              </div>
              <div>
                <Label className="block text-sm font-semibold text-gray-700 mb-2 ml-2">
                  Career Image
                </Label>
                <ImageUploader
                  initialImageUrl={watch("image")}
                  endpoint="careers"
                  onUploadComplete={handleUploadComplete}
                  onUploadError={handleUploadError}
                />
                {errors.image && (
                  <p className="mt-1 text-xs text-red-600">Image is required</p>
                )}
              </div>
              <input type="hidden" {...register("slug")} />
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12 mb-12">
              <Button2
                type="submit"
                disabled={!isDirty || isSubmitting}
                className="bg-gray-800 sm:w-auto"
                aria-disabled={!isDirty || isSubmitting}
              >
                {isSubmitting ? "Adding..." : "Add Course"}
              </Button2>
              <Button1
                disabled={isSubmitting}
                type="button"
                onClick={() => router.push("/admin/dashboard/careers")}
                className="bg-gray-800 sm:w-auto"
              >
                Cancel
              </Button1>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
