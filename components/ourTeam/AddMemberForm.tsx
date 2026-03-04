"use client";
import { type NewMember } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import ImageUploader from "@/components/ImageUpload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import z from "zod";
import { toast } from "sonner";
import { ourteamSchema } from "@/app/server/ourTeam/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import TextInput from "../inputs/TextInput";
import TextareaInput from "../inputs/TextareaInput";
import { Button } from "../ui/button";
import FormCheckbox from "@/components/inputs/CheckBoxInput"

interface Props {
  action: (
    data: NewMember
  ) => Promise<{ success: boolean; message: string; status: number }>;
}
type MembersFormValues = z.infer<typeof ourteamSchema>;

export default function AddMemberForm({ action }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors,isSubmitting },
  } = useForm<MembersFormValues>({
    resolver: zodResolver(ourteamSchema),
    defaultValues:{
        main:false
    }
  });
  const router = useRouter();

  const handleUploadComplete = (url: string) => {
    setValue("image", url, { shouldValidate: true });
  };

  const handleUploadError = (error: Error) => {
    console.error(error);
    toast.error(`Upload failed: ${error.message}`);
  };

  console.log("errors nghgsww: ",errors);
  

  const onSubmit: SubmitHandler<MembersFormValues> = async (data) => {
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
          router.push("/admin/dashboard/ourTeam");
          return;
        } else {
          toast.error(result.message);
        }
      } catch (error) {
        toast.error("Error In Creating The Member");
      }
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[90vw] md:w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Member</h1>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="h-full w-full lg:w-[70vw] flex flex-col gap-5"
      >
        <Card className="w-full h-full pt-5">
          <CardHeader>
            <CardTitle>New Member Details</CardTitle>
            <CardDescription>
              Fill out the required fields below to create a new member.
            </CardDescription>
          </CardHeader>

          <CardContent className="flex flex-col items-start gap-5 mb-7 ">
            <FormCheckbox
              name="main"
              error={errors.main}
              className="lg:w-[19.5vw] w-full"
              label=" Is Main?"
              control={control}
            />
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <TextInput
                register={register("name_en")}
                label="Name (EN)"
                error={errors.name_en}
                className="lg:w-[19.5vw] w-full"
              />
              <TextInput
                register={register("name_ar")}
                label="Name (AR)"
                error={errors.name_ar}
                className="lg:w-[19.5vw] w-full"
              />
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4">
              <TextInput
                register={register("position_en")}
                label="Position (EN)"
                error={errors.position_en}
                className="lg:w-[19.5vw] w-full"
              />
              <TextInput
                register={register("position_ar")}
                label="Position (AR)"
                error={errors.position_ar}
                className="lg:w-[19.5vw] w-full"
              />
            </div>
            <TextareaInput
              register={register("description_en")}
              label="English Description"
              error={errors.description_en}
              className="md:w-[40vw] w-full "
            />
            <TextareaInput
              register={register("description_ar")}
              label="Arabic Description"
              error={errors.description_ar}
              className="md:w-[40vw] w-full"
            />
            <div className="flex flex-col w-full max-w-sm">
              <label className="text-base text-black mb-1">Member Image</label>
              <ImageUploader
                endpoint="ourTeam"
                initialImageUrl={watch("image")}
                onUploadComplete={handleUploadComplete}
                onUploadError={handleUploadError}
              />
              {errors.image && (
                <p className={`mt-1 text-xs text-red-600 `}>
                  Image Is Required
                </p>
              )}
            </div>
            <div className="w-full flex justify-center mt-5">
              <div className="flex flex-row gap-3">
                <Button
                  type="button" disabled={isSubmitting}
                  onClick={() => router.replace("/admin/dashboard/ourTeam")}
                >
                  Cancel
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Adding..." : "Add Member"}{" "}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </main>
  );
}
