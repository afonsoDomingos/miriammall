'use client';

import React, { useState } from 'react';
import { Building, Edit2, Trash2, Plus, Image as ImageIcon, Save, X } from 'lucide-react';
import ImageUpload from '../../../components/ImageUpload';
import { useDatabase } from '../../../context/DatabaseContext';
import { Building as BuildingType } from '../../../utils/mockData';

export default function BuildingsAdminPage() {
  const { buildings, addBuilding, updateBuilding, deleteBuilding } = useDatabase();
  const [editingBuilding, setEditingBuilding] = useState<BuildingType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<BuildingType>>({});

  const handleEdit = (building: BuildingType) => {
    setEditingBuilding(building);
    setFormData(building);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setEditingBuilding(null);
    setFormData({
      name: '',
      subtitle: '',
      description: '',
      image: '',
      features: [],
      order: buildings.length + 1
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setEditingBuilding(null);
    setIsCreating(false);
    setFormData({});
  };

  const handleSave = async () => {
    if (!formData.name || !formData.image) {
      alert('Por favor, preencha o nome e a imagem do edifício.');
      return;
    }

    try {
      console.log('Saving building:', { isCreating, editingBuilding, formData });
      if (isCreating) {
        await addBuilding(formData as Omit<BuildingType, 'id'>);
      } else if (editingBuilding) {
        const buildingToUpdate = { ...formData, id: editingBuilding.id } as BuildingType;
        console.log('Updating building with ID:', buildingToUpdate.id);
        await updateBuilding(buildingToUpdate);
      }
      handleCancel();
    } catch (error) {
      console.error('Error saving building:', error);
      alert('Erro ao salvar edifício.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar este edifício?')) {
      try {
        await deleteBuilding(id);
      } catch (error) {
        console.error('Error deleting building:', error);
        alert('Erro ao eliminar edifício.');
      }
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...(formData.features || []), '']
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = formData.features?.filter((_, i) => i !== index) || [];
    setFormData({ ...formData, features: newFeatures });
  };

  const sortedBuildings = [...buildings].sort((a, b) => a.order - b.order);

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary mb-2">Gestão de Edifícios</h1>
          <p className="text-primary/60 text-sm">Gerir os 3 edifícios do complexo multifuncional</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-green hover:bg-green-dark text-primary font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded flex items-center gap-2 transition-all duration-300"
        >
          <Plus className="w-4 h-4" /> Adicionar Edifício
        </button>
      </div>

      {(isCreating || editingBuilding) && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif font-bold text-primary">
              {isCreating ? 'Novo Edifício' : 'Editar Edifício'}
            </h2>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-slate-100 rounded transition-colors"
            >
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Nome do Edifício *
                </label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
                  placeholder="Ex: Edifício Comercial"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Subtítulo *
                </label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
                  placeholder="Ex: Lojas, Serviços e Lazer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                Descrição
              </label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green min-h-[100px]"
                placeholder="Descrição detalhada do edifício..."
              />
            </div>

            <div>
              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Imagem do Edifício *"
                placeholder="URL da imagem do edifício"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                Características
              </label>
              <div className="space-y-3">
                {formData.features?.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      className="flex-1 bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
                      placeholder="Ex: 50+ lojas comerciais"
                    />
                    <button
                      onClick={() => removeFeature(index)}
                      className="p-3 bg-red-50 hover:bg-red-100 text-red-500 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addFeature}
                  className="text-green font-semibold text-xs uppercase tracking-wider flex items-center gap-2 hover:text-green-dark transition-colors"
                >
                  <Plus className="w-4 h-4" /> Adicionar Característica
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                Ordem
              </label>
              <input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
              />
            </div>

            <div className="flex gap-4 pt-4 border-t border-slate-200">
              <button
                onClick={handleSave}
                className="flex-1 bg-green hover:bg-green-dark text-primary font-semibold text-xs uppercase tracking-wider py-3 rounded flex items-center justify-center gap-2 transition-all duration-300"
              >
                <Save className="w-4 h-4" /> {isCreating ? 'Criar Edifício' : 'Salvar Alterações'}
              </button>
              <button
                onClick={handleCancel}
                className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider rounded hover:bg-slate-50 transition-all duration-300"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBuildings.map((building) => (
          <div
            key={building.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="h-48 relative bg-primary-dark">
              {building.image ? (
                <img
                  src={building.image}
                  alt={building.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <ImageIcon className="w-12 h-12 text-slate-300" />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                Ordem {building.order}
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-serif text-lg font-bold text-primary mb-1">{building.name}</h3>
              <p className="text-green text-xs font-semibold mb-3">{building.subtitle}</p>
              <p className="text-primary/70 text-xs mb-4 line-clamp-2">{building.description}</p>
              
              {building.features && building.features.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {building.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-xs text-primary/60 flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-green" />
                      {feature}
                    </li>
                  ))}
                  {building.features.length > 3 && (
                    <li className="text-xs text-green font-semibold">
                      +{building.features.length - 3} mais
                    </li>
                  )}
                </ul>
              )}

              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(building)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs uppercase tracking-wider py-2 rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Editar
                </button>
                <button
                  onClick={() => handleDelete(building.id)}
                  className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-500 font-semibold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
