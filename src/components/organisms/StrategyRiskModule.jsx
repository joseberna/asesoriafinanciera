import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Tooltip } from '../atoms/Tooltip';
import { Button } from '../atoms/Button';
import { BookOpen, AlertTriangle, TrendingUp, Activity, BarChart2, Crosshair, Award, Eye, ExternalLink } from 'lucide-react';
import { module3QuizBank } from '../../data/quizDatabase';
import { useLanguage } from '../../context/LanguageContext';
import { InteractiveQuiz } from './InteractiveQuiz';

const simulatedPrices = [
  50000, 48000, 42000, 38000, 45000, 52000, 60000, 65000, 58000, 51000, 49000, 55000,
  62000, 70000, 85000, 78000, 72000, 68000, 75000, 82000, 95000, 105000, 110000, 120000
];

export const StrategyRiskModule = () => {
  const { t } = useLanguage();
  // DCA State
  const [weeklyAmount, setWeeklyAmount] = useState(100);
  const [duration, setDuration] = useState(12);

  // Leverage State
  const [margin, setMargin] = useState(1000);
  const [leverage, setLeverage] = useState(10);
  const [direction, setDirection] = useState('long');
  const [priceMove, setPriceMove] = useState(5);
  const entryPrice = 50000;


  const calculateDCA = useMemo(() => {
    let totalInvested = 0;
    let accumulatedBtc = 0;
    const data = [];

    for (let i = 0; i < duration; i++) {
        const monthlyAmount = weeklyAmount * 4; 
        const currentPrice = simulatedPrices[i % simulatedPrices.length];
        
        totalInvested += monthlyAmount;
        accumulatedBtc += (monthlyAmount / currentPrice);
        
        const avgBuyPrice = totalInvested / accumulatedBtc;
        const currentPortfolioValue = accumulatedBtc * currentPrice;

        data.push({
          month: `M${i+1}`,
          PrecioBTC: currentPrice,
          PrecioPromedio: avgBuyPrice,
          ValorPortafolio: currentPortfolioValue,
          TotalInvertido: totalInvested,
        });
    }
    return data;
  }, [weeklyAmount, duration]);

  const finalData = calculateDCA[calculateDCA.length - 1];

  // Liquidation Simulator
  const positionSize = margin * leverage;
  const currentPrice = entryPrice * (1 + (priceMove / 100));

  const bankruptcyPrice = direction === 'long' 
    ? entryPrice - (entryPrice / leverage)
    : entryPrice + (entryPrice / leverage);
    
  const liquidationPrice = direction === 'long'
    ? bankruptcyPrice * 1.005
    : bankruptcyPrice * 0.995;
    
  const percentToDrop = direction === 'long'
    ? ((entryPrice - liquidationPrice) / entryPrice) * 100
    : ((liquidationPrice - entryPrice) / entryPrice) * 100;
    
  const isLiquidated = direction === 'long'
    ? currentPrice <= liquidationPrice
    : currentPrice >= liquidationPrice;
    
  const pnlMultiplier = direction === 'long' ? 1 : -1;
  const priceDiffPercentage = (priceMove / 100) * pnlMultiplier;
  const pnlAmount = positionSize * priceDiffPercentage;
  const ROE = (pnlAmount / margin) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-16"
    >
      <div className="space-y-4">
        <Tooltip content="Protege tu capital dominando los gráficos institucionales y entendiendo tus niveles de liquidación.">
          <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-yellow-500 inline-block cursor-help">
            Estrategia de Cuentas, Derivados y Riesgo
          </h2>
        </Tooltip>
      </div>

      {/* -------------------------------------------------------------------------------- */}
      {/* 1. TRADING, FUTUROS Y CFDs */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">{t('mod3.s1Title')}</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Tooltip content={t('mod3.ttSpotTitle')}>
            <Card className="border-gray-800 hover:border-green-500/50 transition-colors cursor-help h-full">
              <h4 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2"><BookOpen size={20}/> {t('mod3.spotTitle')}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {t('mod3.spotDesc')}
              </p>
            </Card>
          </Tooltip>
          <Tooltip content={t('mod3.ttDerivTitle')}>
            <Card className="border-gray-800 hover:border-red-500/50 transition-colors cursor-help h-full">
              <h4 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2"><Activity size={20}/> {t('mod3.derivTitle')}</h4>
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {t('mod3.derivDesc')}
              </p>
            </Card>
          </Tooltip>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* 2. APALANCAMIENTO Y SIMULADOR DE LIQUIDACIÓN */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">2. Apalancamiento y Call de Margen (Liquidación)</h3>
        <p className="text-gray-400 text-sm">
          El apalancamiento convierte volatilidad inofensiva en un arma mortal. Con 10x, controlas 10 veces más dinero, pero <strong>una caída del 10% en el activo resulta en un -100% de tu margen</strong>, causando que el Exchange liquide (venda a la fuerza) tu posición y pierdas todo tu dinero instantáneamente.
        </p>

        <Card className={`border-gray-700 bg-gray-900 overflow-hidden relative font-sans p-6 md:p-8 transition-colors duration-500 ${isLiquidated ? 'border-red-500/50 shadow-[0_0_50px_rgba(239,68,68,0.15)] bg-red-900/10' : pnlAmount > 0 ? 'border-sol-green/30 shadow-[0_0_50px_rgba(20,241,149,0.05)]' : ''}`}>
           <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-6">
                
                {/* 1. Selección de Dirección */}
                <div>
                  <Tooltip content="Hacia donde crees que irá el mercado. Long apuesta a subidas, Short apuesta a caídas.">
                    <label className="block text-sm font-medium text-gray-400 mb-2 cursor-help w-fit">{t('mod3.simDirectionLbl')}</label>
                  </Tooltip>
                  <div className="grid grid-cols-2 gap-2">
                    <button 
                      onClick={() => setDirection('long')}
                      className={`py-3 rounded-lg font-bold transition-all ${direction === 'long' ? 'bg-sol-green text-black' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                      {t('mod3.simLong')}
                    </button>
                    <button 
                      onClick={() => setDirection('short')}
                      className={`py-3 rounded-lg font-bold transition-all ${direction === 'short' ? 'bg-red-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}
                    >
                      {t('mod3.simShort')}
                    </button>
                  </div>
                </div>

                {/* 2. Inversión y Apalancamiento */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Tooltip content="El dinero real que pones en riesgo de tu propio bolsillo.">
                      <label className="block text-sm font-medium text-gray-400 mb-2 cursor-help w-fit">{t('mod3.marginLbl')}</label>
                    </Tooltip>
                    <input 
                      type="number" min="100" 
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <Tooltip content="Multiplicador institucional. 10x significa que ganas (o pierdes) como si tuvieras 10 veces tu capital real.">
                        <label className="text-sm font-medium text-gray-400 cursor-help w-fit">{t('mod3.levLbl')}</label>
                      </Tooltip>
                      <span className="font-bold text-red-500">{leverage}x</span>
                    </div>
                    <input 
                      type="range" min="1" max="100" 
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      className="w-full accent-red-500 cursor-pointer mt-3"
                    />
                  </div>
                </div>

                {/* 3. Movimiento del Mercado Simulado */}
                <div className="pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center mb-2">
                    <Tooltip content="Mueve este slider para simular qué pasaría si el mercado real se desplaza súbitamente.">
                      <label className="text-sm font-bold text-white cursor-help w-fit">{t('mod3.simMoveLbl')}</label>
                    </Tooltip>
                    <span className={`font-mono font-bold ${priceMove > 0 ? 'text-sol-green' : priceMove < 0 ? 'text-red-500' : 'text-gray-400'}`}>
                      {priceMove > 0 ? '+' : ''}{priceMove}%
                    </span>
                  </div>
                  <input 
                    type="range" min="-20" max="20" step="0.5"
                    value={priceMove}
                    onChange={(e) => setPriceMove(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{ background: `linear-gradient(to right, #ef4444 0%, #374151 50%, #14F195 100%)` }}
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                     <span>-20% (Crash)</span>
                     <span>0%</span>
                     <span>+20% (Pump)</span>
                  </div>
                </div>
                
                {/* 4. Resumen Base */}
                <div className="bg-black/50 p-4 rounded-xl border border-gray-800 space-y-2 mt-6">
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-400">{t('mod3.posSizeLbl')}</span>
                     <span className="text-gray-200 font-mono">${positionSize.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-400">{t('mod3.entryLbl')}</span>
                     <span className="text-gray-200 font-mono">${entryPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <Tooltip content="Si el activo toca este precio, el exchange expropia tu margen por seguridad propia.">
                       <span className="text-red-400 font-bold border-b border-dashed border-red-400 cursor-help">{t('mod3.liqLbl')}</span>
                     </Tooltip>
                     <span className="text-red-400 font-bold font-mono">${liquidationPrice.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
                  </div>
                </div>
             </div>

             {/* PANEL DERECHO: PnL RESULT */}
             <div className="flex flex-col justify-center items-center h-full relative p-4">
                <div className="w-full bg-gray-950 border border-gray-800 rounded-2xl p-8 text-center relative overflow-hidden z-10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
                   <h4 className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-6">{t('mod3.simPnlTitle')}</h4>
                   
                   {isLiquidated ? (
                     <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-4">
                        <AlertTriangle className="mx-auto text-red-500" size={48} />
                        <h2 className="text-4xl md:text-5xl font-black text-red-500 tracking-tighter uppercase">{t('mod3.simLoss')}</h2>
                        <p className="text-red-200 text-sm leading-relaxed">{t('mod3.simWarn')}</p>
                        <div className="bg-red-500/20 py-2 px-4 rounded-lg inline-block text-red-300 font-mono font-bold mt-2">
                           Margen Final: $0 USD (-100%)
                        </div>
                     </motion.div>
                   ) : (
                     <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="space-y-2">
                        <p className={`text-5xl md:text-6xl font-black font-mono tracking-tighter ${pnlAmount >= 0 ? 'text-sol-green drop-shadow-[0_0_15px_rgba(20,241,149,0.5)]' : 'text-red-500'}`}>
                           {pnlAmount >= 0 ? '+' : '-'}${Math.abs(pnlAmount).toLocaleString(undefined, {maximumFractionDigits:0})}
                        </p>
                        <p className={`text-xl font-bold ${pnlAmount >= 0 ? 'text-green-300' : 'text-red-300'}`}>
                           ROE {ROE >= 0 ? '+' : ''}{ROE.toFixed(2)}%
                        </p>
                        
                        {pnlAmount >= margin && (
                           <div className="mt-6 bg-sol-green/20 py-2 px-6 rounded-lg inline-block text-green-400 font-black uppercase tracking-widest animate-pulse border border-sol-green/50 shadow-[0_0_20px_rgba(20,241,149,0.2)]">
                              {t('mod3.simWin')}
                           </div>
                        )}
                        {pnlAmount < 0 && !isLiquidated && (
                           <div className="mt-6 text-xs text-gray-500 max-w-xs mx-auto border-t border-gray-800 pt-4">
                              Sobreviviendo. Aún tienes margen restante, pero el exchange te liquidará si el ROE llega al -100%.
                           </div>
                        )}
                     </motion.div>
                   )}
                </div>
                
                {/* Background Glitch if Liquidated */}
                {isLiquidated && (
                  <div className="absolute inset-0 bg-red-500/20 backdrop-blur-3xl rounded-2xl z-0 animate-pulse pointer-events-none shadow-[inset_0_0_50px_rgba(239,68,68,0.3)]"></div>
                )}
             </div>
           </div>
        </Card>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* 3. INDICADORES DE TRADING PRIMORDIALES */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">{t('mod3.s3Title')}</h3>
        <div className="grid lg:grid-cols-3 gap-6">
           <Tooltip content={t('mod3.ttRsiTitle')} position="top">
             <Card className="border-gray-800 hover:border-purple-500/50 transition-colors cursor-help h-full">
                <BarChart2 className="text-purple-400 mb-4" size={32} />
                <h4 className="text-lg font-bold text-white mb-2">{t('mod3.rsiTitle')}</h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{t('mod3.rsiDesc')}</p>
                <ul className="text-xs space-y-2 text-gray-500 font-mono">
                  <li><span className="text-red-400 font-bold">70/100:</span> {t('mod3.rsiOver')}</li>
                  <li><span className="text-green-400 font-bold">30/100:</span> {t('mod3.rsiUnder')}</li>
                </ul>
             </Card>
           </Tooltip>

           <Tooltip content={t('mod3.ttMaTitle')} position="top">
             <Card className="border-gray-800 hover:border-blue-500/50 transition-colors cursor-help h-full">
                <TrendingUp className="text-blue-400 mb-4" size={32} />
                <h4 className="text-lg font-bold text-white mb-2">{t('mod3.maTitle')}</h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{t('mod3.maDesc')}</p>
                <ul className="text-xs space-y-2 text-gray-500 font-mono">
                  <li><span className="text-yellow-500 font-bold">MA200:</span> {t('mod3.ma200')}</li>
                  <li><span className="text-blue-400 font-bold">Golden Cross:</span> {t('mod3.maCross')}</li>
                </ul>
             </Card>
           </Tooltip>

           <Tooltip content={t('mod3.ttFibTitle')} position="top">
             <Card className="border-gray-800 hover:border-orange-500/50 transition-colors cursor-help h-full">
                <Crosshair className="text-orange-400 mb-4" size={32} />
                <h4 className="text-lg font-bold text-white mb-2">{t('mod3.fibTitle')}</h4>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{t('mod3.fibDesc')}</p>
                <ul className="text-xs space-y-2 text-gray-500 font-mono">
                  <li><span className="text-white font-bold">Support:</span> {t('mod3.fibSup')}</li>
                  <li><span className="text-orange-400 font-bold">Fib 0.618:</span> {t('mod3.fib618')}</li>
                </ul>
             </Card>
           </Tooltip>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* 4. DOLLAR COST AVERAGING (DCA) - MASTER UX REFECTOR */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-8 pt-12">
        <div className="space-y-3">
          <h3 className="text-3xl font-black text-white flex items-center gap-3">
            <span className="p-2 bg-btc-orange/10 rounded-lg text-btc-orange">4.</span>
            {t('mod3.s4Title')}
          </h3>
          <p className="text-gray-400 text-lg max-w-4xl leading-relaxed">
            {t('mod3.dcaDDesc')}
          </p>
        </div>
        
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Controls Column */}
          <Card className="lg:col-span-1 space-y-8 border-gray-800 bg-gray-900/50 backdrop-blur-sm p-6">
            <div className="space-y-6">
              <div>
                <Tooltip content="Tu compromiso financiero semanal. La clave es la constancia, no el monto." position="right">
                  <label className="block text-sm font-bold text-gray-500 uppercase tracking-widest mb-3 cursor-help">{t('mod3.dcaWeeklyLbl')}</label>
                </Tooltip>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-btc-orange font-bold">$</span>
                  <input 
                    type="number" 
                    value={weeklyAmount}
                    onChange={(e) => setWeeklyAmount(Number(e.target.value))}
                    className="w-full bg-black border border-gray-700 rounded-2xl pl-10 pr-4 py-4 text-white text-xl font-bold focus:outline-none focus:border-btc-orange transition-all"
                  />
                </div>
              </div>

              <div>
                <Tooltip content="El tiempo es el mejor aliado en Crypto. A mayor plazo, menor impacto del pánico visual." position="right">
                  <div className="flex justify-between items-center mb-3 cursor-help">
                    <label className="text-sm font-bold text-gray-500 uppercase tracking-widest">{t('mod3.dcaMonthsLbl')}</label>
                    <span className="text-btc-orange font-black text-lg">{duration}m</span>
                  </div>
                </Tooltip>
                <input 
                  type="range" min="3" max="24" 
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full accent-btc-orange h-2 bg-gray-800 rounded-lg cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-600 mt-2 font-bold">
                   <span>3 MESES</span>
                   <span>12 MESES</span>
                   <span>2 AÑOS</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-800 space-y-4">
               <div className="bg-black/40 p-4 rounded-xl border border-gray-800/50 flex justify-between items-center">
                  <span className="text-xs font-bold text-gray-500 uppercase">{t('mod3.dcaInvTotal')}</span>
                  <span className="text-white font-mono font-bold">${finalData?.TotalInvertido.toLocaleString()}</span>
               </div>
               <div className="bg-btc-orange/5 p-4 rounded-xl border border-btc-orange/20 flex justify-between items-center">
                  <span className="text-xs font-bold text-btc-orange uppercase">{t('mod3.dcaValue')}</span>
                  <span className="text-btc-orange font-black font-mono text-lg">${finalData?.ValorPortafolio.toLocaleString(undefined, {maximumFractionDigits:0})}</span>
               </div>
            </div>
          </Card>

          {/* Chart Area */}
          <div className="lg:col-span-3 space-y-6">
             <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 border-gray-800 bg-gray-900/30 flex flex-col justify-center items-center text-center">
                   <p className="text-[10px] font-black text-gray-500 uppercase mb-1">{t('mod3.dcaRoiLbl')}</p>
                   {(() => {
                      const roi = ((finalData?.ValorPortafolio - finalData?.TotalInvertido) / finalData?.TotalInvertido) * 100;
                      return (
                        <h4 className={`text-2xl font-black ${roi >= 0 ? 'text-sol-green' : 'text-red-500'}`}>
                           {roi >= 0 ? '+' : ''}{roi.toFixed(2)}%
                        </h4>
                      );
                   })()}
                </Card>

                <Card className="p-4 border-gray-800 bg-gray-900/30 md:col-span-2 flex items-center justify-between px-8">
                   <div className="text-left">
                      <p className="text-[10px] font-black text-gray-500 uppercase mb-1">Status de Estrategia</p>
                      {finalData?.ValorPortafolio > finalData?.TotalInvertido ? (
                         <h4 className="text-xl font-black text-sol-green tracking-widest">{t('mod3.dcaWin')}</h4>
                      ) : (
                         <h4 className="text-xl font-black text-yellow-500 tracking-widest">{t('mod3.dcaLoss')}</h4>
                      )}
                   </div>
                   <TrendingUp className={finalData?.ValorPortafolio > finalData?.TotalInvertido ? 'text-sol-green' : 'text-yellow-500'} size={32} />
                </Card>
             </div>

             <Card className="h-[400px] border-gray-800 bg-gray-950/50 relative p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={calculateDCA}>
                    <defs>
                      <linearGradient id="colorBTC" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4a5568" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4a5568" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorDCA" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#f7931a" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#f7931a" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                    <XAxis dataKey="month" stroke="#4a5568" axisLine={false} tickLine={false} fontSize={10} />
                    <YAxis stroke="#4a5568" axisLine={false} tickLine={false} hide/>
                    <RechartsTooltip 
                      contentStyle={{ backgroundColor: '#000', border: '1px solid #2d3748', borderRadius: '12px', fontSize: '12px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="PrecioBTC" 
                      stroke="#4a5568" 
                      fillOpacity={1} 
                      fill="url(#colorBTC)" 
                      strokeWidth={1} 
                      name={t('mod3.dcaG1')} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="PrecioPromedio" 
                      stroke="#f7931a" 
                      strokeWidth={4} 
                      fillOpacity={1} 
                      fill="url(#colorDCA)" 
                      name={t('mod3.dcaG2')} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
                
                {/* Visual Hint */}
                <div className="absolute top-8 right-8 flex flex-col gap-2 items-end">
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-btc-orange"></div>
                      <span className="text-[10px] font-bold text-gray-400">PROMEDIO SEGURO</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-gray-600"></div>
                      <span className="text-[10px] font-bold text-gray-400">VOLATILIDAD EXTERNA</span>
                   </div>
                </div>
             </Card>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* 5. QUIZ DINÁMICO AVANZADO DE RIESGO MATEMÁTICO */}
      {/* -------------------------------------------------------------------------------- */}
      <InteractiveQuiz 
        questionBank={module3QuizBank} 
        title="Prueba Integral de Riesgo e Inversión"
        icon={Award}
      />

      {/* -------------------------------------------------------------------------------- */}
      {/* 6. PLATAFORMAS RECOMENDADAS (Afiliados / Call to Action Hacking) */}
      {/* -------------------------------------------------------------------------------- */}
      <div className="flex items-center gap-4 py-8">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">{t('mod3.s6Title')}</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <section>
        <Tooltip content={t('mod3.ttPla')}>
          <div className="grid md:grid-cols-2 gap-6 cursor-help">
            <a href="https://crypto.com/app/zwe7x29wqb" target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-2xl">
              <Card className="border-gray-800 hover:border-blue-500 hover:bg-blue-900/10 transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                     <h4 className="text-xl font-black text-white">{t('mod3.plaC')}</h4>
                     <ExternalLink size={20} className="text-gray-500 group-hover:text-blue-400 transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{t('mod3.plaCDesc')}</p>
                </div>
                <div className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl text-center transition-colors">
                  {t('mod3.ttGo')}
                </div>
              </Card>
            </a>

            <a href="https://lnk.monabit.io/9NLuJmleH4" target="_blank" rel="noopener noreferrer" className="block focus:outline-none focus:ring-2 focus:ring-sol-green rounded-2xl">
              <Card className="border-gray-800 hover:border-sol-green hover:bg-sol-green/10 transition-all flex flex-col justify-between h-full group">
                <div>
                  <div className="flex justify-between items-start mb-4">
                     <h4 className="text-xl font-black text-white">{t('mod3.plaM')}</h4>
                     <ExternalLink size={20} className="text-gray-500 group-hover:text-sol-green transition-colors" />
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{t('mod3.plaMDesc')}</p>
                </div>
                <div className="bg-sol-green hover:bg-green-400 text-black font-bold py-3 px-4 rounded-xl text-center transition-colors">
                  {t('mod3.ttGo')}
                </div>
              </Card>
            </a>
          </div>
        </Tooltip>
      </section>

    </motion.div>
  );
};
