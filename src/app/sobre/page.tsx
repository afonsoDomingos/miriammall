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

  const getBuilding = (index: number) => {
    if (buildings && buildings[index]) {
      return buildings[index];
    }
    return defaultBuildings[index] || defaultBuildings[0];
  };

  const buildingA = getBuilding(0);
  const buildingB = getBuilding(1);
  const buildingC = getBuilding(2);

  const actionButtons = [
    {
      id: 'btn-building-1',
      badge: buildingA.name.includes('A') ? 'Edifício A' : (buildingA.order ? `Edifício ${buildingA.order}` : 'Edifício A'),
      title: buildingA.name || 'Edifício Principal',
      subtitle: buildingA.subtitle || 'Comércio & Âncoras',
      actionText: 'Ver Detalhes',
      icon: Store,
      isSpecial: false,
      onClick: () => setSelectedBuilding(buildingA)
    },
    {
      id: 'btn-building-2',
      badge: buildingB.name.includes('B') ? 'Edifício B' : (buildingB.order ? `Edifício ${buildingB.order}` : 'Edifício B'),
      title: buildingB.name || 'Edifício Empresarial',
      subtitle: buildingB.subtitle || 'Serviços & Escritórios Corporativos',
      actionText: 'Ver Detalhes',
      icon: Briefcase,
      isSpecial: false,
      onClick: () => setSelectedBuilding(buildingB)
    },
    {
      id: 'btn-building-3',
      badge: buildingC.name.includes('C') ? 'Edifício C' : (buildingC.order ? `Edifício ${buildingC.order}` : 'Edifício C'),
      title: buildingC.name || 'Edifício Lazer & Convivência',
      subtitle: buildingC.subtitle || 'Restaurantes, Rooftop & Bem-Estar',
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

      <main className="flex-grow pt-16 sm:pt-[72px] relative bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white overflow-hidden flex flex-col justify-between">
        {/* Background Image & Decorative Watermarks */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none" 
          style={{ backgroundImage: `url('${heroBgImage}')` }} 
        />
        <Palmtree className="absolute -left-16 -bottom-16 w-52 h-52 text-green/10 pointer-events-none transform rotate-45" />
        <Palmtree className="absolute -right-16 -top-16 w-52 h-52 text-white/5 pointer-events-none transform -rotate-12" />

        {/* Unified Content Section on same background */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex flex-col justify-center py-5 sm:py-7 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto mb-5 sm:mb-6"
          >
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold mb-1.5 tracking-tight text-white">
              Saiba Mais
            </h1>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-green/15 border border-green/30 text-green text-[10px] font-bold uppercase tracking-wider mb-2">
              <Building className="w-3 h-3" /> Quem Somos & O Nosso Conceito
            </div>
            <h2 className="text-lg sm:text-xl md:text-2xl font-serif font-bold text-white mb-2 leading-tight">
              Um Complexo Comercial Moderno e Multifuncional
            </h2>
            <p className="text-white/80 leading-relaxed text-[11px] sm:text-xs max-w-2xl mx-auto">
              A <strong className="text-white font-semibold">Miriam Mall – Soc. Unipessoal, Lda.</strong> é uma empresa moçambicana de gestão e arrendamento de imóveis comerciais em Homoíne, Inhambane. Reúne num único complexo lojas de retalho, serviços bancários, espaços gastronómicos e áreas de lazer, com segurança 24h e infraestrutura de padrão internacional.
            </p>
          </motion.div>

          {/* 4 Botões de Acção Direta */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
            {actionButtons.map((btn) => {
              const Icon = btn.icon;

              const CardContent = (
                <div 
                  className={`h-full p-4 rounded-xl border transition-all duration-300 flex flex-col justify-between text-left group cursor-pointer ${
                    btn.isSpecial
                      ? 'bg-gradient-to-br from-green to-green-dark text-primary border-green shadow-xl hover:shadow-green-glow hover:-translate-y-1'
                      : 'bg-white/95 hover:bg-white text-primary border-white/20 shadow-xl hover:border-green hover:shadow-2xl hover:-translate-y-1 backdrop-blur-sm'
                  }`}
                >
                  <div>
                    {/* Top row with icon & badge */}
                    <div className="flex items-center justify-between mb-2.5">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                        btn.isSpecial 
                          ? 'bg-primary text-green group-hover:bg-primary-dark' 
                          : 'bg-primary/5 text-primary border border-primary/10 group-hover:bg-primary group-hover:text-green'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        btn.isSpecial
                          ? 'bg-primary text-green font-bold'
                          : 'bg-primary/5 text-primary/70 group-hover:bg-green/15 group-hover:text-green-dark'
                      }`}>
                        {btn.badge}
                      </span>
                    </div>

                    {/* Title and Subtitle */}
                    <h3 className={`font-serif font-bold text-sm sm:text-base mb-1 transition-colors ${
                      btn.isSpecial ? 'text-primary' : 'text-primary group-hover:text-primary-dark'
                    }`}>
                      {btn.title}
                    </h3>
                    <p className={`text-[11px] line-clamp-2 leading-relaxed ${
                      btn.isSpecial ? 'text-primary/80 font-medium' : 'text-primary/65'
                    }`}>
                      {btn.subtitle}
                    </p>
                  </div>

                  {/* Bottom Action Hint */}
                  <div className={`mt-3.5 pt-2 border-t flex items-center justify-between text-[11px] font-semibold ${
                    btn.isSpecial 
                      ? 'border-primary/20 text-primary group-hover:text-primary-dark' 
                      : 'border-slate-200/80 text-primary/70 group-hover:text-green'
                  }`}>
                    <span>{btn.actionText}</span>
                    {btn.isSpecial ? (
                      <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
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
        </div>
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
