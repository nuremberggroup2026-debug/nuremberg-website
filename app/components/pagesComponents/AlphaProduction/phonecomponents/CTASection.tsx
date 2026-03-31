"use client";

import { ChevronRight, Instagram, Mail, Link2 } from "lucide-react";

interface Props {
  locale: "en" | "ar";
}

export default function CTASectionMobile({ locale }: Props) {
  const isAr = locale === "ar";

  const translations = {
    en: {
      title1: "GO",
      title2: "ALPHA",
      est: "EST_2026 // DUBAI_HQ",
      contact: "CONTACT",
      email: "HELLO@ALPHA.PROD",
      initiate: "INITIATE PROJECT",
      start: "START NOW",
      insta: "INSTAGRAM",
      vimeo: "VIMEO",
      rights: "ALL RIGHTS RESERVED 2026",
    },
    ar: {
      title1: "انطلق",
      title2: "ألفا",
      est: "تأسست 2026 // دبي",
      contact: "تواصل",
      email: "HELLO@ALPHA.PROD",
      initiate: "ابدأ المشروع",
      start: "ابدأ الآن",
      insta: "إنستاغرام",
      vimeo: "فيميو",
      rights: "جميع الحقوق محفوظة 2026",
    },
  };

  const t = translations[locale];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="h-screen w-full  text-white px-6 py-14 flex flex-col justify-between"
    >
      <div className="max-w-sm mx-auto w-full flex flex-col justify-between h-full">

        {/* TOP */}
        <div>
          {/* TITLE */}
          <h2 className="text-4xl font-[1000] italic leading-tight uppercase">
            {t.title1}
            <br />
            <span className="text-cyan-500">{t.title2}</span>
          </h2>

          <p className="text-[10px] font-mono tracking-[0.4em] text-white/30 mt-3">
            {t.est}
          </p>
        </div>

        {/* CENTER CTA */}
        <div className="flex flex-col gap-6">

          {/* Email */}
          <div className="border border-white/10 rounded-xl p-4 bg-zinc-900/60 flex items-center gap-3">
            <Mail size={18} className="text-cyan-500" />
            <span className="text-sm font-medium">
              {t.email}
            </span>
          </div>

          {/* BUTTON */}
          <button className="flex items-center justify-between px-5 py-4 bg-zinc-900/70 backdrop-blur-xl border border-white/10 rounded-xl active:scale-95 transition">

            <div>
              <span className="text-[10px] text-cyan-500 block tracking-[0.3em]">
                {t.initiate}
              </span>
              <span className="text-lg font-black tracking-wide">
                {t.start}
              </span>
            </div>

            <div className="bg-cyan-500 p-3 rounded-lg text-black">
              <ChevronRight size={20} />
            </div>

          </button>

        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center gap-6">

          {/* SOCIAL */}
          <div className="flex gap-6">

            <a href="#" className="flex items-center gap-2">
              <Instagram size={16} className="text-cyan-500" />
              <span className="text-[11px] font-bold">
                {t.insta}
              </span>
            </a>

            <a href="#" className="flex items-center gap-2">
              <Link2 size={16} className="text-cyan-500" />
              <span className="text-[11px] font-bold">
                {t.vimeo}
              </span>
            </a>

          </div>

          {/* RIGHTS */}
          <p className="text-[9px] text-white/20 tracking-[0.3em] text-center">
            {t.rights}
          </p>

        </div>

      </div>
    </section>
  );
}