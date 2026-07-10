'use client';

import React, { useState, useRef } from 'react';
import { Upload, Loader2, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, label, placeholder }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Simple validation (only images)
    if (!file.type.startsWith('image/')) {
      setStatus('error');
      setErrorMessage('Por favor, selecione apenas ficheiros de imagem.');
      return;
    }

    setIsUploading(true);
    setStatus('idle');
    setErrorMessage('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success && data.url) {
        onChange(data.url);
        setStatus('success');
      } else {
        throw new Error(data.error || 'Erro ao carregar a imagem.');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      setStatus('error');
      setErrorMessage(error.message || 'Falha ao carregar a imagem. Tente novamente.');
    } finally {
      setIsUploading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            required
            placeholder={placeholder || "Cole o URL da imagem ou use o botão de carregar"}
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              setStatus('idle');
            }}
            className="w-full bg-slate-50 border border-slate-200 rounded pl-9 pr-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-green"
          />
          <ImageIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
        
        <div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
          <button
            type="button"
            disabled={isUploading}
            onClick={triggerFileInput}
            className={`h-full bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded px-3 py-2 text-xs text-slate-700 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed`}
          >
            {isUploading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-slate-500" />
                <span>A carregar...</span>
              </>
            ) : (
              <>
                <Upload className="w-3.5 h-3.5 text-slate-500" />
                <span>Carregar Ficheiro</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Upload Status / Errors */}
      {status === 'success' && (
        <div className="text-[10px] text-emerald-600 flex items-center gap-1 font-semibold">
          <CheckCircle className="w-3 h-3" />
          <span>Imagem carregada com sucesso para o Cloudinary!</span>
        </div>
      )}
      {status === 'error' && (
        <div className="text-[10px] text-red-500 flex items-center gap-1 font-semibold">
          <XCircle className="w-3 h-3" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Tiny image preview */}
      {value && (
        <div className="mt-2 w-28 h-16 rounded border border-slate-200 overflow-hidden bg-slate-50 flex items-center justify-center relative group">
          <img src={value} alt="Preview" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[9px] text-white font-bold pointer-events-none">
            Visualização
          </div>
        </div>
      )}
    </div>
  );
}
