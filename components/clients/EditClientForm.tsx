"use client";

import { NewClient } from "@/types";
import ImageUploader from "@/components/ImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import { clientsSchema } from "@/app/server/clients/validators";
import TextInput from "../inputs/TextInput";
import z from "zod";
import { Button } from "../ui/button";


interface Props {
    client:NewClient |null
  action: (
    id:string,data: NewClient
  ) => Promise<{ success: boolean; message: string; status: number }>;
}

type ClientFormValues = z.infer<typeof clientsSchema>;

export default function EditClientForm({ action,client }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    
    formState: { errors, isSubmitting,isDirty },
  } = useForm<ClientFormValues>({
    resolver: zodResolver(clientsSchema),
    defaultValues: {
      name_en: client?.name_en,
      name_ar: client?.name_ar,
      logo: client?.logo,
    },
  });

  const logoValue = watch("logo");

  const handleUploadComplete = (url: string) => {
    setValue("logo", url, { shouldValidate: true });
    toast.success("Image uploaded");
  };

  const handleUploadError = (error: Error) => {
    console.error("Upload error:", error);
    toast.error(`Upload failed: ${error.message}`);
  };
  const onSubmit: SubmitHandler<ClientFormValues> = async (data) => {
      try {
        const result = await action(client!.id??"",data);
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
          setTimeout(() => {
            router.replace("/admin/dashboard/ourClients");
          }, 500);
        } else {
          toast.error(result.message);
        }
      } catch (err) {
        toast.error("Error In Creating The Client");
      }
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7 ">
      <div className="flex flex-col justify-start items-start border-b-2 border-gray-800 w-[90vw] md:w-[65vw] mb-7">
        <h1 className=" text-[#050505] text-3xl  font-semibold">Edit Client</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5 "
      >
        <Card className="w-full h-full pt-5">
          <CardHeader>
            <CardTitle>Edit Client Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to edit the client.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7 ">
            {/* Name Field */}
            <TextInput
              register={register("name_en")}
              label="English Name"
              error={errors.name_en}
              className="w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw]"
            />
            <TextInput
              register={register("name_ar")}
              label="Arabic Name"
              error={errors.name_ar}
              className="w-[80vw] md:w-[75vw] lg:w-[65vw] xl:w-[40vw]"
            />

            {/* Logo Field */}
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Client Logo</label>
              <ImageUploader
                endpoint="ourClients"
                initialImageUrl={logoValue}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.logo && (
                <p className="text-red-600 text-sm mt-1">Logo Is Required</p>
              )}
            </div>

            {/* Buttons */}
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <Button
                  type="button"
                  onClick={() => router.replace("/admin/dashboard/ourClients")}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={!isDirty ||isSubmitting}>
                  {isSubmitting   ? "Saving..." : "Save Change"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
