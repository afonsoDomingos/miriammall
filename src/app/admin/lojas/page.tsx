'use client';

import React, { useState } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';
import { Store } from '../../../utils/mockData';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import ImageUpload from '../../../components/ImageUpload';

export default function AdminLojas() {
  const { stores, addStore, updateStore, deleteStore, isLoaded } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<Store | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Moda');
  const [floor, setFloor] = useState<number>(0);
  const [schedule, setSchedule] = useState('09:00 - 19:00');
  const [description, setDescription] = useState('');
  const [contact, setContact] = useState('');
  const [logo, setLogo] = useState('');

  const categories = ['Moda', 'Tecnologia', 'Alimentação', 'Farmácia', 'Serviços', 'Bancos', 'Beleza', 'Casa', 'Crianças'];

  const openAddModal = () => {
    setEditingStore(null);
    setName('');
    setCategory('Moda');
    setFloor(0);
    setSchedule('09:00 - 19:00');
    setDescription('');
    setContact('+258 84 000 0000');
    setLogo('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=150&h=150&q=80');
    setIsModalOpen(true);
  };

  const openEditModal = (store: Store) => {
    setEditingStore(store);
    setName(store.name);
    setCategory(store.category);
    setFloor(store.floor);
    setSchedule(store.schedule);
    setDescription(store.description);
    setContact(store.contact);
    setLogo(store.logo);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const storeData = {
      name,
      category,
      floor: Number(floor),
      schedule,
      description,
      contact,
      logo
    };

    if (editingStore) {
      updateStore({ ...storeData, id: editingStore.id });
    } else {
      addStore(storeData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Gestão de Lojas</h1>
          <p className="text-xs text-slate-500 mt-1">
            Cadastre novas lojas, configure horários de funcionamento e informações de contacto.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar Loja
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {!isLoaded ? (
          <div className="text-center py-12 text-slate-400 text-xs">A carregar lojas...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-200">
                  <th className="p-4">Logo</th>
                  <th className="p-4">Nome da Loja</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Piso</th>
                  <th className="p-4">Horário</th>
                  <th className="p-4">Contacto</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {stores.map((store) => (
                  <tr key={store.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="w-8 h-8 rounded-full overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                        <img src={store.logo} alt={store.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-800">{store.name}</td>
                    <td className="p-4">
                      <span className="bg-green/10 text-green px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {store.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-semibold">Piso {store.floor}</td>
                    <td className="p-4 text-slate-500 font-semibold">{store.schedule}</td>
                    <td className="p-4 text-slate-600">{store.contact}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(store)}
                          title="Editar Loja"
                          className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente eliminar a loja ${store.name}?`)) {
                              deleteStore(store.id);
                            }
                          }}
                          title="Eliminar Loja"
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
                {editingStore ? `Editar Loja - ${editingStore.name}` : 'Adicionar Nova Loja'}
              </h3>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Nome da Loja *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: PEP Moçambique"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Categoria *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  >
                    {categories.map((cat, i) => (
                      <option key={i} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Piso *
                  </label>
                  <select
                    value={floor}
                    onChange={(e) => setFloor(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  >
                    <option value={0}>Piso 0 (Térreo)</option>
                    <option value={1}>Piso 1</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Horário de Funcionamento *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 09:00 - 18:30"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Contacto da Loja
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: +258 84 123 4567"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                <ImageUpload
                  value={logo}
                  onChange={setLogo}
                  label="Logótipo da Loja (URL ou Upload) *"
                  placeholder="Cole o URL do logótipo ou carregue um ficheiro"
                />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Descrição da Loja *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Descreva as principais marcas e artigos comercializados..."
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
