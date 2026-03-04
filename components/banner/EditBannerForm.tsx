"use client";
import { bannerSchema } from "@/app/server/banners/validators";
import { NewBanner } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import  { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
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
import { Label } from "@radix-ui/react-dropdown-menu";

interface Props {
  banner: NewBanner;
  action: (
    id: string,
    data: Partial<NewBanner>
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
type BannerFormValues = z.infer<typeof bannerSchema>;

function EditBannerForm({ banner, action }: Props) {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors,isSubmitting,isDirty },
  } = useForm<BannerFormValues>({
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      alt: banner.alt ?? "",
      description_en: banner.description_en ?? "",
      description_ar: banner.description_ar ?? "",
      image: banner.image ?? "",
    },
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
      const result = await action(banner.id ?? "", data);
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
      <div className="flex flex-col justify-start items-start border-b-2 border-gray-900 mb-3">
        <h1 className="text-lg md:text-2xl text-[#050505] font-bold">Edit Banner</h1>
        <p className="text-xs md:text-base text-gray-600">ID: {banner.id}</p>
      </div>
      <Card className="w-full h-full pt-5">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800">
            Edit Banner Details
          </CardTitle>
          <CardDescription>
            Fill out the required fields below to update the banner.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full md:w-[50vw] xl:w-[40vw]"
          >
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
              <Button type="submit" disabled={!isDirty ||isSubmitting} className="bg-gray-800">
                {isSubmitting ?"Saving..." : "Save Change"}{" "}
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

export default EditBannerForm;
