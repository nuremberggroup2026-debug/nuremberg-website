"use client";
import { NewApplication, NewCareer } from "@/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { applicationSchema } from "@/app/server/applications/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2, Calendar, Clock, ArrowRight } from "lucide-react";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import { useRouter } from "next/navigation";
import FileUploader from "../FileUploader";

type ApplicationFormValue = z.infer<ReturnType<typeof applicationSchema>>;

interface Props {
  course: NewCareer;
  action: (
    data: NewApplication,
  ) => Promise<{ success: boolean; status: number; message: string }>;
  locale: "en" | "ar";
}

function NewApplicationForm({ action, locale, course }: Props) {
  const isArabic = locale === "ar";
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    control,
    formState: { isSubmitting, errors },
  } = useForm<ApplicationFormValue>({
    resolver: zodResolver(applicationSchema(locale)),
  });

  setValue("career_id", course.id!);
  const onSubmit: SubmitHandler<ApplicationFormValue> = async (data) => {
    try {
      const result = await action(data as NewApplication);
      if (result.status === 201) {
        toast.success(
          isArabic ? "تم استلام طلبك بنجاح" : "Application Received",
          {
            style: {
              border: "1px solid #c9a24d",
              background: "#0b1236",
              color: "#fff",
            },
          },
        );
        router.replace("/");
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(isArabic ? "خطأ في الاتصال" : "Connection Error");
    }
  };

  return (
    <div
      className={`w-full max-w-4xl my-20 mx-auto p-1 relative ${isArabic ? "rtl" : "ltr"}`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#0b1236]" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#0b1236]" />

      <div className="bg-white border border-slate-200 shadow-xl p-6 md:p-10">
        <div className="mb-6 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 bg-[#c9a24d] rotate-45" />
            <span className="text-[9px] font-mono tracking-[0.3em] text-slate-400 uppercase">
              Registration_Portal
            </span>
          </div>

          <h2 className="text-3xl font-black text-[#0b1236] uppercase italic tracking-tighter">
            {isArabic ? "نموذج التسجيل" : "Enrollment_Form"}
          </h2>

          <div className="bg-slate-50 border-s-4 border-[#c9a24d] p-3 mt-4 flex flex-col md:flex-row md:items-center justify-between gap-2">
            <div>
              <p className="text-[8px] text-slate-400 font-mono uppercase">
                Target_Module
              </p>
              <h3 className="text-base font-bold text-[#0b1236]">
                {isArabic ? course.position_ar : course.position_en}
              </h3>
            </div>
          </div>
        </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
            <TextInput
              register={register("first_name")}
              error={errors.first_name}
              label={isArabic ? "الاسم الأول" : "First Name"}
            />
            <TextInput
              register={register("last_name")}
              error={errors.last_name}
              label={isArabic ? "اسم العائلة" : "Last Name"}
            />
            <EmailInput
              register={register("email")}
              error={errors.email}
              label={isArabic ? "البريد الإلكتروني" : "Email Address"}
              className="text-black"
            />
            <TextInput
              register={register("phone_number")}
              label={isArabic ? "رقم الهاتف" : "Phone Number"}
              error={errors.phone_number}
            />
            <TextInput
              register={register("major")}
              label={isArabic ? "التخصص" : "Major"}
              error={errors.major}
            />

           
          </div>
           <FileUploader
              name="cv"
              control={control}
              label={isArabic ? "السيرة الذاتية" : "CV"}
              required
              error={errors.cv}
            />

          <div className="pt-4 border-t border-slate-50">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full  min-w-60 flex items-center justify-center bg-[#0b1236] text-white py-4 px-8 transition-all hover:bg-[#0b1236] hover:shadow-[8px_8px_0px_#c9a24d] active:translate-x-1 active:translate-y-1 disabled:opacity-50"
            >
              <span className="text-base md:text-xl font-black uppercase italic tracking-widest ">
                {isSubmitting ? (
                  <Loader2 className="animate-spin" size={18} />
                ) : isArabic ? (
                  "إرسال البيانات"
                ) : (
                  "Process Application"
                )}
              </span>
              {!isSubmitting &&
                (isArabic ? (
                  <ArrowRight size={30} className="text-[#c9a24d]  " />
                ) : (
                  <ArrowRight size={30} className="text-[#c9a24d] ml-1" />
                ))}
            </button>
          </div>

          <div className="mt-6 flex justify-between items-center text-[7px] font-mono text-slate-300 tracking-[0.2em] uppercase">
            <span>Security_Encrypted</span>
            <div className="h-px flex-1 mx-3 bg-slate-50" />
            <span>Ref_HPA_2024</span>
          </div>
        </form>
       
      </div>
    </div>
  );
}

export default NewApplicationForm;
