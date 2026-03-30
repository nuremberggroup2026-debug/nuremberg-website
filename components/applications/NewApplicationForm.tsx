"use client";
import React from "react";
import { NewApplication, NewCareer } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { applicationSchema } from "@/app/server/applications/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Loader2, ArrowRight, ArrowLeft, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import FileUploader from "../FileUploader";
import FormHeader from "./FormHeader";
import ProInput from "../inputs/ProInput";

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
    submit: "Submit Application",
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
    submit: "تقديم الطلب",
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
            position_en: career.position_en ?? "",
            position_ar: career.position_ar ?? "",
          }}
        />

        {/* Form Body */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
            {/* First Name */}
            <div className="relative group">
              <ProInput
                label={t.firstName}
                register={register("first_name")}
                error={errors.first_name}
              />
            </div>
            {/* Last Name */}
            <div className="relative group">
              <ProInput
                label={t.lastName}
                register={register("last_name")}
                error={errors.last_name}
              />
            </div>
            {/* Email Address */}
            <div className="relative group">
              <ProInput
                label={t.email}
                register={register("email")}
                error={errors.email}
              />
            </div>
            {/* Phone Number */}
            <div className="relative group">
              <ProInput
                label={t.phone}
                register={register("phone_number")}
                error={errors.phone_number}
              />
            </div>
            {/* Major */}
            <div className="md:col-span-2 relative group">
              <ProInput
                label={t.major}
                register={register("major")}
                error={errors.major}
              />
            </div>
          </div>

          <div className="border border-white/10 bg-white/1 p-6 rounded-none">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <FileText size={16} className="text-white" />
              <span className="text-[11px] font-black text-white tracking-[0.2em] group-focus-within:text-cyan-400 transition-colors">
                {t.cv}
              </span>
            </div>
            <FileUploader
              name="cv"
              control={control}
              label=""
              error={errors.cv}
              locale={locale}
            />
          </div>

          <div className="pt-10">
            <button
              type="submit"
              disabled={isSubmitting}
              className="relative w-full h-20 bg-white/5 backdrop-blur-xl border border-cyan-500/10 rounded-full flex items-center justify-between px-10 hover:bg-white/10 transition-all duration-300 group overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

              <span className="text-lg font-semibold tracking-wide text-white/90">
                {t.submit}
              </span>

              <div className="flex items-center gap-3">
                <div className="h-1 w-8 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-cyan-500 transition-all duration-500 ${isSubmitting ? "w-full animate-pulse" : "w-0 group-hover:w-full"}`}
                  />
                </div>
                {isSubmitting ? (
                  <Loader2 className="animate-spin text-cyan-500" size={24} />
                ) : (
                  <div className="bg-white text-black p-3 rounded-full group-hover:scale-110 transition-transform">
                    {isArabic ? (
                      <ArrowLeft size={20} />
                    ) : (
                      <ArrowRight size={20} />
                    )}
                  </div>
                )}
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewApplicationForm;
