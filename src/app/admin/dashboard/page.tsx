'use client';

import React, { useState, useEffect } from 'react';
import { useDatabase } from '../../../context/DatabaseContext';
import {
  Building,
  Store,
  FileText,
  Percent,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { spaces, stores, rentalRequests, restaurants } = useDatabase();
  const [greeting, setGreeting] = useState('');

  // Dynamic greeting based on time
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 6 && hour < 12) {
      setGreeting('Bom dia');
    } else if (hour >= 12 && hour < 18) {
      setGreeting('Boa tarde');
    } else {
      setGreeting('Boa noite');
    }
  }, []);

  // Calculations
  const totalSpaces = spaces.length;
  const occupiedSpaces = spaces.filter((s) => s.status === 'ocupado').length;
  const reservedSpaces = spaces.filter((s) => s.status === 'reservado').length;
  const availableSpaces = spaces.filter((s) => s.status === 'disponivel').length;

  const occupancyRate = totalSpaces > 0 ? Math.round((occupiedSpaces / totalSpaces) * 100) : 0;
  const pendingRequests = rentalRequests.filter((r) => r.status === 'novo').length;

  // Recent 3 requests
  const recentRequests = rentalRequests.slice(0, 3);

  // Group stores by category
  const categoriesCount = stores.reduce((acc: { [key: string]: number }, store) => {
    acc[store.category] = (acc[store.category] || 0) + 1;
    return acc;
  }, {});

  const stats = [
    {
      title: 'Taxa de Ocupação',
      value: `${occupancyRate}%`,
      subtitle: `${occupiedSpaces} de ${totalSpaces} lojas arrendadas`,
      icon: Percent,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200'
    },
    {
      title: 'Espaços Livres',
      value: availableSpaces,
      subtitle: `${reservedSpaces} espaços em reserva`,
      icon: Building,
      color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
    },
    {
      title: 'Lojas Ativas',
      value: stores.length,
      subtitle: `${restaurants.length} restaurantes na praça`,
      icon: Store,
      color: 'bg-amber-500/10 text-amber-600 border-amber-200'
    },
    {
      title: 'Novos Pedidos',
      value: pendingRequests,
      subtitle: 'Pedidos aguardando resposta',
      icon: FileText,
      color: 'bg-red-500/10 text-red-600 border-red-200'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-primary to-primary-light text-white p-6 rounded-xl border border-green/20 flex flex-col sm:flex-row justify-between sm:items-center gap-4 green-glow"
      >
        <div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-serif text-2xl font-bold"
          >
            {greeting}, Administrador!
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xs text-white/70 mt-1"
          >
            Aqui está o resumo geral das operações, arrendamentos e contactos do Miriam Mall de hoje.
          </motion.p>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 px-4 py-2 rounded text-xs font-semibold flex items-center gap-2 shrink-0 self-start sm:self-auto"
        >
          <TrendingUp className="w-4 h-4 text-green" />
          <span>Homoíne em Crescimento</span>
        </motion.div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-white p-6 rounded-xl border border-slate-200 flex items-center justify-between shadow-sm cursor-pointer transition-all duration-300"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  {stat.title}
                </span>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 + 0.1 * i, type: 'spring', stiffness: 200 }}
                  className="text-3xl font-bold text-slate-800 block"
                >
                  {stat.value}
                </motion.span>
                <span className="text-xs text-slate-500 block mt-1">{stat.subtitle}</span>
              </div>
              <motion.div
                initial={{ rotate: -10, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.3 + 0.1 * i, type: 'spring', stiffness: 200 }}
                className={`w-12 h-12 rounded-lg border flex items-center justify-center shrink-0 ${stat.color}`}
              >
                <Icon className="w-6 h-6" />
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Grid Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column (2 cols) - Leads & Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Rental Requests */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
              <h3 className="font-serif text-sm font-bold text-slate-700 uppercase tracking-wider">
                Pedidos de Arrendamento Recentes
              </h3>
              <Link
                href="/admin/pedidos"
                className="text-[10px] font-bold uppercase tracking-wider text-green hover:text-green-dark flex items-center gap-1 transition-colors"
              >
                Ver Todos <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="divide-y divide-slate-100">
              {recentRequests.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-400">Nenhum pedido recebido.</div>
              ) : (
                recentRequests.map((req, idx) => (
                  <motion.div
                    key={req.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + idx * 0.1 }}
                    className="p-6 flex items-start justify-between gap-4 hover:bg-slate-50 transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-800 text-sm">{req.companyName}</span>
                        <span className="text-[10px] text-slate-400">({req.businessType})</span>
                      </div>
                      <div className="text-xs text-slate-500">
                        Responsável: <span className="font-medium">{req.contactName}</span> | Área Pretendida:{' '}
                        <span className="font-medium text-primary">{req.requestedArea}</span>
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1 italic mt-1">
                        "{req.message}"
                      </p>
                    </div>

                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer transition-transform ${
                        req.status === 'novo'
                          ? 'bg-red-50 text-red-600 border border-red-200'
                          : req.status === 'respondido'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                          : 'bg-slate-50 text-slate-500 border border-slate-200'
                      }`}
                    >
                      {req.status}
                    </motion.span>
                  </motion.div>
                ))
              )}
            </div>
          </motion.div>

          {/* Occupancy visual summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4"
          >
            <h3 className="font-serif text-sm font-bold text-slate-700 uppercase tracking-wider">
              Estado Físico dos Espaços Comerciais
            </h3>
            <div className="space-y-3">
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden flex">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(occupiedSpaces / totalSpaces) * 100}%` }}
                  transition={{ delay: 1, duration: 0.8 }}
                  className="bg-primary h-full"
                ></motion.div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(reservedSpaces / totalSpaces) * 100}%` }}
                  transition={{ delay: 1.1, duration: 0.8 }}
                  className="bg-amber-500 h-full"
                ></motion.div>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${(availableSpaces / totalSpaces) * 100}%` }}
                  transition={{ delay: 1.2, duration: 0.8 }}
                  className="bg-emerald-500 h-full"
                ></motion.div>
              </div>
              <div className="flex flex-wrap gap-4 text-xs font-semibold">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="w-3 h-3 bg-primary rounded-sm" /> Ocupados ({occupiedSpaces})
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="w-3 h-3 bg-amber-500 rounded-sm" /> Reservados ({reservedSpaces})
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                  className="flex items-center gap-1.5"
                >
                  <span className="w-3 h-3 bg-emerald-500 rounded-sm" /> Disponíveis ({availableSpaces})
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Column (1 col) - Categories Overview */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6"
        >
          <h3 className="font-serif text-sm font-bold text-slate-700 uppercase tracking-wider pb-2 border-b border-slate-100">
            Categorias de Lojas
          </h3>

          <div className="space-y-4">
            {Object.keys(categoriesCount).length === 0 ? (
              <div className="text-center text-xs text-slate-400 py-6">Nenhuma loja ativa.</div>
            ) : (
              Object.entries(categoriesCount).map(([catName, count], idx) => {
                const percentage = Math.round((count / stores.length) * 100);
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + idx * 0.1 }}
                    className="space-y-1.5"
                  >
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-semibold text-slate-700">{catName}</span>
                      <span className="text-slate-400 font-bold">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: 1 + idx * 0.1, duration: 0.6 }}
                        className="bg-green h-full rounded-full"
                      ></motion.div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="bg-slate-50 p-4 rounded border border-slate-150 text-xs text-slate-500 leading-relaxed"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-600 inline mr-1 mb-0.5" />
            Adicione novas marcas no menu <strong>Lojas</strong> para ver os dados atualizados aqui em tempo real.
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
