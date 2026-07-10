'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Calendar, MapPin, Clock } from 'lucide-react';

export default function Eventos() {
  const { events, isLoaded } = useDatabase();

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-16 text-white text-center">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Agenda Cultural</span>
            <h1 className="text-4xl font-serif font-bold mb-4">Agenda de Eventos</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Descubra os concertos, feiras gastronómicas, atividades infantis e eventos sazonais agendados no Mirriam Mall.
            </p>
          </div>
        </section>

        {/* Listings */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isLoaded ? (
            <div className="text-center py-12 text-primary/60 text-sm">A carregar eventos...</div>
          ) : events.length === 0 ? (
            <div className="text-center py-16 text-primary/60 text-sm border border-dashed border-primary/10 rounded-lg">
              Sem eventos agendados de momento. Fique atento às nossas redes sociais para atualizações!
            </div>
          ) : (
            <div className="space-y-12">
              {events.map((event, index) => (
                <div
                  key={event.id}
                  className={`flex flex-col lg:flex-row bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md hover:shadow-lg transition-shadow duration-300 ${
                    index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Event Image */}
                  <div className="lg:w-1/2 h-64 sm:h-80 relative bg-primary-dark">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>

                  {/* Event Content */}
                  <div className="lg:w-1/2 p-8 sm:p-10 flex flex-col justify-between">
                    <div>
                      {/* Date Badge */}
                      <span className="inline-flex items-center gap-1 bg-green/10 text-green text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
                        <Calendar className="w-3.5 h-3.5" /> {event.date}
                      </span>
                      
                      <h3 className="font-serif text-2xl font-bold text-primary mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-primary/70 text-xs sm:text-sm leading-relaxed mb-6">
                        {event.description}
                      </p>
                    </div>

                    <div className="border-t border-primary/5 pt-4 flex items-center gap-4 text-xs text-primary/50 font-semibold uppercase">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-green" /> {event.location}
                      </span>
                    </div>
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
