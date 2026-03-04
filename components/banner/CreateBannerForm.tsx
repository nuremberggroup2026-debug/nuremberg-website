"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { bannerSchema } from "@/app/server/banners/validators";
import { boolean, z } from "zod";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardDescription,
  CardTitle,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import ImageUploader from "../ImageUpload";
import { toast } from "sonner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { NewBanner } from "@/types";
import { useRouter } from "next/navigation";
type BannerFormValues = z.infer<typeof bannerSchema>;

interface Props {
  action: (
    data: NewBanner
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

function CreateBannerForm({ action }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors,isSubmitting,isDirty },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
  });
  const router = useRouter();
  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  const onSubmit: SubmitHandler<BannerFormValues> = async (data) => {
    try {
      const result = await action(data);
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
        router.push("/admin/dashboard/banner");
        return;
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Error In Creating The Banner");
    }
  };

  return (
    <div className=" w-[93vw] md:w-[70vw] xl:w-[80vw] ml-2 md:ml-7">
      <h1 className=" border-b-2 text-gray-800 border-gray-800 text-3xl mb-3 ml-2 font-semibold ">
        Add New Banner
      </h1>
      <Card className="w-full h-full pt-5">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">New Banner Details</CardTitle>
          <CardDescription>
            Fill out the required fields below to create a new banner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="w-full md:w-[50vw] xl:w-[40vw]">
            <TextInput
              register={register("alt")}
              label="Name"
              error={errors.alt}
            />
            <TextareaInput
              register={register("description_en")}
              label="English Description"
              error={errors.description_en}
            />
            <TextareaInput
              register={register("description_ar")}
              label="Arabic Description"
              error={errors.description_ar}
            />

            <div>
              <Label className="block text-sm font-semibold text-gray-700 mb-1 ml-2">
                Banner Image
              </Label>
              <ImageUploader
                initialImageUrl={watch("image")}
                endpoint="banners"
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.image && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-2 ml-2 ">
                  Image is required
                </p>
              )}
            </div>
            <div className="flex flex-row justify-center gap-4 mt-10 mb-5">
              <Button type="submit" disabled={!isDirty || isSubmitting} className="bg-gray-800">
                {isSubmitting ? "Adding..." : "Add Banner"}{" "}
              </Button>
              <Button
                disabled={isSubmitting}
                className="bg-gray-800"
                type="button"
                onClick={() => {
                  router.push("/admin/dashboard/banner");
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

export default CreateBannerForm;
