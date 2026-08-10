'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Camera, Layers, X } from 'lucide-react';
import ImageWithLoader from '../../components/ImageWithLoader';

import { useDatabase } from '../../context/DatabaseContext';

interface GalleryItem {
  id: string;
  title: string;
  category: 'interior' | 'exterior' | 'restauracao' | 'eventos';
  image: string;
}

export default function Galeria() {
  const { buildings, spaces, stores, restaurants, events } = useDatabase();
  const [selectedFilter, setSelectedFilter] = useState<string>('todos');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);

  const filters = [
    { id: 'todos', label: 'Todos' },
    { id: 'exterior', label: 'Exterior' },
    { id: 'interior', label: 'Interior' },
    { id: 'restauracao', label: 'Restauração' },
    { id: 'eventos', label: 'Eventos' }
  ];

  // Dynamically assemble real gallery items from database entities
  const galleryItems: GalleryItem[] = [
    ...buildings.filter(b => b.image).map(b => ({ id: `building-${b.id}`, title: b.name, category: 'exterior' as const, image: b.image })),
    ...spaces.filter(s => s.image).map(s => ({ id: `space-${s.id}`, title: `${s.number} (Piso ${s.floor})`, category: 'interior' as const, image: s.image })),
    ...stores.filter(s => s.logo).map(s => ({ id: `store-${s.id}`, title: s.name, category: 'interior' as const, image: s.logo })),
    ...restaurants.filter(r => r.image).map(r => ({ id: `restaurant-${r.id}`, title: r.name, category: 'restauracao' as const, image: r.image })),
    ...events.filter(e => e.image).map(e => ({ id: `event-${e.id}`, title: e.title, category: 'eventos' as const, image: e.image })),
  ];

  const filteredItems = galleryItems.filter((item) => {
    return selectedFilter === 'todos' || item.category === selectedFilter;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-16 text-white text-center">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Imagens</span>
            <h1 className="text-4xl font-serif font-bold mb-4">Galeria de Fotos</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Explore o Miriam Mall através da nossa lente. Imagens em alta resolução do exterior, interiores modernos e momentos vibrantes.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filters */}
          <div className="flex justify-center gap-3 overflow-x-auto pb-4 mb-12 scrollbar-none">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`px-5 py-2 rounded-full text-xs font-semibold tracking-wider transition-all uppercase ${
                  selectedFilter === filter.id
                    ? 'bg-primary text-green border border-green'
                    : 'bg-light-gray text-primary/80 border border-primary/5 hover:border-green/30'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="relative h-64 rounded-xl overflow-hidden group cursor-pointer border border-primary/5 hover:border-green/20 shadow-sm transition-all duration-300"
              >
                <ImageWithLoader
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlay hover details */}
                <div className="absolute inset-0 bg-primary/85 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <span className="text-[10px] text-green font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Camera className="w-3.5 h-3.5" /> {item.category}
                  </span>
                  <h4 className="text-white font-serif text-sm font-semibold tracking-wide leading-tight">
                    {item.title}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Lightbox / Image Modal */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-primary/95 flex items-center justify-center p-4 backdrop-blur-sm cursor-zoom-out animate-in fade-in duration-300"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 text-white/60 hover:text-white bg-white/10 w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div
            onClick={(e) => e.stopPropagation()}
            className="max-w-4xl w-full flex flex-col items-center bg-transparent cursor-default animate-in zoom-in-95 duration-300"
          >
            <ImageWithLoader
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="max-h-[75vh] w-auto max-w-full rounded-lg object-contain border border-green/10 shadow-2xl"
            />
            <div className="text-center text-white mt-4 max-w-lg">
              <span className="text-[10px] uppercase font-bold text-green tracking-widest">{lightboxImage.category}</span>
              <h3 className="font-serif text-lg font-semibold mt-1">{lightboxImage.title}</h3>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
