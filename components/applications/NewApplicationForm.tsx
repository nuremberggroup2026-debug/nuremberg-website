"use client";
import React from "react";
import { NewApplication, NewCareer } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { applicationSchema } from "@/app/server/applications/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import {
  Loader2,
  ArrowRight,
  ArrowLeft,
  FileText,
} from "lucide-react";
import TextInput from "../inputs/TextInput";
import EmailInput from "../inputs/EmailInput";
import { useRouter } from "next/navigation";
import FileUploader from "../FileUploader";
import FormHeader from "./FormHeader";

type ApplicationFormValue = z.infer<ReturnType<typeof applicationSchema>>;

interface Props {
  career: NewCareer;
  action: (
    data: NewApplication,
  ) => Promise<{ success: boolean; status: number; message: string }>;
  locale: "en" | "ar";
}

const translations = {
  en: {
    portal: "Application_System",
    title: "Join the",
    title2: "Alpha Unit",
    jobLabel: "Target Position",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email Address",
    phone: "Phone Number",
    major: "Major / Specialization",
    cv: "Upload CV (PDF)",
    submit: "Send Application",
    success: "Application Sent Successfully",
    error: "Connection Error",
  },
  ar: {
    portal: "نظام_التقديم",
    title: "انضم إلى",
    title2: "وحدة ألفا",
    jobLabel: "الوظيفة المستهدفة",
    firstName: "الاسم الأول",
    lastName: "اسم العائلة",
    email: "البريد الإلكتروني",
    phone: "رقم الهاتف",
    major: "التخصص",
    cv: "ارفع السيرة الذاتية (PDF)",
    submit: "إرسال الطلب",
    success: "تم إرسال طلبك بنجاح",
    error: "خطأ في الاتصال",
  },
};

function NewApplicationForm({ action, locale, career }: Props) {
  const isArabic = locale === "ar";
  const t = translations[locale];
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

  React.useEffect(() => {
    if (career?.id) setValue("career_id", career.id);
  }, [career, setValue]);

  const onSubmit: SubmitHandler<ApplicationFormValue> = async (data) => {
    try {
      const result = await action(data as NewApplication);
      if (result.status === 201) {
        toast.success(t.success, {
          style: {
            background: "#020202",
            color: "#06b6d4",
            border: "1px solid #06b6d4",
          },
        });
        router.replace("/");
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(t.error);
    }
  };

  return (
    <div
      className={`w-full max-w-4xl my-10 md:my-20 mx-auto px-4 md:px-0`}
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* Container Box */}
      <div className="relative bg-[#020202] border border-white/5 rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden">
        {/* Corner Brackets (Precision Style) */}
        <div
          className={`absolute top-0 ${isArabic ? "right-0" : "left-0"} w-12 h-12 border-t-2 border-cyan-500/30 rounded-tr-none`}
        />
        <div
          className={`absolute bottom-0 ${isArabic ? "left-0" : "right-0"} w-12 h-12 border-b-2 border-cyan-500/30 rounded-bl-none`}
        />

        {/* Header Section */}
        <FormHeader
          locale={locale}
          career={{
            position_en: career.position_en??"",
            position_ar: career.position_ar??"",
          }}
        />

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {/* First Name */}
            <div className="relative group">
              <label className="absolute -top-3 left-4 px-2 bg-[#020202] text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em] z-10">
                {t.firstName}
              </label>
              <TextInput
                label=""
                
                register={register("first_name")}
                error={errors.first_name}
                className="w-full bg-white/[0.02] border border-white/10 text-gray-700 px-4 h-14 rounded-none focus:border-cyan-500 focus:bg-white/[0.05] outline-none transition-none"
              />
            </div>

            {/* Last Name */}
            <div className="relative group">
              <label className="absolute -top-3 left-4 px-2 bg-[#020202] text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em] z-10">
                {t.lastName}
              </label>
              <TextInput
                label=""
                register={register("last_name")}
                error={errors.last_name}
                className="w-full bg-white/[0.02] border border-white/10 text-gray-700 px-4 h-14 rounded-none focus:border-cyan-500 focus:bg-white/[0.05] outline-none transition-none"
              />
            </div>

            {/* Email Address */}
            <div className="relative group">
              <label className="absolute -top-3 left-4 px-2 bg-[#020202] text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em] z-10">
                {t.email}
              </label>
              <EmailInput
                label=""
                register={register("email")}
                error={errors.email}
                className="w-full bg-white/2 border border-white/10 text-gray-700 px-4 h-14 rounded-none focus:border-cyan-500 focus:bg-white/[0.05] outline-none transition-none"
              />
            </div>

            {/* Phone Number */}
            <div className="relative group">
              <label className="absolute -top-3 left-4 px-2 bg-[#020202] text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em] z-10">
                {t.phone}
              </label>
              <TextInput
                label=""
                register={register("phone_number")}
                error={errors.phone_number}
                className="w-full bg-white/[0.02] border border-white/10 text-gray-700 px-4 h-14 rounded-none focus:border-cyan-500 focus:bg-white/[0.05] outline-none transition-none"
              />
            </div>

            {/* Major */}
            <div className="md:col-span-2 relative group">
              <label className="absolute -top-3 left-4 px-2 bg-[#020202] text-[10px] font-mono text-cyan-500 uppercase tracking-[0.2em] z-10">
                {t.major}
              </label>
              <TextInput
                label=""
                register={register("major")}
                error={errors.major}
                className="w-full bg-white/2 border border-white/10 text-gray-700 px-4 h-14 rounded-none focus:border-cyan-500 focus:bg-white/[0.05] outline-none transition-none"
              />
            </div>
          </div>

          <div className="border border-white/10 bg-white/[0.01] p-6 rounded-none">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <FileText size={16} className="text-cyan-500" />
              <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest">
                {t.cv}
              </span>
            </div>
            <FileUploader
              name="cv"
              control={control}
              label=""
              required
              error={errors.cv}
            />
          </div>

          {/* Submit Button - ثابت وقوي */}
          <div className="pt-8 border-t border-white/5">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center bg-white hover:bg-cyan-500 text-black py-6 px-10 font-black italic uppercase tracking-[0.3em] text-sm rounded-none transition-none disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="animate-spin" size={20} />
              ) : (
                <div className="flex items-center gap-4">
                  <span>{t.submit}</span>
                  {isArabic ? (
                    <ArrowLeft size={20} />
                  ) : (
                    <ArrowRight size={20} />
                  )}
                </div>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewApplicationForm;
