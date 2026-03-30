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
    <section className="relative flex flex-col justify-center items-center py-24 w-full bg-[#020202] overflow-hidden">
      
      {/* العنوان بستايل Alpha التكتيكي */}
      <div className="text-center mb-16 relative z-10">
        <div className="flex justify-center items-center gap-3 mb-4">
          <div className="h-[1px] w-8 bg-cyan-500/50" />
          <span className="text-[10px] font-mono text-cyan-500 tracking-[0.4em] uppercase">
             {isArabic ? "شبكة الشركاء" : "Partner Network"}
          </span>
          <div className="h-[1px] w-8 bg-cyan-500/50" />
        </div>
        <h2 className="text-4xl md:text-6xl font-[1000] text-white uppercase italic tracking-tighter">
          {isArabic ? "شركائنا " : "Our Partners "} 
        </h2>
      </div>

      <div className="w-full max-w-7xl px-6 cursor-grab active:cursor-grabbing">
        <Swiper
          modules={[Navigation, Pagination, A11y, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          loop={true} 
          centeredSlides={false}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{ 
            clickable: true,
            dynamicBullets: true 
          }}
          navigation={true}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            1024: { slidesPerView: 4, spaceBetween: 30 },
          }}
          className="clients-swiper pb-14!" 
        >
          {clients.map((client, i) => (
            <SwiperSlide key={i}>
              <div className="group relative flex flex-col items-center p-8 bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all duration-500 h-64 justify-center overflow-hidden">
                
                <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/[0.02] transition-all duration-500" />
                
                <div className="h-24 w-full flex items-center justify-center relative z-10 mb-6">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full w-auto object-contain  opacity-90 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                    width={160}
                    height={80}
                  />
                </div>

                <div className="relative z-10 text-center border-t border-white/5 pt-4 w-full group-hover:border-cyan-500/20 transition-colors">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30 group-hover:text-cyan-500 transition-colors">
                    {client.name}
                  </p>
                </div>

                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/10 group-hover:border-cyan-500 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/10 group-hover:border-cyan-500 transition-colors" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx global>{`
        .clients-swiper .swiper-button-next,
        .clients-swiper .swiper-button-prev {
          color: #22d3ee !important;
          transform: scale(0.5);
          transition: all 0.3s;
        }
        .clients-swiper .swiper-button-next:hover,
        .clients-swiper .swiper-button-prev:hover {
          transform: scale(0.6);
          text-shadow: 0 0 10px #22d3ee;
        }
        .clients-swiper .swiper-pagination-bullet {
          background: #555 !important;
          opacity: 1;
        }
        .clients-swiper .swiper-pagination-bullet-active {
          background: #22d3ee !important;
          box-shadow: 0 0 10px #22d3ee;
        }
      `}</style>
    </section>
  );
}