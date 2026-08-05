'use client';

import React, { useState } from 'react';
import { Edit2, Trash2, Plus, Save, X, StickyNote, AlertCircle, Clock, Info } from 'lucide-react';
import { useDatabase } from '../../../context/DatabaseContext';
import { Note as NoteType } from '../../../utils/mockData';
import { motion, AnimatePresence } from 'framer-motion';

export default function NotesAdminPage() {
  const { notes, addNote, updateNote, deleteNote } = useDatabase();
  const [isCreating, setIsCreating] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteType | null>(null);
  const [formData, setFormData] = useState<Partial<NoteType>>({});
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const categoryColors = {
    geral: 'bg-slate-100 text-slate-600 border-slate-200',
    importante: 'bg-amber-100 text-amber-600 border-amber-200',
    urgente: 'bg-red-100 text-red-600 border-red-200',
    lembrete: 'bg-blue-100 text-blue-600 border-blue-200'
  };

  const categoryIcons = {
    geral: Info,
    importante: AlertCircle,
    urgente: AlertCircle,
    lembrete: Clock
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({ category: 'geral' });
  };

  const handleEdit = (note: NoteType) => {
    setEditingNote(note);
    setFormData(note);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingNote(null);
    setFormData({});
  };

  const handleSave = async () => {
    if (!formData.title || !formData.content) {
      alert('Por favor, preencha o título e o conteúdo da nota.');
      return;
    }

    try {
      if (isCreating) {
        await addNote(formData as Omit<NoteType, 'id'>);
      } else if (editingNote) {
        await updateNote({ ...formData, id: editingNote.id } as NoteType);
      }
      handleCancel();
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Erro ao salvar nota.');
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja eliminar esta nota?')) {
      try {
        await deleteNote(id);
      } catch (error) {
        console.error('Error deleting note:', error);
        alert('Erro ao eliminar nota.');
      }
    }
  };

  const filteredNotes = filterCategory === 'all' 
    ? notes 
    : notes.filter(note => note.category === filterCategory);

  const sortedNotes = [...filteredNotes].sort((a, b) => 
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-serif font-bold text-primary mb-2">Bloco de Notas</h1>
          <p className="text-primary/60 text-sm">Gerir notas e lembretes importantes</p>
        </div>
        <button
          onClick={handleCreate}
          className="bg-green hover:bg-green-dark text-primary font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded flex items-center gap-2 transition-all duration-300"
        >
          <Plus className="w-4 h-4" /> Nova Nota
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {['all', 'geral', 'importante', 'urgente', 'lembrete'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-4 py-2 rounded text-xs font-semibold uppercase tracking-wider transition-all ${
              filterCategory === cat
                ? 'bg-green text-primary'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {cat === 'all' ? 'Todas' : cat}
          </button>
        ))}
      </div>

      {/* Create/Edit Form */}
      <AnimatePresence>
        {(isCreating || editingNote) && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-2xl border border-slate-200 shadow-lg p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-serif font-bold text-primary">
                {isCreating ? 'Nova Nota' : 'Editar Nota'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-slate-100 rounded transition-colors"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Título *
                </label>
                <input
                  type="text"
                  value={formData.title || ''}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
                  placeholder="Título da nota"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Categoria *
                </label>
                <select
                  value={formData.category || 'geral'}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green"
                >
                  <option value="geral">Geral</option>
                  <option value="importante">Importante</option>
                  <option value="urgente">Urgente</option>
                  <option value="lembrete">Lembrete</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-2">
                  Conteúdo *
                </label>
                <textarea
                  value={formData.content || ''}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-4 py-3 text-sm text-slate-800 focus:outline-none focus:border-green min-h-[150px]"
                  placeholder="Conteúdo da nota..."
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={handleCancel}
                  className="px-6 py-3 border border-slate-200 text-slate-600 font-semibold text-xs uppercase tracking-wider rounded hover:bg-slate-50 transition-all duration-300"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSave}
                  className="bg-green hover:bg-green-dark text-primary font-semibold text-xs uppercase tracking-wider py-3 px-6 rounded flex items-center gap-2 transition-all duration-300"
                >
                  <Save className="w-4 h-4" /> Salvar
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notes Grid */}
      {sortedNotes.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
          <StickyNote className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 text-sm">Nenhuma nota encontrada.</p>
          <button
            onClick={handleCreate}
            className="mt-4 text-green font-semibold text-xs uppercase tracking-wider hover:underline"
          >
            Criar primeira nota
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedNotes.map((note, index) => {
            const CategoryIcon = categoryIcons[note.category];
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className={`p-4 border-b border-slate-100 ${categoryColors[note.category]}`}>
                  <div className="flex items-center gap-2">
                    <CategoryIcon className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {note.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-primary mb-2">{note.title}</h3>
                  <p className="text-sm text-slate-600 line-clamp-4 mb-4">{note.content}</p>
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span>{new Date(note.createdAt).toLocaleDateString('pt-PT')}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(note)}
                        className="p-1.5 hover:bg-slate-100 rounded transition-colors"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(note.id)}
                        className="p-1.5 hover:bg-red-50 rounded transition-colors text-red-500"
                        title="Eliminar"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
