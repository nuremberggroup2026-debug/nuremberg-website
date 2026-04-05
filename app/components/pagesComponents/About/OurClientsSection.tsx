"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, A11y } from "swiper/modules";
import Image from 'next/image';

// استيراد ستايلات Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

type Client = {
  id?: string;
  name: string;
  logo: string;
  created_at?: Date;
};

type Props = {
  clients: Client[];
  locale: string;
};

export default function ClientsCarousel({ clients, locale }: Props) {
  const isArabic = locale === "ar";

  return (
    <section className="relative flex flex-col justify-center items-center py-32 w-full bg-[#020202] overflow-hidden">
      
      {/* --- الإضاءة القوية جداً (Ultra Neon Glow) --- */}
      
      {/* الخط الضوئي العلوي */}
      <div className="absolute top-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_20px_#22d3ee]" />

      {/* توهج مركزي ضخم خلف الشعارات */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[400px] bg-cyan-500 opacity-[0.15] blur-[160px] rounded-full pointer-events-none z-0" />
      
      {/* نقطة ضوء مركزية حادة (Core Glow) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40%] h-[150px] bg-cyan-400 opacity-[0.2] blur-[80px] rounded-full pointer-events-none z-0" />

      {/* الخط الضوئي السفلي */}
      <div className="absolute bottom-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50 shadow-[0_0_20px_#22d3ee]" />

      {/* العنوان */}
      <div className="text-center mb-20 relative z-10">
        <div className="flex justify-center items-center gap-4 mb-6">
      <div className="flex justify-center items-center gap-3 mb-4">
            <div className="h-[1px] w-8 bg-cyan-500/40" />
            <span className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase font-bold">
            {locale === "ar" ? "شبكة الشركاء" : "Partners Network"}
            </span>
            <div className="h-[1px] w-8 bg-cyan-500/40" />
          </div>
        </div>
      <h2 className="text-5xl md:text-7xl font-[1000] uppercase italic tracking-tighter drop-shadow-[0_0_30px_rgba(34,211,238,0.3)]">
  {isArabic ? (
    <>
      <span className="text-white">شركاء</span>{" "}
      <span className="text-blue-500">نا</span>
    </>
  ) : (
    <>
      <span className="text-white">Our</span>{" "}
      <span className="text-blue-500">Partners</span>
    </>
  )}
</h2>
      </div>

      {/* حاوية السوايبر */}
      <div className="w-full max-w-7xl px-6 cursor-grab active:cursor-grabbing relative z-10">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={25}
          slidesPerView={1}
          loop={true} 
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          pagination={{ clickable: true, dynamicBullets: true }}
         
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="clients-swiper !pb-20" 
        >
          {clients.map((client, i) => (
            <SwiperSlide key={i}>
              <div className="group relative flex flex-col items-center p-10 bg-white/[0.03] backdrop-blur-md border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.2)] transition-all duration-500 h-72 justify-center overflow-hidden rounded-xl">
                
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
                
                <div className="h-28 w-full flex items-center justify-center relative z-10 mb-6">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full w-auto object-contain brightness-110 group-hover:scale-110 transition-all duration-500 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
                    width={180}
                    height={90}
                  />
                </div>

                <div className="relative z-10 text-center border-t border-white/10 pt-5 w-full group-hover:border-cyan-400/50 transition-colors">
                  <p className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-cyan-500/50 group-hover:text-cyan-400 transition-colors">
                    {client.name}
                  </p>
                </div>

                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_#22d3ee] transition-all" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500/30 group-hover:border-cyan-400 group-hover:shadow-[0_0_10px_#22d3ee] transition-all" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) rotate(45deg); }
          100% { transform: translateX(150%) rotate(45deg); }
        }

        .clients-swiper .swiper-button-next,
        .clients-swiper .swiper-button-prev {
          color: #22d3ee !important;
          background: rgba(34, 211, 238, 0.1);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
          border: 1px solid rgba(34, 211, 238, 0.3);
          transform: scale(0.7);
          transition: all 0.4s;
        }
        
        .clients-swiper .swiper-button-next:after,
        .clients-swiper .swiper-button-prev:after {
          font-size: 18px !important;
          font-weight: bold;
        }

        .clients-swiper .swiper-button-next:hover,
        .clients-swiper .swiper-button-prev:hover {
          background: #22d3ee;
          color: black !important;
          box-shadow: 0 0 20px #22d3ee;
          transform: scale(0.8);
        }

        .clients-swiper .swiper-pagination-bullet {
          background: #22d3ee !important;
          opacity: 0.2;
          width: 10px;
          height: 10px;
        }

        .clients-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          box-shadow: 0 0 15px #22d3ee;
          width: 30px;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}