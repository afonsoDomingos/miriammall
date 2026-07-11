'use client';

import React, { useState } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';
import { BlogPost } from '../../../utils/mockData';
import { Plus, Edit, Trash2, X, BookOpen, User, Calendar } from 'lucide-react';
import ImageUpload from '../../../components/ImageUpload';

export default function AdminBlog() {
  const { blogPosts, addBlogPost, updateBlogPost, deleteBlogPost, isLoaded } = useDatabase();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Form states
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [date, setDate] = useState('');
  const [author, setAuthor] = useState('');

  const openAddModal = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    setEditingPost(null);
    setTitle('');
    setSummary('');
    setContent('');
    setImage('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80');
    setDate(formattedDate);
    setAuthor('Miriam Mall Editorial');
    setIsModalOpen(true);
  };

  const openEditModal = (post: BlogPost) => {
    setEditingPost(post);
    setTitle(post.title);
    setSummary(post.summary);
    setContent(post.content);
    setImage(post.image);
    setDate(post.date);
    setAuthor(post.author);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const postData = {
      title,
      summary,
      content,
      image,
      date,
      author
    };

    if (editingPost) {
      updateBlogPost({ ...postData, id: editingPost.id });
    } else {
      addBlogPost(postData);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Artigos de Blog & Notícias</h1>
          <p className="text-xs text-slate-500 mt-1">
            Publique novidades, comunicados e artigos de interesse para a comunidade de Homoíne.
          </p>
        </div>
        <button
          onClick={openAddModal}
          className="bg-primary hover:bg-primary-light text-white text-xs font-bold uppercase tracking-wider py-2.5 px-4 rounded flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-4 h-4" /> Escrever Artigo
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {!isLoaded ? (
          <div className="text-center py-12 text-slate-400 text-xs">A carregar artigos...</div>
        ) : blogPosts.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">Nenhum artigo publicado no blog de momento.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-200">
                  <th className="p-4">Capa</th>
                  <th className="p-4">Título do Artigo</th>
                  <th className="p-4">Autor</th>
                  <th className="p-4">Data de Publicação</th>
                  <th className="p-4">Resumo</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {blogPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="w-12 h-8 rounded overflow-hidden border border-slate-200 bg-slate-100 flex items-center justify-center shrink-0">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="p-4 font-bold text-slate-800 max-w-xs truncate" title={post.title}>
                      {post.title}
                    </td>
                    <td className="p-4 text-slate-500">
                      <span className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5 text-slate-400" /> {post.author}
                      </span>
                    </td>
                    <td className="p-4 text-slate-500 font-semibold">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" /> {post.date}
                      </span>
                    </td>
                    <td className="p-4 text-slate-400 max-w-xs truncate" title={post.summary}>
                      {post.summary}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => openEditModal(post)}
                          title="Editar Artigo"
                          className="p-1.5 rounded hover:bg-indigo-50 text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Deseja realmente eliminar o artigo "${post.title}"?`)) {
                              deleteBlogPost(post.id);
                            }
                          }}
                          title="Eliminar Artigo"
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
          <div className="bg-white rounded-xl max-w-2xl w-full overflow-hidden border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in duration-300">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6 border-b border-slate-100">
              <h3 className="font-serif text-lg font-bold text-slate-800">
                {editingPost ? `Editar Artigo de Blog` : 'Escrever Novo Artigo'}
              </h3>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Título do Artigo *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Miriam Mall Impulsiona o Empreendedorismo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Autor *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Miriam Mall Editorial"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                    Data de Publicação *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: 12 de Julho de 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                  />
                </div>
              </div>

              <ImageUpload
                value={image}
                onChange={setImage}
                label="Imagem de Destaque (URL ou Upload) *"
                placeholder="Cole o URL da imagem ou carregue um ficheiro"
              />

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Resumo / Sumário *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Breve resumo exibido nos cartões de notícias..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
                  Conteúdo do Artigo (Markdown ou Texto Livre) *
                </label>
                <textarea
                  required
                  rows={8}
                  placeholder="Escreva aqui o conteúdo completo do seu artigo..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green resize-none font-sans"
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
                  Publicar Artigo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
