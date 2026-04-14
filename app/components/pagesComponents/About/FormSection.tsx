"use client";
import { useRef } from "react";
import {
  User,
  Mail,
  MessageSquare,
  Tag,
  Settings,
} from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { aboutData } from "@/data/AboutData";
import { useRouter } from "next/navigation";
import { createContactSchema } from "@/app/[locale]/(root)/about-us/(actions)/emailSchema";
import { z } from "zod";
import { Locale } from "@/types";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import ProInputs from "@/components/inputs/ProInput";
import ContactFormButton from "./ContactFormButton";
type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;
interface Props {
  action: (
    data: ContactFormValues,
  ) => Promise<{ success: boolean; message: string }>;
  locale: Locale;
}

export default function FormSection({ action, locale }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const texts = aboutData[locale]?.form || aboutData.en.form;
  const router = useRouter();
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<ContactFormValues>({
    resolver: zodResolver(createContactSchema(locale)),
  });

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const result = await action(data);
      if (result.success) {
        toast.success(result.message);
        reset();
        router.replace("/about-us");
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(
        locale === "en" ? "Error sending email" : "خطأ في إرسال البريد",
      );
    }
  };

  useGSAP(
    () => {
      if (!containerRef.current) return;

      gsap.to(".gear-rotate", {
        rotate: 360,
        duration: 25,
        repeat: -1,
        ease: "none",
      });

      gsap.to(".signal-bar", {
        scaleY: "random(0.3, 1)",
        duration: 0.4,
        repeat: -1,
        yoyo: true,
        stagger: 0.05,
        ease: "power1.inOut",
      });
    },
    { scope: containerRef },
  );

  return (
    <div
      id="contact-form"
      ref={containerRef}
      className="min-h-screen w-full flex flex-col items-center justify-center p-4 relative z-10 font-sans tracking-tight"
    >
      <div className="text-center mb-20">
        <div className="flex justify-center items-center gap-3 mb-4">
       <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-cyan-500/40" />
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase font-bold">
            {locale === "ar" ? "تواصل" : "Contact"}
            </span>
            <div className="h-[1px] w-8 bg-cyan-500/40" />
          </div>
        </div>
        <h2 className="text-4xl md:text-7xl font-black text-white uppercase italic tracking-tighter">
          {locale === "ar" ? "تواصل" : "contact"}{" "}
          <span className="text-cyan-500">
            {locale === "ar" ? "معنا" : "us"}
          </span>
        </h2>
      </div>
      <div className="main-panel w-full max-w-312.5 bg-[#050505]/95 backdrop-blur-2xl border-2 border-cyan-500/60 shadow-[0_0_25px_rgba(6,182,212,0.4)] overflow-hidden relative">
        <div className="absolute -top-24 -right-24 opacity-[0.05] text-white pointer-events-none ">
          <Settings size={450} className="gear-rotate" />
        </div>

        <div className="grid lg:grid-cols-10 gap-0">
          <div className="lg:col-span-3 bg-white/3 p-8 border-r-2 border-cyan-500/20 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-cyan-400 mb-6">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_#06b6d4]" />
                <span className="text-[10px] font-black tracking-[0.3em] uppercase italic">
                  {texts.systemStatus}
                </span>
              </div>

              <h2 className="text-4xl font-black text-white leading-none uppercase italic mb-4">
                {texts.dataTitle} <br />
                <span className="text-cyan-500">{texts.dataHighlight}</span>
              </h2>

              <div className="mt-8 flex items-end gap-1 h-12">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="signal-bar w-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.6)] origin-bottom"
                    style={{ height: "100%" }}
                  />
                ))}
              </div>

              <p className="mt-8 text-[11px] text-gray-400 font-bold leading-relaxed uppercase tracking-widest max-w-57.5">
                {texts.nodeStatus}
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 p-8 md:p-16 relative">
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid md:grid-cols-2 gap-8">
                <ProInputs
                  register={register("name")}
                  label={texts.operatorName}
                  error={errors.name}
                  placeholder={texts.enterName}
                  icon={<User size={16} />}
                />
                <ProInputs
                  register={register("email")}
                  error={errors.email}
                  label={texts.signalChannel}
                  placeholder={texts.enterEmail}
                  icon={<Mail size={16} />}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <ProInputs
                  register={register("subject")}
                  label={texts.targetHeader}
                  error={errors.subject}
                  placeholder={texts.subject}
                  icon={<Tag size={16} />}
                />
              </div>

              <div className="input-field">
                <ProInputs
                  register={register("message")}
                  error={errors.message}
                  label={texts.dataPayload}
                  placeholder={texts.messageContent}
                  isTextArea
                  icon={<MessageSquare size={16} />}
                />
              </div>

              <ContactFormButton locale={locale} isDirty={isDirty} isSubmitting={isSubmitting} />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
