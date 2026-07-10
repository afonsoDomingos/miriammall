'use client';

import React from 'react';
import { useDatabase } from '../../../context/DatabaseContext';
import { Mail, Phone, Calendar, Trash2, CheckCircle2, Archive, FileText, ExternalLink } from 'lucide-react';

export default function AdminPedidos() {
  const { rentalRequests, updateRentalRequestStatus, deleteRentalRequest, isLoaded } = useDatabase();

  const handleStatusChange = (id: string, status: 'novo' | 'respondido' | 'arquivado') => {
    updateRentalRequestStatus(id, status);
  };

  const formatDate = (isoString: string) => {
    try {
      const date = new Date(isoString);
      return date.toLocaleDateString('pt-MZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return isoString;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-serif text-2xl font-bold text-slate-800">Pedidos de Arrendamento</h1>
          <p className="text-xs text-slate-500 mt-1">
            Gerencie as candidaturas enviadas por empresas e marcas interessadas no Mirriam Mall.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        {!isLoaded ? (
          <div className="text-center py-12 text-slate-400 text-xs">A carregar candidaturas...</div>
        ) : rentalRequests.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs flex flex-col items-center justify-center gap-2">
            <FileText className="w-8 h-8 text-slate-300" />
            <span>Nenhum pedido de arrendamento recebido até ao momento.</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-200">
                  <th className="p-4">Interessado</th>
                  <th className="p-4">Contactos</th>
                  <th className="p-4">Espaço / Ramo</th>
                  <th className="p-4">Mensagem</th>
                  <th className="p-4">Data de Entrada</th>
                  <th className="p-4">Estado</th>
                  <th className="p-4 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rentalRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-800">{req.companyName || 'Pessoa Singular'}</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">Responsável: {req.contactName}</div>
                    </td>
                    <td className="p-4 space-y-1">
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <a href={`mailto:${req.email}`} className="hover:text-green transition-colors">{req.email}</a>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <a href={`tel:${req.phone}`} className="hover:text-green transition-colors">{req.phone}</a>
                      </div>
                      {req.whatsapp && (
                        <div className="text-[10px] text-emerald-600 font-semibold">
                          WhatsApp: {req.whatsapp}
                        </div>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-primary">{req.requestedArea}</div>
                      <div className="text-slate-400 text-[10px] mt-0.5">Ramo: {req.businessType}</div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="text-slate-600 leading-relaxed truncate hover:text-clip hover:whitespace-normal" title={req.message}>
                        {req.message}
                      </p>
                    </td>
                    <td className="p-4 text-slate-500 font-medium">
                      {formatDate(req.date)}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          req.status === 'novo'
                            ? 'bg-red-50 text-red-600 border border-red-200'
                            : req.status === 'respondido'
                            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                            : 'bg-slate-50 text-slate-500 border border-slate-200'
                        }`}
                      >
                        {req.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-2">
                        {req.status === 'novo' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'respondido')}
                            title="Marcar como Respondido"
                            className="p-1.5 rounded hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        {req.status !== 'arquivado' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'arquivado')}
                            title="Arquivar Pedido"
                            className="p-1.5 rounded hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
                          >
                            <Archive className="w-4 h-4" />
                          </button>
                        )}
                        {req.status === 'arquivado' && (
                          <button
                            onClick={() => handleStatusChange(req.id, 'novo')}
                            title="Reabrir Pedido"
                            className="p-1.5 rounded hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
                          >
                            <CheckCircle2 className="w-4 h-4" />
                          </button>
                        )}
                        <button
                          onClick={() => {
                            if (confirm('Tem a certeza que deseja excluir esta candidatura?')) {
                              deleteRentalRequest(req.id);
                            }
                          }}
                          title="Excluir Candidatura"
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
    </div>
  );
}
