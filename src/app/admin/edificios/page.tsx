'use client';

import React, { useState } from 'react';
import { Building, Edit2, Trash2, Plus, Image as ImageIcon, Save, X, Layers } from 'lucide-react';
import ImageUpload from '../../../components/ImageUpload';
import { useDatabase } from '../../../context/DatabaseContext';
import { useToast } from '../../../context/ToastContext';
import { Building as BuildingType } from '../../../utils/mockData';

// Helper: inline multi-image manager for each floor
function FloorImagesManager({
  label,
  images,
  onChange,
}: {
  label: string;
  images: string[];
  onChange: (imgs: string[]) => void;
}) {
  const [uploading, setUploading] = useState<number | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(idx);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success && data.url) {
        const updated = [...images];
        updated[idx] = data.url;
        onChange(updated);
      }
    } finally {
      setUploading(null);
    }
  };

  const addSlot = () => onChange([...images, '']);
  const removeSlot = (idx: number) => onChange(images.filter((_, i) => i !== idx));
  const updateUrl = (idx: number, url: string) => {
    const updated = [...images];
    updated[idx] = url;
    onChange(updated);
  };

  return (
    <div className="border border-slate-200 rounded-xl p-4 bg-slate-50">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <Layers className="w-3.5 h-3.5 text-green" /> {label}
        </h4>
        <button
          type="button"
          onClick={addSlot}
          className="text-xs font-semibold text-green hover:text-green-dark flex items-center gap-1 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Imagem
        </button>
      </div>

      {images.length === 0 && (
        <p className="text-xs text-slate-400 italic">Nenhuma imagem. Clique em &quot;Adicionar Imagem&quot; para começar.</p>
      )}

      <div className="grid grid-cols-2 gap-3">
        {images.map((url, idx) => (
          <div key={idx} className="relative group">
            {/* Preview */}
            <div className="aspect-video rounded-lg overflow-hidden bg-slate-200 mb-1.5">
              {url ? (
                <img src={url} alt={`${label} ${idx + 1}`} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-slate-400" />
                </div>
              )}
              {uploading === idx && (
                <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-lg">
                  <div className="w-5 h-5 border-2 border-green border-t-transparent rounded-full animate-spin" />
                </div>
              )}
            </div>

            {/* URL input + upload button + remove */}
            <div className="flex gap-1.5 items-center">
              <input
                type="text"
                value={url}
                onChange={(e) => updateUrl(idx, e.target.value)}
                placeholder="URL da imagem"
                className="flex-1 bg-white border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-700 focus:outline-none focus:border-green min-w-0"
              />
              <label className="cursor-pointer p-1.5 bg-green/10 hover:bg-green/20 rounded text-green transition-colors shrink-0" title="Carregar ficheiro">
                <ImageIcon className="w-3.5 h-3.5" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleUpload(e, idx)}
                />
              </label>
              <button
                type="button"
                onClick={() => removeSlot(idx)}
                className="p-1.5 bg-red-50 hover:bg-red-100 text-red-400 rounded transition-colors shrink-0"
                title="Remover"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function BuildingsAdminPage() {
  const { buildings, addBuilding, updateBuilding, deleteBuilding } = useDatabase();
  const { showSuccess, showError } = useToast();
  const [editingBuilding, setEditingBuilding] = useState<BuildingType | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<BuildingType>>({});

  const handleEdit = (building: BuildingType) => {
    setEditingBuilding(building);
    setFormData({
      ...building,
      floor1Images: building.floor1Images ?? [],
      floor2Images: building.floor2Images ?? [],
    });
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
      floor1Images: [],
      floor2Images: [],
      order: buildings.length + 1,
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
      showError('Por favor, preencha o nome e a imagem do edifício.', 'Formulário Incompleto');
      return;
    }
    try {
      if (isCreating) {
        await addBuilding(formData as Omit<BuildingType, 'id'>);
        showSuccess('Edifício criado com sucesso!');
      } else if (editingBuilding) {
        await updateBuilding({ ...formData, id: editingBuilding.id } as BuildingType);
        showSuccess('Edifício atualizado com sucesso!');
      }
      handleCancel();
    } catch (error: any) {
      showError(error?.message || 'Erro ao salvar edifício.', 'Falha na Operação');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar este edifício?')) {
      try {
        await deleteBuilding(id);
        showSuccess('Edifício eliminado com sucesso!');
      } catch (error: any) {
        showError(error?.message || 'Erro ao eliminar edifício.', 'Falha na Eliminação');
      }
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...(formData.features || [])];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const addFeature = () => {
    setFormData({ ...formData, features: [...(formData.features || []), ''] });
  };

  const removeFeature = (index: number) => {
    setFormData({ ...formData, features: formData.features?.filter((_, i) => i !== index) || [] });
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

      {/* Form Panel */}
      {(isCreating || editingBuilding) && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-serif font-bold text-primary">
              {isCreating ? 'Novo Edifício' : `Editar: ${editingBuilding?.name}`}
            </h2>
            <button onClick={handleCancel} className="p-2 hover:bg-slate-100 rounded transition-colors">
              <X className="w-5 h-5 text-slate-500" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Nome + Subtítulo */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Nome do Edifício *</label>
                <input
                  type="text"
                  value={formData.name || ''}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
                  placeholder="Ex: Edifício 1 – Centro Comercial"
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Subtítulo</label>
                <input
                  type="text"
                  value={formData.subtitle || ''}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
                  placeholder="Ex: Lojas, Serviços e Lazer"
                />
              </div>
            </div>

            {/* Descrição */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Descrição</label>
              <textarea
                value={formData.description || ''}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green min-h-[90px]"
                placeholder="Descrição detalhada do edifício..."
              />
            </div>

            {/* Imagem Principal */}
            <div>
              <ImageUpload
                value={formData.image || ''}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Imagem Principal do Edifício *"
                placeholder="URL da imagem principal"
              />
            </div>

            {/* Imagens dos Pisos */}
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 border-b border-slate-200 pb-2">
                📸 Imagens por Piso (Galeria)
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <FloorImagesManager
                  label="1º Piso"
                  images={formData.floor1Images ?? []}
                  onChange={(imgs) => setFormData({ ...formData, floor1Images: imgs })}
                />
                <FloorImagesManager
                  label="2º Piso"
                  images={formData.floor2Images ?? []}
                  onChange={(imgs) => setFormData({ ...formData, floor2Images: imgs })}
                />
              </div>
              <p className="text-xs text-slate-400 italic">
                Se não adicionar imagens, serão usadas imagens de demonstração automaticamente.
              </p>
            </div>

            {/* Características */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Características</label>
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

            {/* Ordem */}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Ordem</label>
              <input
                type="number"
                value={formData.order || 0}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-32 bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
              />
            </div>

            {/* Botões */}
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

      {/* Building Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedBuildings.map((building) => (
          <div
            key={building.id}
            className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
          >
            <div className="h-48 relative bg-primary-dark">
              {building.image ? (
                <img src={building.image} alt={building.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-slate-100">
                  <ImageIcon className="w-12 h-12 text-slate-300" />
                </div>
              )}
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                Ordem {building.order}
              </div>
              {/* Floor image count badges */}
              <div className="absolute bottom-4 left-4 flex gap-2">
                <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  1º Piso: {building.floor1Images?.length ?? 0} imgs
                </span>
                <span className="bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  2º Piso: {building.floor2Images?.length ?? 0} imgs
                </span>
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-base font-bold text-primary mb-1">{building.name}</h3>
              <p className="text-green text-xs font-semibold mb-3">{building.subtitle}</p>
              <p className="text-primary/60 text-xs mb-4 line-clamp-2">{building.description}</p>
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
