'use client';

import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useDatabase } from '../context/DatabaseContext';
import { Banner } from '../utils/mockData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { Palmtree } from 'lucide-react';
import Link from 'next/link';
import ImageWithLoader from '../components/ImageWithLoader';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function Home() {
  const { banners } = useDatabase();

  // Default fallback banner
  const defaultBanners: Banner[] = [
    {
      id: 'default-banner',
      title: 'Shopping Miriam Mall',
      subtitle: 'A abrir em breve',
      image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80',
      buttonText1: 'Apreciar',
      buttonLink1: '/sobre',
      buttonText2: 'Arrendar',
      buttonLink2: '/espacos',
      isActive: true
    }
  ];

  // Get active banners for carousel
  const activeBanners = banners.filter((b) => b.isActive);
  const bannersToUse = activeBanners.length > 0 ? activeBanners : (banners.length > 0 ? banners : defaultBanners);
  const displayBanners = bannersToUse.map((b) => ({
    ...b,
    title: (b.title === 'Miriam Mall' || b.title === 'Shopping Miriam Mall Lda') ? 'Shopping Miriam Mall' : b.title,
    subtitle: (b.subtitle.toLowerCase().includes('novo destino') || b.subtitle.toLowerCase().includes('shopping em breve') || b.subtitle.toLowerCase().includes('abrir em breve')) ? 'A abrir em breve' : b.subtitle,
    buttonText1: b.buttonText1.toLowerCase().includes('explorar') ? 'Apreciar' : b.buttonText1,
    buttonLink1: (b.buttonLink1 === '/lojas' || !b.buttonLink1) ? '/sobre' : b.buttonLink1,
    buttonText2: b.buttonText2.toLowerCase().includes('arrendar') ? 'Arrendar' : b.buttonText2,
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow pt-16">
        {/* HERO BANNER SECTION */}
        <section className="relative h-[85vh] sm:h-[90vh] bg-primary-dark overflow-hidden hero-swiper-section">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect={'fade'}
            fadeEffect={{ crossFade: true }}
            speed={1000}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            className="h-full w-full"
          >
            {displayBanners.map((banner) => (
              <SwiperSlide key={banner.id} className="relative h-full w-full flex items-center justify-center">
                {/* Background image overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-70 z-10" />
                  <ImageWithLoader
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover object-center animate-ken-burns"
                  />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl text-white"
                  >
                    <span className="text-slate-300 font-semibold uppercase tracking-widest text-[10px] sm:text-xs md:text-sm flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                      <Palmtree className="w-3.5 h-3.5 sm:w-4.5 sm:h-4.5 text-slate-300 animate-pulse shrink-0" /> Moçambique / Homoíne / Município da Vila de Homoíne
                    </span>
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold tracking-tight mb-3 sm:mb-4 leading-tight">
                      {banner.title.startsWith('Shopping ') ? (
                        <>
                          <span className="text-red-500 font-serif">Shopping</span>{' '}
                          <span>{banner.title.slice(9)}</span>
                        </>
                      ) : (
                        banner.title
                      )}
                    </h1>
                    <p className="text-xs sm:text-base md:text-lg lg:text-xl text-green font-medium mb-5 sm:mb-8 leading-relaxed">
                      {banner.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-4 w-full sm:w-auto">
                      {banner.buttonText1 && (
                        <Link
                          href={banner.buttonLink1}
                          className="border border-white/80 hover:border-white hover:bg-white hover:text-primary text-white text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider py-2.5 px-5 sm:py-3.5 sm:px-7 rounded transition-all duration-300 text-center hover:-translate-y-0.5 active:translate-y-0"
                        >
                          {banner.buttonText1}
                        </Link>
                      )}
                      {banner.buttonText2 && (
                        <Link
                          href={banner.buttonLink2}
                          className="border border-white/80 hover:border-white hover:bg-white hover:text-primary text-white text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider py-2.5 px-5 sm:py-3.5 sm:px-7 rounded transition-all duration-300 text-center hover:-translate-y-0.5 active:translate-y-0"
                        >
                          {banner.buttonText2}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      </main>

      <Footer />
    </div>
  );
}
