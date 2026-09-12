'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Building as BuildingType } from '../../utils/mockData';
import BuildingDetailModal from '../../components/BuildingDetailModal';
import { 
  Building, 
  MapPin,
  Search,
  Layers,
  Eye,
  Sparkles,
  Palmtree,
  Phone
} from 'lucide-react';

import Link from 'next/link';
import ImageWithLoader from '../../components/ImageWithLoader';
import { motion } from 'framer-motion';

export default function Sobre() {
  const { buildings, isLoaded } = useDatabase();
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const defaultBuildings: BuildingType[] = [
    {
      id: 'building-1',
      name: 'Edifício Principal (A)',
      subtitle: 'Centro Comercial & Âncoras',
      description: 'Espaço central do complexo destinado a grandes marcas, supermercado âncora, praça de restauração e serviços essenciais de alto fluxo comercial.',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      features: ['Lojas Âncora e Boutiques', 'Supermercado e Farmácia', 'Praça de Alimentação Climatizada', 'Escadas Rolantes e Elevadores Panorâmicos'],
      order: 1
    },
    {
      id: 'building-2',
      name: 'Edifício Empresarial (B)',
      subtitle: 'Serviços & Escritórios Corporativos',
      description: 'Ambiente executivo e moderno ideal para agências bancárias, telecomunicações, consultórios médicos, escritórios corporativos e multinacionais.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      features: ['Escritórios Modulares & Coworking', 'Agências Bancárias e Seguradoras', 'Salas de Reuniões Equipadas', 'Acesso Controlado e Portaria Executiva'],
      order: 2
    },
    {
      id: 'building-3',
      name: 'Edifício Lazer & Convivência (C)',
      subtitle: 'Restaurantes, Rooftop & Bem-Estar',
      description: 'Área dedicada a momentos gastronómicos e de lazer em família, com restaurantes de alta gastronomia, esplanadas ao ar livre e ambientes verdes.',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      features: ['Restaurantes & Cafés Temáticos', 'Rooftop com Vista Panorâmica', 'Espaço Infantil Seguro', 'Esplanadas com Ambientes Verdes'],
      order: 3
    }
  ];

  const allBuildings = buildings && buildings.length > 0 ? buildings : defaultBuildings;

  const categories = [
    { id: 'todos', label: 'Todos os Edifícios' },
    { id: 'comercial', label: 'Comércio & Âncoras' },
    { id: 'corporativo', label: 'Serviços & Escritórios' },
    { id: 'gastronomia', label: 'Restauração & Lazer' }
  ];

  const filteredBuildings = allBuildings.filter((b) => {
    const matchesSearch = 
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (selectedCategory === 'todos') return true;
    if (selectedCategory === 'comercial') return b.name.includes('A') || b.subtitle.toLowerCase().includes('comercial') || b.subtitle.toLowerCase().includes('âncoras');
    if (selectedCategory === 'corporativo') return b.name.includes('B') || b.subtitle.toLowerCase().includes('serviços') || b.subtitle.toLowerCase().includes('escritórios');
    if (selectedCategory === 'gastronomia') return b.name.includes('C') || b.subtitle.toLowerCase().includes('restaurantes') || b.subtitle.toLowerCase().includes('lazer');

    return true;
  });

  const parseEnumeratedItems = (text: string): string[] => {
    if (!text) return [];

    // 1. If text has line breaks, use them
    const lineBreakItems = text.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
    if (lineBreakItems.length > 1) {
      return lineBreakItems;
    }

    // 2. Check for Piso markers (e.g. 1.º Piso, 2.º Piso, 3.º Piso, 1º Piso, Piso 1)
    const pisoSplits = text.split(/(?=[1-9]\s*[.º°]*\s*Piso|Piso\s*[0-9])/i).map(s => s.trim()).filter(Boolean);
    if (pisoSplits.length > 1) {
      return pisoSplits;
    }

    // 3. Check for semicolons or bullet points
    const bulletSplits = text.split(/(?:[;•\-]|\b\d+[.)]\s*)/).map(s => s.trim()).filter(Boolean);
    if (bulletSplits.length > 1) {
      return bulletSplits;
    }

    // 4. Check for room/area compartments
    const roomSplits = text
      .split(/(?=(?:2 quartos|1 suite|suite|WC|Closet|Cozinha|Sala de estar|Varanda|Ferragem|Armazém|Salão de cabeleireiro|Salão|Padaria|Restaurante))/i)
      .map(s => s.trim())
      .filter(Boolean);
    if (roomSplits.length >= 2) {
      return roomSplits;
    }

    // 5. Check for periods separating full sentences
    const periodSplits = text.split(/\.\s+/).map(s => s.trim().replace(/\.$/, '')).filter(s => s.length > 4);
    if (periodSplits.length > 1) {
      return periodSplits;
    }

    return [text];
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner Section */}
        <section className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-20 sm:py-24 text-white text-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80')" }} 
          />
          {/* Decorative watermarks */}
          <Palmtree className="absolute -left-16 -bottom-16 w-64 h-64 text-green/10 pointer-events-none transform rotate-45" />
          <Palmtree className="absolute -right-16 -top-16 w-64 h-64 text-white/5 pointer-events-none transform -rotate-12" />

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl sm:text-5xl font-serif font-bold mb-4 tracking-tight">
              Saiba Mais
            </h1>
            <div className="w-16 h-1 bg-green mx-auto mb-6 rounded-full" />
            <p className="text-white/80 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Descubra o propósito, a localização e a infraestrutura comercial concebida para transformar Homoíne e impulsionar o seu negócio.
            </p>
          </div>
        </section>

        {/* 1. O QUE É O MIRIAM MALL */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 border border-green/20 text-green text-xs font-bold uppercase tracking-wider">
                <Building className="w-3.5 h-3.5" /> Quem Somos & O Nosso Conceito
              </div>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary leading-tight">
                Um Complexo Comercial Moderno e Multifuncional
              </h2>
              <div className="space-y-4 text-primary/75 leading-relaxed text-sm sm:text-base">
                <p>
                  A <strong className="text-primary font-semibold">Miriam Mall – Soc. Unipessoal, Lda.</strong> é uma empresa moçambicana de gestão e arrendamento de imóveis comerciais, concebida para reunir num único complexo — em Homoíne, Inhambane — lojas de retalho, serviços bancários, espaços gastronómicos e áreas de lazer, com segurança 24h e infraestrutura de padrão internacional.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-2xl font-serif font-bold text-primary block">3</span>
                  <span className="text-[11px] text-primary/70 font-semibold uppercase tracking-wider">Edifícios Integrados</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
                  <span className="text-2xl font-serif font-bold text-green block">24/7</span>
                  <span className="text-[11px] text-primary/70 font-semibold uppercase tracking-wider">Segurança e CCTV</span>
                </div>
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 col-span-2 sm:col-span-1">
                  <span className="text-2xl font-serif font-bold text-primary block">100%</span>
                  <span className="text-[11px] text-primary/70 font-semibold uppercase tracking-wider">Acessibilidade</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-2 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-green-glow"
            >
              <div className="relative h-[380px] sm:h-[440px] rounded-xl overflow-hidden group">
                <ImageWithLoader
                  src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80"
                  alt="Interior do Miriam Mall"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/80 via-primary-dark/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-bold text-green uppercase tracking-widest block mb-1">Qualidade & Conforto</span>
                  <p className="text-lg font-serif font-bold">O novo ponto de encontro do comércio e lazer de Homoíne.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>


        {/* 3. OS EDIFÍCIOS DA MIRIAM MALL (USANDO O MESMO DESIGN DE /lojas) */}
        <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-green uppercase tracking-widest text-xs font-bold block mb-2">Complexo Comercial</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
              Apreciar os Edifícios & Espaços
            </h2>
            <div className="w-16 h-1 bg-green mx-auto mb-6 rounded-full" />
            <p className="text-primary/70 text-sm sm:text-base leading-relaxed">
              Explore os três edifícios que compõem o Shopping Miriam Mall. Clique em qualquer edifício para visualizar os detalhes construtivos, valências e oportunidades de arrendamento disponíveis.
            </p>
          </div>

          {/* Search and Category Filters - EXACT /lojas style */}
          <div className="space-y-6 mb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Category Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin max-w-full">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all shrink-0 cursor-pointer ${
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
                  placeholder="Pesquisar edifício ou valência..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-light-gray border border-primary/5 rounded-full pl-10 pr-4 py-2 text-xs text-primary focus:outline-none focus:border-green focus:bg-white transition-all"
                />
                <Search className="w-4 h-4 text-primary/40 absolute left-3.5 top-2.5" />
              </div>
            </div>
          </div>

          {/* Grid of Buildings - EXACT /lojas clean card design */}
          {filteredBuildings.length === 0 ? (
            <div className="text-center py-16 text-primary/60 text-sm border border-dashed border-primary/10 rounded-lg">
              Nenhum edifício encontrado com a pesquisa indicada.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {filteredBuildings.map((building, index) => {
                // Get clean short summary for card
                const shortSummary = 
                  building.description.split(/(?=[1-9]\s*[.º°]*\s*Piso|Piso\s*[0-9]|\n|\.)/i)[0] || building.description;

                return (
                  <div
                    key={building.id}
                    className="bg-white rounded-xl border border-primary/5 p-6 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-green/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Building Square Image Thumbnail */}
                      <div 
                        onClick={() => setSelectedBuilding(building)}
                        className="w-full h-40 rounded-xl overflow-hidden border border-primary/10 mb-4 bg-light-gray flex items-center justify-center relative shadow-sm group-hover:border-green transition-colors cursor-pointer"
                      >
                        <img
                          src={building.image}
                          alt={building.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {/* Number Badge */}
                        <span className="absolute top-2.5 left-2.5 w-7 h-7 rounded-full bg-primary text-green text-xs font-bold flex items-center justify-center shadow-md z-10 font-serif">
                          {building.order || (index + 1)}
                        </span>
                      </div>

                      {/* Subtitle / Category Badge */}
                      <span className="text-[10px] uppercase font-bold text-green bg-green/5 px-2.5 py-0.5 rounded-full mb-3 tracking-wider">
                        {building.subtitle || 'Complexo Multifuncional'}
                      </span>

                      {/* Building Name */}
                      <h3 
                        onClick={() => setSelectedBuilding(building)}
                        className="text-lg font-bold font-serif text-primary mb-2 group-hover:text-green transition-colors cursor-pointer"
                      >
                        {building.name}
                      </h3>

                      {/* Short Concise Summary */}
                      <p className="text-primary/70 text-xs sm:text-sm line-clamp-2 leading-relaxed mb-6">
                        {shortSummary}
                      </p>
                    </div>

                    {/* Card Bottom Meta & Action */}
                    <div className="border-t border-primary/5 pt-4 space-y-2">
                      <div className="flex justify-between items-center text-[10px] text-primary/50 font-medium">
                        <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> Edifício {building.order || (index + 1)}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-green" /> Homoíne Central</span>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          onClick={() => setSelectedBuilding(building)}
                          className="flex-1 text-center bg-primary hover:bg-primary-light text-white text-[11px] font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" /> Ver Detalhes
                        </button>
                        <Link
                          href="/espacos"
                          className="flex-1 text-center bg-green hover:bg-green-light text-primary text-[11px] font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 flex items-center justify-center gap-1 shadow-sm font-semibold hover:-translate-y-0.5 active:translate-y-0"
                        >
                          Arrendar
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>


      </main>

      {/* Building Detail Modal when user clicks to appreciate the building */}
      {selectedBuilding && (
        <BuildingDetailModal
          building={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
        />
      )}

      <Footer />
    </>
  );
}
