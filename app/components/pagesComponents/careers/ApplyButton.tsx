import { Locale } from '@/types'
import { ArrowUpLeft, ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

function ApplyButton({id,locale}:{id:string,locale:Locale}) {
  return (
    <Link href={`/application-form/${id}`}>
        <button className="group/btn relative w-full md:w-auto px-10 py-5 bg-transparent text-white transition-all active:scale-95">
                  <div className="absolute inset-0 pointer-events-none border border-cyan-500/20 rounded-full scale-0 group-hover/btn:scale-100 transition-transform duration-1000 group-hover/btn:bg-cyan-500/5 -z-10" />

                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-500/50 group-hover/btn:w-full group-hover/btn:h-full group-hover/btn:border-cyan-500 group-hover/btn:animate-pulse transition-all duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500/50 group-hover/btn:w-full group-hover/btn:h-full group-hover/btn:border-cyan-500 group-hover/btn:animate-pulse transition-all duration-700" />

                  <div className="flex items-center justify-center gap-4 font-black italic uppercase tracking-[0.2em] text-sm group-hover/btn:gap-6 transition-all duration-500">
                    <span className="animate-pulse">{locale==="ar"?"قدم الأن":"Apply Now"}</span>
                    <div className="p-3 bg-cyan-500 rounded-full group-hover/btn:bg-white transition-colors duration-500 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                      {locale === "en" ? (
                        <ArrowUpRight
                          size={18}
                          className="text-black transition-transform group-hover/btn:scale-125 group-hover/btn:rotate-45"
                        />
                      ) : (
                        <ArrowUpLeft
                          size={18}
                          className="text-black transition-transform group-hover/btn:scale-125 group-hover/btn:-rotate-45"
                        />
                      )}
                    </div>
                  </div>
                </button>
    </Link>
  )
}

export default ApplyButton