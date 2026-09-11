'use client';

import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Building as BuildingType } from '../../utils/mockData';
import BuildingDetailModal from '../../components/BuildingDetailModal';
import { 
  Shield, 
  Users, 
  Compass, 
  Award, 
  Building, 
  CheckCircle2, 
  Target, 
  ArrowRight,
  Briefcase,
  Palmtree,
  Sparkles,
  MapPin,
  Search,
  Layers,
  Clock,
  Car,
  Phone,
  Store,
  UtensilsCrossed,
  Eye
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

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  const services = [
    { 
      icon: Store, 
      title: 'Lojas & Espaços Comerciais', 
      desc: 'Montras amplas e de alta visibilidade, localizadas nos pontos de maior circulação e fluxo pedonal de Homoíne.' 
    },
    { 
      icon: Briefcase, 
      title: 'Escritórios & Consultórios', 
      desc: 'Espaços funcionais e modernos, ideais para agências bancárias, telecomunicações, escritórios corporativos e clínicas.' 
    },
    { 
      icon: UtensilsCrossed, 
      title: 'Praça de Restauração', 
      desc: 'Áreas preparadas para albergar operações gastronómicas, com infraestrutura adequada para extração e atendimento de excelência.' 
    },
    { 
      icon: Compass, 
      title: 'Soluções Flexíveis', 
      desc: 'Espaços adaptáveis para quiosques, caixas automáticos (ATMs), stands promocionais e eventos corporativos.' 
    }
  ];

  const values = ['Solidez', 'Qualidade', 'Transparência', 'Integridade', 'Segurança'];

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
            <span className="text-green uppercase tracking-widest text-xs font-bold block mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4 h-4 text-green animate-pulse" /> Saiba Mais Sobre o Miriam Mall
            </span>
            <h1 className="text-3xl sm:text-4xl sm:text-5xl font-serif font-bold mb-4 tracking-tight">
              O Que É o Shopping Miriam Mall
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
                  A <strong className="text-primary font-semibold">Miriam Mall – Sociedade Unipessoal, Lda.</strong> é uma empresa moçambicana especializada na gestão e arrendamento de imóveis comerciais de excelência. Constituída para responder à crescente procura de espaços modernos, seguros e funcionais no Distrito de Homoíne, Província de Inhambane.
                </p>
                <p>
                  O <strong>Miriam Mall</strong> foi idealizado como um ecossistema integrado que reúne, num único empreendimento, lojas de retalho, supermercado âncora, serviços bancários e corporativos, espaços gastronómicos, esplanadas ao ar livre e áreas de lazer familiar.
                </p>
                <p>
                  A nossa missão é disponibilizar infraestruturas de padrão internacional com gestão profissional, segurança integral 24h e um ambiente confortável que atrai consumidores e investidores de toda a província.
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

        {/* 2. ONDE ESTAMOS LOCALIZADOS */}
        <section className="py-20 bg-light-gray border-y border-slate-200/40 relative overflow-hidden">
          <Palmtree className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 text-primary/5 pointer-events-none transform rotate-12" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block flex items-center justify-center gap-1.5">
                <MapPin className="w-4 h-4 text-green" /> Localização Estratégica
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
                Onde Está Localizado o Miriam Mall?
              </h2>
              <div className="w-16 h-1 bg-green mx-auto mb-6 rounded-full" />
              <p className="text-primary/75 text-sm sm:text-base leading-relaxed">
                Situado no coração do <strong>Distrito de Homoíne</strong>, Província de Inhambane, o complexo está posicionado no centro nevrálgico da vila, garantindo visibilidade ímpar e fácil acesso.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center text-green shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base">Endereço Principal</h3>
                    <span className="text-xs text-primary/60">Sede do Shopping</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
                  Miriam Mall, Distrito de Homoíne, Município da Vila de Homoíne, Província de Inhambane, Moçambique.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center text-green shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base">Acessibilidade & Vias</h3>
                    <span className="text-xs text-primary/60">Chegada Facilitada</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
                  Acesso direto pelas principais vias arteriais e transporte público, com amplo parque de estacionamento privativo para clientes e lojistas.
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3.5 mb-4">
                  <div className="w-11 h-11 rounded-xl bg-green/10 flex items-center justify-center text-green shrink-0">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-primary text-base">Ponto de Referência</h3>
                    <span className="text-xs text-primary/60">Centro da Vila</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-primary/75 leading-relaxed">
                  Próximo aos principais serviços públicos, instituições bancárias, escolas e polos residenciais em forte expansão de Homoíne.
                </p>
              </div>
            </div>

            <div className="bg-primary rounded-2xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-green uppercase tracking-wider text-xs font-bold">Venha Visitar-nos</span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold">Deseja conhecer o local ou agendar uma visita comercial?</h4>
                <p className="text-white/70 text-xs sm:text-sm">A nossa equipa de atendimento está disponível para o receber em Homoíne.</p>
              </div>
              <Link
                href="/contato"
                className="bg-green hover:bg-green-light text-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-7 rounded shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 whitespace-nowrap"
              >
                Fale Connosco
              </Link>
            </div>
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

          {/* Grid of Buildings - EXACT /lojas card design */}
          {filteredBuildings.length === 0 ? (
            <div className="text-center py-16 text-primary/60 text-sm border border-dashed border-primary/10 rounded-lg">
              Nenhum edifício encontrado com a pesquisa indicada.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredBuildings.map((building, index) => (
                <div
                  key={building.id}
                  className="bg-white rounded-xl border border-primary/5 p-6 shadow-sm flex flex-col justify-between hover:shadow-xl hover:border-green/30 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center text-center">
                    {/* Building Round Image Thumbnail (matching /lojas logo design) */}
                    <div className="w-24 h-24 rounded-full overflow-hidden border border-primary/10 mb-4 bg-light-gray flex items-center justify-center relative shadow-sm group-hover:border-green transition-colors">
                      <img
                        src={building.image}
                        alt={building.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>

                    {/* Subtitle / Category Badge */}
                    <span className="text-[10px] uppercase font-bold text-green bg-green/5 px-2.5 py-0.5 rounded-full mb-3 tracking-wider">
                      {building.subtitle || 'Complexo Multifuncional'}
                    </span>

                    {/* Building Name */}
                    <h3 className="text-lg font-bold font-serif text-primary mb-2 group-hover:text-green transition-colors">
                      {building.name}
                    </h3>

                    {/* Description */}
                    <p className="text-primary/70 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">
                      {building.description}
                    </p>

                    {/* Features List */}
                    <div className="w-full text-left bg-slate-50 p-3 rounded-lg border border-slate-100 mb-4 space-y-1.5">
                      <span className="text-[10px] uppercase tracking-wider font-bold text-primary/60 block mb-1">
                        Destaques Construtivos:
                      </span>
                      {building.features.slice(0, 3).map((feat, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-1.5 text-xs text-primary/80">
                          <CheckCircle2 className="w-3.5 h-3.5 text-green shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Bottom Meta & Action */}
                  <div className="border-t border-primary/5 pt-4 space-y-2">
                    <div className="flex justify-between items-center text-[10px] text-primary/50 font-medium">
                      <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5" /> Edifício {building.order || (index + 1)}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-green" /> Homoíne Central</span>
                    </div>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => setSelectedBuilding(building)}
                        className="flex-1 text-center bg-slate-100 hover:bg-slate-200 text-primary text-[11px] font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 flex items-center justify-center gap-1 cursor-pointer"
                        title="Ver fotos e detalhes do edifício"
                      >
                        <Eye className="w-3.5 h-3.5" /> Fotos
                      </button>
                      <Link
                        href="/espacos"
                        className="flex-1 text-center bg-green hover:bg-green-light text-primary text-[11px] font-bold uppercase tracking-wider py-2.5 rounded transition-all duration-300 flex items-center justify-center gap-1 shadow-sm hover:-translate-y-0.5 active:translate-y-0"
                      >
                        Arrendar
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* 4. MISSÃO, VISÃO & VALORES */}
        <section className="py-20 bg-light-gray border-t border-slate-200/40 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block">Cultura Organizacional</span>
              <h2 className="text-3xl font-serif font-bold text-primary">Missão, Visão & Valores</h2>
              <div className="w-12 h-1 bg-green mx-auto mt-4 rounded-full" />
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {/* Mission Card */}
              <motion.div
                variants={cardVariants}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mb-6 group-hover:bg-green transition-all duration-300">
                    <Target className="w-6 h-6 text-green group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-4">Missão</h3>
                  <p className="text-primary/70 text-sm leading-relaxed">
                    Prestar serviços de excelência e qualidade no arrendamento imobiliário comercial, garantindo total segurança, valorização contínua e a satisfação dos nossos lojistas e visitantes.
                  </p>
                </div>
                <div className="w-full h-1.5 bg-green/10 rounded-full mt-6 overflow-hidden">
                  <div className="w-full h-full bg-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                variants={cardVariants}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mb-6 group-hover:bg-green transition-all duration-300">
                    <Compass className="w-6 h-6 text-green group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-4">Visão</h3>
                  <p className="text-primary/70 text-sm leading-relaxed">
                    Ser a referência líder no setor imobiliário e comercial em Inhambane, transformando empreendimentos em ativos que aceleram o desenvolvimento económico, social e cultural.
                  </p>
                </div>
                <div className="w-full h-1.5 bg-green/10 rounded-full mt-6 overflow-hidden">
                  <div className="w-full h-full bg-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </motion.div>

              {/* Values Card */}
              <motion.div
                variants={cardVariants}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mb-6 group-hover:bg-green transition-all duration-300">
                    <Shield className="w-6 h-6 text-green group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-4">Valores</h3>
                  <ul className="space-y-2.5">
                    {values.map((val, i) => (
                      <li key={i} className="flex items-center gap-2 text-primary/85 text-sm font-medium">
                        <CheckCircle2 className="w-4 h-4 text-green" />
                        <span>{val}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-full h-1.5 bg-green/10 rounded-full mt-6 overflow-hidden">
                  <div className="w-full h-full bg-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* 5. SERVICES & ARRENDAMENTO */}
        <section className="py-20 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 sm:gap-16 items-start">
              <div>
                <span className="text-green font-semibold uppercase tracking-wider text-xs block mb-2">Nossas Soluções</span>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Tipologias de Espaços Disponíveis</h2>
                <div className="space-y-4 text-primary/75 text-sm sm:text-base leading-relaxed mb-8">
                  <p>
                    Disponibilizamos espaços comerciais perfeitamente adaptados para diversos segmentos, desde pequenas boutiques a grandes operações corporativas.
                  </p>
                  <p>
                    Com assessoria completa na escolha do espaço, formalização contratual transparente e suporte contínuo na instalação.
                  </p>
                </div>
                <Link
                  href="/espacos"
                  className="inline-flex items-center gap-2 text-green hover:text-green-dark font-bold uppercase text-xs sm:text-sm tracking-wider border-b-2 border-green pb-1 transition-colors"
                >
                  Ver Todos os Espaços Comerciais <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {services.map((srv, i) => {
                  const SrvIcon = srv.icon;
                  return (
                    <div 
                      key={i} 
                      className="p-6 rounded-2xl bg-light-gray border border-primary/5 hover:border-green/20 hover:bg-white hover:shadow-xl transition-all duration-300 group cursor-default"
                    >
                      <div className="w-10 h-10 rounded-xl bg-green/10 flex items-center justify-center mb-4 text-green group-hover:bg-green group-hover:text-primary transition-all duration-300">
                        <SrvIcon className="w-5 h-5" />
                      </div>
                      <h4 className="font-serif text-lg font-bold text-primary mb-2 group-hover:text-green transition-colors">{srv.title}</h4>
                      <p className="text-xs sm:text-sm text-primary/65 leading-relaxed">{srv.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary-dark via-primary to-primary-dark text-white text-center relative overflow-hidden">
          <Palmtree className="absolute -right-12 -bottom-12 w-48 h-48 text-white/5 pointer-events-none transform -rotate-12" />
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Faça Parte do Futuro Comercial de Homoíne
            </h3>
            <p className="text-white/80 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light leading-relaxed">
              Arrende o seu espaço no Miriam Mall e posicione a sua marca no centro comercial de maior potencial da região.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/espacos"
                className="bg-green hover:bg-green-light text-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-8 rounded shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Arrendar um Espaço
              </Link>
              <Link
                href="/contato"
                className="border border-white/40 hover:border-white text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-8 rounded hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
              >
                Contactar a Administração
              </Link>
            </div>
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
