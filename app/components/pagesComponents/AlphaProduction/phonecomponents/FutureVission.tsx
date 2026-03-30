import React from "react";

interface Props {
  locale: "en" | "ar";
}

export default function FutureVission({ locale }: Props) {
  const isAr = locale === "ar";

  return (
    <section className="min-h-screen flex flex-col justify-center items-center px-6 md:px-10 py-16 text-center ">
      <div className="max-w-3xl md:max-w-5xl">
        {/* العنوان الصغير */}
        <span className="text-cyan-500 text-xs md:text-sm tracking-[0.3em] mb-4 block uppercase font-bold">
          {isAr ? "الرؤية المستقبلية" : "Future Vision"}
        </span>

        {/* الاقتباس */}
        <blockquote className="text-2xl md:text-4xl lg:text-5xl font-light italic leading-snug md:leading-tight lowercase text-white">
          {isAr
            ? "“نحن لا نصنع التكنولوجيا، نحن نبني الجسور نحو المستقبل بلمسة إبداعية لا تعرف الحدود.”"
            : "“We don't just build technology, we build bridges to the future with a creative touch that knows no limits.”"}
        </blockquote>
      </div>
    </section>
  );
}