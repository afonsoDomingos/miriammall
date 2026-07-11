'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useDatabase } from '../../../context/DatabaseContext';
import { ArrowLeft, CheckCircle, Phone, Mail, Building, Layout, Layers, ShieldCheck, Check } from 'lucide-react';
import Link from 'next/link';

export default function EspacoDetalhe() {
  const { id } = useParams();
  const router = useRouter();
  const { spaces, addRentalRequest, isLoaded } = useDatabase();

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    whatsapp: '',
    email: '',
    businessType: '',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);

  const space = spaces.find((s) => s.id === id);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20 text-primary/60 text-sm">A carregar detalhes do espaço...</div>
        <Footer />
      </div>
    );
  }

  if (!space) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20">
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Espaço não encontrado</h2>
          <Link href="/espacos" className="text-green font-semibold flex items-center justify-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Voltar para Espaços
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRentalRequest({
      companyName: formData.companyName,
      contactName: formData.contactName,
      phone: formData.phone,
      whatsapp: formData.whatsapp,
      email: formData.email,
      businessType: formData.businessType,
      requestedArea: `${space.number} (${space.area}m²)`,
      message: formData.message
    });
    setIsSubmitted(true);
  };

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back button */}
          <Link
            href="/espacos"
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-green mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para Espaços
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Content (2 cols) */}
            <div className="lg:col-span-2 space-y-8">
              {/* Space Title & Status */}
              <div className="flex flex-wrap justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-bold text-primary mb-1">
                    {space.number}
                  </h1>
                  <p className="text-xs uppercase tracking-wider font-semibold text-primary/50">
                    Piso {space.floor} | Espaço Comercial
                  </p>
                </div>
                <span
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${
                    space.status === 'disponivel'
                      ? 'bg-emerald-50 text-emerald-600'
                      : space.status === 'reservado'
                      ? 'bg-amber-50 text-amber-600'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${
                    space.status === 'disponivel'
                      ? 'bg-emerald-500'
                      : space.status === 'reservado'
                      ? 'bg-amber-500'
                      : 'bg-slate-500'
                  }`} />
                  {space.status}
                </span>
              </div>

              {/* Main Image */}
              <div className="h-[400px] rounded-xl overflow-hidden border border-green/10 green-glow relative">
                <img
                  src={space.image}
                  alt={space.number}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-primary">Descrição do Espaço</h3>
                <p className="text-primary/75 text-sm sm:text-base leading-relaxed">
                  {space.description}
                </p>
              </div>

              {/* Infrastructure */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-primary">Infraestrutura e Condições</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {space.amenities.map((amenity, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 p-3 rounded-lg bg-light-gray border border-primary/5 text-sm text-primary/80"
                    >
                      <ShieldCheck className="w-5 h-5 text-green shrink-0" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floor Blueprint / Layout Schematics (SVG mock) */}
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-bold text-primary">Planta e Disposição</h3>
                <p className="text-primary/60 text-xs sm:text-sm">
                  Esquema ilustrativo das dimensões do espaço. A disposição interna das divisões pode ser customizada conforme a necessidade do inquilino.
                </p>
                <div className="bg-light-gray rounded-xl p-8 border border-primary/5 flex items-center justify-center min-h-[250px]">
                  {/* Styled SVG Blueprint */}
                  <svg viewBox="0 0 400 200" className="w-full max-w-md h-auto select-none bg-white border border-primary/10 rounded shadow-inner">
                    {/* Grid lines */}
                    <defs>
                      <pattern id="blueprint-grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#blueprint-grid)" />
                    
                    {/* Walls */}
                    <rect x="40" y="30" width="320" height="140" fill="none" stroke="#0B1F3A" strokeWidth="4" />
                    
                    {/* Glass Window/Storefront */}
                    <line x1="80" y1="170" x2="320" y2="170" stroke="#10B981" strokeWidth="6" />
                    <text x="200" y="185" fill="#10B981" fontSize="10" textAnchor="middle" fontWeight="bold">
                      FACHADA ENVIDRAÇADA / VITRINE
                    </text>
                    
                    {/* Doorway */}
                    <path d="M 40 170 Q 60 170 60 150" fill="none" stroke="#0B1F3A" strokeWidth="2" strokeDasharray="2,2" />
                    <line x1="40" y1="170" x2="40" y2="140" stroke="#fff" strokeWidth="6" />
                    
                    {/* Dimensions details */}
                    <text x="200" y="100" fill="#0B1F3A" fontSize="14" fontWeight="bold" textAnchor="middle">
                      ÁREA ÚTIL: {space.area} m²
                    </text>
                    <text x="200" y="120" fill="#0B1F3A" fontSize="10" textAnchor="middle" opacity="0.6">
                      Piso {space.floor} - {space.number}
                    </text>

                    {/* Technical references */}
                    <line x1="20" y1="30" x2="20" y2="170" stroke="#94a3b8" strokeWidth="1" />
                    <text x="15" y="105" fill="#94a3b8" fontSize="8" transform="rotate(-90 15 105)" textAnchor="middle">
                      Altura: Aprox. 3.8m
                    </text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column - Rental Form (1 col) */}
            <div className="bg-light-gray p-6 rounded-xl border border-green/20 shadow-lg h-fit">
              <h3 className="font-serif text-2xl text-primary font-bold mb-2">Solicitar Arrendamento</h3>
              <p className="text-xs text-primary/60 mb-6">
                Preencha os dados abaixo. A nossa equipa comercial entrará em contacto com as condições financeiras e agendamento de visita.
              </p>

              {isSubmitted ? (
                <div className="bg-emerald-50 text-emerald-800 p-6 rounded-lg border border-emerald-200 text-center space-y-4">
                  <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-lg">Pedido Submetido!</h4>
                  <p className="text-xs leading-relaxed">
                    Agradecemos o seu interesse no Miriam Mall. O seu pedido de contacto foi registado e a nossa equipa entrará em contacto muito brevemente.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded transition-colors"
                  >
                    Submeter Novo Pedido
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                      Nome da Empresa / Negócio *
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      required
                      placeholder="Ex: Boutique Elegance"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary focus:outline-none focus:border-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                      Nome do Responsável *
                    </label>
                    <input
                      type="text"
                      name="contactName"
                      required
                      placeholder="Ex: João Mondlane"
                      value={formData.contactName}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary focus:outline-none focus:border-green"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        placeholder="Ex: +258 84..."
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary focus:outline-none focus:border-green"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                        WhatsApp
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        placeholder="Ex: +258 84..."
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        className="w-full bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary focus:outline-none focus:border-green"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="Ex: contacto@empresa.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary focus:outline-none focus:border-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                      Tipo de Atividade / Ramo *
                    </label>
                    <input
                      type="text"
                      name="businessType"
                      required
                      placeholder="Ex: Vestuário / Restauração / Telecom"
                      value={formData.businessType}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary focus:outline-none focus:border-green"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                      Mensagem / Requisitos Especiais
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      placeholder="Indique as suas necessidades..."
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-white border border-primary/10 rounded px-3 py-2 text-xs text-primary focus:outline-none focus:border-green resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors mt-2"
                  >
                    Solicitar Contacto
                  </button>
                </form>
              )}

              {/* Physical specifications card */}
              <div className="mt-8 border-t border-primary/5 pt-6 space-y-3">
                <h4 className="text-xs font-bold uppercase text-primary/70 mb-2">Especificações Rápidas</h4>
                <div className="flex justify-between text-xs text-primary/70">
                  <span className="flex items-center gap-1"><Building className="w-3.5 h-3.5 text-green" /> Espaço:</span>
                  <span className="font-bold">{space.number}</span>
                </div>
                <div className="flex justify-between text-xs text-primary/70">
                  <span className="flex items-center gap-1"><Layers className="w-3.5 h-3.5 text-green" /> Piso:</span>
                  <span className="font-bold">{space.floor === 0 ? 'Piso 0 (Térreo)' : 'Piso 1'}</span>
                </div>
                <div className="flex justify-between text-xs text-primary/70">
                  <span className="flex items-center gap-1"><Layout className="w-3.5 h-3.5 text-green" /> Área Útil:</span>
                  <span className="font-bold">{space.area} m²</span>
                </div>
                <div className="flex justify-between text-xs text-primary/70">
                  <span className="flex items-center gap-1"><Check className="w-3.5 h-3.5 text-green" /> Preço:</span>
                  <span className="font-bold text-green">{space.price}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
