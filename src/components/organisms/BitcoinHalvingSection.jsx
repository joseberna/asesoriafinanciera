import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { Tooltip } from '../atoms/Tooltip';
import { 
  TrendingUp, 
  Zap, 
  Database, 
  Cpu, 
  Clock, 
  ArrowRight,
  Info,
  Layers
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BitcoinHalvingSection = () => {
  const { t } = useLanguage();
  const [activeHalving, setActiveHalving] = useState(3); // Default to 2024

  const halvings = [
    { year: 2012, reward: '25 BTC', supply: '3,600 BTC/day', price: '$12 -> $1,100', text: t('mod2.year2012'), color: '#f59e0b' },
    { year: 2016, reward: '12.5 BTC', supply: '1,800 BTC/day', price: '$650 -> $20,000', text: t('mod2.year2016'), color: '#3b82f6' },
    { year: 2020, reward: '6.25 BTC', supply: '900 BTC/day', price: '$8,000 -> $69,000', text: t('mod2.year2020'), color: '#10b981' },
    { year: 2024, reward: '3.125 BTC', supply: '450 BTC/day', price: '$70,000 -> ???', text: t('mod2.year2024'), color: '#8b5cf6' },
  ];

  return (
    <section className="space-y-10 py-8">
      {/* Header Section */}
      <div className="space-y-4">
        <h2 className="text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r from-btc-orange to-yellow-500">
          {t('mod2.halvingTitle')}
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
          {t('mod2.halvingIntro')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-stretch">
        {/* Animated Explanation Card */}
        <Card className="p-8 border-l-4 border-l-btc-orange bg-crypto-surface/40 backdrop-blur-md">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Zap className="text-btc-orange" size={28} />
              <h3 className="text-2xl font-bold text-white">{t('mod2.effectTitle')}</h3>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              {t('mod2.halvingExplain')}
            </p>

            <div className="relative h-48 bg-black/40 rounded-2xl border border-white/5 flex items-center justify-center overflow-hidden p-6 gap-4">
               {/* Left: Supply (Decreasing blocks) */}
               <div className="flex flex-col items-center gap-2">
                 <motion.div 
                   animate={{ 
                     opacity: [1, 0.4, 1],
                     scale: [1, 0.9, 1]
                   }}
                   transition={{ duration: 2, repeat: Infinity }}
                   className="flex gap-1"
                 >
                   {[...Array(4)].map((_, i) => (
                     <div key={i} className="w-4 h-4 rounded bg-btc-orange/80" />
                   ))}
                 </motion.div>
                 <span className="text-[10px] uppercase font-bold text-gray-400">Oferta (Supply)</span>
               </div>

               {/* Center Arrow */}
               <motion.div
                 animate={{ x: [0, 10, 0] }}
                 transition={{ duration: 1.5, repeat: Infinity }}
               >
                 <ArrowRight className="text-white/20" size={32} />
               </motion.div>

               {/* Right: Price (Increasing) */}
               <div className="flex flex-col items-center gap-2">
                 <motion.div
                   animate={{ 
                     y: [0, -10, 0],
                     scale: [1, 1.2, 1]
                   }}
                   transition={{ duration: 1.5, repeat: Infinity }}
                   className="flex items-end gap-1"
                 >
                    <TrendingUp className="text-sol-green" size={40} />
                 </motion.div>
                 <span className="text-[10px] uppercase font-bold text-gray-400">Precio (Price)</span>
               </div>

               {/* Background Glow */}
               <div className="absolute inset-0 bg-gradient-to-tr from-btc-orange/10 to-transparent pointer-events-none" />
            </div>

            <p className="text-gray-400 text-sm italic">
              {t('mod2.effectDesc')}
            </p>
          </div>
        </Card>

        {/* Emulator/Simulator Card */}
        <Card className="p-8 border-gray-800 bg-crypto-surface/20 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Database size={20} className="text-eth-blue" />
                {t('mod2.emulatorTitle')}
              </h3>
              <div className="flex gap-2">
                {halvings.map((h, i) => (
                  <button
                    key={h.year}
                    onClick={() => setActiveHalving(i)}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                      activeHalving === i 
                        ? 'bg-btc-orange text-black scale-110' 
                        : 'bg-white/5 text-gray-400 hover:bg-white/10'
                    }`}
                  >
                    {h.year}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeHalving}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-2 text-btc-orange font-black text-2xl">
                    <Clock size={24} />
                    {halvings[activeHalving].year}
                  </div>
                  <p className="text-gray-300">
                    {halvings[activeHalving].text}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Tooltip content={t('mod2.tooltipReward')}>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5 cursor-help">
                      <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                        {t('mod2.tooltipReward').includes(':') ? t('mod2.tooltipReward').split(':')[0] : 'Recompensa'}
                      </div>
                      <div className="text-white font-mono flex items-center gap-2">
                        <Cpu size={14} className="text-eth-blue" />
                        {halvings[activeHalving].reward}
                      </div>
                    </div>
                  </Tooltip>

                  <Tooltip content={t('mod2.tooltipSupply')}>
                    <div className="p-4 bg-black/40 rounded-xl border border-white/5 cursor-help">
                      <div className="text-[10px] text-gray-500 uppercase font-bold mb-1">
                        {t('mod2.tooltipSupply').includes(':') ? t('mod2.tooltipSupply').split(':')[0] : 'Emisión'}
                      </div>
                      <div className="text-white font-mono flex items-center gap-2">
                        <Layers size={14} className="text-sol-green" />
                        {halvings[activeHalving].supply}
                      </div>
                    </div>
                  </Tooltip>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase">
              <Info size={14} />
              {t('mod2.nextHalving')}
            </div>
            <div className="text-btc-orange font-bold text-sm">
              21,000,000 MAX
            </div>
          </div>
        </Card>
      </div>

      {/* SEO/CTA Footer for the section */}
      <div className="flex flex-wrap items-center gap-4 p-6 bg-gradient-to-r from-btc-orange/5 to-transparent rounded-2xl border border-btc-orange/10">
        <TrendingUp className="text-btc-orange" size={24} />
        <span className="text-gray-300 font-medium">
          DCA es la mejor estrategia para aprovechar la escasez de Bitcoin a largo plazo.
        </span>
      </div>
    </section>
  );
};
