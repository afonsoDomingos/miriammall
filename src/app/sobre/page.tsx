'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
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
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import ImageWithLoader from '../../components/ImageWithLoader';
import { motion } from 'framer-motion';

export default function Sobre() {
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
      icon: Briefcase, 
      title: 'Escritórios', 
      desc: 'Espaços funcionais e silenciosos, ideais para sedes corporativas, consultórios e prestadores de serviços de todos os setores.' 
    },
    { 
      icon: Palmtree, 
      title: 'Restaurantes', 
      desc: 'Áreas preparadas para albergar operações de restauração, com infraestrutura adequada para extração de fumos e atendimento.' 
    },
    { 
      icon: Building, 
      title: 'Lojas', 
      desc: 'Montras amplas e de alta visibilidade, localizadas nos pontos de maior circulação e fluxo pedonal do shopping.' 
    },
    { 
      icon: Compass, 
      title: 'Outros Espaços', 
      desc: 'Soluções flexíveis e adaptáveis a novos conceitos comerciais, quiosques, agências bancárias e muito mais.' 
    }
  ];

  const values = ['Solidez', 'Qualidade', 'Transparência', 'Integridade', 'Segurança'];

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner Section */}
        <section className="relative bg-gradient-to-r from-primary-dark via-primary to-primary-dark py-24 text-white text-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-20 mix-blend-overlay" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80')" }} />
          {/* Decorative watermarks */}
          <Palmtree className="absolute -left-16 -bottom-16 w-64 h-64 text-green/10 pointer-events-none transform rotate-45" />
          <Palmtree className="absolute -right-16 -top-16 w-64 h-64 text-white/5 pointer-events-none transform -rotate-12" />

          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-bold block mb-3 flex items-center justify-center gap-1.5">
              <Sparkles className="w-4.5 h-4.5 text-green animate-pulse" /> Conheça a Nossa História
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold mb-4 tracking-tight">
              Quem Somos
            </h1>
            <div className="w-16 h-1 bg-green mx-auto mb-6 rounded-full" />
            <p className="text-white/80 text-sm sm:text-base md:text-lg font-light max-w-2xl mx-auto leading-relaxed">
              Descubra o propósito e o compromisso da Mirriam em impulsionar o comércio, serviços e bem-estar no coração de Homoíne.
            </p>
          </div>
        </section>

        {/* Intro Section */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <span className="text-green font-semibold uppercase tracking-wider text-xs block">Excelência Imobiliária</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-primary leading-tight">
                Dedicados à Gestão e Valorização de Espaços Comerciais
              </h2>
              <div className="space-y-4 text-primary/70 leading-relaxed text-sm sm:text-base">
                <p>
                  A <strong>Mirriam</strong> é uma empresa especializada no setor imobiliário, dedicada concretamente ao arrendamento de imóveis e apartamentos comerciais. Contamos com uma equipa altamente qualificada e apaixonada pela gestão imobiliária.
                </p>
                <p>
                  Estamos comprometidos em proporcionar uma experiência excecional aos nossos clientes. O nosso objetivo é garantir soluções funcionais, bem localizadas e alinhadas às exigências do mercado, contribuindo para o crescimento e eficiência das organizações que confiam nos nossos ativos.
                </p>
              </div>
              
              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/espacos"
                  className="bg-green hover:bg-green-light text-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-8 rounded shadow-md hover:shadow-green/20 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center"
                >
                  Ver Nossos Espaços
                </Link>
                <Link
                  href="/contato"
                  className="border border-primary/20 hover:border-primary hover:bg-primary/5 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-8 rounded hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center"
                >
                  Fale Connosco
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-2 bg-slate-50 border border-slate-200/60 rounded-2xl shadow-green-glow"
            >
              <div className="relative h-[420px] rounded-xl overflow-hidden group">
                <ImageWithLoader
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80"
                  alt="Gestão Imobiliária Mirriam"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent pointer-events-none" />
              </div>
            </motion.div>
          </div>
        </section>

        {/* Pillars Section (Mission, Vision, Values) */}
        <section className="py-24 bg-light-gray border-y border-slate-200/30 relative">
          <Palmtree className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 text-primary/5 pointer-events-none transform rotate-12" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
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
                className="bg-white p-8 rounded-2xl shadow-md border border-slate-100/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mb-6 group-hover:bg-green transition-all duration-300">
                    <Target className="w-6 h-6 text-green group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-4">Missão</h3>
                  <p className="text-primary/70 text-sm leading-relaxed">
                    Prestar serviços de excelência e qualidade, garantindo a total segurança e satisfação dos nossos clientes.
                  </p>
                </div>
                <div className="w-full h-1.5 bg-green/10 rounded-full mt-6 overflow-hidden">
                  <div className="w-full h-full bg-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </motion.div>

              {/* Vision Card */}
              <motion.div
                variants={cardVariants}
                className="bg-white p-8 rounded-2xl shadow-md border border-slate-100/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-green/10 flex items-center justify-center mb-6 group-hover:bg-green transition-all duration-300">
                    <Compass className="w-6 h-6 text-green group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-primary mb-4">Visão</h3>
                  <p className="text-primary/70 text-sm leading-relaxed">
                    O nosso propósito é transformar empreendimentos em ativos que impulsionam o desenvolvimento económico e social a nível territorial.
                  </p>
                </div>
                <div className="w-full h-1.5 bg-green/10 rounded-full mt-6 overflow-hidden">
                  <div className="w-full h-full bg-green transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
                </div>
              </motion.div>

              {/* Values Card */}
              <motion.div
                variants={cardVariants}
                className="bg-white p-8 rounded-2xl shadow-md border border-slate-100/60 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 group flex flex-col justify-between"
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

        {/* Services Section */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
              <div>
                <span className="text-green font-semibold uppercase tracking-wider text-xs block mb-2">Nossas Soluções</span>
                <h2 className="text-3xl font-serif font-bold text-primary mb-6">Nossos Serviços</h2>
                <div className="space-y-4 text-primary/70 text-sm sm:text-base leading-relaxed mb-8">
                  <p>
                    Oferecemos apartamentos e espaços diversificados disponíveis para arrendamento, perfeitamente adaptados para diferentes áreas de atuação comercial.
                  </p>
                  <p>
                    Na <strong>Mirriam</strong>, o arrendamento vai além da simples disponibilização de espaços. Trabalhamos na valorização contínua dos imóveis, assegurando condições adequadas de utilização, funcionalidade e alta competitividade.
                  </p>
                </div>
                <Link
                  href="/lojas"
                  className="inline-flex items-center gap-2 text-green hover:text-green-light font-bold uppercase text-xs sm:text-sm tracking-wider border-b-2 border-green pb-1 transition-colors"
                >
                  Conhecer Nossas Lojas <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
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
                      <p className="text-xs sm:text-sm text-primary/60 leading-relaxed">{srv.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Why Us & Target Audience */}
        <section className="py-24 bg-gradient-to-b from-light-gray to-white border-t border-slate-200/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Target Audience */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className="text-green font-semibold uppercase tracking-wider text-xs block mb-2">Para Quem Trabalhamos</span>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-4">Público-Alvo</h3>
                  <p className="text-primary/70 text-sm sm:text-base leading-relaxed">
                    Abrangemos todas as classes comerciais, entidades públicas e privadas, operadores comerciais, projetos em expansão, bem como grandes, médias e pequenas empresas que procuram fixar-se numa localização sólida e de prestígio.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-8 text-green text-xs font-bold uppercase tracking-wider">
                  <Users className="w-4 h-4" /> Solução ideal para qualquer escala comercial
                </div>
              </motion.div>

              {/* Why Us */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white p-8 rounded-2xl border border-slate-100 shadow-md flex flex-col justify-between"
              >
                <div>
                  <span className="text-green font-semibold uppercase tracking-wider text-xs block mb-2">Compromisso Mirriam</span>
                  <h3 className="font-serif text-2xl font-bold text-primary mb-4">Porquê Nós?</h3>
                  <p className="text-primary/70 text-sm sm:text-base leading-relaxed">
                    Fornecemos assistência integrada e personalizada ao cliente desde a identificação do espaço mais adequado ao seu segmento de negócio até à formalização do contrato de arrendamento e apoio pós-instalação.
                  </p>
                </div>
                <div className="flex items-center gap-2 mt-8 text-green text-xs font-bold uppercase tracking-wider">
                  <Award className="w-4 h-4" /> Suporte completo na sua expansão
                </div>
              </motion.div>
            </div>

            <div className="text-center mt-16 bg-gradient-to-r from-primary-dark to-primary p-12 rounded-2xl text-white shadow-xl max-w-4xl mx-auto relative overflow-hidden">
              <Palmtree className="absolute -right-12 -bottom-12 w-48 h-48 text-white/5 pointer-events-none transform -rotate-12" />
              <h3 className="font-serif text-2xl sm:text-3xl font-bold mb-4">Encontre connosco o lugar ideal para o crescimento do seu negócio.</h3>
              <p className="text-white/70 text-sm max-w-lg mx-auto mb-8 font-light">
                Descubra a diferença de trabalhar com uma equipa que valoriza o seu sucesso tanto quanto a infraestrutura comercial.
              </p>
              <Link
                href="/contato"
                className="bg-green hover:bg-green-light text-primary text-xs sm:text-sm font-bold uppercase tracking-wider py-3.5 px-8 rounded shadow-md transition-colors inline-block hover:-translate-y-0.5 active:translate-y-0"
              >
                Agendar Uma Consulta Comercial
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
