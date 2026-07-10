'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Clock, Coffee, X, Utensils, Award } from 'lucide-react';
import { Restaurant } from '../../utils/mockData';

export default function Restaurantes() {
  const { restaurants, isLoaded } = useDatabase();
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-16 text-white text-center">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Gastronomia</span>
            <h1 className="text-4xl font-serif font-bold mb-4">Praça de Alimentação & Cafés</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Saboreie momentos incríveis. Conheça as nossas opções de cafés, padarias e restaurantes com o melhor da culinária nacional e internacional.
            </p>
          </div>
        </section>

        {/* Directory Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isLoaded ? (
            <div className="text-center py-12 text-primary/60 text-sm">A carregar restaurantes...</div>
          ) : restaurants.length === 0 ? (
            <div className="text-center py-16 text-primary/60 text-sm border border-dashed border-primary/10 rounded-lg">
              Nenhum restaurante cadastrado no momento.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {restaurants.map((rest) => (
                <div
                  key={rest.id}
                  className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    <div className="h-56 relative bg-primary-dark">
                      <img
                        src={rest.image}
                        alt={rest.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] text-green font-bold uppercase tracking-wider">
                        {rest.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-primary mb-2 group-hover:text-green transition-colors">
                        {rest.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs text-primary/50 mb-4">
                        <Clock className="w-3.5 h-3.5 text-green" />
                        <span>Funcionamento: {rest.schedule}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-2">
                    <button
                      onClick={() => setSelectedRestaurant(rest)}
                      className="w-full text-center bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Utensils className="w-3.5 h-3.5" /> Ver Cardápio / Menu
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Menu / Cardápio Detail Modal */}
      {selectedRestaurant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden border border-green/20 shadow-2xl relative animate-in fade-in zoom-in duration-300 max-h-[85vh] flex flex-col">
            {/* Modal Header */}
            <div className="p-6 border-b border-primary/5 flex justify-between items-center bg-primary-dark text-white">
              <div>
                <span className="text-[9px] uppercase font-bold text-green tracking-widest">{selectedRestaurant.category}</span>
                <h3 className="font-serif text-xl font-bold">{selectedRestaurant.name}</h3>
              </div>
              <button
                onClick={() => setSelectedRestaurant(null)}
                className="text-white/60 hover:text-white bg-white/10 w-8 h-8 rounded-full flex items-center justify-center transition-colors focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Menu Items (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-grow">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-green">
                <Coffee className="w-4 h-4" /> Especialidades da Casa
              </div>

              <div className="space-y-4">
                {selectedRestaurant.menuItems && selectedRestaurant.menuItems.length > 0 ? (
                  selectedRestaurant.menuItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-start gap-4 pb-4 border-b border-primary/5 last:border-b-0 last:pb-0"
                    >
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-primary">{item.name}</h4>
                        {item.description && (
                          <p className="text-xs text-primary/60 leading-relaxed max-w-sm">
                            {item.description}
                          </p>
                        )}
                      </div>
                      <span className="text-sm font-bold text-green bg-green/5 px-2.5 py-1 rounded shrink-0">
                        {item.price}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-6 text-xs text-primary/50">
                    Nenhum prato listado no menu de demonstração.
                  </div>
                )}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-primary/5 bg-light-gray flex items-center justify-between text-xs text-primary/60">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-green" /> Aberto: {selectedRestaurant.schedule}
              </span>
              <span className="flex items-center gap-1">
                <Award className="w-4 h-4 text-green" /> Qualidade Garantida
              </span>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
