import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { Tooltip } from '../atoms/Tooltip';
import { Button } from '../atoms/Button';
import { 
  Coins, 
  Layers, 
  PiggyBank, 
  ShieldCheck, 
  Zap, 
  ExternalLink, 
  AlertTriangle,
  ArrowRightLeft,
  Info,
  Activity
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis } from 'recharts';

export const DefiModule = () => {
  const { t } = useLanguage();
  
  // Staking State
  const [stakingAmount, setStakingAmount] = useState(1000);
  const [selectedChain, setSelectedChain] = useState('ETH');
  
  // Loan State
  const [collateralAmount, setCollateralAmount] = useState(2000);
  const [ltv, setLtv] = useState(50);
  
  const chains = {
    ETH: { name: 'Ethereum', apr: 3.5, color: '#627EEA' },
    SOL: { name: 'Solana', apr: 7.2, color: '#14F195' },
    ADA: { name: 'Cardano', apr: 3.1, color: '#0033AD' },
    DOT: { name: 'Polkadot', apr: 14.5, color: '#E6007A' },
  };

  const calculateStakingRewards = useMemo(() => {
    const annualReward = stakingAmount * (chains[selectedChain].apr / 100);
    return {
      annual: annualReward,
      monthly: annualReward / 12,
      daily: annualReward / 365
    };
  }, [stakingAmount, selectedChain]);

  const loanAmount = (collateralAmount * ltv) / 100;
  const liquidationThreshold = 80; // 80% LTV

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-16 pb-20"
    >
      {/* Header Section */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-2">
          <Zap size={14} /> {t('mod5.tag')}
        </div>
        <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          {t('mod5.title')}
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
          {t('mod5.intro')}
        </p>
      </section>

      {/* 1. STAKING SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Layers className="text-white" size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-white">{t('mod5.stakingTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('mod5.stakingDesc')}</p>
           </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
           {/* Blockchain Info */}
           <Card className="lg:col-span-1 border-gray-800 bg-gray-950/50 p-6 space-y-6">
              <h4 className="text-sm font-black text-gray-500 uppercase tracking-widest">{t('mod5.stakingBlockchains')}</h4>
              <div className="space-y-4">
                 {Object.entries(chains).map(([key, chain]) => (
                    <div 
                      key={key}
                      onClick={() => setSelectedChain(key)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex justify-between items-center ${selectedChain === key ? 'border-cyan-500 bg-cyan-500/10' : 'border-gray-800 hover:border-gray-700 bg-black/40'}`}
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs" style={{ backgroundColor: chain.color + '20', color: chain.color }}>
                             {key[0]}
                          </div>
                          <span className="font-bold text-white text-sm">{chain.name}</span>
                       </div>
                       <span className="font-mono font-bold text-cyan-400">~{chain.apr}%</span>
                    </div>
                 ))}
              </div>
           </Card>

           {/* Staking Simulator */}
           <Card className="lg:col-span-2 border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                 <Coins size={120} className="text-cyan-500" />
              </div>

              <div className="relative z-10 space-y-8">
                 <h4 className="text-xl font-bold text-white flex items-center gap-2 mb-4">
                    <Tooltip content={t('mod5.stakingSimTitle')}>
                       <div className="flex items-center gap-2 cursor-help font-black tracking-tight uppercase">
                          <Activity size={20} className="text-cyan-400" />
                          {t('mod5.stakingSimTitle')}
                       </div>
                    </Tooltip>
                 </h4>
                 <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-6">
                       <div>
                          <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-3">
                             {t('mod5.stakingLabel')}
                          </label>
                          <div className="relative">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500 font-bold">$</span>
                             <input 
                               type="number" 
                               value={stakingAmount}
                               onChange={(e) => setStakingAmount(Number(e.target.value))}
                               className="w-full bg-black border border-gray-800 rounded-2xl pl-10 pr-4 py-4 text-white text-2xl font-black focus:outline-none focus:border-cyan-500 transition-all shadow-inner"
                             />
                          </div>
                       </div>
                       
                       <div className="p-4 rounded-2xl bg-cyan-500/5 border border-cyan-500/10">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-xs font-bold text-gray-400 uppercase">{t('mod5.apyEstimated')}</span>
                             <span className="text-cyan-400 font-black">{chains[selectedChain].apr}%</span>
                          </div>
                          <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                             <motion.div 
                               initial={{ width: 0 }}
                               animate={{ width: `${(chains[selectedChain].apr / 15) * 100}%` }}
                               className="h-full bg-cyan-500"
                             />
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col justify-center gap-4">
                       <div className="bg-black/60 p-5 rounded-2xl border border-gray-800 flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-400 uppercase">{t('mod5.annualGain')}</span>
                          <span className="text-2xl font-black text-white font-mono">${calculateStakingRewards.annual.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                       </div>
                       <div className="bg-black/60 p-5 rounded-2xl border border-gray-800 flex justify-between items-center">
                          <span className="text-sm font-bold text-gray-400 uppercase">{t('mod5.monthlyAvg')}</span>
                          <span className="text-xl font-black text-cyan-400 font-mono">${calculateStakingRewards.monthly.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                       </div>
                       <div className="text-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
                          {t('mod5.stakingDisclaimer')}
                       </div>
                    </div>
                 </div>
              </div>
           </Card>
        </div>
      </section>

      {/* 2. LENDING & COLLATERAL SECTION */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg shadow-purple-500/20">
              <ShieldCheck className="text-white" size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-white">{t('mod5.loansTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('mod5.loansDesc')}</p>
           </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
           <Card className="border-gray-800 bg-gray-900/40 p-8 space-y-6">
              <div className="space-y-4">
                 <h4 className="text-xl font-bold text-white flex items-center gap-2">
                    <ArrowRightLeft className="text-purple-400" size={20} /> {t('mod5.collateralTitle')}
                 </h4>
                 <p className="text-gray-400 text-sm leading-relaxed">
                    {t('mod5.collateralDesc')}
                 </p>
                 <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                    <div className="flex items-start gap-3">
                       <Info className="text-purple-400 flex-shrink-0 mt-1" size={18} />
                       <div>
                          <span className="text-sm font-bold text-purple-200 block mb-1">{t('mod5.ltvTitle')}</span>
                          <p className="text-xs text-purple-300 opacity-70">{t('mod5.ltvDesc')}</p>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="space-y-8 pt-4">
                 <div>
                    <div className="flex justify-between items-center mb-3">
                       <label className="text-xs font-black text-gray-500 uppercase tracking-widest">{t('mod5.collateralLabel')}</label>
                       <span className="text-purple-400 font-black">${collateralAmount.toLocaleString()}</span>
                    </div>
                    <input 
                      type="range" min="500" max="10000" step="100"
                      value={collateralAmount}
                      onChange={(e) => setCollateralAmount(Number(e.target.value))}
                      className="w-full accent-purple-500 h-2 bg-gray-800 rounded-lg cursor-pointer"
                    />
                 </div>

                 <div>
                    <div className="flex justify-between items-center mb-3">
                       <label className="text-xs font-black text-gray-500 uppercase tracking-widest">{t('mod5.leverageLabel')}</label>
                       <span className={`font-black ${ltv > 70 ? 'text-red-500' : 'text-purple-400'}`}>{ltv}%</span>
                    </div>
                    <input 
                      type="range" min="10" max="85" 
                      value={ltv}
                      onChange={(e) => setLtv(Number(e.target.value))}
                      className="w-full accent-purple-500 h-2 bg-gray-800 rounded-lg cursor-pointer"
                    />
                 </div>
              </div>
           </Card>

           <div className="space-y-6">
              <Card className={`h-full border-2 transition-all duration-500 p-8 flex flex-col justify-center items-center text-center relative overflow-hidden ${ltv > 75 ? 'border-red-500/50 bg-red-950/20 shadow-[0_0_40px_rgba(239,68,68,0.1)]' : 'border-gray-800 bg-black/40'}`}>
                 <h4 className="text-gray-500 text-xs font-black uppercase tracking-widest mb-6">{t('mod5.loanAvailable')}</h4>
                 
                 <div className="relative mb-8">
                    <motion.p 
                      key={loanAmount}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className={`text-6xl md:text-7xl font-black font-mono tracking-tighter ${ltv > 75 ? 'text-red-500' : 'text-white'}`}
                    >
                       ${loanAmount.toLocaleString()}
                    </motion.p>
                    {ltv > 75 && (
                       <motion.div 
                         animate={{ scale: [1, 1.1, 1] }}
                         transition={{ repeat: Infinity, duration: 2 }}
                         className="absolute -top-4 -right-4"
                       >
                          <AlertTriangle className="text-red-500" size={32} />
                       </motion.div>
                    )}
                 </div>

                 <div className="w-full grid grid-cols-2 gap-4">
                    <div className="bg-black/60 p-4 rounded-xl border border-gray-800">
                       <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">{t('mod5.liqRisk')}</p>
                       <p className={`text-lg font-black ${ltv > 75 ? 'text-red-500' : ltv > 50 ? 'text-yellow-500' : 'text-green-500'}`}>
                          {ltv > 75 ? t('mod5.liqHigh') : ltv > 50 ? t('mod5.liqMedium') : t('mod5.liqSafe')}
                       </p>
                    </div>
                    <div className="bg-black/60 p-4 rounded-xl border border-gray-800">
                       <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">{t('mod5.safetyLimit')}</p>
                       <p className="text-lg font-black text-gray-300">80% LTV</p>
                    </div>
                 </div>

                 {ltv > 75 && (
                    <p className="mt-6 text-xs text-red-400 font-bold max-w-xs uppercase leading-tight">
                       {t('mod5.dangerMsg')}
                    </p>
                 )}
              </Card>
           </div>
        </div>
      </section>

      {/* 3. EARNS & RISKS */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
              <PiggyBank className="text-white" size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-white">{t('mod5.earnsTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('mod5.earnsDesc')}</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
           <Card className="border-gray-800 bg-gray-950/50 p-6 hover:border-green-500/30 transition-colors group">
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <h4 className="text-lg font-bold text-white mb-2">{t('mod5.lpTitle')}</h4>
                    <p className="text-gray-400 text-xs leading-relaxed">{t('mod5.lpDesc')}</p>
                 </div>
                 <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 group-hover:bg-green-500 group-hover:text-black transition-all">
                    <Coins size={20} />
                 </div>
              </div>
              <div className="flex gap-2">
                 <div className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-md text-[10px] font-bold text-green-400 uppercase">{t('mod5.yieldFarming')}</div>
                 <div className="px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-md text-[10px] font-bold text-blue-400 uppercase">{t('mod5.tradingFees')}</div>
              </div>
           </Card>

           <Card className="border-red-900/30 bg-red-950/10 p-6">
              <h4 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                 <AlertTriangle size={20} /> {t('mod5.warningsTitle')}
              </h4>
              <ul className="space-y-3">
                 <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">{t('mod5.warningSmartContract')}</span>
                 </li>
                 <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 flex-shrink-0" />
                    <span className="text-gray-400 text-sm">{t('mod5.warningIL')}</span>
                 </li>
              </ul>
           </Card>
        </div>
      </section>

      {/* 4. CTA / GROWTH HACKING SECTION */}
      <section className="pt-8">
        <div className="bg-gradient-to-r from-cyan-600/20 via-purple-600/20 to-blue-600/20 p-1 rounded-3xl">
           <div className="bg-gray-950 p-8 md:p-12 rounded-[22px] text-center space-y-8 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-blue-500"></div>
              
              <div className="space-y-4 relative z-10">
                 <h3 className="text-3xl font-black text-white">{t('mod5.ctaTitle')}</h3>
                 <p className="text-gray-400 max-w-2xl mx-auto">
                    {t('mod5.ctaDesc')}
                 </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 relative z-10">
                 {[
                   { name: 'Aave', desc: t('mod5.ctaAave'), link: 'https://aave.com/', color: 'from-blue-500 to-cyan-500' },
                   { name: 'Lido', desc: t('mod5.ctaLido'), link: 'https://lido.fi/', color: 'from-cyan-400 to-blue-400' },
                   { name: 'Jupiter', desc: t('mod5.ctaJupiter'), link: 'https://jup.ag/', color: 'from-emerald-400 to-cyan-400' }
                 ].map((protocol) => (
                    <a 
                      key={protocol.name}
                      href={protocol.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group"
                    >
                       <Card className="h-full border-gray-800 group-hover:border-white/20 transition-all bg-black/40 p-6 flex flex-col justify-between text-left">
                          <div>
                             <h4 className="text-xl font-black text-white mb-2">{protocol.name}</h4>
                             <p className="text-gray-500 text-xs mb-6 group-hover:text-gray-300 transition-colors uppercase font-bold tracking-tighter">{protocol.desc}</p>
                          </div>
                          <div className={`w-full py-3 rounded-xl bg-gradient-to-r ${protocol.color} text-black font-black text-xs uppercase tracking-widest text-center flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform`}>
                             {t('mod5.launchApp')} <ExternalLink size={14} />
                          </div>
                       </Card>
                    </a>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* SEO / GROWTH FOOTER */}
      <footer className="text-center space-y-4 pt-10">
         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.2em]">
            {t('mod5.footer')}
         </p>
      </footer>
    </motion.div>
  );
};
