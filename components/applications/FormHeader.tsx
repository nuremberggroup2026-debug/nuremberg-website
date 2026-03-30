import { Locale } from '@/types'
import { ShieldCheck, Terminal } from 'lucide-react'
import React from 'react'

const t = {
  en: {
    portal: "Application_System",
    title: "Join",
    title2: "Nuremberg",
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
    title2: "نوريمبيرغ",
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

function FormHeader({career,locale}:{locale:Locale,career:{
    position_ar:string,
position_en:string
}}) {
    const isArabic= locale==="ar"
  return (
    <div>
        <div className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <Terminal size={14} className="text-cyan-500" />
            <span className="text-[10px] font-mono tracking-[0.4em] text-cyan-500/60 uppercase font-bold">
              {t[`${locale}`].portal}
            </span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic tracking-tighter leading-none">
            {t[`${locale}`].title}{" "}
            <span
              className="text-transparent"
              style={{ WebkitTextStroke: "1px #fff" }}
            >
              {t[`${locale}`].title2}
            </span>
          </h2>

          <div className="flex flex-col md:flex-row md:items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 mt-6">
            <div className="p-2 bg-cyan-500/10 rounded-lg">
              <ShieldCheck className="text-cyan-500" size={24} />
            </div>
            <div>
              <p className="text-[9px] text-white/40 font-mono uppercase tracking-widest">
                {t[`${locale}`].jobLabel}
              </p>
              <h3 className="text-lg font-bold text-cyan-400">
                {isArabic ? career.position_ar : career.position_en}
              </h3>
            </div>
          </div>
        </div>
    </div>
  )
}

export default FormHeader