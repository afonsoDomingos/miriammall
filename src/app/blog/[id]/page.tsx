'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { useDatabase } from '../../../context/DatabaseContext';
import { ArrowLeft, Calendar, User, BookOpen } from 'lucide-react';
import Link from 'next/link';
import ImageWithLoader from '../../../components/ImageWithLoader';

export default function BlogPostDetail() {
  const { id } = useParams();
  const { blogPosts, isLoaded } = useDatabase();

  const post = blogPosts.find((p) => p.id === id);

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20 text-primary/60 text-sm">A carregar artigo...</div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20 max-w-md mx-auto px-4">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="text-2xl font-serif font-bold text-primary mb-4">Artigo não encontrado</h2>
          <Link href="/blog" className="text-green font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-1.5 border-b-2 border-green pb-0.5 w-fit mx-auto hover:text-green-light hover:border-green-light transition-colors">
            <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <main className="flex-grow pt-24 bg-white">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary/60 hover:text-green mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Voltar para o Blog
          </Link>

          {/* Header */}
          <header className="space-y-4 mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-primary leading-tight">
              {post.title}
            </h1>
            
            {/* Meta */}
            <div className="flex flex-wrap gap-4 text-xs text-primary/60 font-semibold uppercase tracking-wider border-y border-slate-100 py-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-green" /> {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-green" /> Autor: {post.author}
              </span>
            </div>
          </header>

          {/* Banner Image */}
          <div className="h-[300px] sm:h-[450px] rounded-2xl overflow-hidden border border-green/10 green-glow mb-10 relative">
            <ImageWithLoader
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose max-w-none text-primary/80 dark:text-white/80 leading-relaxed text-sm sm:text-base space-y-6">
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
