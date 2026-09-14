'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Building as BuildingType, Banner } from '../../utils/mockData';
import BuildingDetailModal from '../../components/BuildingDetailModal';
import { 
  Building, 
  Building2,
  Store,
  Briefcase,
  Utensils,
  Layers,
  ArrowUpRight,
  Eye,
  Palmtree,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Sobre() {
  const { buildings, banners } = useDatabase();

  // Hero banner background image
  const defaultHeroImage = 'https://res.cloudinary.com/dnvnftvky/image/upload/v1784284817/miriam_mall/ssakfoiyoj4sxvg26ce5.jpg';
  const cleanBanners = banners?.filter((b: Banner) => b.image && !b.image.includes('unsplash.com/photo-1519501025264')) ?? [];
  const activeBanners = cleanBanners.filter((b: Banner) => b.isActive);
  const heroBgImage = activeBanners.length > 0 ? activeBanners[0].image : (cleanBanners.length > 0 ? cleanBanners[0].image : defaultHeroImage);

  const [selectedBuilding, setSelectedBuilding] = useState<BuildingType | null>(null);

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

  const buildingA = allBuildings.find(b => b.order === 1 || b.name.includes('A') || b.id === 'building-1') || allBuildings[0] || defaultBuildings[0];
  const buildingB = allBuildings.find(b => b.order === 2 || b.name.includes('B') || b.id === 'building-2') || allBuildings[1] || defaultBuildings[1];
  const buildingC = allBuildings.find(b => b.order === 3 || b.name.includes('C') || b.id === 'building-3') || allBuildings[2] || defaultBuildings[2];

  const actionButtons = [
    {
      id: 'btn-building-1',
      badge: 'Edifício A',
      title: buildingA.name.replace(/\s*\(A\)/i, ''),
      subtitle: buildingA.subtitle || 'Comércio & Âncoras',
      actionText: 'Ver Detalhes',
      icon: Store,
      isSpecial: false,
      onClick: () => setSelectedBuilding(buildingA)
    },
    {
      id: 'btn-building-2',
      badge: 'Edifício B',
      title: buildingB.name.replace(/\s*\(B\)/i, ''),
      subtitle: buildingB.subtitle || 'Serviços & Escritórios',
      actionText: 'Ver Detalhes',
      icon: Briefcase,
      isSpecial: false,
      onClick: () => setSelectedBuilding(buildingB)
    },
    {
      id: 'btn-building-3',
      badge: 'Edifício C',
      title: buildingC.name.replace(/\s*\(C\)/i, ''),
      subtitle: buildingC.subtitle || 'Lazer & Restauração',
      actionText: 'Ver Detalhes',
      icon: Utensils,
      isSpecial: false,
      onClick: () => setSelectedBuilding(buildingC)
    },
    {
      id: 'btn-espacos',
      badge: 'Disponibilidade',
      title: 'Espaços Comerciais',
      subtitle: 'Arrendar Lojas & Salas',
      actionText: 'Explorar Espaços',
      icon: Layers,
      isSpecial: true,
      href: '/espacos'
    }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white min-h-[calc(100vh-80px)] flex flex-col justify-between">
        {/* Compact Hero Banner Section */}
        <section className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-10 sm:py-12 text-white text-center overflow-hidden">
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-30" 
            style={{ backgroundImage: `url('${heroBgImage}')` }} 
          />
          {/* Decorative watermarks */}
          <Palmtree className="absolute -left-16 -bottom-16 w-56 h-56 text-green/10 pointer-events-none transform rotate-45" />
          <Palmtree className="absolute -right-16 -top-16 w-56 h-56 text-white/5 pointer-events-none transform -rotate-12" />

          <div className="relative z-10 max-w-3xl mx-auto px-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-2 tracking-tight">
              Saiba Mais
            </h1>
            <div className="w-12 h-1 bg-green mx-auto mb-3 rounded-full" />
            <p className="text-white/80 text-xs sm:text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
              Descubra o propósito, a localização e a infraestrutura concebida para transformar Homoíne e impulsionar o seu negócio.
            </p>
          </div>
        </section>

        {/* Quem Somos & 4 Botões de Acção dos Edifícios */}
        <section className="py-8 sm:py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 border border-green/20 text-green text-xs font-bold uppercase tracking-wider mb-3">
              <Building className="w-3.5 h-3.5" /> Quem Somos & O Nosso Conceito
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-primary mb-3 leading-tight">
              Um Complexo Comercial Moderno e Multifuncional
            </h2>
            <p className="text-primary/75 leading-relaxed text-xs sm:text-sm md:text-base">
              A <strong className="text-primary font-semibold">Miriam Mall – Soc. Unipessoal, Lda.</strong> é uma empresa moçambicana de gestão e arrendamento de imóveis comerciais em Homoíne, Inhambane. Reúne num único complexo lojas de retalho, serviços bancários, espaços gastronómicos e áreas de lazer, com segurança 24h e infraestrutura de padrão internacional.
            </p>
          </motion.div>

          {/* 4 Botões de Acção Direta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {actionButtons.map((btn, index) => {
              const Icon = btn.icon;

              const CardContent = (
                <div 
                  className={`h-full p-5 rounded-2xl border transition-all duration-300 flex flex-col justify-between text-left group cursor-pointer ${
                    btn.isSpecial
                      ? 'bg-gradient-to-br from-primary to-primary-dark text-white border-green/30 hover:border-green hover:shadow-xl hover:-translate-y-1'
                      : 'bg-slate-50/80 hover:bg-white text-primary border-slate-200/70 hover:border-green/40 hover:shadow-xl hover:-translate-y-1'
                  }`}
                >
                  <div>
                    {/* Top row with icon & badge */}
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                        btn.isSpecial 
                          ? 'bg-green/20 text-green group-hover:bg-green group-hover:text-primary' 
                          : 'bg-white text-primary border border-slate-200/60 group-hover:border-green group-hover:text-green'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        btn.isSpecial
                          ? 'bg-green text-primary font-semibold'
                          : 'bg-primary/5 text-primary/70 group-hover:bg-green/10 group-hover:text-green'
                      }`}>
                        {btn.badge}
                      </span>
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className={`font-serif font-bold text-base sm:text-lg mb-1 transition-colors ${
                      btn.isSpecial ? 'text-white' : 'text-primary group-hover:text-green'
                    }`}>
                      {btn.title}
                    </h3>
                    <p className={`text-xs line-clamp-2 leading-relaxed ${
                      btn.isSpecial ? 'text-white/70' : 'text-primary/60'
                    }`}>
                      {btn.subtitle}
                    </p>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className={`mt-4 pt-3 border-t flex items-center justify-between text-xs font-semibold ${
                    btn.isSpecial 
                      ? 'border-white/10 text-green group-hover:text-white' 
                      : 'border-slate-200/60 text-primary/70 group-hover:text-green'
                  }`}>
                    <span>{btn.actionText}</span>
                    {btn.isSpecial ? (
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    ) : (
                      <Eye className="w-4 h-4 transition-transform group-hover:scale-110" />
                    )}
                  </div>
                </div>
              );

              if (btn.href) {
                return (
                  <Link key={btn.id} href={btn.href} className="block h-full">
                    {CardContent}
                  </Link>
                );
              }

              return (
                <button
                  key={btn.id}
                  onClick={btn.onClick}
                  type="button"
                  className="block w-full h-full text-left"
                >
                  {CardContent}
                </button>
              );
            })}
          </div>
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
