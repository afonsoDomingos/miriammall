'use client';

import React, { useState } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';
import { Restaurant } from '../../../utils/mockData';
import { Plus, Edit, Trash2, X, Utensils } from 'lucide-react';
import ImageUpload from '../../../components/ImageUpload';

export default function AdminRestaurantes() {
  const { restaurants, addRestaurant, updateRestaurant, deleteRestaurant, isLoaded } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRestaurant, setEditingRestaurant] = useState<Restaurant | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Cafetaria');
  const [schedule, setSchedule] = useState('08:00 - 21:00');
  const [image, setImage] = useState('');
  const [menuItemsText, setMenuItemsText] = useState(''); // Simple format: Name - Price | Description

  const openAddModal = () => {
    setEditingRestaurant(null);
    setName('');
    setCategory('Cafetaria');
    setSchedule('08:00 - 21:00');
    setImage('https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=800&q=80');
    setMenuItemsText('Café Expresso - 60 MT | Café torrado local.\nSamosa de Carne - 70 MT | Chamuça frita.');
    setIsModalOpen(true);
  };

  const openEditModal = (rest: Restaurant) => {
    setEditingRestaurant(rest);
    setName(rest.name);
    setCategory(rest.category);
    setSchedule(rest.schedule);
    setImage(rest.image);
    
    // Convert array back to text for simple editing
    const text = rest.menuItems
      ? rest.menuItems.map((item) => `${item.name} - ${item.price}${item.description ? ` | ${item.description}` : ''}`).join('\n')
      : '';
    setMenuItemsText(text);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse text back to items list
    const menuItems = menuItemsText
      .split('\n')
      .map((line) => {
        const parts = line.split('-');
        if (parts.length < 2) return null;
        
        const name = parts[0].trim();
        const descParts = parts[1].split('|');
        const price = descParts[0].trim();
        const description = descParts[1] ? descParts[1].trim() : undefined;
        
        return { name, price, description };
      })
      .filter(Boolean) as Restaurant['menuItems'];

    const restData = {
      name,
      category,
      schedule,
      image,
      menuLink: '#',
      menuItems
    };

    if (editingRestaurant) {
      updateRestaurant({ ...restData, id: editingRestaurant.id });
    } else {
      addRestaurant(restData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Gestão de Restaurantes e Cafés</h1>
          <p className="text-xs text-slate-500 mt-1">
            Gerencie os restaurantes da praça de alimentação e cafés, cadastrando as especialidades do menu.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar Restaurante
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {!isLoaded ? (
          <div className="text-center py-12 text-slate-400 text-xs">A carregar restauração...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-200">
                  <th className="p-4">Imagem</th>
                  <th className="p-4">Nome do Restaurante</th>
                  <th className="p-4">Categoria</th>
                  <th className="p-4">Horário de Funcionamento</th>
                  <th className="p-4">Nº Pratos no Menu</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {restaurants.map((rest) => (
                  <tr key={rest.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-8 rounded overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                        <img src={rest.image} alt={rest.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-800">{rest.name}</td>
                    <td className="p-4">
                      <span className="bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
                        {rest.category}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-semibold">{rest.schedule}</td>
                    <td className="p-4 text-slate-500 font-bold">{rest.menuItems?.length || 0} Especialidades</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(rest)}
                          title="Editar Restaurante"
                          className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente eliminar o restaurante ${rest.name}?`)) {
                              deleteRestaurant(rest.id);
                            }
                          }}
                          title="Eliminar Restaurante"
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
                {editingRestaurant ? `Editar Restaurante - ${editingRestaurant.name}` : 'Adicionar Novo Restaurante'}
              </h3>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Nome do Restaurante *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sabores de Inhambane"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Categoria *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Mariscos / Grelhados"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Horário *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 11:30 - 22:00"
                    value={schedule}
                    onChange={(e) => setSchedule(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
              <ImageUpload
                value={image}
                onChange={setImage}
                label="Imagem do Restaurante (URL ou Upload) *"
                placeholder="Cole o URL da imagem ou carregue um ficheiro"
              />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1 flex items-center gap-1">
                  <Utensils className="w-3.5 h-3.5" /> Pratos do Menu (Um por linha: Nome - Preço | Descrição)
                </label>
                <textarea
                  rows={6}
                  placeholder="Ex: Matapa com Caranguejo - 450 MT | Servido com arroz de coco.&#10;Camarão Grelhado - 850 MT | Acompanhado de batata frita."
                  value={menuItemsText}
                  onChange={(e) => setMenuItemsText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded p-3 text-xs text-slate-800 font-mono focus:outline-none focus:border-green resize-none"
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
