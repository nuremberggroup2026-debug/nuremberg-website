import { Locale } from '@/types'
import { ArrowUpLeft, ArrowUpRight, Loader2 } from 'lucide-react'
import React from 'react'

interface Props {
    locale:Locale,
    isDirty:boolean,
    isSubmitting:boolean
}

function ContactFormButton({locale,isDirty,isSubmitting}:Props) {
  return (
    <div className="input-field pt-2">
                <button
  type="submit"
  disabled={!isDirty || isSubmitting}
  className="group/btn relative w-full px-10 py-5 bg-transparent text-white transition-all active:scale-95 overflow-hidden"
>
  {/* 🔥 Always subtle glow (mobile friendly) */}
  <div className="absolute inset-0 rounded-full bg-cyan-500/5 animate-pulse sm:animate-none pointer-events-none -z-10" />

  {/* 🔥 Animated gradient flash on tap */}
  <div className="absolute inset-0 opacity-0 active:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/20 via-transparent to-cyan-500/20" />

  {/* Borders */}
  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 
    group-hover/btn:w-full group-hover/btn:h-full 
    group-hover/btn:border-cyan-500 
    transition-all duration-700" 
  />

  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 
    group-hover/btn:w-full group-hover/btn:h-full 
    group-hover/btn:border-cyan-500 
    transition-all duration-700" 
  />

  {/* Content */}
  <div className="flex items-center justify-center gap-4 font-black italic uppercase tracking-[0.2em] text-sm 
    transition-all duration-300 
    active:gap-6 sm:group-hover/btn:gap-6"
  >
    {isSubmitting ? (
      <>
        <Loader2
          size={18}
          className="animate-spin text-cyan-300"
        />
        <span className="animate-pulse">
          {locale === "ar" ? "جاري الإرسال..." : "Sending..."}
        </span>
      </>
    ) : (
      <>
        {locale === "ar" ? "إرسال البريد" : "Send Email"}

        <div className="p-3 bg-cyan-500 rounded-full 
          shadow-[0_0_20px_rgba(6,182,212,0.5)]
          transition-all duration-300
          active:scale-125 sm:group-hover/btn:bg-white"
        >
          {locale === "en" ? (
            <ArrowUpRight
              size={18}
              className="text-black transition-transform duration-300 
                active:rotate-45 active:scale-125 
                sm:group-hover/btn:rotate-45 sm:group-hover/btn:scale-125"
            />
          ) : (
            <ArrowUpLeft
              size={18}
              className="text-black transition-transform duration-300 
                active:-rotate-45 active:scale-125 
                sm:group-hover/btn:-rotate-45 sm:group-hover/btn:scale-125"
            />
          )}
        </div>
      </>
    )}
  </div>
</button>
              </div>
  )
}

export default ContactFormButton