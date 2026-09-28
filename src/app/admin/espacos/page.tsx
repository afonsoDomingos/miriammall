'use client';

import React, { useState } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';
import { Space } from '../../../utils/mockData';
import { Plus, Edit, Trash2, CheckCircle, Clock, AlertTriangle, X, Info } from 'lucide-react';
import ImageUpload from '../../../components/ImageUpload';

export default function AdminEspacos() {
  const { spaces, addSpace, updateSpace, deleteSpace, isLoaded } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);

  // Form states
  const [number, setNumber] = useState('');
  const [buildingId, setBuildingId] = useState('');
  const [floor, setFloor] = useState<number>(1);
  const [area, setArea] = useState<number>(50);
  const [status, setStatus] = useState<Space['status']>('disponivel');
  const [price, setPrice] = useState('Sob Consulta');
  const [description, setDescription] = useState('');
  const [spaceType, setSpaceType] = useState<Space['spaceType']>('loja');
  const [amenitiesText, setAmenitiesText] = useState('');
  const [image, setImage] = useState('');
  const [conditions, setConditions] = useState('');

  const openAddModal = () => {
    setEditingSpace(null);
    setNumber('');
    setBuildingId('');
    setFloor(1);
    setArea(50);
    setStatus('disponivel');
    setPrice('Sob Consulta');
    setDescription('');
    setSpaceType('loja');
    setAmenitiesText('');
    setImage('');
    setConditions('');
    setIsModalOpen(true);
  };

  const openEditModal = (space: Space) => {
    setEditingSpace(space);
    setNumber(space.number);
    setBuildingId(space.buildingId || '');
    setFloor(space.floor);
    setArea(space.area);
    setStatus(space.status);
    setPrice(space.price);
    setDescription(space.description);
    setSpaceType(space.spaceType || 'loja');
    setAmenitiesText(space.amenities.join(', '));
    setImage(space.image);
    setConditions(space.conditions || '');
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const amenities = amenitiesText.split(',').map((a) => a.trim()).filter(Boolean);
    const spaceData = {
      number,
      buildingId,
      floor: Number(floor),
      area: Number(area),
      status,
      price,
      description,
      spaceType,
      amenities,
      image,
      blueprint: editingSpace?.blueprint || '/blueprints/default.png',
      conditions
    };

    if (editingSpace) {
      updateSpace({ ...spaceData, id: editingSpace.id });
    } else {
      addSpace(spaceData);
    }
    setIsModalOpen(false);
  };

  const getStatusBadge = (spaceStatus: Space['status']) => {
    switch (spaceStatus) {
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
      case 'indisponivel':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-red-50 text-red-600 border border-red-200">
            <AlertTriangle className="w-3 h-3" /> Indisponível
          </span>
        );
      case 'em_preparacao':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200">
            <Clock className="w-3 h-3" /> Em Preparação
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
            {spaceStatus}
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Gestão de Espaços Comerciais</h1>
          <p className="text-xs text-slate-500 mt-1">
            Cadastre novos espaços e atualize o estado de ocupação e dimensões de cada loja.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Adicionar Espaço
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {!isLoaded ? (
          <div className="text-center py-12 text-slate-400 text-xs">A carregar espaços...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-200">
                  <th className="p-4">Número</th>
                  <th className="p-4">Edifício</th>
                  <th className="p-4">Piso</th>
                  <th className="p-4">Tipo</th>
                  <th className="p-4">Área útil</th>
                  <th className="p-4">Valor</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {spaces.map((space) => (
                  <tr key={space.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-bold text-slate-800">{space.number}</td>
                    <td className="p-4 text-slate-500 font-semibold">{space.buildingId || '-'}</td>
                    <td className="p-4 text-slate-500 font-semibold">Piso {space.floor}</td>
                    <td className="p-4 text-slate-500 font-semibold capitalize">{space.spaceType || '-'}</td>
                    <td className="p-4 text-slate-500 font-semibold">{space.area} m²</td>
                    <td className="p-4 text-green font-bold">{space.price}</td>
                    <td className="p-4">{getStatusBadge(space.status)}</td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(space)}
                          title="Editar Espaço"
                          className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente eliminar o espaço ${space.number}?`)) {
                              deleteSpace(space.id);
                            }
                          }}
                          title="Eliminar Espaço"
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
                {editingSpace ? `Editar Espaço - ${editingSpace.number}` : 'Adicionar Novo Espaço'}
              </h3>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Número do Espaço *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Loja 108"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    ID do Edifício *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: building-1"
                    value={buildingId}
                    onChange={(e) => setBuildingId(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                  <p className="text-[9px] text-slate-400 mt-1 flex items-center gap-1">
                    <Info className="w-3 h-3" /> Consulte a secção de Edifícios para ver os IDs disponíveis
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Piso *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={floor}
                    onChange={(e) => setFloor(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Tipo de Espaço *
                  </label>
                  <select
                    value={spaceType}
                    onChange={(e) => setSpaceType(e.target.value as Space['spaceType'])}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  >
                    <option value="loja">Loja</option>
                    <option value="restaurante">Restaurante</option>
                    <option value="escritorio">Escritório</option>
                    <option value="quarto">Quarto</option>
                    <option value="armazem">Armazém</option>
                    <option value="ferragem">Ferragem</option>
                    <option value="salao">Salão</option>
                    <option value="sala_reunioes">Sala de Reuniões</option>
                    <option value="refeitorio">Refeitório</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Estado *
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as Space['status'])}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  >
                    <option value="disponivel">Disponível</option>
                    <option value="reservado">Reservado</option>
                    <option value="ocupado">Ocupado</option>
                    <option value="indisponivel">Indisponível</option>
                    <option value="em_preparacao">Em Preparação</option>
                    <option value="em_construcao">Em Construção</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Área Útil (m²) *
                  </label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={area}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Valor de Arrendamento *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Sob Consulta"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Imagem do Espaço *
                </label>
                <ImageUpload
                  value={image}
                  onChange={setImage}
                  label="Imagem (URL ou Upload)"
                  placeholder="Cole o URL da imagem ou carregue um ficheiro"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Descrição do Espaço *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Informações adicionais..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green resize-none"
                ></textarea>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Infraestrutura (separados por vírgulas)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Segurança 24h, Banda Larga Fibra, Pontos de água"
                  value={amenitiesText}
                  onChange={(e) => setAmenitiesText(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Condições de Arrendamento
                </label>
                <textarea
                  rows={2}
                  placeholder="Condições específicas deste espaço..."
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
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
