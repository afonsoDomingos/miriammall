'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Phone, Mail, MapPin, MessageCircle, CheckCircle } from 'lucide-react';

function ContactFormContent() {
  const searchParams = useSearchParams();
  const { addRentalRequest } = useDatabase();

  const [formData, setFormData] = useState({
    companyName: '',
    contactName: '',
    phone: '',
    whatsapp: '',
    email: '',
    businessType: '',
    requestedArea: '',
    message: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const spaceParam = searchParams?.get('espaco');
    if (spaceParam) {
      setFormData((prev) => ({ ...prev, requestedArea: spaceParam }));
    }
  }, [searchParams]);

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
      requestedArea: formData.requestedArea || 'Geral / Outro',
      message: formData.message
    });
    setIsSubmitted(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Contact info and Map */}
      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Informações de Contacto</h2>
          <p className="text-primary/70 text-sm leading-relaxed mb-6">
            A equipa de gestão do Miriam Mall está sempre ao seu dispor. Contacte-nos pelos canais tradicionais ou visite-nos diretamente em Homoíne.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg bg-light-gray border border-primary/5">
            <MapPin className="w-6 h-6 text-green" />
            <div>
              <h4 className="font-bold text-primary text-sm">Localização</h4>
              <p className="text-xs text-primary/60">Miriam Mall, Distrito de Homoíne, Província de Inhambane, Moçambique</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-light-gray border border-primary/5">
            <Phone className="w-6 h-6 text-green" />
            <div>
              <h4 className="font-bold text-primary text-sm">Telemóvel & WhatsApp</h4>
              <p className="text-xs text-primary/60">+258 86 554 3026</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-lg bg-light-gray border border-primary/5">
            <Mail className="w-6 h-6 text-green" />
            <div>
              <h4 className="font-bold text-primary text-sm">E-mail Comercial</h4>
              <p className="text-xs text-primary/60">info@miriammall.co.mz</p>
            </div>
          </div>
        </div>

        {/* WhatsApp direct CTA */}
        <div className="p-6 rounded-lg bg-[#25D366]/5 border border-[#25D366]/20 flex items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-[#25D366] text-sm">Atendimento Via WhatsApp</h4>
            <p className="text-xs text-primary/60">Fale com um comercial de forma rápida e direta.</p>
          </div>
          <a
            href="https://wa.me/258865543026"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] hover:bg-[#20ba56] text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded flex items-center gap-1.5 transition-colors shrink-0"
          >
            <MessageCircle className="w-4 h-4" /> Conversar
          </a>
        </div>

        {/* Map iframe */}
        <div className="h-[250px] rounded-lg overflow-hidden border border-primary/10 shadow-sm relative">
          <iframe
            title="Miriam Mall Location Map Page"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14541.776092004245!2d35.10903333333333!3d-24.16875!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1edd376e1a067a21%3A0xe5a3c2de30f5a3bd!2zSG9tb8OObmUsIE1vY2FtYmlxdWU!5e0!3m2!1spt!2spt!4v1700000000000!5m2!1spt!2spt"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-light-gray p-8 rounded-xl border border-green/15 shadow-md">
        <h3 className="font-serif text-2xl text-primary font-bold mb-2">Solicitação de Informação / Espaço</h3>
        <p className="text-xs text-primary/60 mb-6">
          Preencha os campos abaixo. Responderemos nas próximas 24 horas úteis.
        </p>

        {isSubmitted ? (
          <div className="bg-emerald-50 text-emerald-800 p-8 rounded-lg border border-emerald-200 text-center space-y-4">
            <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-lg">Candidatura Registada!</h4>
            <p className="text-xs leading-relaxed">
              Obrigado pelo seu contacto. Os seus dados foram submetidos com sucesso. A equipa comercial do Miriam Mall entrará em contacto muito brevemente.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="w-full bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
            >
              Enviar Outra Mensagem
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                Nome do Responsável / Interessado *
              </label>
              <input
                type="text"
                name="contactName"
                required
                placeholder="Ex: Clara Manhiça"
                value={formData.contactName}
                onChange={handleInputChange}
                className="w-full bg-white border border-primary/10 rounded px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-green"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                Nome da Empresa (se aplicável)
              </label>
              <input
                type="text"
                name="companyName"
                placeholder="Ex: Clara Salão de Beleza"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full bg-white border border-primary/10 rounded px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-green"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                  Telefone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Ex: +258 84 999 9999"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-primary/10 rounded px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-green"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  name="whatsapp"
                  placeholder="Ex: +258 84 999 9999"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-primary/10 rounded px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-green"
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
                placeholder="Ex: clara.manhica@gmail.com"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full bg-white border border-primary/10 rounded px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-green"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                  Tipo de Negócio / Atividade *
                </label>
                <input
                  type="text"
                  name="businessType"
                  required
                  placeholder="Ex: Beleza / Calçado / Serviços"
                  value={formData.businessType}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-primary/10 rounded px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-green"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                  Espaço ou Área Pretendida
                </label>
                <input
                  type="text"
                  name="requestedArea"
                  placeholder="Ex: Loja 101 ou 50m²"
                  value={formData.requestedArea}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-primary/10 rounded px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-green"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-primary/70 mb-1.5">
                Sua Mensagem
              </label>
              <textarea
                name="message"
                rows={5}
                placeholder="Detalhe a sua proposta, dúvidas ou requisitos adicionais para a loja..."
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-white border border-primary/10 rounded px-3.5 py-2.5 text-xs text-primary focus:outline-none focus:border-green resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-green hover:bg-green-light text-primary text-xs font-bold uppercase tracking-wider py-3.5 rounded transition-colors mt-2"
            >
              Solicitar Contacto
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default function Contato() {
  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-16 text-white text-center">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Fale Connosco</span>
            <h1 className="text-4xl font-serif font-bold mb-4">Contactos</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Tem alguma dúvida, proposta comercial ou candidatura de arrendamento? Envie-nos uma mensagem diretamente por aqui.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div className="text-center py-12">A carregar formulário...</div>}>
            <ContactFormContent />
          </Suspense>
        </section>
      </main>

      <Footer />
    </>
  );
}
