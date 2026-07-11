'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Promocoes() {
  const { promotions, isLoaded } = useDatabase();

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-16 text-white text-center">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Campanhas</span>
            <h1 className="text-4xl font-serif font-bold mb-4">Campanhas e Promoções Ativas</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Economize nas suas compras. Fique atento às ofertas exclusivas das lojas e restaurantes parceiros do Miriam Mall.
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isLoaded ? (
            <div className="text-center py-12 text-primary/60 text-sm">A carregar promoções...</div>
          ) : promotions.length === 0 ? (
            <div className="text-center py-16 text-primary/60 text-sm border border-dashed border-primary/10 rounded-lg">
              Nenhuma promoção ou desconto ativo de momento. Visite-nos em breve para novidades!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {promotions.map((promo) => (
                <div
                  key={promo.id}
                  className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    <div className="h-48 relative bg-primary-dark">
                      <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-green text-primary px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <Tag className="w-3 h-3" /> {promo.storeName}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-1 text-[10px] text-primary/50 font-bold uppercase tracking-wider mb-2">
                        <Calendar className="w-3.5 h-3.5 text-green" />
                        <span>{promo.validity}</span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-primary mb-2 group-hover:text-green transition-colors">
                        {promo.title}
                      </h3>
                      <p className="text-primary/70 text-xs sm:text-sm leading-relaxed">
                        {promo.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      href="/lojas"
                      className="w-full text-center bg-light-gray hover:bg-green hover:text-primary text-primary text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 flex items-center justify-center gap-1"
                    >
                      Ir Para Lojas <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
