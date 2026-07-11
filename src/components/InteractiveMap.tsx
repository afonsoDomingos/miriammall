'use client';

import React, { useState } from 'react';
import { Space } from '../utils/mockData';
import { useDatabase } from '../context/DatabaseContext';
import { Info, HelpCircle, X, CheckCircle, Clock, AlertTriangle, Palmtree } from 'lucide-react';
import Link from 'next/link';

export default function InteractiveMap() {
  const { spaces } = useDatabase();
  const [selectedFloor, setSelectedFloor] = useState<number>(0);
  const [hoveredSpace, setHoveredSpace] = useState<Space | null>(null);
  const [selectedSpace, setSelectedSpace] = useState<Space | null>(null);

  // Filter spaces by floor
  const floorSpaces = spaces.filter((s) => s.floor === selectedFloor);

  // Helper to get status colors
  const getStatusColor = (status: Space['status'], isActive: boolean) => {
    switch (status) {
      case 'disponivel':
        return isActive ? 'fill-emerald-500/20 stroke-emerald-500' : 'fill-emerald-500/10 stroke-emerald-500/60';
      case 'reservado':
        return isActive ? 'fill-amber-500/35 stroke-amber-500' : 'fill-amber-500/15 stroke-amber-500/60';
      case 'ocupado':
        return isActive ? 'fill-primary/60 stroke-primary-light' : 'fill-primary/45 stroke-primary-light/50';
      default:
        return 'fill-slate-100 stroke-slate-300';
    }
  };

  // Coordinates mapping for stores (mock SVG representation)
  // We represent them as rectangles in a Grid layout
  const getSpaceCoordinates = (number: string) => {
    // Return x, y, width, height for SVG rectangles
    switch (number) {
      // Floor 0
      case 'Loja 101': return { x: 50, y: 50, w: 100, h: 100 };
      case 'Loja 102': return { x: 160, y: 50, w: 120, h: 100 };
      case 'Loja 103': return { x: 290, y: 50, w: 220, h: 120 }; // Large Anchor Space
      case 'Loja 104': return { x: 520, y: 50, w: 110, h: 100 };
      case 'Loja 105': return { x: 640, y: 50, w: 90, h: 100 };
      // Floor 1
      case 'Loja 201': return { x: 50, y: 50, w: 140, h: 100 };
      case 'Loja 202': return { x: 200, y: 50, w: 150, h: 100 };
      case 'Loja 203': return { x: 360, y: 50, w: 200, h: 100 }; // Large Food Space
      case 'Loja 204': return { x: 570, y: 50, w: 160, h: 100 };
      default: return { x: 50, y: 50, w: 100, h: 100 };
    }
  };

  return (
    <div className="bg-slate-50/50 p-6 rounded-xl">
      {/* Floor Selector */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setSelectedFloor(0)}
          className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 ${
            selectedFloor === 0
              ? 'bg-primary text-green border border-green'
              : 'bg-white text-primary border border-primary/10 hover:border-green/50'
          }`}
        >
          Piso 0 (Térreo)
        </button>
        <button
          onClick={() => setSelectedFloor(1)}
          className={`px-6 py-2 rounded-full text-sm font-semibold tracking-wider transition-all duration-300 ${
            selectedFloor === 1
              ? 'bg-primary text-green border border-green'
              : 'bg-white text-primary border border-primary/10 hover:border-green/50'
          }`}
        >
          Piso 1 (Primeiro Andar)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* SVG Map (Left 3 cols) */}
        <div className="lg:col-span-3 bg-white p-4 rounded-lg border border-primary/5 flex flex-col items-center justify-center relative min-h-[400px]">
          <h3 className="text-center font-serif text-lg text-primary mb-4 flex items-center justify-center gap-1.5">
            <Palmtree className="w-5 h-5 text-green" /> Planta Interativa - Piso {selectedFloor}
          </h3>

          <div className="w-full overflow-x-auto max-w-full">
            <svg
              viewBox="0 0 800 300"
              className="w-full min-w-[650px] h-auto select-none"
            >
              {/* Grid lines for background decoration */}
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Mall Corridor/Walkway (Decor) */}
              <rect x="30" y="170" width="740" height="80" rx="10" fill="#f8fafc" stroke="#e2e8f0" strokeDasharray="5,5" />
              <text x="400" y="215" fill="#94a3b8" fontSize="14" textAnchor="middle" letterSpacing="3">
                CORREDOR PRINCIPAL DO SHOPPING
              </text>

              {/* Entrance Gate */}
              {selectedFloor === 0 && (
                <>
                  <path d="M 400 290 L 370 260 M 400 290 L 430 260" fill="none" stroke="#10B981" strokeWidth="3" />
                  <text x="400" y="280" fill="#10B981" fontSize="10" textAnchor="middle" fontWeight="bold">
                    ENTRADA PRINCIPAL
                  </text>
                </>
              )}

              {/* Render Spaces */}
              {floorSpaces.map((space) => {
                const { x, y, w, h } = getSpaceCoordinates(space.number);
                const isHovered = hoveredSpace?.id === space.id;
                const isSelected = selectedSpace?.id === space.id;

                return (
                  <g
                    key={space.id}
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredSpace(space)}
                    onMouseLeave={() => setHoveredSpace(null)}
                    onClick={() => setSelectedSpace(space)}
                  >
                    {/* Outer glow for hovered/selected spaces */}
                    {(isHovered || isSelected) && (
                      <rect
                        x={x - 4}
                        y={y - 4}
                        width={w + 8}
                        height={h + 8}
                        rx="8"
                        fill="none"
                        stroke="#10B981"
                        strokeWidth="2"
                        strokeOpacity="0.4"
                      />
                    )}

                    {/* Main space block */}
                    <rect
                      x={x}
                      y={y}
                      width={w}
                      height={h}
                      rx="4"
                      className={`transition-all duration-300 ${getStatusColor(space.status, isHovered || isSelected)}`}
                      strokeWidth="2"
                    />

                    {/* Label inside */}
                    <text
                      x={x + w / 2}
                      y={y + h / 2 - 5}
                      textAnchor="middle"
                      className={`text-xs font-semibold ${
                        space.status === 'ocupado' ? 'fill-white' : 'fill-primary'
                      }`}
                    >
                      {space.number}
                    </text>

                    {/* Sub-label showing area */}
                    <text
                      x={x + w / 2}
                      y={y + h / 2 + 15}
                      textAnchor="middle"
                      className={`text-[10px] opacity-75 ${
                        space.status === 'ocupado' ? 'fill-white/80' : 'fill-primary/70'
                      }`}
                    >
                      {space.area} m²
                    </text>

                    {/* Status Badge text */}
                    <text
                      x={x + w / 2}
                      y={y + h - 12}
                      textAnchor="middle"
                      className={`text-[8px] font-bold uppercase tracking-wider ${
                        space.status === 'disponivel'
                          ? 'fill-emerald-600'
                          : space.status === 'reservado'
                          ? 'fill-amber-600'
                          : 'fill-white/50'
                      }`}
                    >
                      {space.status}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* SVG Tooltip */}
          {hoveredSpace && (
            <div
              className="absolute pointer-events-none bg-primary text-white p-3 rounded-lg border border-green/30 shadow-xl z-10 w-48 text-xs"
              style={{
                left: `${Math.min(
                  550,
                  Math.max(50, getSpaceCoordinates(hoveredSpace.number).x + getSpaceCoordinates(hoveredSpace.number).w / 2 - 96)
                )}px`,
                top: `${getSpaceCoordinates(hoveredSpace.number).y - 65}px`,
              }}
            >
              <div className="font-bold flex justify-between border-b border-white/10 pb-1 mb-1">
                <span>{hoveredSpace.number}</span>
                <span className="text-green capitalize">{hoveredSpace.status}</span>
              </div>
              <div>Área: {hoveredSpace.area} m²</div>
              <div className="text-white/70 italic mt-1">Clique para ver mais</div>
            </div>
          )}
        </div>

        {/* Info & Details Sidebar (Right 1 col) */}
        <div className="bg-white p-6 rounded-lg border border-primary/5 flex flex-col justify-between">
          <div>
            <h4 className="font-serif text-lg text-primary border-b border-primary/10 pb-2 mb-4">
              Legenda do Mapa
            </h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded bg-emerald-500/10 border border-emerald-500 block" />
                <div className="text-sm">
                  <span className="font-semibold text-emerald-600">Disponível</span>
                  <p className="text-xs text-primary/60">Livre para arrendamento imediato.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded bg-amber-500/15 border border-amber-500 block" />
                <div className="text-sm">
                  <span className="font-semibold text-amber-600">Reservado</span>
                  <p className="text-xs text-primary/60">Em negociação avançada.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="w-4 h-4 rounded bg-primary/45 border border-primary-light block" />
                <div className="text-sm">
                  <span className="font-semibold text-primary">Ocupado</span>
                  <p className="text-xs text-primary/60">Loja ativa em funcionamento.</p>
                </div>
              </div>
            </div>

            <div className="bg-light-gray p-4 rounded border border-primary/5 mb-4 text-xs leading-relaxed text-primary/70">
              <HelpCircle className="w-4 h-4 text-green inline mr-1 mb-0.5" />
              Selecione um espaço no mapa ou alterne o piso para explorar a planta detalhada do shopping.
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/espacos"
              className="inline-block w-full text-center text-xs tracking-wider uppercase font-semibold bg-green hover:bg-green-light text-primary py-2.5 rounded transition-all duration-300"
            >
              Ver Lista de Espaços
            </Link>
          </div>
        </div>
      </div>

      {/* Modal on Click Space */}
      {selectedSpace && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden border border-green/20 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setSelectedSpace(null)}
              className="absolute top-4 right-4 z-20 text-slate-700 hover:text-green bg-white/90 hover:bg-white w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md focus:outline-none"
              aria-label="Fechar"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Image */}
            <div className="h-48 relative bg-primary-dark">
              <img
                src={selectedSpace.image}
                alt={selectedSpace.number}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute bottom-4 left-4 bg-primary/80 backdrop-blur-md px-3 py-1 rounded text-green text-xs font-bold uppercase tracking-wider">
                Piso {selectedSpace.floor}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-serif text-2xl text-primary font-bold">{selectedSpace.number}</h3>
                  <p className="text-xs text-primary/60">Área útil: {selectedSpace.area} m²</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    selectedSpace.status === 'disponivel'
                      ? 'bg-emerald-50 text-emerald-600'
                      : selectedSpace.status === 'reservado'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {selectedSpace.status === 'disponivel' && <CheckCircle className="w-3.5 h-3.5" />}
                  {selectedSpace.status === 'reservado' && <Clock className="w-3.5 h-3.5" />}
                  {selectedSpace.status === 'ocupado' && <AlertTriangle className="w-3.5 h-3.5" />}
                  {selectedSpace.status}
                </span>
              </div>

              <p className="text-sm text-primary/70 mb-6 leading-relaxed">
                {selectedSpace.description}
              </p>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-green mb-2">Infraestruturas Disponíveis</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedSpace.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-primary/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-green" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/espacos/${selectedSpace.id}`}
                  onClick={() => setSelectedSpace(null)}
                  className="flex-1 text-center bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
                >
                  Ver Detalhes do Espaço
                </Link>
                {selectedSpace.status !== 'ocupado' && (
                  <Link
                    href={`/contato?espaco=${selectedSpace.number}`}
                    onClick={() => setSelectedSpace(null)}
                    className="flex-1 text-center bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
                  >
                    Solicitar Arrendamento
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
