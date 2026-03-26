
import React from 'react'



interface Props {
  locale: "en" | "ar";
}
function FutureVission({ locale }: Props) {
      const isAr = locale === "ar";

  return (
  <section className="h-screen flex flex-col justify-center items-center px-10 text-center ">
          <div className="max-w-5xl">
            <span className="text-cyan-500 text-sm tracking-[0.3em] mb-4 block">
              {isAr ? "الرؤية المستقبلية" : "Future Vision"}
            </span>
            <blockquote className="text-3xl md:text-6xl font-light italic leading-tight lowercase">
              {isAr 
                ? "“نحن لا نصنع التكنولوجيا، نحن نبني الجسور نحو المستقبل بلمسة إبداعية لا تعرف الحدود.”" 
                : "“We don't just build technology, we build bridges to the future with a creative touch that knows no limits.”"}
            </blockquote>
          </div>
        </section>
  )
}

export default FutureVission