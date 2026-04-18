import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../atoms/Card';
import { TrendingDown, Coins, BookOpen, Eye } from 'lucide-react';
import { HistoryDragDrop } from './HistoryDragDrop';
import { ControlOfMoneyActivity } from './ControlOfMoneyActivity';
import { useLanguage } from '../../context/LanguageContext';
import { Tooltip } from '../atoms/Tooltip';
import { Button } from '../atoms/Button';
import { InteractiveQuiz } from './InteractiveQuiz';
import { module1QuizBank } from '../../data/quizDatabase';

export const SystemTrapModule = () => {
  const { t } = useLanguage();
  const [fiatAmount, setFiatAmount] = useState(1000000);
  const [years, setYears] = useState(5);
  const [inflationRate, setInflationRate] = useState(12);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  
  const calculateLoss = () => {
    return fiatAmount * Math.pow((1 - inflationRate / 100), years);
  };

  const finalValue = calculateLoss();

  const handleShowRealAnswer = () => {
    // Shows catastrophic real scenarios when compounded
    setInflationRate(25); // Latin american rough averages / Hidden inflation
    setYears(10); // A decade of fiat holding
    setIsAnswerRevealed(true);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12"
    >
      {/* -------------------------------------------------------------------------------- */}
      {/* SECCIÓN EDUCATIVA */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-8">
        <div className="space-y-4">
          <Tooltip content={t('tooltips.mod1Title') || "Haz hover sobre mí"}>
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-orange-500 inline-block cursor-help w-fit">
              {t('mod1.title')}
            </h2>
          </Tooltip>
        </div>

        {/* EDUCACIONAL: Historia del dinero */}
        <Tooltip content={t('tooltips.history') || "Evolución histórica"} position="top">
          <Card className="border-gray-800 border-l-4 border-l-btc-orange cursor-help transition-colors hover:border-r hover:border-r-gray-700">
            <div className="flex gap-4">
              <BookOpen className="text-btc-orange flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">{t('mod1.historyTitle')}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('mod1.historyDesc')}
                </p>
              </div>
            </div>
          </Card>
        </Tooltip>

        {/* EDUCACIONAL: Quién controla tu dinero */}
        <Tooltip content={t('tooltips.control') || "El poder bancario"} position="top">
           <Card className="border-gray-800 border-l-4 border-l-red-500 cursor-help transition-colors hover:border-r hover:border-r-gray-700">
            <div className="flex gap-4">
              <BookOpen className="text-red-500 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">{t('mod1.controlTitle')}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('mod1.controlDesc')}
                </p>
              </div>
            </div>
          </Card>
        </Tooltip>

        {/* EDUCACIONAL: Inflación Sistemática */}
        <Tooltip content={t('tooltips.inflation') || "Pérdida de poder adquisitivo"} position="top">
          <Card className="border-gray-800 border-l-4 border-l-yellow-500 cursor-help transition-colors hover:border-r hover:border-r-gray-700">
            <div className="flex gap-4">
              <BookOpen className="text-yellow-500 flex-shrink-0" size={24} />
              <div>
                <h3 className="text-xl font-bold text-gray-200 mb-2">{t('mod1.inflationTitle')}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {t('mod1.inflationDesc')}
                </p>
              </div>
            </div>
          </Card>
        </Tooltip>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* SECCIÓN DE ACTIVIDADES PRÁCTICAS Y EVALUATORIAS */}
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
        <Card aura={isAnswerRevealed} className={`transition-all duration-500 ${isAnswerRevealed ? 'border-red-500/50' : 'border-red-900/40'}`}>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <TrendingDown className="text-red-500" size={28} />
              <Tooltip content={t('tooltips.fiatCalc') || "Interactúa y verás el sangrado"}>
                <h3 className="text-xl font-bold text-gray-200 cursor-help">{t('mod1.activity2Title')}</h3>
              </Tooltip>
            </div>
            
            {!isAnswerRevealed && (
               <Tooltip content="Configura un escenario catastrófico real (Ej. Latinoamérica)" position="left">
                 <Button variant="ghost" size="sm" onClick={handleShowRealAnswer} className="text-gray-400 border border-gray-700">
                   <Eye size={18} className="mr-2" />
                   Ver Respuesta Real
                 </Button>
               </Tooltip>
            )}
          </div>
          
          <p className="text-gray-400 text-sm mb-6 pb-6 border-b border-gray-800">
            {t('mod1.activity2Desc')}
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <Tooltip content="Cuánto dinero tienes ahora" position="top">
                  <label className="block text-sm font-medium text-gray-500 mb-2 cursor-help w-fit">Monto inicial (COP)</label>
                </Tooltip>
                <input 
                  type="number" 
                  value={fiatAmount}
                  onChange={(e) => setFiatAmount(Number(e.target.value))}
                  className="w-full bg-crypto-surface border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
              
              <div>
                <Tooltip content="Desliza para aumentar los años que guardarías el dinero parado." position="top">
                  <label className="block text-sm font-medium text-gray-500 mb-2 cursor-help w-fit">Años retenidos en el banco: {years}</label>
                </Tooltip>
                <input 
                  type="range" 
                  min="1" max="20" 
                  value={years}
                  onChange={(e) => { setYears(Number(e.target.value)); setIsAnswerRevealed(false); }}
                  className="w-full accent-red-500"
                />
              </div>

              <div>
                <Tooltip content="Desliza para ver la inflación. La inflación real no es del 2% como dicen." position="top">
                  <label className="block text-sm font-medium text-gray-500 mb-2 cursor-help w-fit">Inflación Estimada Anual: {inflationRate}%</label>
                </Tooltip>
                <input 
                  type="range" 
                  min="2" max="50" 
                  value={inflationRate}
                  onChange={(e) => { setInflationRate(Number(e.target.value)); setIsAnswerRevealed(false); }}
                  className="w-full accent-orange-500"
                />
              </div>
            </div>

            <Tooltip content="La gráfica de cómo tu dinero se desvanece por el impuesto inflacionario" position="left">
               <div className="bg-crypto-bg rounded-xl p-6 border border-gray-800 flex flex-col justify-center relative overflow-hidden cursor-help h-full">
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
                
                <p className={`mt-4 text-sm font-medium ${isAnswerRevealed ? 'text-red-500 font-bold' : 'text-orange-400'}`}>
                  {isAnswerRevealed ? '¡ESTA ES LA CRUDA REALIDAD COMPUESTA!' : ''} Estarás perdiendo un {((1 - finalValue / fiatAmount) * 100).toFixed(1)}% de tu riqueza de forma invisible.
                </p>
              </div>
            </Tooltip>
          </div>
        </Card>
      </section>

      <InteractiveQuiz 
        questionBank={module1QuizBank} 
        title="Evaluación Final: La Trampa Fiat"
      />
    </motion.div>
  );
};
