import React from "react";
import {
  Terminal,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { JobSeparator } from "./JobSeparator";
import { Locale, translatedCareers } from "@/types/index";
import ApplyButton from "./ApplyButton";

interface Props {
  jobs: translatedCareers[];
  locale: Locale;
}

const t = {
  en: {
    dir: "ltr",
    font: "font-sans",
    tag: "System_Careers",
    title: "Active",
    title2: "Protocols",
    subtitle:
      "We are seeking elite minds to scale our production ecosystem. Initialize your journey below.",
    role: "Role",
    exp: "Experience",
    requirements: "Qualifications",
    nextSlot: "Next Slot",
    noJobsTitle: "Scanning For",
    noJobsTitle2: "Talent",
    noJobsDesc:
      "Our core units are currently at full capacity. However, we are always watching for elite talent. System is in Standby mode.",
    generalApply: "General Application",
    lastScan: "Last Scan: March 2026",
  },
  ar: {
    dir: "rtl",
    font: "font-sans",
    tag: "وظائف_النظام",
    title: "بروتوكولات",
    title2: "التوظيف",
    subtitle:
      "نبحث عن عقول نخبويّة لتطوير منظومتنا الإنتاجية. ابدأ رحلتك التقنية معنا الآن.",
    role: "التخصص",
    exp: "الخبرة",
    requirements: "المتطلبات الأساسية",
    nextSlot: "الوظيفة التالية",
    noJobsTitle: "جاري البحث عن",
    noJobsTitle2: "مواهب",
    noJobsDesc:
      "جميع وحداتنا تعمل بكامل طاقتها حالياً. ومع ذلك، نحن دائماً في مراقبة للمواهب النخبوية. النظام في وضع الاستعداد.",
    generalApply: "طلب توظيف عام",
    lastScan: "آخر فحص: مارس 2026",
  },
};

export const JobsList = ({ jobs, locale }: Props) => {
  return (
    <div>
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-0.5 bg-cyan-500" />
            <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em] font-black">
              {locale === "ar" ? "الوظائف" : "Careers"}
            </span>
          </div>

         <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-[0.9]">
  {jobs ? (
    locale === "ar" ? (
      <>
        <span className="text-white">الوظائف</span>
        <br />
        <span className="text-cyan-400">المتاحة</span>
      </>
    ) : (
      <>
        <span className="text-white">Active</span>
        <br />
        <span className="text-cyan-400">Jobs</span>
      </>
    )
  ) : locale === "ar" ? (
    <>
      <span className="text-white">النظام</span>
      <br />
      <span className="text-cyan-400">غير متاح</span>
    </>
  ) : (
    <>
      <span className="text-white">System</span>
      <br />
      <span className="text-cyan-400">Unavailable</span>
    </>
  )}
</h1>

          {jobs && (
            <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl border-l-2 border-white/10 pl-6 py-2">
              {locale === "ar"
                ? "تصفح الوظائف المتاحة وابدأ التقديم الآن."
                : "Browse available jobs and apply now."}
            </p>
          )}
        </div>
      </section>
      <div className="flex flex-col">
        {jobs.map((job, index) => (
          <React.Fragment key={job.id}>
            <div className="group py-12 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Image */}
              <div className="lg:col-span-4 relative overflow-hidden rounded-2xl aspect-video lg:aspect-4/5 border border-white/10">
                <img
                  src={job.image!}
                  alt=""
                  className="w-full h-full object-cover grayscale-0 md:grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                />
                <div
                  className={`absolute top-4 ${locale === "en" ? "left-4" : "right-4"} z-20 bg-black/80 backdrop-blur-md px-3 py-1 rounded border border-white/20 flex items-center gap-2`}
                >
                  <Terminal size={12} className="text-cyan-500" />
                  <span className="text-[10px] font-mono text-white/60 uppercase">
                    {job.id}
                  </span>
                </div>
              </div>

              {/* Info */}
              <div className="lg:col-span-8 space-y-8">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-500 text-[8px] md:text-[10px] font-mono uppercase tracking-widest rounded border border-cyan-500/20">
                      {job.role}
                    </span>
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 text-white/40 text-[8px] md:text-[10px] font-mono uppercase tracking-widest rounded border border-white/10">
                      <Clock size={12} /> {job.experience}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-6xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-cyan-400 transition-colors">
                    {job.position}
                  </h2>
                </div>

                <p className="text-white/50 text-base md:text-lg leading-relaxed max-w-3xl font-light">
                  {job.description}
                </p>

                <div className="bg-white/[0.02] py-6 px-3 md:px-6F rounded-xl border border-white/5 space-y-4">
                  <h4 className="text-[11px] font-mono text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={14} /> {t[`${locale}`].requirements}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.requirements.map((req: string, i: number) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 text-white/70 text-xs md:text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-cyan-500 rotate-45 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <ApplyButton locale={locale} id={job.id!} />
              </div>
            </div>

            {/* Separator logic */}
            {index !== jobs.length - 1 && <JobSeparator t={t} />}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
