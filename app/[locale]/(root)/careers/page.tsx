import { EmptyState } from "@/app/components/pagesComponents/careers/EmptyState";
import { JobsList } from "@/app/components/pagesComponents/careers/JobList";
import { getCareersByLocale } from "@/app/server/careers/services";
import { Locale } from "@/types";

interface Props {
  params: Promise<{ locale: Locale }>;
}

export default async function CareersPage({ params }: Props) {
  const locale = (await params).locale;
  const jobsData = (await getCareersByLocale(locale)).data;
  return (
    <div
      className="min-h-screen bg-[#020202] text-white selection:bg-cyan-500 overflow-x-hidden"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >

      {/* Content Area */}
      <section className="px-6 pb-32 ">
        <div className="max-w-6xl mx-auto">
          {jobsData && jobsData.length>0 ? (
            <JobsList jobs={jobsData} locale={locale} />
          ) : (
            <EmptyState locale={locale} />
          )}
        </div>
      </section>
    </div>
  );
}
