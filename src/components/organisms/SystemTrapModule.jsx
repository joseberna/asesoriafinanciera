import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../atoms/Card';
import { TrendingDown, Coins, BookOpen } from 'lucide-react';
import { HistoryDragDrop } from './HistoryDragDrop';
import { ControlOfMoneyActivity } from './ControlOfMoneyActivity';
import { useLanguage } from '../../context/LanguageContext';
import { Tooltip } from '../atoms/Tooltip';

export const SystemTrapModule = () => {
  const { t } = useLanguage();
  const [fiatAmount, setFiatAmount] = useState(1000000);
  const [years, setYears] = useState(5);
  const [inflationRate, setInflationRate] = useState(12);
  
  const calculateLoss = () => {
    return fiatAmount * Math.pow((1 - inflationRate / 100), years);
  };

  const finalValue = calculateLoss();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* -------------------------------------------------------------------------------- */}
      {/* 1. SECCIÓN EDUCATIVA (COMO PIDIÓ EL USUARIO) */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-8">
        <div className="space-y-4">
          <Tooltip content={t('tooltips.mod1Title')}>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 inline-block cursor-help">
              {t('mod1.title')}
            </h2>
          </Tooltip>
        </div>

        {/* EDUCACIONAL: Historia del dinero */}
        <Card className="border-gray-800 border-l-4 border-l-btc-orange">
          <div className="flex gap-4">
            <BookOpen className="text-btc-orange flex-shrink-0" size={24} />
            <div>
              <Tooltip content={t('tooltips.history')}>
                <h3 className="text-xl font-bold text-gray-200 mb-2 cursor-help">{t('mod1.historyTitle')}</h3>
              </Tooltip>
              <p className="text-gray-400 leading-relaxed text-sm">
                {t('mod1.historyDesc')}
              </p>
            </div>
          </div>
        </Card>

        {/* EDUCACIONAL: Quién controla tu dinero */}
        <Card className="border-gray-800 border-l-4 border-l-red-500">
          <div className="flex gap-4">
            <BookOpen className="text-red-500 flex-shrink-0" size={24} />
            <div>
              <Tooltip content={t('tooltips.control')}>
                <h3 className="text-xl font-bold text-gray-200 mb-2 cursor-help">{t('mod1.controlTitle')}</h3>
              </Tooltip>
              <p className="text-gray-400 leading-relaxed text-sm">
                {t('mod1.controlDesc')}
              </p>
            </div>
          </div>
        </Card>

        {/* EDUCACIONAL: Inflación Sistemática */}
        <Card className="border-gray-800 border-l-4 border-l-yellow-500">
          <div className="flex gap-4">
            <BookOpen className="text-yellow-500 flex-shrink-0" size={24} />
            <div>
              <Tooltip content={t('tooltips.inflation')}>
                <h3 className="text-xl font-bold text-gray-200 mb-2 cursor-help">{t('mod1.inflationTitle')}</h3>
              </Tooltip>
              <p className="text-gray-400 leading-relaxed text-sm">
                {t('mod1.inflationDesc')}
              </p>
            </div>
          </div>
        </Card>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* 2. SECCIÓN DE ACTIVIDADES PRÁCTICAS Y EVALUATORIAS (UX & GROWTH HACKING) */}
      {/* -------------------------------------------------------------------------------- */}

      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Actividades Evaluatorias</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <section className="space-y-8">
        
        {/* ACTIVIDAD 1: DRAG AND DROP (Historia) */}
        <HistoryDragDrop />

        {/* ACTIVIDAD 2: CONTROL (Pirámide vs Red) */}
        <ControlOfMoneyActivity />

        {/* ACTIVIDAD 3: CALCULADORA DE INFLACIÓN */}
        <Card aura className="border-red-900/40">
          <div className="flex items-center gap-3 mb-6">
            <TrendingDown className="text-red-500" size={28} />
            <Tooltip content={t('tooltips.fiatCalc')}>
              <h3 className="text-xl font-bold text-gray-200 cursor-help">{t('mod1.activity2Title')}</h3>
            </Tooltip>
          </div>
          
          <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-gray-800">
            {t('mod1.activity2Desc')}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Monto inicial (COP)</label>
                <input 
                  type="number" 
                  value={fiatAmount}
                  onChange={(e) => setFiatAmount(Number(e.target.value))}
                  className="w-full bg-crypto-surface border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Años retenidos en el banco: {years}</label>
                <input 
                  type="range" 
                  min="1" max="20" 
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full accent-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 mb-2">Inflación Estimada Anual: {inflationRate}%</label>
                <input 
                  type="range" 
                  min="2" max="50" 
                  value={inflationRate}
                  onChange={(e) => setInflationRate(Number(e.target.value))}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>

            <div className="bg-crypto-bg rounded-xl p-6 border border-gray-800 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Coins size={100} className="text-red-500" />
              </div>
              
              <h4 className="text-gray-500 text-sm uppercase tracking-wider mb-2">Poder Adquisitivo Restante</h4>
              <div className="text-4xl font-mono font-bold text-red-500 mb-4 truncate" title={Math.round(finalValue).toLocaleString()}>
                ${Math.round(finalValue).toLocaleString()} COP
              </div>
              
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden w-full">
                <motion.div 
                  className="h-full bg-red-600"
                  initial={{ width: '100%' }}
                  animate={{ width: `${(finalValue / fiatAmount) * 100}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
              
              <p className="text-orange-400 mt-4 text-sm font-medium">
                Estarás perdiendo un {((1 - finalValue / fiatAmount) * 100).toFixed(1)}% de tu riqueza de forma invisible.
              </p>
            </div>
          </div>
        </Card>
      </section>

    </motion.div>
  );
};
