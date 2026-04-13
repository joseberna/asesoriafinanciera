import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Tooltip } from '../atoms/Tooltip';
import { Button } from '../atoms/Button';
import { BookOpen, AlertTriangle, TrendingUp, Activity, BarChart2, Crosshair, Award, Eye } from 'lucide-react';
import { module3QuizBank } from '../../data/quizDatabase';

const simulatedPrices = [
  50000, 48000, 42000, 38000, 45000, 52000, 60000, 65000, 58000, 51000, 49000, 55000,
  62000, 70000, 85000, 78000, 72000, 68000, 75000, 82000, 95000, 105000, 110000, 120000
];

export const StrategyRiskModule = () => {
  // DCA State
  const [weeklyAmount, setWeeklyAmount] = useState(100);
  const [duration, setDuration] = useState(12);

  // Leverage State
  const [margin, setMargin] = useState(1000);
  const [leverage, setLeverage] = useState(10);
  const entryPrice = 50000;

  // Quiz State
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const shuffled = [...module3QuizBank].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 5));
  }, []);

  // Evaluador Dinámico
  const checkAnswers = () => {
    let correctCount = 0;
    currentQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) correctCount += 1;
    });
    setScore(Math.round((correctCount / currentQuestions.length) * 100));
  };

  const forceAnswers = () => {
    const correctAnswers = {};
    currentQuestions.forEach((q) => {
      correctAnswers[q.id] = q.correctAnswer;
    });
    setAnswers(correctAnswers);
    setScore(100);
    setShowAnswers(true);
  };

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
  const bankruptcyPrice = entryPrice - (entryPrice / leverage); // Simplified Long formulation
  const liquidationPrice = bankruptcyPrice * 1.005; // 0.5% maintenance margin
  const percentToDrop = ((entryPrice - liquidationPrice) / entryPrice) * 100;

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
        <h3 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">1. La Naturaleza del Trading (Spot vs Futuros)</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-gray-800 hover:border-green-500/50 transition-colors">
            <h4 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2"><BookOpen size={20}/> Trading en Spot</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Es el mercado orgánico. Compras un token real (Como PAXG o BTC) a precio de mercado y <strong>te pertenece</strong> criptográficamente. Puedes retirarlo a tu billetera fría (Ledger). No existe precio de liquidación; si cae 90%, sigues teniendo las mismas monedas intactas esperando a que el precio rebote.
            </p>
          </Card>
          <Card className="border-gray-800 hover:border-red-500/50 transition-colors">
            <h4 className="text-xl font-bold text-red-400 mb-3 flex items-center gap-2"><Activity size={20}/> Derivados (Futuros y CFDs)</h4>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              CFD significa "Contrato por Diferencia". Nunca posees la moneda real. Son apuestas matemáticas entre tú y el mercado contra la dirección del precio. Permiten apalancamiento masivo, pero introducen el peligro fatal del <strong>Riesgo de Liquidación</strong> si el mercado se mueve momentáneamente en tu contra.
            </p>
          </Card>
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

        <Card className="border-gray-700 bg-gray-900 overflow-hidden relative font-sans p-6 md:p-8">
           <div className="grid md:grid-cols-2 gap-12">
             <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Tu Margen Inicial ($ Inversión Real)</label>
                  <input 
                    type="number" min="100" 
                    value={margin}
                    onChange={(e) => setMargin(Number(e.target.value))}
                    className="w-full bg-black border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-sm font-medium text-gray-400">Apalancamiento (Leverage)</label>
                    <span className="font-bold text-red-500">{leverage}x</span>
                  </div>
                  <input 
                    type="range" min="1" max="100" 
                    value={leverage}
                    onChange={(e) => setLeverage(Number(e.target.value))}
                    className="w-full accent-red-500 cursor-pointer"
                  />
                </div>
                
                <div className="bg-gray-800 p-4 rounded-xl border border-gray-700 space-y-2">
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-400">Tamaño de Posición Controlado:</span>
                     <span className="text-white font-mono">${positionSize.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                     <span className="text-gray-400">Precio Actual (Entrada):</span>
                     <span className="text-green-400 font-mono">${entryPrice.toLocaleString()}</span>
                  </div>
                </div>
             </div>

             <div className="flex flex-col justify-center items-center h-full space-y-6">
                <div className="text-center">
                  <h4 className="text-gray-500 text-sm font-bold uppercase tracking-wider mb-2">Precio de Liquidación Letal</h4>
                  <p className="text-5xl md:text-6xl font-black text-red-500 font-mono tracking-tighter">
                    ${liquidationPrice.toLocaleString(undefined, {maximumFractionDigits:0})}
                  </p>
                </div>
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-xl max-w-sm text-center">
                   <AlertTriangle className="mx-auto text-red-500 mb-2" size={24} />
                   <p className="text-red-200 text-sm">
                     Si el precio tiene un bajón rápido (Wick) de apenas <strong>-{percentToDrop.toFixed(2)}%</strong>, tu balance de ${margin.toLocaleString()} será borrado a cero.
                   </p>
                </div>
             </div>
           </div>
        </Card>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* 3. INDICADORES DE TRADING PRIMORDIALES */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-6">
        <h3 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">3. Las Herramientas del Analista Técnico</h3>
        <div className="grid lg:grid-cols-3 gap-6">
           <Card className="border-gray-800 hover:border-purple-500/50 transition-colors">
              <BarChart2 className="text-purple-400 mb-4" size={32} />
              <h4 className="text-lg font-bold text-white mb-2">RSI (Relative Strength Index)</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Oscilador de impulso que mide la velocidad de cambio de precios. Fluctúa entre 0 y 100.
              </p>
              <ul className="text-xs space-y-2 text-gray-500 font-mono">
                <li><span className="text-red-400 font-bold">Encima de 70:</span> Sobrecomprado. Riesgo de caída y recolección de ganancias inminente.</li>
                <li><span className="text-green-400 font-bold">Debajo de 30:</span> Sobrevendido. Pánico del mercado. Potencial punto de entrada u oportunidad de rebote.</li>
              </ul>
           </Card>

           <Card className="border-gray-800 hover:border-blue-500/50 transition-colors">
              <TrendingUp className="text-blue-400 mb-4" size={32} />
              <h4 className="text-lg font-bold text-white mb-2">Medias Móviles (MA / MACD)</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Líneas dinámicas que promedian el histórico visual suavizando la bulla del mercado diario.
              </p>
              <ul className="text-xs space-y-2 text-gray-500 font-mono">
                <li><span className="text-yellow-500 font-bold">MA200 (Long Term):</span> El muro de contención definitivo de tendencias macroeconómicas.</li>
                <li><span className="text-blue-400 font-bold">Cruce Dorado:</span> Cuando la media corta corta hacia arriba a la media larga, revelando absorción alcista fuerte.</li>
              </ul>
           </Card>

           <Card className="border-gray-800 hover:border-orange-500/50 transition-colors">
              <Crosshair className="text-orange-400 mb-4" size={32} />
              <h4 className="text-lg font-bold text-white mb-2">Soporte, Resistencia y Fibonacci</h4>
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                Memoria algorítmica del comportamiento humano. El punto donde interactúa la Oferta vs la Demanda.
              </p>
              <ul className="text-xs space-y-2 text-gray-500 font-mono">
                <li><span className="text-white font-bold">Soporte:</span> Zona baja donde las "ballenas" acumularon en el pasado frenando caídas.</li>
                <li><span className="text-orange-400 font-bold">Fib 0.618:</span> El nivel de retroceso dorado (Proporción áurea) donde rebotes estructurales estadísticos suceden mecánicamente.</li>
              </ul>
           </Card>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* 4. DOLLAR COST AVERAGING (DCA) */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-6 pt-12">
        <h3 className="text-2xl font-bold text-white border-b border-gray-800 pb-2">4. Dollar Cost Averaging (DCA): La Estrategia Invencible</h3>
        <p className="text-gray-400 text-sm">
          A diferencia del Trading agresivo, el DCA asume pasivamente que es estadísticamente imposible acertar sistemáticamente los picos y los valles del mercado (*Timing the market*). El plan radica en comprar el activo pasmosamente de manera cíclica.
        </p>
        
        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 space-y-6 border-btc-orange/30">
            <div>
              <Tooltip content="Monto inyectado fielmente todas las semanas de manera automatizada." position="top">
                <label className="block text-sm font-medium text-gray-400 mb-2 cursor-help w-fit">Inversión Semanal Constante (USD)</label>
              </Tooltip>
              <input 
                type="number" 
                value={weeklyAmount}
                onChange={(e) => setWeeklyAmount(Number(e.target.value))}
                className="w-full bg-crypto-bg border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-btc-orange"
              />
            </div>
            <div>
              <Tooltip content="Plazo algorítmico ignorando volatilidades." position="top">
                <label className="block text-sm font-medium text-gray-400 mb-2 cursor-help w-fit">Alcance Temporal (Meses): {duration}</label>
              </Tooltip>
              <input 
                type="range" min="3" max="24" 
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full accent-btc-orange"
              />
            </div>

            <div className="pt-6 border-t border-gray-800">
              <div className="mb-4">
                <span className="text-sm text-gray-500">Tus Entradas de Capital Total</span>
                <p className="text-2xl font-bold text-white">${finalData?.TotalInvertido.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Valorización Estimada de Portafolio</span>
                <p className="text-3xl font-black text-btc-orange">${finalData?.ValorPortafolio.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 h-[450px]">
             <ResponsiveContainer width="100%" height="100%">
               <LineChart data={calculateDCA}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" vertical={false} />
                 <XAxis dataKey="month" stroke="#A0AEC0" axisLine={false} tickLine={false} />
                 <YAxis stroke="#A0AEC0" axisLine={false} tickLine={false} hide/>
                 <RechartsTooltip 
                   contentStyle={{ backgroundColor: '#151a23', borderColor: '#2d3748', borderRadius: '12px' }}
                   itemStyle={{ color: '#fff' }}
                 />
                 <Legend wrapperStyle={{ paddingTop: '20px' }}/>
                 <Line type="monotone" dataKey="PrecioBTC" stroke="#4a5568" strokeWidth={2} dot={false} name="Precio Caótico del Mercado" />
                 <Line type="monotone" dataKey="PrecioPromedio" stroke="#f7931a" strokeWidth={4} dot={false} name="Tu Precio Promedio de Compra" />
               </LineChart>
             </ResponsiveContainer>
          </Card>
        </div>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* 5. QUIZ DINÁMICO AVANZADO DE RIESGO MATEMÁTICO */}
      {/* -------------------------------------------------------------------------------- */}
      <div className="flex items-center gap-4 py-8">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Evaluación Final de Ecosistema e Inversión</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <section>
        <Card className={`transition-all duration-700 ${score === 100 ? 'border-sol-green shadow-[0_0_30px_rgba(20,241,149,0.15)] bg-sol-green/5' : score !== null ? 'border-red-500 bg-red-500/5' : 'border-gray-800'}`}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8 border-b border-gray-800 pb-4">
            <h3 className="text-xl font-bold text-white">Prueba Integral Institucional Mod. 3</h3>
            
            <div className="flex gap-3 items-center">
               <Tooltip content="Calcula y demuestra rigor.">
                 <Button variant="outline" size="sm" onClick={checkAnswers} disabled={Object.keys(answers).length < 5}>
                   Verificar Examen
                 </Button>
               </Tooltip>
               <Tooltip content="Audita las llaves maestras de esta evaluación.">
                 <Button variant="ghost" size="sm" onClick={forceAnswers} className="text-gray-400">
                   <Eye size={18} className="mr-2"/> Revelar Metodología
                 </Button>
               </Tooltip>
            </div>
          </div>

          <div className="space-y-10">
            {currentQuestions.map((q, index) => (
              <div key={q.id} className="space-y-4 bg-gray-900/40 p-6 rounded-2xl border border-gray-800/50">
                 <h4 className="font-bold text-gray-200 text-lg leading-relaxed">{index + 1}. {q.question}</h4>
                 <div className="space-y-3 pt-2">
                   {q.options.map((opt) => (
                     <div 
                       key={`${q.id}-${opt.id}`} 
                       onClick={() => setAnswers({ ...answers, [q.id]: opt.id })}
                       className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                         answers[q.id] === opt.id 
                           ? (showAnswers && opt.id === q.correctAnswer ? 'bg-sol-green/20 border-sol-green text-green-300' : 'bg-neon-accent/10 border-neon-accent text-cyan-300') 
                           : (showAnswers && opt.id === q.correctAnswer ? 'bg-sol-green/10 border-sol-green/50 text-green-400/80 shadow-[0_0_15px_rgba(20,241,149,0.2)]' : 'bg-crypto-surface-alt border-gray-700 hover:border-gray-500 text-gray-300')
                       }`}
                     >
                       <span className="font-bold mr-2 uppercase opacity-60">[{opt.id}]</span> {opt.text}
                     </div>
                   ))}
                 </div>
              </div>
            ))}
          </div>

          <AnimatePresence>
            {score !== null && (
               <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mt-8 border-t border-gray-800 pt-6">
                 {score >= 60 ? (
                   <div className="flex flex-col md:flex-row items-center gap-6 bg-sol-green/10 border border-sol-green/30 p-6 rounded-xl text-center md:text-left">
                     <Award className="text-sol-green flex-shrink-0" size={64} />
                     <div>
                       <h4 className="text-3xl font-black text-sol-green mb-2">Score: {score}% - Aprobado</h4>
                       <p className="text-green-200 text-sm leading-relaxed max-w-2xl">
                         Tienes la resiliencia analítica de un fondo de cobertura. Comprendes el peligro intrínseco del apalancamiento irresponsable y la matemática absoluta del Dollar Cost Averaging para acumular portafolio duro con la historia de tu lado.
                       </p>
                     </div>
                   </div>
                 ) : (
                   <div className="flex flex-col md:flex-row items-center gap-6 bg-red-900/20 border border-red-500/30 p-6 rounded-xl text-center md:text-left">
                     <AlertTriangle className="text-red-500 flex-shrink-0" size={64} />
                     <div>
                       <h4 className="text-3xl font-black text-red-500 mb-2">Score: {score}% - Liquidación</h4>
                       <p className="text-red-200 text-sm leading-relaxed max-w-2xl">
                         Tus llaves algorítmicas están expuestas. Operar instrumentos que no comprendes (Apalancamiento Futuros) terminará transfiriendo tu riqueza a inversores más disciplinados. Oprime "Revelar Metodología" y estudia las correcciones maestras.
                       </p>
                     </div>
                   </div>
                 )}
               </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </section>

    </motion.div>
  );
};
