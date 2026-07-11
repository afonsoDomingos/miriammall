'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useDatabase } from '../../context/DatabaseContext';
import { Calendar, User, ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ImageWithLoader from '../../components/ImageWithLoader';

export default function BlogList() {
  const { blogPosts, isLoaded } = useDatabase();

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        {/* Banner */}
        <section className="relative bg-primary py-16 text-white text-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-cover bg-center opacity-25" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80')" }} />
          <div className="relative z-10 max-w-4xl mx-auto px-4">
            <span className="text-green uppercase tracking-widest text-xs font-semibold block mb-2">Comunidade & Imprensa</span>
            <h1 className="text-4xl font-serif font-bold mb-4">Blog & Novidades</h1>
            <p className="text-white/70 text-sm max-w-2xl mx-auto leading-relaxed">
              Fique por dentro das últimas notícias sobre o Miriam Mall, eventos em destaque e o impacto de progresso em Homoíne.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isLoaded ? (
            <div className="text-center py-12 text-primary/60 text-sm">A carregar artigos...</div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-16 text-primary/50 text-sm border border-dashed border-primary/10 rounded-xl max-w-md mx-auto">
              <BookOpen className="w-8 h-8 mx-auto text-slate-300 mb-2" />
              Nenhum artigo publicado de momento. Volte a visitar em breve!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
              {blogPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md flex flex-col hover:-translate-y-1.5 hover:shadow-xl hover:border-green/20 transition-all duration-300 group"
                >
                  <div className="h-64 relative bg-primary-dark overflow-hidden shrink-0">
                    <ImageWithLoader
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-[10px] text-primary/60 font-semibold mb-3 uppercase tracking-wider">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-green" /> {post.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-green" /> Por {post.author}
                        </span>
                      </div>
                      
                      {/* Title */}
                      <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-3 group-hover:text-green transition-colors leading-tight">
                        {post.title}
                      </h2>
                      
                      {/* Summary */}
                      <p className="text-primary/70 text-xs sm:text-sm leading-relaxed mb-6">
                        {post.summary}
                      </p>
                    </div>

                    <div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="inline-flex items-center gap-2 text-green font-bold uppercase tracking-wider text-xs border-b-2 border-green pb-0.5 hover:text-green-light hover:border-green-light transition-colors"
                      >
                        Ler Artigo Completo <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
