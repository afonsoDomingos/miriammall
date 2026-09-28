'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import InteractiveMap from '../../../components/InteractiveMap';
import { useDatabase } from '../../../context/DatabaseContext';
import { Building as BuildingType, Space } from '../../../utils/mockData';
import { ArrowLeft, Building2, Layers, Store, CheckCircle, Clock, AlertTriangle, Info } from 'lucide-react';
import Link from 'next/link';

export default function BuildingSpacesPage() {
  const { buildingId } = useParams();
  const router = useRouter();
  const { buildings, spaces, isLoaded } = useDatabase();
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const building = buildings?.find((b: BuildingType) => b.id === buildingId);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20 text-primary/60 text-sm">A carregar edifício...</div>
        <Footer />
      </div>
    );
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Edifício não encontrado</h2>
          <Link href="/sobre" className="text-green font-semibold flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Voltar para Sobre
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Get unique floors for this building
  const buildingSpaces = spaces.filter((s: Space) => s.buildingId === buildingId);
  const uniqueFloors = Array.from(new Set(buildingSpaces.map((s: Space) => s.floor))).sort((a, b) => a - b);

  // Filter spaces by selected floor
  const floorSpaces = selectedFloor !== null 
    ? buildingSpaces.filter((s: Space) => s.floor === selectedFloor)
    : [];

  const getStatusBadge = (status: Space['status']) => {
    switch (status) {
      case 'disponivel':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200">
            <CheckCircle className="w-3 h-3" /> Disponível
          </span>
        );
      case 'reservado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-600 border border-amber-200">
            <Clock className="w-3 h-3" /> Reservado
          </span>
        );
      case 'ocupado':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-600 border border-slate-200">
            <AlertTriangle className="w-3 h-3" /> Ocupado
          </span>
        );
      case 'em_construcao':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-50 text-orange-600 border border-orange-200">
            <AlertTriangle className="w-3 h-3" /> Em Construção
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-50 text-slate-600 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const getSpaceTypeLabel = (type: Space['spaceType']) => {
    const labels: Record<Space['spaceType'], string> = {
      loja: 'Loja',
      restaurante: 'Restaurante',
      escritorio: 'Escritório',
      quarto: 'Quarto',
      armazem: 'Armazém',
      ferragem: 'Ferragem',
      salao: 'Salão',
      sala_reunioes: 'Sala de Reuniões',
      refeitorio: 'Refeitório',
      outro: 'Outro'
    };
    return labels[type] || type;
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <Link
            href="/sobre"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-green mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Complexo
          </Link>

          {/* Building Header */}
          <div className="mb-8">
            <div className="flex items-start gap-4 mb-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Building2 className="w-8 h-8 text-green" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-2">
                  {building.name}
                </h1>
                <p className="text-green font-semibold text-sm">{building.subtitle}</p>
              </div>
            </div>
            <p className="text-primary/70 text-sm leading-relaxed mb-4">
              {building.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {building.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Floor Selection */}
          {selectedFloor === null ? (
            <div>
              <h2 className="text-xl sm:text-2xl font-serif font-bold text-primary mb-2">Edifício {building.order} - {building.subtitle}</h2>
              <p className="text-primary/60 text-sm mb-6">SELECIONE O PISO PARA VER AS IMAGENS</p>
              {uniqueFloors.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                  <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 text-sm">Este edifício ainda não tem espaços registados.</p>
                  <p className="text-slate-400 text-xs mt-2">Contacte a administração para mais informações.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                    {uniqueFloors.map((floor) => {
                      const floorSpaceCount = buildingSpaces.filter((s: Space) => s.floor === floor).length;
                      return (
                        <button
                          key={floor}
                          onClick={() => setSelectedFloor(floor)}
                          className="bg-white border-2 border-slate-200 hover:border-green rounded-xl overflow-hidden text-left transition-all duration-300 hover:shadow-lg group"
                        >
                          <div className="h-32 bg-primary-dark relative">
                            <img
                              src={building.image}
                              alt={`Piso ${floor}`}
                              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-3 left-3 right-3">
                              <div className="text-white font-bold text-lg">{floor}º Piso</div>
                              <div className="text-white/80 text-xs">{floorSpaceCount} imagem{floorSpaceCount !== 1 ? 's' : ''}</div>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* VER ESPAÇOS DISPONÍVEIS Button */}
                  <div className="text-center">
                    <Link
                      href="/espacos"
                      className="inline-block bg-green hover:bg-green-light text-primary font-bold uppercase tracking-wider py-3 px-8 rounded-lg transition-colors text-sm"
                    >
                      VER ESPAÇOS DISPONÍVEIS
                    </Link>
                  </div>
                </>
              )}

              {/* Interactive Map for all floors */}
              {buildingSpaces.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-serif font-bold text-primary mb-6">Planta Interactiva</h2>
                  <InteractiveMap buildingId={Array.isArray(buildingId) ? buildingId[0] : buildingId} />
                </div>
              )}
            </div>
          ) : (
            <div>
              {/* Floor Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => setSelectedFloor(null)}
                  className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-green transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Voltar aos Pisos
                </button>
                <h2 className="text-2xl font-serif font-bold text-primary">
                  Piso {selectedFloor}
                </h2>
              </div>

              {/* Spaces Grid */}
              {floorSpaces.length === 0 ? (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-8 text-center">
                  <Info className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600 text-sm">Este piso ainda não tem espaços registados.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {floorSpaces.map((space) => (
                    <div
                      key={space.id}
                      className="bg-white rounded-xl overflow-hidden border border-slate-200 shadow-md hover:shadow-lg transition-all duration-300"
                    >
                      <div className="h-48 relative bg-primary-dark">
                        <img
                          src={space.image}
                          alt={space.number}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-primary/80 backdrop-blur-sm px-2.5 py-0.5 rounded text-[10px] text-green font-bold uppercase tracking-wider">
                          {getSpaceTypeLabel(space.spaceType)}
                        </div>
                        <div className="absolute top-4 right-4">
                          {getStatusBadge(space.status)}
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-serif text-lg font-bold text-primary">{space.number}</h3>
                          <span className="text-xs font-semibold text-primary/50">{space.area} m²</span>
                        </div>
                        <p className="text-primary/70 text-xs line-clamp-2 mb-4 leading-relaxed">
                          {space.description}
                        </p>
                        <div className="text-xs text-green font-bold uppercase tracking-wider mb-4">
                          Valor: {space.price}
                        </div>
                        <div className="flex gap-2">
                          <Link
                            href={`/espacos/${space.id}`}
                            className="flex-1 text-center bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-colors"
                          >
                            Detalhes
                          </Link>
                          {space.status === 'disponivel' && (
                            <Link
                              href={`/contato?espaco=${space.number}`}
                              className="flex-1 text-center bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-colors"
                            >
                              Arrendar
                            </Link>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
