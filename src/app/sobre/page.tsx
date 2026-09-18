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
  Layers,
  ArrowRight,
  Eye,
  ShieldCheck,
  MapPin,
  Sparkles,
  Phone
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
      name: 'Edifício 1 – Centro Comercial',
      subtitle: 'Shopping & Lojas de Retalho',
      description: 'Espaço central do complexo destinado a grandes marcas, supermercado âncora, praça de restauração e serviços essenciais de alto fluxo comercial.',
      image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      features: ['Lojas Âncora e Boutiques', 'Supermercado e Farmácia', 'Praça de Alimentação Climatizada', 'Escadas Rolantes e Elevadores Panorâmicos'],
      order: 1
    },
    {
      id: 'building-2',
      name: 'Edifício 2 – Área Comercial e Hospedagem',
      subtitle: 'Serviços, Escritórios & Hospedagem',
      description: 'Ambiente executivo e moderno ideal para agências bancárias, telecomunicações, consultórios médicos, escritórios corporativos e unidades de hospedagem.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      features: ['Escritórios Modulares & Coworking', 'Agências Bancárias e Seguradoras', 'Alojamento e Suítes Confortáveis', 'Acesso Controlado e Portaria Executiva'],
      order: 2
    },
    {
      id: 'building-3',
      name: 'Edifício 3 – Área Logística e Operacional',
      subtitle: 'Ferragens e Armazéns',
      description: 'Estrutura reforçada especialmente projetada para carga e descarga, grandes volumes, materiais de construção, ferragens e centros de distribuição regional.',
      image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      features: ['Pé-direito Alto para Armazenamento', 'Docas de Carga e Descarga', 'Área Exclusiva para Ferragens', 'Acesso Facilitado a Camiões'],
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
      badge: 'Edifício 1',
      title: buildingA.name || 'Edifício 1 – Centro Comercial',
      actionText: 'Ver Detalhes',
      icon: Store,
      isSpecial: false,
      onClick: () => setSelectedBuilding(buildingA)
    },
    {
      id: 'btn-building-2',
      badge: 'Edifício 2',
      title: buildingB.name || 'Edifício 2 – Área Comercial e Hospedagem',
      actionText: 'Ver Detalhes',
      icon: Briefcase,
      isSpecial: false,
      onClick: () => setSelectedBuilding(buildingB)
    },
    {
      id: 'btn-building-3',
      badge: 'Edifício 3',
      title: buildingC.name || 'Edifício 3 – Área Logística e Operacional',
      actionText: 'Ver Detalhes',
      icon: Building2,
      isSpecial: false,
      onClick: () => setSelectedBuilding(buildingC)
    },
    {
      id: 'btn-espacos',
      badge: 'Disponibilidade',
      title: 'Espaços Comerciais',
      actionText: 'Explorar Espaços',
      icon: Layers,
      isSpecial: true,
      href: '/espacos'
    }
  ];

  const corePillars = [
    {
      icon: MapPin,
      title: 'Localização Estratégica',
      desc: 'No centro de Homoíne, província de Inhambane, com acessos rápidos e grande fluxo.'
    },
    {
      icon: ShieldCheck,
      title: 'Segurança 24 Horas',
      desc: 'Videovigilância contínua e equipa de vigilância permanente para total tranquilidade.'
    },
    {
      icon: Sparkles,
      title: 'Padrão Internacional',
      desc: 'Construção moderna, energia com gerador de suporte e climatização eficiente.'
    },
    {
      icon: Building,
      title: 'Complexo Multifuncional',
      desc: 'Integração de compras, serviços corporativos, gastronomia, hotelaria e logística.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#0f0404] text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-grow pt-16 sm:pt-20 pb-6 sm:pb-8">
        {/* Hero Institucional Limpo e Sofisticado */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary-dark via-primary to-primary-dark text-white py-8 sm:py-12 shadow-md">
          {/* Imagem de Fundo Sutil */}
          <div 
            className="absolute inset-0 z-0 bg-cover bg-center opacity-15 mix-blend-overlay pointer-events-none" 
            style={{ backgroundImage: `url('${heroBgImage}')` }} 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight mb-3 leading-tight">
                Um Complexo Comercial <span className="text-green-light">Moderno e Multifuncional</span>
              </h1>
              
              <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-normal">
                A <strong className="text-white font-semibold">Miriam Mall – Soc. Unipessoal, Lda.</strong> é uma empresa moçambicana de gestão e arrendamento de imóveis comerciais em Homoíne, Inhambane. Reúne num único complexo lojas de retalho, serviços bancários, espaços gastronómicos e áreas de lazer, com segurança 24h e infraestrutura de padrão internacional.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Cards Reduzidos dos Edifícios (Limpos, Compactos e Apenas com os Nomes) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 relative z-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actionButtons.map((btn, idx) => {
              const Icon = btn.icon;

              const CardContent = (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, delay: idx * 0.05 }}
                  className={`h-full px-3.5 py-3 rounded-xl border transition-all duration-300 flex items-center justify-between text-left group cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 ${
                    btn.isSpecial
                      ? 'bg-gradient-to-r from-green-600 via-green to-green-dark text-white border-green-400 hover:border-green-300'
                      : 'bg-white dark:bg-[#1a0707] text-slate-900 dark:text-white border-slate-200/90 dark:border-red-950/60 hover:border-primary/40 dark:hover:border-green/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 pr-2">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      btn.isSpecial
                        ? 'bg-white/20 text-white'
                        : 'bg-primary/10 dark:bg-white/5 text-primary dark:text-green group-hover:bg-primary group-hover:text-white dark:group-hover:bg-green dark:group-hover:text-primary'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Nome do Edifício */}
                    <h3 className={`font-serif font-bold text-xs sm:text-sm leading-tight transition-colors line-clamp-2 ${
                      btn.isSpecial ? 'text-white' : 'text-slate-900 dark:text-white group-hover:text-primary dark:group-hover:text-green-light'
                    }`}>
                      {btn.title}
                    </h3>
                  </div>

                  <div className="shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                    {btn.isSpecial ? (
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    ) : (
                      <Eye className="w-3.5 h-3.5 transition-transform group-hover:scale-110" />
                    )}
                  </div>
                </motion.div>
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

        {/* Pilares Estratégicos (Limpos & Diretos) */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10">
          <div className="text-center mb-6">
            <span className="text-green font-semibold text-xs uppercase tracking-widest block mb-1">
              Diferenciais do Complexo
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900 dark:text-white">
              Por que Escolher o Miriam Mall?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {corePillars.map((pilar, i) => {
              const PillarIcon = pilar.icon;
              return (
                <div 
                  key={i}
                  className="bg-white dark:bg-[#1a0707] p-5 rounded-2xl border border-slate-200/80 dark:border-red-950/60 shadow-sm hover:border-green/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 dark:bg-white/5 text-primary dark:text-green flex items-center justify-center mb-3">
                    <PillarIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-slate-900 dark:text-white mb-1.5">
                    {pilar.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
                    {pilar.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA Simples para Contacto & Arrendamento */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8">
          <div className="bg-white dark:bg-[#180505] rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-white/10 shadow-sm text-center flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="text-center sm:text-left">
              <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 dark:text-white mb-1">
                Interessado em Arrendar um Espaço?
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm">
                Consulte as lojas e salas disponíveis ou contacte diretamente a nossa administração.
              </p>
            </div>
            <div className="flex items-center gap-2.5 flex-shrink-0">
              <Link
                href="/espacos"
                className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-light text-white font-semibold text-xs transition-colors shadow-sm"
              >
                Ver Espaços
              </Link>
              <a
                href="https://wa.me/258865543026?text=Olá! Gostaria de informações sobre os espaços comerciais do Miriam Mall."
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-green hover:bg-green-light text-primary font-bold text-xs transition-colors shadow-sm flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Modal de Detalhes do Edifício */}
      {selectedBuilding && (
        <BuildingDetailModal
          building={selectedBuilding}
          onClose={() => setSelectedBuilding(null)}
        />
      )}

      <Footer />
    </div>
  );
}
