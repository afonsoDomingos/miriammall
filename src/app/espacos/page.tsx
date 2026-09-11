'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import InteractiveMap from '../../components/InteractiveMap';
import { useDatabase } from '../../context/DatabaseContext';
import { Filter, Eye, CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

import { Space } from '../../utils/mockData';

const defaultSpaces: Space[] = [
  {
    id: 'space-1',
    number: 'Loja 101 (Âncora Principal)',
    floor: 0,
    area: 120,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço premium com montra panorâmica no piso térreo, ideal para supermercado, loja âncora ou grande marca de moda.',
    amenities: ['Montra de Alta Visibilidade', 'Climatização Central', 'Ponto de Água e Esgoto', 'Acesso Facilitado para Cargas'],
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-2',
    number: 'Loja 102 (Comércio & Retalho)',
    floor: 0,
    area: 55,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Excelente loja para boutique de vestuário, calçado, perfumaria ou ótica localizada no corredor principal de alto fluxo pedonal.',
    amenities: ['Iluminação LED Moderna', 'Segurança 24h', 'Ligação Fibra Ótica'],
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-3',
    number: 'Loja 201 (Escritórios & Serviços)',
    floor: 1,
    area: 75,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço corporativo modular no 1º andar, perfeito para agência de seguros, consultoria, advocacia ou serviços de saúde.',
    amenities: ['Ambiente Executivo Silencioso', 'Piso Técnico', 'Portaria Executiva', 'Elevador Panorâmico'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-4',
    number: 'Loja 202 (Praça de Restauração)',
    floor: 1,
    area: 85,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Unidade com conduta de extração de fumos e água, preparada para restaurante, pizzaria, hamburgueria ou café.',
    amenities: ['Extração de Fumos', 'Gás Canalizado', 'Área de Mesas Partilhada', 'Ponto de Água'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-5',
    number: 'Loja 103 (Farmácia / Bem-Estar)',
    floor: 0,
    area: 60,
    status: 'reservado',
    price: 'Sob Consulta',
    description: 'Posicionada junto à entrada principal com fácil acessibilidade para clientes e estacionamento.',
    amenities: ['Acesso Térreo Direto', 'Montra Envidraçada', 'Climatização'],
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  },
  {
    id: 'space-6',
    number: 'Loja 203 (Tecnologia & Telecom)',
    floor: 1,
    area: 45,
    status: 'disponivel',
    price: 'Sob Consulta',
    description: 'Espaço compacto e eficiente para atendimento ao público, loja de telecomunicações, acessórios ou eletrónica.',
    amenities: ['Fibra Ótica', 'Segurança 24h', 'Sistema Anti-incêndio'],
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=800&q=80',
    blueprint: '/blueprints/default.png'
  }
];

export default function Espacos() {
  const { spaces, isLoaded } = useDatabase();
  const [filterFloor, setFilterFloor] = useState<string>('todos');
  const [filterStatus, setFilterStatus] = useState<string>('todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const allSpaces = spaces && spaces.length > 0 ? spaces : defaultSpaces;

  const filteredSpaces = allSpaces.filter((space) => {
    const matchesFloor =
      filterFloor === 'todos' || space.floor.toString() === filterFloor;
    const matchesStatus =
      filterStatus === 'todos' || space.status === filterStatus;
    const matchesSearch =
      space.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFloor && matchesStatus && matchesSearch;
  });

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-16 text-white text-center">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Investimento</span>
            <h1 className="text-2xl sm:text-4xl font-serif font-bold mb-4">Espaços Disponíveis para Arrendamento</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Descubra o local ideal para o seu negócio no Miriam Mall. Navegue pela planta interativa ou explore a listagem detalhada de lojas abaixo.
            </p>
          </div>
        </section>

        {/* Interactive Map Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold text-primary mb-2 text-center">Planta Interativa do Shopping</h2>
            <p className="text-primary/60 text-sm text-center mb-8">
              Explore visualmente os pisos e clique nos espaços para ver os detalhes e solicitar arrendamento.
            </p>
            <InteractiveMap />
          </div>

          <hr className="border-primary/5 my-16" />

          {/* Directory Listings */}
          <div id="listagem">
            <h2 className="text-2xl font-serif font-bold text-primary mb-8">Catálogo de Espaços Comerciais</h2>

            {/* Filter controls */}
            <div className="bg-light-gray p-4 sm:p-6 rounded-xl border border-primary/5 mb-8 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-xs font-bold text-primary/70 uppercase">
                  <Filter className="w-4 h-4 text-green" /> Filtrar Por:
                </div>
                {/* Floor Filter */}
                <select
                  value={filterFloor}
                  onChange={(e) => setFilterFloor(e.target.value)}
                  className="bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary/80 focus:outline-none focus:border-green"
                >
                  <option value="todos">Todos os Pisos</option>
                  <option value="0">Piso 0 (Térreo)</option>
                  <option value="1">Piso 1 (1º Andar)</option>
                </select>

                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary/80 focus:outline-none focus:border-green"
                >
                  <option value="todos">Todos os Estados</option>
                  <option value="disponivel">Disponível</option>
                  <option value="reservado">Reservado</option>
                  <option value="ocupado">Ocupado</option>
                </select>
              </div>

              {/* Search Box */}
              <div className="w-full md:w-64">
                <input
                  type="text"
                  placeholder="Pesquisar loja..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary/80 focus:outline-none focus:border-green"
                />
              </div>
            </div>

            {/* Grid of Spaces */}
            {!isLoaded ? (
              <div className="text-center py-12 text-primary/60 text-sm">A carregar espaços...</div>
            ) : filteredSpaces.length === 0 ? (
              <div className="text-center py-12 text-primary/60 text-sm border border-dashed border-primary/10 rounded-lg">
                Nenhum espaço comercial encontrado com os filtros selecionados.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {filteredSpaces.map((space) => (
                  <div
                    key={space.id}
                    className="bg-white rounded-xl overflow-hidden border border-primary/5 shadow-md flex flex-col justify-between hover:shadow-lg transition-all duration-300"
                  >
                    <div>
                      <div className="h-48 relative bg-primary-dark">
                        <img src={space.image} alt={space.number} className="w-full h-full object-cover" />
                        <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] text-green font-bold uppercase tracking-wider">
                          Piso {space.floor}
                        </div>
                        <span
                          className={`absolute top-4 right-4 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 ${
                            space.status === 'disponivel'
                              ? 'bg-emerald-500 text-white'
                              : space.status === 'reservado'
                              ? 'bg-amber-500 text-white'
                              : 'bg-slate-500 text-white'
                          }`}
                        >
                          {space.status === 'disponivel' && <CheckCircle className="w-3.5 h-3.5" />}
                          {space.status === 'reservado' && <Clock className="w-3.5 h-3.5" />}
                          {space.status === 'ocupado' && <AlertTriangle className="w-3.5 h-3.5" />}
                          {space.status}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-2">
                          <h3 className="font-serif text-xl font-bold text-primary">{space.number}</h3>
                          <span className="text-xs font-semibold text-primary/50">{space.area} m²</span>
                        </div>
                        <p className="text-primary/70 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                          {space.description}
                        </p>
                        <div className="text-xs text-green font-bold uppercase tracking-wider">
                          Valor: {space.price}
                        </div>
                      </div>
                    </div>
                    <div className="px-6 pb-6 pt-2 flex gap-4">
                      <Link
                        href={`/espacos/${space.id}`}
                        className="flex-1 text-center bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-colors flex items-center justify-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> Detalhes
                      </Link>
                      {space.status !== 'ocupado' ? (
                        <Link
                          href={`/contato?espaco=${space.number}`}
                          className="flex-1 text-center bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-colors"
                        >
                          Arrendar
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="flex-1 text-center bg-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider py-2.5 rounded cursor-not-allowed"
                        >
                          Indisponível
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
