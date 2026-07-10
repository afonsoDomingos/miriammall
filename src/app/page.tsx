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
  Compass
} from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import InteractiveMap from '../components/InteractiveMap';
import { useDatabase } from '../context/DatabaseContext';

export default function Home() {
  const { spaces, stores, events, promotions, banners } = useDatabase();

  // Get active banner
  const activeBanner = banners.find((b) => b.isActive) || banners[0];

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
    { icon: TrendingUp, title: 'Ambiente para Crescer', text: 'O único e maior centro comercial de Homoíne, perfeito para expandir o seu negócio.' }
  ];

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-16">
        {/* HERO SECTION */}
        <section className="relative h-[90vh] flex items-center justify-center bg-primary-dark overflow-hidden">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/80 to-transparent z-10" />
            {activeBanner && (
              <img
                src={activeBanner.image}
                alt={activeBanner.title}
                className="w-full h-full object-cover object-center scale-105 animate-fade-in"
              />
            )}
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-left">
            {activeBanner && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl text-white"
              >
                <span className="text-green font-semibold uppercase tracking-widest text-xs sm:text-sm flex items-center gap-2 mb-3">
                  <span className="w-8 h-[1px] bg-green inline-block" /> Distrito de Homoíne, Inhambane
                </span>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight mb-4">
                  {activeBanner.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/80 font-light mb-8 leading-relaxed">
                  {activeBanner.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  {activeBanner.buttonText1 && (
                    <Link
                      href={activeBanner.buttonLink1}
                      className="bg-green hover:bg-green-light text-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded transition-all duration-300 text-center shadow-lg hover:shadow-green/15"
                    >
                      {activeBanner.buttonText1}
                    </Link>
                  )}
                  {activeBanner.buttonText2 && (
                    <Link
                      href={activeBanner.buttonLink2}
                      className="border border-white hover:bg-white hover:text-primary text-white text-xs sm:text-sm font-bold uppercase tracking-wider py-4 px-8 rounded transition-all duration-300 text-center"
                    >
                      {activeBanner.buttonText2}
                    </Link>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section id="sobre" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block">O Empreendimento</span>
                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-6">
                  Um Novo Marco de Progresso no Distrito de Homoíne
                </h2>
                <div className="space-y-4 text-primary/70 leading-relaxed text-sm sm:text-base">
                  <p>
                    O **Mirriam Mall** surge com a missão de transformar o cenário económico e social da Província de Inhambane. 
                    Pensado detalhadamente para atender às necessidades da população local e de visitantes, o shopping reúne as melhores 
                    marcas, conveniência e lazer num ambiente sofisticado e seguro.
                  </p>
                  <p>
                    Mais do que um centro comercial, somos uma plataforma de crescimento para marcas nacionais e locais. 
                    Oferecemos espaços modernos e adaptáveis, segurança de última geração, parque de estacionamento privativo e 
                    uma localização privilegiada com excelente acessibilidade rodoviária.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="border-l-2 border-green pl-4">
                    <span className="text-2xl font-serif font-bold text-primary">2 Pisos</span>
                    <p className="text-xs text-primary/50 uppercase tracking-wider">De Lojas e Lazer</p>
                  </div>
                  <div className="border-l-2 border-green pl-4">
                    <span className="text-2xl font-serif font-bold text-primary">Segurança 24h</span>
                    <p className="text-xs text-primary/50 uppercase tracking-wider">Monitorização Permanente</p>
                  </div>
                </div>
              </div>
              <div className="relative h-[450px] rounded-lg overflow-hidden border border-green/10 green-glow">
                <img
                  src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80"
                  alt="Interior do Shopping"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* WHY INVEST SECTION */}
        <section className="py-24 bg-primary-dark text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block">Oportunidade Comercial</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4">Porquê Investir no Mirriam Mall?</h2>
              <p className="text-white/60 text-sm">
                Conheça as vantagens competitivas que tornam o Mirriam Mall a melhor escolha para expandir a sua marca ou iniciar o seu negócio.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {benefits.map((benefit, index) => {
                const IconComponent = benefit.icon;
                return (
                  <div
                    key={index}
                    className="p-6 rounded-lg bg-primary border border-white/5 hover:border-green/30 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-green/10 flex items-center justify-center mb-4 group-hover:bg-green transition-colors">
                      <IconComponent className="w-6 h-6 text-green group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-green transition-colors">{benefit.title}</h3>
                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">{benefit.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* AVAILABLE SPACES SECTION */}
        <section id="arrendamentos" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block">Espaços Disponíveis</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-4">
                Espaços Disponíveis para Arrendamento
              </h2>
              <p className="text-primary/60 text-sm">
                Consulte as nossas lojas comerciais e encontre o espaço perfeito. Utilize o mapa interativo abaixo ou candidate-se a um espaço.
              </p>
            </div>

            {/* Interactive Map Component */}
            <div className="mb-16">
              <InteractiveMap />
            </div>

            {/* Grid of Preview Spaces */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {previewSpaces.map((space) => (
                <div
                  key={space.id}
                  className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md flex flex-col justify-between hover:shadow-lg transition-shadow duration-300"
                >
                  <div>
                    <div className="h-48 relative bg-primary-dark">
                      <img src={space.image} alt={space.number} className="w-full h-full object-cover" />
                      <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] text-green font-bold uppercase tracking-wider">
                        Piso {space.floor}
                      </div>
                      <div className="absolute top-4 right-4 bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {space.status}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="font-serif text-xl font-bold text-primary">{space.number}</h3>
                        <span className="text-xs font-semibold text-primary/50">{space.area} m²</span>
                      </div>
                      <p className="text-primary/70 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                        {space.description}
                      </p>
                    </div>
                  </div>
                  <div className="px-6 pb-6 pt-2 flex gap-4">
                    <Link
                      href={`/espacos/${space.id}`}
                      className="flex-1 text-center bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-colors"
                    >
                      Detalhes
                    </Link>
                    <Link
                      href={`/contato?espaco=${space.number}`}
                      className="flex-1 text-center bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-colors"
                    >
                      Arrendar
                    </Link>
                  </div>
                </div>
              ))}
            </div>

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
        <section className="py-24 bg-light-gray border-y border-primary/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <span className="text-green font-semibold uppercase tracking-wider text-xs mb-2 block">Marcas Parceiras</span>
                <h2 className="text-3xl font-serif font-bold text-primary">Nossas Lojas</h2>
              </div>
              <Link
                href="/lojas"
                className="text-xs uppercase tracking-wider text-green hover:text-green-light font-bold flex items-center gap-1 mt-4 md:mt-0"
              >
                Ver Todas as Lojas <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {previewStores.map((store) => (
                <div
                  key={store.id}
                  className="bg-white p-6 rounded-lg border border-primary/5 text-center flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-20 h-20 rounded-full overflow-hidden border border-primary/10 mb-4 bg-light-gray flex items-center justify-center">
                      <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-green bg-green/5 px-2 py-0.5 rounded-full mb-2">
                      {store.category}
                    </span>
                    <h3 className="text-base font-bold text-primary mb-1">{store.name}</h3>
                    <p className="text-xs text-primary/60 line-clamp-2 mb-4 leading-relaxed">
                      {store.description}
                    </p>
                  </div>
                  <div className="text-xs text-primary/50 border-t border-primary/5 pt-3">
                    <span className="block">Piso {store.floor} | Horário: {store.schedule}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA BANNERS / INVESTORS SECTION */}
        <section className="py-24 bg-gradient-to-b from-primary to-primary-dark text-white relative">
          <div className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-15" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80')" }}></div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-6 text-green">
              Faça Parte do Maior Centro Comercial de Homoíne
            </h2>
            <p className="text-base sm:text-lg text-white/80 font-light max-w-3xl mx-auto mb-10 leading-relaxed">
              Leve a sua marca para um espaço moderno, seguro e estrategicamente localizado. O Mirriam Mall oferece excelentes oportunidades para empresas, empreendedores e investidores que procuram crescer numa região em rápida expansão económica.
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
                      <p className="text-xs text-primary/60">Mirriam Mall, Homoíne, Província de Inhambane, Moçambique</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-light-gray border border-primary/5">
                    <Phone className="w-6 h-6 text-green" />
                    <div>
                      <h4 className="font-bold text-primary text-sm">Telefone e WhatsApp</h4>
                      <p className="text-xs text-primary/60">+258 84 123 4567 | +258 82 999 0000</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 rounded-lg bg-light-gray border border-primary/5">
                    <Mail className="w-6 h-6 text-green" />
                    <div>
                      <h4 className="font-bold text-primary text-sm">E-mail Oficial</h4>
                      <p className="text-xs text-primary/60">info@mirriammall.co.mz</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href="https://wa.me/258841234567"
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
                  title="Mirriam Mall Location Map"
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
