'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Search, Tag, X, Clock, Phone, MapPin, Layers } from 'lucide-react';
import { Store } from '../../utils/mockData';

export default function Lojas() {
  const { stores, isLoaded } = useDatabase();
  const [selectedCategory, setSelectedCategory] = useState<string>('todas');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);

  const categories = [
    { id: 'todas', label: 'Todas' },
    { id: 'Moda', label: 'Moda' },
    { id: 'Tecnologia', label: 'Tecnologia' },
    { id: 'Alimentação', label: 'Alimentação' },
    { id: 'Farmácia', label: 'Farmácia' },
    { id: 'Serviços', label: 'Serviços' },
    { id: 'Bancos', label: 'Bancos' },
    { id: 'Beleza', label: 'Beleza' },
    { id: 'Casa', label: 'Casa' },
    { id: 'Crianças', label: 'Crianças' }
  ];

  const filteredStores = stores.filter((store) => {
    const matchesCategory =
      selectedCategory === 'todas' || store.category === selectedCategory;
    const matchesSearch =
      store.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      store.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-16 text-white text-center">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Shopping</span>
            <h1 className="text-4xl font-serif font-bold mb-4">Diretório de Lojas</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Explore o mapa comercial do Mirriam Mall. Encontre os seus produtos favoritos, serviços e bancos para resolver tudo no mesmo espaço.
            </p>
          </div>
        </section>

        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filters */}
          <div className="space-y-6 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all shrink-0 ${
                      selectedCategory === cat.id
                        ? 'bg-primary text-green border border-green'
                        : 'bg-light-gray text-primary/80 border border-primary/5 hover:border-green/30'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              {/* Search input */}
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Pesquisar loja ou serviço..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-light-gray border border-primary/5 rounded-full pl-10 pr-4 py-2 text-xs text-primary focus:outline-none focus:border-green focus:bg-white transition-all"
                />
                <Search className="w-4 h-4 text-primary/40 absolute left-3.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Grid of Stores */}
          {!isLoaded ? (
            <div className="text-center py-12 text-primary/60 text-sm">A carregar lojas...</div>
          ) : filteredStores.length === 0 ? (
            <div className="text-center py-16 text-primary/60 text-sm border border-dashed border-primary/10 rounded-lg">
              Nenhuma loja encontrada com a categoria ou pesquisa indicada.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-white rounded-xl border border-primary/5 p-6 shadow-sm flex flex-col justify-between hover:shadow-md hover:border-green/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Store Logo Placeholder */}
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-primary/10 mb-4 bg-light-gray flex items-center justify-center">
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {/* Category */}
                    <span className="text-[10px] uppercase font-bold text-green bg-green/5 px-2.5 py-0.5 rounded-full mb-3 tracking-wider">
                      {store.category}
                    </span>
                    <h3 className="text-base font-bold text-primary mb-2 group-hover:text-green transition-colors">
                      {store.name}
                    </h3>
                    <p className="text-primary/70 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-6">
                      {store.description}
                    </p>
                  </div>

                  <div className="border-t border-primary/5 pt-4 space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-primary/50 font-medium">
                      <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> Piso {store.floor}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {store.schedule}</span>
                    </div>
                    <button
                      onClick={() => setSelectedStore(store)}
                      className="w-full text-center bg-primary hover:bg-primary-light text-white text-[11px] font-bold uppercase tracking-wider py-2 rounded transition-colors mt-2"
                    >
                      Ver Detalhes
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Store Detail Modal */}
      {selectedStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-md w-full overflow-hidden border border-green/20 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedStore(null)}
              className="absolute top-4 right-4 text-primary/40 hover:text-primary bg-light-gray w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-8 text-center">
              {/* Logo */}
              <div className="w-24 h-24 rounded-full overflow-hidden border border-primary/10 mx-auto mb-4 bg-light-gray flex items-center justify-center">
                <img
                  src={selectedStore.logo}
                  alt={selectedStore.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[10px] uppercase font-bold text-green bg-green/5 px-3 py-1 rounded-full inline-block mb-3 tracking-widest">
                {selectedStore.category}
              </span>

              <h3 className="font-serif text-2xl font-bold text-primary mb-4">{selectedStore.name}</h3>
              
              <p className="text-sm text-primary/70 leading-relaxed mb-6">
                {selectedStore.description}
              </p>

              {/* Technical features list */}
              <div className="bg-light-gray p-4 rounded-lg text-left space-y-3 mb-6 text-xs text-primary/80">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-green shrink-0" />
                  <span><strong>Piso:</strong> Andar {selectedStore.floor}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-green shrink-0" />
                  <span><strong>Horário de Funcionamento:</strong> {selectedStore.schedule}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-green shrink-0" />
                  <span><strong>Contacto:</strong> {selectedStore.contact}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedStore(null)}
                className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
