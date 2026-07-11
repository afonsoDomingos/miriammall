'use client';

import React, { useState } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';
import { Banner } from '../../../utils/mockData';
import { Plus, Edit, Trash2, X, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import ImageUpload from '../../../components/ImageUpload';

export default function AdminBanners() {
  const { banners, addBanner, updateBanner, deleteBanner, setActiveBanner, isLoaded } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [image, setImage] = useState('');
  const [buttonText1, setButtonText1] = useState('Explorar');
  const [buttonLink1, setButtonLink1] = useState('/');
  const [buttonText2, setButtonText2] = useState('Contacto');
  const [buttonLink2, setButtonLink2] = useState('/contato');

  const openAddModal = () => {
    setEditingBanner(null);
    setTitle('');
    setSubtitle('');
    setImage('https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80');
    setButtonText1('Explorar o Shopping');
    setButtonLink1('/lojas');
    setButtonText2('Arrendar um Espaço');
    setButtonLink2('/espacos');
    setIsModalOpen(true);
  };

  const openEditModal = (banner: Banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setSubtitle(banner.subtitle);
    setImage(banner.image);
    setButtonText1(banner.buttonText1);
    setButtonLink1(banner.buttonLink1);
    setButtonText2(banner.buttonText2);
    setButtonLink2(banner.buttonLink2);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const bannerData = {
      title,
      subtitle,
      image,
      buttonText1,
      buttonLink1,
      buttonText2,
      buttonLink2,
      isActive: editingBanner ? editingBanner.isActive : false // New banners start as inactive
    };

    if (editingBanner) {
      updateBanner({ ...bannerData, id: editingBanner.id });
    } else {
      addBanner(bannerData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Gestão de Banners (Destaque Principal)</h1>
          <p className="text-xs text-slate-500 mt-1">
            Cadastre banners rotativos ou fixos, editando o título, subtítulo e imagens de fundo da secção Hero principal.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar Banner
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {!isLoaded ? (
          <div className="text-center py-12 text-slate-400 text-xs">A carregar banners...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-200">
                  <th className="p-4">Imagem</th>
                  <th className="p-4">Título</th>
                  <th className="p-4">Subtítulo</th>
                  <th className="p-4">Botões</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {banners.map((banner) => (
                  <tr key={banner.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="w-16 h-10 rounded overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                        <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-800">{banner.title}</td>
                    <td className="p-4 text-slate-500 max-w-xs truncate" title={banner.subtitle}>
                      {banner.subtitle}
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="font-semibold text-primary">{banner.buttonText1} ➔ {banner.buttonLink1}</div>
                      <div className="text-slate-400 text-[10px]">{banner.buttonText2} ➔ {banner.buttonLink2}</div>
                    </td>
                    <td className="p-4">
                      {banner.isActive ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-emerald-50 text-emerald-600 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Ativo no Site
                        </span>
                      ) : (
                        <button
                          onClick={() => setActiveBanner(banner.id)}
                          className="px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider border border-slate-200 hover:border-green hover:text-green text-slate-500 transition-colors"
                        >
                          Ativar Banner
                        </button>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(banner)}
                          title="Editar Banner"
                          className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (banner.isActive) {
                              alert('Não pode eliminar o banner que está ativo no site de momento!');
                              return;
                            }
                            if (confirm('Deseja realmente eliminar este banner?')) {
                              deleteBanner(banner.id);
                            }
                          }}
                          title="Eliminar Banner"
                          className="p-1.5 rounded hover:bg-red-50 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit/Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-xl max-w-lg w-full overflow-hidden border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 border-b border-slate-100">
              <h3 className="font-serif text-lg font-bold text-slate-800">
                {editingBanner ? 'Editar Banner' : 'Adicionar Novo Banner'}
              </h3>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Título do Banner *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Miriam Mall"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                />
              </div>

              <ImageUpload
                value={image}
                onChange={setImage}
                label="Imagem de Fundo (URL ou Upload) *"
                placeholder="Cole o URL da imagem ou carregue um ficheiro"
              />

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Subtítulo / Descrição *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Ex: O novo destino de compras, negócios e lazer..."
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Texto do Botão 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={buttonText1}
                    onChange={(e) => setButtonText1(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Link do Botão 1 *
                  </label>
                  <input
                    type="text"
                    required
                    value={buttonLink1}
                    onChange={(e) => setButtonLink1(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Texto do Botão 2 *
                  </label>
                  <input
                    type="text"
                    required
                    value={buttonText2}
                    onChange={(e) => setButtonText2(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Link do Botão 2 *
                  </label>
                  <input
                    type="text"
                    required
                    value={buttonLink2}
                    onChange={(e) => setButtonLink2(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-3 rounded transition-colors"
                >
                  Gravar Dados
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
