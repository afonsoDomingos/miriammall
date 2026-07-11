'use client';

import React, { useState } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';
import { Promotion } from '../../../utils/mockData';
import { Plus, Edit, Trash2, X, Tag } from 'lucide-react';
import ImageUpload from '../../../components/ImageUpload';

export default function AdminPromocoes() {
  const { promotions, addPromotion, updatePromotion, deletePromotion, isLoaded } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promotion | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [validity, setValidity] = useState('');
  const [description, setDescription] = useState('');
  const [storeName, setStoreName] = useState('');
  const [image, setImage] = useState('');

  const openAddModal = () => {
    setEditingPromo(null);
    setTitle('');
    setValidity('Disponível de Segunda a Sexta');
    setDescription('');
    setStoreName('');
    setImage('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (promo: Promotion) => {
    setEditingPromo(promo);
    setTitle(promo.title);
    setValidity(promo.validity);
    setDescription(promo.description);
    setStoreName(promo.storeName);
    setImage(promo.image);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const promoData = {
      title,
      validity,
      description,
      storeName,
      image
    };

    if (editingPromo) {
      updatePromotion({ ...promoData, id: editingPromo.id });
    } else {
      addPromotion(promoData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Gestão de Promoções</h1>
          <p className="text-xs text-slate-500 mt-1">
            Publique campanhas promocionais ativas das marcas e restaurantes do Miriam Mall.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar Promoção
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {!isLoaded ? (
          <div className="text-center py-12 text-slate-400 text-xs">A carregar promoções...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-200">
                  <th className="p-4">Imagem</th>
                  <th className="p-4">Título da Promoção</th>
                  <th className="p-4">Loja / Marca</th>
                  <th className="p-4">Validade</th>
                  <th className="p-4">Descrição</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {promotions.map((promo) => (
                  <tr key={promo.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-8 rounded overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                        <img src={promo.image} alt={promo.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-800">{promo.title}</td>
                    <td className="p-4">
                      <span className="bg-green/10 text-green px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 w-fit">
                        <Tag className="w-3 h-3" /> {promo.storeName}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-semibold">{promo.validity}</td>
                    <td className="p-4 text-slate-500 max-w-xs truncate" title={promo.description}>
                      {promo.description}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(promo)}
                          title="Editar Promoção"
                          className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente eliminar a promoção "${promo.title}"?`)) {
                              deletePromotion(promo.id);
                            }
                          }}
                          title="Eliminar Promoção"
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
                {editingPromo ? `Editar Promoção` : 'Adicionar Nova Promoção'}
              </h3>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Título da Promoção *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: 15% Desconto na compra de Celulares"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Loja / Restaurante *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Vodacom Homoíne"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Validade da Campanha *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Válido até 30 de Outubro"
                    value={validity}
                    onChange={(e) => setValidity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
              </div>

              <ImageUpload
                value={image}
                onChange={setImage}
                label="Imagem de Capa (URL ou Upload) *"
                placeholder="Cole o URL da imagem ou carregue um ficheiro"
              />

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Descrição dos Benefícios *
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Explique os descontos, produtos aplicáveis e condições da promoção..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green resize-none"
                ></textarea>
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
