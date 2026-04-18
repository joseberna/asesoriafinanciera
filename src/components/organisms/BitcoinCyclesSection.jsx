import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { Tooltip } from '../atoms/Tooltip';
import { 
  History, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Target, 
  Activity,
  AlertCircle,
  BarChart3,
  MousePointer2,
  ArrowRight
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BitcoinCyclesSection = () => {
  const { t } = useLanguage();
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { 
      id: 'accum', 
      title: t('mod2.cycleStage1'), 
      desc: t('mod2.cycleStage1Desc'), 
      icon: Target, 
      color: 'text-sol-green', 
      borderColor: 'border-sol-green',
      shadowColor: 'shadow-sol-green/20',
      progressColor: 'bg-sol-green',
      bg: 'bg-sol-green/10',
      tooltip: t('mod2.tooltipSmartMoney'),
      sentiment: t('mod2.sentFear')
    },
    { 
      id: 'bull', 
      title: t('mod2.cycleStage2'), 
      desc: t('mod2.cycleStage2Desc'), 
      icon: TrendingUp, 
      color: 'text-neon-accent', 
      borderColor: 'border-neon-accent',
      shadowColor: 'shadow-neon-accent/20',
      progressColor: 'bg-neon-accent',
      bg: 'bg-neon-accent/10',
      tooltip: t('mod2.tooltipFomo'),
      sentiment: t('mod2.sentOpt')
    },
    { 
      id: 'dist', 
      title: t('mod2.cycleStage3'), 
      desc: t('mod2.cycleStage3Desc'), 
      icon: Users, 
      color: 'text-btc-orange', 
      borderColor: 'border-btc-orange',
      shadowColor: 'shadow-btc-orange/20',
      progressColor: 'bg-btc-orange',
      bg: 'bg-btc-orange/10',
      tooltip: t('mod2.tooltipFomo'),
      sentiment: t('mod2.sentEuph')
    },
    { 
      id: 'bear', 
      title: t('mod2.cycleStage4'), 
      desc: t('mod2.cycleStage4Desc'), 
      icon: TrendingDown, 
      color: 'text-red-500', 
      borderColor: 'border-red-500',
      shadowColor: 'shadow-red-500/20',
      progressColor: 'bg-red-500',
      bg: 'bg-red-500/10',
      tooltip: t('mod2.tooltipSmartMoney'),
      sentiment: t('mod2.sentCap')
    }
  ];

  // Helper to get coordinates
  const getCoords = (index, total, radius) => {
    const angle = (index * (360 / total)) - 90;
    const x = Math.cos(angle * (Math.PI / 180)) * radius;
    const y = Math.sin(angle * (Math.PI / 180)) * radius;
    return { x, y };
  };

  return (
    <section className="space-y-10 py-16 border-t border-white/5 relative overflow-hidden">
      {/* Abstract Background Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-eth-blue/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sol-green/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Container */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 relative z-10">
        <div className="space-y-4 max-w-2xl">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-eth-blue font-bold text-sm uppercase tracking-tighter"
          >
            <Activity size={16} className="animate-pulse" />
            {t('mod2.ghStrategy')}
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            {t('mod2.cycleTitle')}
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            {t('mod2.cycleSubtitle')}
          </p>
        </div>
        
        <Tooltip content={t('mod2.dcaAdvice')} position="left">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3 bg-gradient-to-r from-sol-green/20 to-eth-blue/20 border border-white/10 px-6 py-4 rounded-2xl cursor-help backdrop-blur-md"
          >
            <BarChart3 className="text-sol-green" size={24} />
            <div className="flex flex-col">
              <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest leading-none mb-1">Market Edge</span>
              <span className="text-white font-black text-sm">{t('mod2.dcaOptimized')}</span>
            </div>
          </motion.div>
        </Tooltip>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start relative z-10">
        {/* Left: Interactive Orbital Cycle (8 cols) */}
        <Card className="lg:col-span-8 p-1 md:p-12 bg-crypto-surface-alt/30 border-gray-800/50 backdrop-blur-sm min-h-[550px] flex items-center justify-center relative">
           <div className="relative w-full max-w-[450px] aspect-square flex items-center justify-center">
              
              {/* Circular Orbit Path (SVG for precision) */}
              <svg className="absolute inset-0 w-full h-full -rotate-90 opacity-20" viewBox="0 0 100 100">
                <circle
                  cx="50" cy="50" r="35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="2 4"
                  className="text-gray-500"
                />
                {/* Active Segment Highlight */}
                <motion.circle
                  cx="50" cy="50" r="35"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeDasharray="219.9"
                  strokeDashoffset={219.9 - (219.9 * ((activeStage + 1) / 4))}
                  className={stages[activeStage].color}
                  transition={{ type: "spring", stiffness: 50, damping: 20 }}
                />
              </svg>

              {/* Central Core */}
              <motion.div 
                animate={{ 
                  boxShadow: [
                    `0 0 20px rgba(98, 126, 234, 0.1)`,
                    `0 0 40px rgba(98, 126, 234, 0.2)`,
                    `0 0 20px rgba(98, 126, 234, 0.1)`
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative z-0 w-28 h-28 md:w-36 md:h-36 rounded-full bg-crypto-bg border-4 border-eth-blue/30 flex flex-col items-center justify-center text-center p-4"
              >
                 <History className="text-eth-blue mb-1 opacity-50" size={32} />
                 <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter leading-tight">Bitcoin<br/>Clock</span>
              </motion.div>

              {/* Orbital Nodes */}
              {stages.map((stage, i) => {
                const { x, y } = getCoords(i, 4, 150); // Radius 150px
                const isActive = activeStage === i;

                return (
                  <div 
                    key={stage.id}
                    className={`absolute transition-all duration-700 ease-in-out ${isActive ? 'z-40' : 'z-20 hover:z-50'}`}
                    style={{ 
                      transform: `translate(${x}px, ${y}px)`,
                    }}
                  >
                    <Tooltip content={stage.tooltip} position={i === 0 ? 'bottom' : i === 2 ? 'top' : i === 1 ? 'left' : 'right'}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveStage(i)}
                        className={`group relative flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-3xl transition-all duration-500 ${
                          isActive 
                            ? `bg-crypto-bg border-2 ${stage.borderColor} shadow-[0_0_30px_rgba(0,0,0,0.5)] ${stage.shadowColor}` 
                            : 'bg-crypto-bg/40 border border-gray-800 hover:border-gray-600'
                        }`}
                      >
                         <stage.icon 
                           className={`transition-colors duration-500 ${isActive ? stage.color : 'text-gray-500 group-hover:text-gray-300'}`} 
                           size={32} 
                         />
                         
                         {/* Connection Lines (Optional visual) */}
                         {isActive && (
                           <motion.div 
                             layoutId="active-ring"
                             className={`absolute -inset-2 rounded-[2rem] border-2 border-dashed ${stage.borderColor} opacity-30 animate-[spin_10s_linear_infinite]`}
                           />
                         )}

                         {/* Stage Label (Only visible when active or hovered) */}
                         <div className={`absolute -bottom-8 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest transition-opacity ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                           {stage.title.split(' ')[1]}
                         </div>
                      </motion.button>
                    </Tooltip>
                  </div>
                );
              })}

              {/* Instructional Pointer (Moved slightly outside/on the edge for clarity) */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 text-gray-500 text-[10px] font-bold animate-bounce whitespace-nowrap opacity-60">
                <MousePointer2 size={12} />
                {t('mod2.clickNodes')}
              </div>
           </div>
        </Card>

        {/* Right: Stage Details & Trend (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
           {/* Detailed Card */}
           <Card className="p-8 border-gray-800 bg-crypto-surface-alt/40 min-h-[300px]">
             <AnimatePresence mode="wait">
               <motion.div
                 key={activeStage}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -20 }}
                 className="space-y-6"
               >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                    <div className={`w-2 h-2 rounded-full animate-pulse ${stages[activeStage].bg.replace('bg-', 'bg-').split('/')[0] === 'bg-sol-green' ? 'bg-sol-green' : stages[activeStage].color.replace('text-', 'bg-')}`} />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                       {t('mod2.sentimentLabel')}: {stages[activeStage].sentiment}
                    </span>
                  </div>

                  <h3 className="text-3xl font-black text-white leading-tight">
                    {stages[activeStage].title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {stages[activeStage].desc}
                  </p>

                  <div className="pt-4 flex items-center gap-4">
                     <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(activeStage + 1) * 25}%` }}
                          className={`h-full ${stages[activeStage].progressColor}`} 
                        />
                     </div>
                     <span className="text-xs font-mono text-gray-500">{(activeStage + 1) * 25}% {activeStage === 3 ? 'Finalizado' : 'Progreso'}</span>
                  </div>
               </motion.div>
             </AnimatePresence>
           </Card>

           {/* Trend Card - ENHANCED EDUCATIONAL VALUE */}
           <Card className="p-6 border-l-4 border-l-neon-accent bg-crypto-surface-alt/20">
              <div className="space-y-4">
                 <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white flex items-center gap-2">
                       <TrendingUp className="text-neon-accent" size={18} />
                       La Escalera del Valor
                    </h4>
                 </div>
                 
                 <p className="text-[11px] text-gray-400 leading-relaxed font-bold">
                    ¿Sabías que tras cada ciclo el precio nunca vuelve a sus mínimos anteriores?
                 </p>

                 <div className="flex items-end gap-1 h-12">
                   {[30, 50, 45, 70, 60, 100].map((h, i) => (
                      <div 
                        key={i} 
                        className={`flex-1 rounded-t-sm transition-all duration-1000 ${i === 5 ? 'bg-neon-accent shadow-[0_-5px_10px_rgba(0,255,204,0.3)]' : 'bg-neon-accent/20'}`} 
                        style={{ height: `${h}%` }}
                      />
                   ))}
                 </div>
                 
                 <p className="text-[10px] text-gray-400 bg-white/5 p-2 rounded leading-tight">
                    El Halving reduce la oferta, obligando al precio a buscar un "Piso Ascendente" (Higher Low). Es la prueba matemática de la deflación.
                 </p>
              </div>
           </Card>
        </div>
      </div>

      {/* Connection Indicator for next section */}
      <div className="flex justify-center pt-8">
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-gray-700"
        >
          <ArrowRight size={32} className="rotate-90" />
        </motion.div>
      </div>
    </section>
  );
};
