'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Shield,
  MapPin,
  TrendingUp,
  Clock,
  Layers,
  Sparkles,
  Users,
  Building,
  Phone,
  MessageCircle,
  Mail,
  ArrowRight,
  ChevronRight,
  Compass,
  Palmtree,
  Calendar,
  Tag
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractiveMap from '../components/InteractiveMap';
import { useDatabase } from '../context/DatabaseContext';
import ImageWithLoader from '../components/ImageWithLoader';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';

export default function Home() {
  const { spaces, stores, events, promotions, banners } = useDatabase();

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' as const }
    }
  };

  // Get active banners for carousel
  const activeBanners = banners.filter((b) => b.isActive);
  const displayBanners = activeBanners.length > 0 ? activeBanners : banners;

  // Get available/reserved spaces for display (limit to 3 for preview)
  const previewSpaces = spaces
    .filter((s) => s.status !== 'ocupado')
    .slice(0, 3);

  // Get 4 stores for showcase preview
  const previewStores = stores.slice(0, 4);

  const benefits = [
    { icon: Users, title: 'Grande Fluxo de Visitantes', text: 'Localização central que atrai consumidores de todo o distrito de Homoíne e arredores.' },
    { icon: MapPin, title: 'Excelente Localização', text: 'Situado no coração de Homoíne, com acesso fácil às principais vias e transportes.' },
    { icon: Shield, title: 'Segurança 24 horas', text: 'Equipa de vigilância permanente e circuito fechado de TV para total tranquilidade.' },
    { icon: Building, title: 'Infraestrutura Moderna', text: 'Instalações elétricas, hidráulicas e de telecomunicações de padrão internacional.' },
    { icon: Compass, title: 'Parque de Estacionamento', text: 'Estacionamento amplo e organizado para clientes, fornecedores e lojistas.' },
    { icon: Layers, title: 'Espaços Flexíveis', text: 'Lojas moduláveis de 40m² a 150m² adaptáveis a qualquer tipo de comércio ou escritório.' },
    { icon: Sparkles, title: 'Excelente Visibilidade', text: 'Fachadas envidraçadas e design que garante grande exposição visual para a sua marca.' },
    { icon: Palmtree, title: 'Frescura e Charme Tropical', text: 'Ambiente arejado e moderno, planeado sob a influência refrescante dos tradicionais coqueiros de Inhambane.' }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16">
        {/* HERO SECTION */}
        <section className="relative h-[90vh] bg-primary-dark overflow-hidden hero-swiper-section">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect={'fade'}
            fadeEffect={{ crossFade: true }}
            speed={1000}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            className="h-full w-full"
          >
            {displayBanners.map((banner) => (
              <SwiperSlide key={banner.id} className="relative h-full w-full flex items-center justify-center">
                {/* Background image overlay */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-transparent z-10" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-transparent to-transparent opacity-70 z-10" />
                  <ImageWithLoader
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover object-center animate-ken-burns"
                  />
                </div>

                <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex items-center text-left">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl text-white"
                  >
                    <span className="text-green font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center gap-2 mb-3">
                      <Palmtree className="w-4.5 h-4.5 text-green animate-pulse" /> Terra de Boa Gente • Homoíne, Inhambane
                    </span>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4">
                      {banner.title}
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl text-white/80 font-light mb-8 leading-relaxed">
                      {banner.subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4">
                      {banner.buttonText1 && (
                        <Link
                          href={banner.buttonLink1}
                          className="bg-green hover:bg-green-light text-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded transition-all duration-300 text-center shadow-lg hover:shadow-green/25 hover:-translate-y-0.5 active:translate-y-0"
                        >
                          {banner.buttonText1}
                        </Link>
                      )}
                      {banner.buttonText2 && (
                        <Link
                          href={banner.buttonLink2}
                          className="border border-white/80 hover:border-white hover:bg-white hover:text-primary text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded transition-all duration-300 text-center hover:-translate-y-0.5 active:translate-y-0"
                        >
                          {banner.buttonText2}
                        </Link>
                      )}
                    </div>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Scroll Down Indicator */}
          <a
            href="#sobre"
            className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex-col items-center gap-2 group transition-all duration-300"
            aria-label="Rolar para baixo"
          >
            <span className="text-[10px] text-white/50 font-sans tracking-widest uppercase group-hover:text-green transition-colors duration-300">
              Descobrir
            </span>
            <div className="w-6 h-10 rounded-full border-2 border-white/30 group-hover:border-green flex items-start justify-center p-1.5 transition-all duration-300 shadow-lg shadow-black/10">
              <motion.div
                animate={{
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1.5 h-1.5 rounded-full bg-white group-hover:bg-green transition-colors duration-300"
              />
            </div>
          </a>
        </section>

        {/* ABOUT SECTION */}
        <section id="sobre" className="py-24 bg-white relative overflow-hidden">
          {/* Subtle tropical palm watermarks in the background */}
          <Palmtree className="absolute -right-24 -bottom-24 w-96 h-96 text-green/5 pointer-events-none transform -rotate-12" />
          <Palmtree className="absolute -left-24 -top-24 w-96 h-96 text-primary/5 pointer-events-none transform rotate-45" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
              >
                <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block flex items-center gap-1.5">
                  <Palmtree className="w-3.5 h-3.5" /> O Empreendimento
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6">
                  Um Novo Marco de Progresso e Elegância sob as Palmeiras de Inhambane
                </h2>
                <div className="space-y-4 text-primary/70 leading-relaxed text-sm sm:text-base">
                  <p>
                    O **Miriam Mall** surge com a missão de transformar o cenário económico e social do Distrito de Homoíne, na célebre Província de Inhambane. 
                    Pensado detalhadamente para fundir a sofisticação de um centro comercial moderno com o charme natural da Terra de Boa Gente, o shopping reúne o melhor in marcas, conveniência e bem-estar.
                  </p>
                  <p>
                    Mais do que uma estrutura comercial, oferecemos um ambiente de negócios vibrante e refrescante. 
                    Lojas climatizadas, segurança permanente, estacionamento organizado e uma praça de alimentação ampla, rodeada de ventilação natural e da beleza da nossa flora local.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                  <div className="border-l-2 border-green pl-4 py-1 bg-slate-50/50 rounded-r-lg">
                    <span className="text-2xl font-serif font-bold text-primary block">2 Pisos</span>
                    <span className="text-[10px] text-primary/60 uppercase font-medium tracking-wide">Lojas e Lazer</span>
                  </div>
                  <div className="border-l-2 border-green pl-4 py-1 bg-slate-50/50 rounded-r-lg">
                    <span className="text-2xl font-serif font-bold text-primary block">Segurança 24h</span>
                    <span className="text-[10px] text-primary/60 uppercase font-medium tracking-wide">Física e CCTV</span>
                  </div>
                  <div className="border-l-2 border-green pl-4 py-1 bg-slate-50/50 rounded-r-lg">
                    <span className="text-2xl font-serif font-bold text-primary block flex items-center gap-1">
                      Tropical
                    </span>
                    <span className="text-[10px] text-primary/60 uppercase font-medium tracking-wide">Design Sustentável</span>
                  </div>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative p-2 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-green-glow shadow-green-glow-hover transition-all duration-500"
              >
                <div className="relative h-[440px] rounded-xl overflow-hidden group">
                  <ImageWithLoader
                    src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80"
                    alt="Interior do Shopping"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* WHY INVEST SECTION */}
        <section className="py-24 bg-primary-dark text-white relative overflow-hidden">
          {/* Subtle tropical palm watermark in the background */}
          <Palmtree className="absolute -left-20 -bottom-20 w-80 h-80 text-white/5 pointer-events-none transform rotate-12" />
          <Palmtree className="absolute -right-20 -top-20 w-80 h-80 text-white/5 pointer-events-none transform -rotate-45" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block flex items-center justify-center gap-1.5">
                <Palmtree className="w-3.5 h-3.5" /> Oportunidade Comercial
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Porquê Investir no Miriam Mall?</h2>
              <p className="text-white/60 text-sm">
                Conheça as vantagens competitivas que tornam o Miriam Mall a melhor escolha para expandir a sua marca ou iniciar o seu negócio sob o potencial de Homoíne.
              </p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <motion.div
                    key={index}
                    variants={cardVariants}
                    className="p-6 rounded-xl bg-primary/45 border border-white/5 shadow-md shadow-green-glow hover:border-green/45 transition-all duration-300 hover:-translate-y-1.5 active:translate-y-0 group cursor-default"
                  >
                    <div className="w-12 h-12 rounded-lg bg-green/10 flex items-center justify-center mb-5 group-hover:bg-green transition-all duration-300 transform group-hover:scale-110">
                      <IconComponent className="w-6 h-6 text-green group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold mb-2.5 group-hover:text-green transition-colors">{benefit.title}</h3>
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">{benefit.text}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* AVAILABLE SPACES SECTION */}
        <section id="arrendamentos" className="py-24 bg-gradient-to-b from-white to-light-gray relative overflow-hidden">
          <Palmtree className="absolute -right-24 top-1/3 w-96 h-96 text-primary/5 pointer-events-none transform rotate-45" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block flex items-center justify-center gap-1.5">
                <Palmtree className="w-3.5 h-3.5" /> Espaços Disponíveis
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
                Espaços Disponíveis para Arrendamento
              </h2>
              <p className="text-primary/60 text-sm">
                Consulte as nossas lojas comerciais e encontre o espaço perfeito. Utilize o mapa interativo abaixo ou candidate-se a um espaço.
              </p>
            </div>

            {/* Interactive Map Component */}
            <div className="mb-16 p-2 bg-white border border-slate-200/60 rounded-2xl shadow-lg relative z-20">
              <InteractiveMap />
            </div>

            {/* Grid of Preview Spaces */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {previewSpaces.map((space) => (
                <motion.div
                  key={space.id}
                  variants={cardVariants}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:border-green/20 transition-all duration-300 group"
                >
                  <div>
                    <div className="h-52 relative bg-primary-dark overflow-hidden">
                      <ImageWithLoader 
                        src={space.image} 
                        alt={space.number} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      />
                      <div className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm px-3 py-1 rounded text-[10px] text-green font-bold uppercase tracking-wider">
                        Piso {space.floor}
                      </div>
                      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-md ${
                        space.status === 'disponivel' ? 'bg-emerald-500' : 'bg-amber-500'
                      }`}>
                        {space.status}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-serif text-xl font-bold text-primary">{space.number}</h3>
                        <span className="text-xs font-bold text-green bg-green/5 px-2 py-1 rounded">{space.area} m²</span>
                      </div>
                      <p className="text-primary/70 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                        {space.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 flex gap-4">
                    <Link
                      href={`/espacos/${space.id}`}
                      className="flex-1 text-center bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-all duration-300 shadow-sm"
                    >
                      Detalhes
                    </Link>
                    <Link
                      href={`/contato?espaco=${space.number}`}
                      className="flex-1 text-center bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-3 rounded-lg transition-all duration-300 shadow-sm hover:shadow-green/15"
                    >
                      Arrendar
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div className="text-center mt-12">
              <Link
                href="/espacos"
                className="inline-flex items-center gap-2 text-green font-bold uppercase tracking-wider text-xs sm:text-sm border-b-2 border-green pb-1 hover:text-green-light hover:border-green-light transition-colors"
              >
                Ver Todos os Espaços Disponíveis <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* STORES PREVIEW SECTION */}
        <section className="py-24 bg-gradient-to-b from-light-gray to-white border-y border-slate-200/50 relative overflow-hidden">
          <Palmtree className="absolute -left-24 top-1/4 w-96 h-96 text-primary/5 pointer-events-none transform -rotate-12" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block flex items-center gap-1.5">
                  <Palmtree className="w-3.5 h-3.5" /> Marcas Parceiras
                </span>
                <h2 className="text-3xl font-serif font-bold text-primary">Nossas Lojas</h2>
              </div>
              <Link
                href="/lojas"
                className="text-xs uppercase tracking-wider text-green hover:text-green-light font-bold flex items-center gap-1 mt-4 md:mt-0 transition-colors"
              >
                Ver Todas as Lojas <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {previewStores.map((store) => (
                <motion.div
                  key={store.id}
                  variants={cardVariants}
                  className="bg-white p-6 rounded-2xl border border-slate-100 text-center flex flex-col justify-between shadow-md hover:-translate-y-1.5 hover:shadow-xl hover:border-green/20 transition-all duration-300 group"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-slate-100 mb-4 bg-slate-50 flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform duration-500">
                      <ImageWithLoader src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-green bg-green/5 px-2.5 py-1 rounded-full mb-3">
                      {store.category}
                    </span>
                    <h3 className="text-base font-bold text-primary mb-1.5">{store.name}</h3>
                    <p className="text-xs text-primary/60 line-clamp-2 mb-4 leading-relaxed">
                      {store.description}
                    </p>
                  </div>
                  <div className="text-xs text-primary/50 border-t border-slate-100 pt-4 mt-2">
                    <span className="block font-medium">Piso {store.floor} | Horário: {store.schedule}</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* PROMOTIONS SECTION */}
        {promotions && promotions.length > 0 && (
          <section className="py-24 bg-white relative overflow-hidden">
            <Palmtree className="absolute -right-24 -bottom-24 w-96 h-96 text-primary/5 pointer-events-none transform -rotate-12" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block flex items-center justify-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Oportunidades Únicas
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
                  Promoções em Destaque
                </h2>
                <p className="text-primary/70 text-sm">
                  Aproveite as ofertas exclusivas e descontos imperdíveis das nossas lojas parceiras no Miriam Mall.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {promotions.slice(0, 3).map((promo) => (
                  <motion.div
                    key={promo.id}
                    variants={cardVariants}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:border-green/20 transition-all duration-300 group"
                  >
                    <div>
                      <div className="h-48 relative bg-primary-dark overflow-hidden">
                        <ImageWithLoader
                          src={promo.image}
                          alt={promo.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-green text-primary text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded shadow-md">
                          {promo.storeName}
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-serif text-lg font-bold text-primary mb-3 line-clamp-1 group-hover:text-green transition-colors">
                          {promo.title}
                        </h3>
                        <p className="text-primary/70 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                          {promo.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 border-t border-slate-50 flex items-center gap-2 text-xs text-primary/60 font-medium">
                      <Clock className="w-4 h-4 text-green" />
                      <span>{promo.validity}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* EVENTS SECTION */}
        {events && events.length > 0 && (
          <section className="py-24 bg-light-gray border-t border-slate-200/40 relative overflow-hidden">
            <Palmtree className="absolute -left-24 -top-24 w-96 h-96 text-green/5 pointer-events-none transform rotate-45" />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="text-center max-w-2xl mx-auto mb-16">
                <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block flex items-center justify-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> Vida no Shopping
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
                  Próximos Eventos & Agenda
                </h2>
                <p className="text-primary/70 text-sm">
                  Fique por dentro das atividades culturais, concertos e feiras que movimentam a comunidade de Homoíne.
                </p>
              </div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                {events.slice(0, 3).map((event) => (
                  <motion.div
                    key={event.id}
                    variants={cardVariants}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md flex flex-col justify-between hover:-translate-y-1.5 hover:shadow-xl hover:border-green/20 transition-all duration-300 group"
                  >
                    <div>
                      <div className="h-48 relative bg-primary-dark overflow-hidden">
                        <ImageWithLoader
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4 bg-primary/95 text-green text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded flex items-center gap-1 shadow-md">
                          <MapPin className="w-3 h-3" /> {event.location}
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-2 text-xs font-bold text-green mb-2.5">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-primary mb-3 line-clamp-1 group-hover:text-green transition-colors">
                          {event.title}
                        </h3>
                        <p className="text-primary/70 text-xs sm:text-sm line-clamp-3 leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-4 border-t border-slate-50 text-center">
                      <Link
                        href="/eventos"
                        className="text-xs uppercase tracking-wider text-green hover:text-green-light font-bold flex items-center justify-center gap-1 transition-colors"
                      >
                        Ver Detalhes do Evento <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA BANNERS / INVESTORS SECTION */}
        <section className="py-24 bg-gradient-to-b from-primary to-primary-dark text-white relative">
          <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')" }}></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 text-green flex items-center justify-center gap-2">
              <Palmtree className="w-8 h-8 hidden md:block" /> Faça Parte do Maior Centro Comercial de Homoíne
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
              Leve a sua marca para um espaço moderno, seguro e estrategicamente localizado. Sob a brisa dos coqueiros e o dinamismo de Inhambane, o Miriam Mall oferece as melhores oportunidades para marcas e investidores que procuram crescer na região.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contato"
                className="bg-green hover:bg-green-light text-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded transition-all duration-300"
              >
                Quero Arrendar um Espaço
              </Link>
              <Link
                href="/sobre"
                className="border border-white/30 hover:border-white text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded transition-all duration-300"
              >
                Saber Mais Sobre Nós
              </Link>
            </div>
          </div>
        </section>

        {/* CONTACT & LOCALIZATION */}
        <section id="contacto" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Information & Form */}
              <div>
                <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block">Dúvidas ou Propostas</span>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Fale Connosco</h2>
                
                <p className="text-primary/70 text-sm sm:text-base leading-relaxed mb-8">
                  Quer abrir a sua franquia, arrendar uma loja ou obter informações sobre o shopping? 
                  A nossa equipa comercial está pronta para o ajudar a encontrar a melhor solução.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-light-gray border border-primary/5">
                    <MapPin className="w-6 h-6 text-green" />
                    <div>
                      <h4 className="font-bold text-primary text-sm">Endereço</h4>
                      <p className="text-xs text-primary/60">Miriam Mall, Homoíne, Província de Inhambane, Moçambique</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-light-gray border border-primary/5">
                    <Phone className="w-6 h-6 text-green" />
                    <div>
                      <h4 className="font-bold text-primary text-sm">Telefone e WhatsApp</h4>
                      <p className="text-xs text-primary/60">+258 86 554 3026</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-light-gray border border-primary/5">
                    <Mail className="w-6 h-6 text-green" />
                    <div>
                      <h4 className="font-bold text-primary text-sm">E-mail Oficial</h4>
                      <p className="text-xs text-primary/60">info@miriammall.co.mz</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href="https://wa.me/258865543026"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider py-3 rounded flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" /> Falar no WhatsApp
                  </a>
                  <Link
                    href="/contato"
                    className="flex-1 text-center bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-3 rounded flex items-center justify-center gap-2"
                  >
                    Formulário de Contacto <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Map Iframe */}
              <div className="rounded-lg overflow-hidden border border-green/10 green-glow h-[450px] relative">
                {/* Custom Styled Leaflet/Google Map Mockup with high visual quality or standard map embedding */}
                <iframe
                  title="Miriam Mall Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14541.776092004245!2d35.10903333333333!3d-24.16875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1edd376e1a067a21%3A0xe5a3c2de30f5a3bd!2zSG9tb8OObmUsIE1vY2FtYmlxdWU!5e0!3m2!1spt!2spt!4v1700000000000!5m2!1spt!2spt"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="grayscale hover:grayscale-0 transition-all duration-500"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
