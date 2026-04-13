import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../atoms/Card';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid, LineChart, Line, Legend } from 'recharts';
import { Tooltip } from '../atoms/Tooltip';
import { BookOpen } from 'lucide-react';

const simulatedPrices = [
  50000, 48000, 42000, 38000, 45000, 52000, 60000, 65000, 58000, 51000, 49000, 55000,
  62000, 70000, 85000, 78000, 72000, 68000, 75000, 82000, 95000, 105000, 110000, 120000
];

export const StrategyRiskModule = () => {
  const [weeklyAmount, setWeeklyAmount] = useState(100);
  const [duration, setDuration] = useState(12);

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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* SECCIÓN EDUCATIVA */}
      <section className="space-y-8">
        <div className="space-y-4">
          <Tooltip content="Protege tu psicología entendiendo la regla fundamental: no intentes predecir el mercado.">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-btc-orange to-yellow-500 inline-block cursor-help">
              Estrategia y Riesgo (DCA)
            </h2>
          </Tooltip>
        </div>

        <Card className="border-gray-800 border-l-4 border-l-btc-orange flex gap-4">
          <BookOpen className="text-btc-orange flex-shrink-0" size={24} />
          <div>
            <Tooltip content="Dollar Cost Averaging = Promedio de Costo en Dólares.">
              <h3 className="text-xl font-bold text-gray-200 mb-2 cursor-help">Psicología y DCA</h3>
            </Tooltip>
            <p className="text-gray-400 leading-relaxed text-sm">
              Invertir todo el capital de golpe (Lump Sum) expone tus emociones a la máxima volatilidad. El mercado de criptomonedas está guiado por ciclos de Miedo y Codicia. Implementar DCA (comprar montos fijos regularmente sin importar el precio) transforma la volatilidad a tu favor, promediando tu precio de entrada y permitiéndote dormir en paz.
            </p>
          </div>
        </Card>
      </section>

      {/* SECCIÓN PRÁCTICA */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Simulador DCA Práctico</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <section>
        <Tooltip content="Ajusta el monto y duración para ver el efecto visual de promediar costos en una gráfica interactiva.">
          <p className="text-gray-400 text-sm mb-6 cursor-help border-b border-gray-800 pb-2">
             Configura tus aportes e interactúa con el gráfico de rendimiento histórico proyectado.
          </p>
        </Tooltip>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1 space-y-6">
            <div>
              <Tooltip content="El monto en dólares que te comprometes a inyectar al mercado cada semana." position="top">
                <label className="block text-sm font-medium text-gray-400 mb-2 cursor-help w-fit">Compra Semanal (USD)</label>
              </Tooltip>
              <input 
                type="number" 
                value={weeklyAmount}
                onChange={(e) => setWeeklyAmount(Number(e.target.value))}
                className="w-full bg-crypto-bg border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-btc-orange transition-colors"
              />
            </div>
            <div>
              <Tooltip content="Periodo de disciplina mantenida." position="top">
                <label className="block text-sm font-medium text-gray-400 mb-2 cursor-help w-fit">Duración (Meses): {duration}</label>
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
                <span className="text-sm text-gray-500">Inversión Total Acumulada</span>
                <p className="text-2xl font-bold text-white">${finalData?.TotalInvertido.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
              </div>
              <div>
                <span className="text-sm text-gray-500">Valor Final del Portafolio</span>
                <p className="text-3xl font-bold text-btc-orange">${finalData?.ValorPortafolio.toLocaleString(undefined, {maximumFractionDigits:0})}</p>
              </div>
            </div>
          </Card>

          <Card className="lg:col-span-2 h-[400px]">
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
                 <Line type="monotone" dataKey="PrecioBTC" stroke="#4a5568" strokeWidth={2} dot={false} name="Precio Libre del Activo" />
                 <Line type="monotone" dataKey="PrecioPromedio" stroke="#f7931a" strokeWidth={3} dot={false} name="Tu Precio Promedio (Estable)" />
               </LineChart>
             </ResponsiveContainer>
          </Card>
        </div>
      </section>
    </motion.div>
  );
};
