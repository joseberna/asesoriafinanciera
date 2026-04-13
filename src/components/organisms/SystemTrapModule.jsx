import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../atoms/Card';
import { TrendingDown, Coins, BookOpen, Eye } from 'lucide-react';
import { HistoryDragDrop } from './HistoryDragDrop';
import { ControlOfMoneyActivity } from './ControlOfMoneyActivity';
import { useLanguage } from '../../context/LanguageContext';
import { Tooltip } from '../atoms/Tooltip';
import { Button } from '../atoms/Button';

export const SystemTrapModule = () => {
  const { t } = useLanguage();
  const [fiatAmount, setFiatAmount] = useState(1000000);
  const [years, setYears] = useState(5);
  const [inflationRate, setInflationRate] = useState(12);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [currentQuestions, setCurrentQuestions] = useState([]);

  // Pool de 20 preguntas profesionales para el Módulo 1
  const QUIZ_POOL = [
    {
      id: 1,
      question: "¿Qué hito histórico en 1971 transformó el dinero global en 'Fiat'?",
      options: [
        { id: 'a', text: "La creación del Banco Central Europeo." },
        { id: 'b', text: "El fin del acuerdo Bretton Woods y la desconexión del Oro." }, // Correct
        { id: 'c', text: "La invención del primer cajero automático." },
        { id: 'd', text: "El inicio de la hiperinflación en Alemania." }
      ],
      correct: 'b'
    },
    {
      id: 2,
      question: "¿Cuál es la característica principal del dinero Fiat?",
      options: [
        { id: 'a', text: "Tiene valor intrínseco basado en su material." },
        { id: 'b', text: "Está respaldado por reservas de plata." },
        { id: 'c', text: "Su valor depende de la confianza y el decreto gubernamental." }, // Correct
        { id: 'd', text: "No puede ser impreso infinitamente." }
      ],
      correct: 'c'
    },
    {
      id: 3,
      question: "La inflación es técnicamente definida como:",
      options: [
        { id: 'a', text: "La subida de precios por culpa de los empresarios." },
        { id: 'b', text: "La expansión de la masa monetaria por encima de la demanda real." }, // Correct
        { id: 'c', text: "La falta de productos en los supermercados." },
        { id: 'd', text: "Un fenómeno natural e inevitable del crecimiento." }
      ],
      correct: 'b'
    },
    {
      id: 4,
      question: "¿Qué es el 'Efecto Cantillon'?",
      options: [
        { id: 'a', text: "El aumento de la velocidad del dinero en épocas de crisis." },
        { id: 'b', text: "Quienes reciben el dinero nuevo primero se benefician a costa de los últimos." }, // Correct
        { id: 'c', text: "La caída de la bolsa tras un anuncio de la FED." },
        { id: 'd', text: "La relación entre el desempleo y la inflación." }
      ],
      correct: 'b'
    },
    {
      id: 5,
      question: "¿Por qué el 'Dinero Mercancia' (como el Oro) es superior al Fiat?",
      options: [
        { id: 'a', text: "Porque brilla más." },
        { id: 'b', text: "Porque su costo de producción es nulo." },
        { id: 'c', text: "Porque tiene escasez inelástica y no puede ser diluido por decreto." }, // Correct
        { id: 'd', text: "Porque es más fácil de transportar digitalmente." }
      ],
      correct: 'c'
    },
    {
      id: 6,
      question: "¿Qué sucede con el ahorro en una economía de patrón Fiat a largo plazo?",
      options: [
        { id: 'a', text: "El ahorrador es recompensado por su paciencia." },
        { id: 'b', text: "Su poder adquisitivo es asaltado sistemáticamente por la inflación." }, // Correct
        { id: 'c', text: "El dinero gana valor gracias al interés compuesto bancario." },
        { id: 'd', text: "Los salarios suben más rápido que el costo de vida." }
      ],
      correct: 'b'
    },
    {
      id: 7,
      question: "En la pirámide del sistema financiero tradicional, ¿quién está en la base?",
      options: [
        { id: 'a', text: "Los Bancos Centrales." },
        { id: 'b', text: "Los Gobiernos." },
        { id: 'c', text: "La población (cuyo tiempo y trabajo sostiene la deuda)." }, // Correct
        { id: 'd', text: "El Fondo Monetario Internacional." }
      ],
      correct: 'c'
    },
    {
      id: 8,
      question: "¿Cuál fue la primera forma de 'dinero' que resolvió la falta de coincidencia de deseos?",
      options: [
        { id: 'a', text: "Las criptomonedas." },
        { id: 'b', text: "Las conchas marinas y sal (Dinero mercancía primitive)." }, // Correct
        { id: 'c', text: "Las transferencias bancarias." },
        { id: 'd', text: "El crédito hipotecario." }
      ],
      correct: 'b'
    },
    {
      id: 9,
      question: "¿Qué es la 'Reserva Fraccionaria'?",
      options: [
        { id: 'a', text: "El oro que el banco guarda bajo llave." },
        { id: 'b', text: "La capacidad del banco de prestar dinero que no tiene físicamente." }, // Correct
        { id: 'c', text: "Una reserva de emergencia del gobierno." },
        { id: 'd', text: "El límite de transacciones diarias en cajeros." }
      ],
      correct: 'b'
    },
    {
      id: 10,
      question: "¿Qué significa que Bitcoin sea 'Inmutable'?",
      options: [
        { id: 'a', text: "Que su precio nunca cambia." },
        { id: 'b', text: "Que el registro de transacciones no puede ser alterado ni por bancos ni gobiernos." }, // Correct
        { id: 'c', text: "Que nadie puede usarlo sin permiso." },
        { id: 'd', text: "Que su red se apaga cada noche." }
      ],
      correct: 'b'
    },
    { id: 11, question: "¿Quién ostenta el monopolio de la emisión de dinero hoy?", options: [{ id: 'a', text: "Las empresas tecnológicas." }, { id: 'b', text: "Los Bancos Centrales." }, { id: 'c', text: "Los mineros de Bitcoin." }, { id: 'd', text: "La ONU." }], correct: 'b' },
    { id: 12, question: "¿Cuál es el costo marginal de imprimir un billete de $100 dólares?", options: [{ id: 'a', text: "$100 dólares reales." }, { id: 'b', text: "Casi cero (el costo del papel y tinta)." }, { id: 'c', text: "El valor de una onza de oro." }, { id: 'd', text: "Depende de la bolsa de valores." }], correct: 'b' },
    { id: 13, question: "¿Qué sucede cuando el gobierno imprime dinero para pagar deudo?", options: [{ id: 'a', text: "La economía se vuelve más rica de repente." }, { id: 'b', text: "Se diluye el valor de todo el dinero existente." }, { id: 'c', text: "Los precios bajan por la abundancia." }, { id: 'd', text: "Aumenta la producción industrial." }], correct: 'b' },
    { id: 14, question: "¿Qué ventaja tiene el Oro sobre el Fiat como reserva?", options: [{ id: 'a', text: "Es más ligero." }, { id: 'b', text: "Su stock total crece muy lentamente (Dureza)." }, { id: 'c', text: "Se puede imprimir en casa." }, { id: 'd', text: "Es una moneda digital nativa." }], correct: 'b' },
    { id: 15, question: "¿Qué es el 'Senoreaje'?", options: [{ id: 'a', text: "Un impuesto a los nobles." }, { id: 'b', text: "El beneficio que obtiene el emisor de dinero por la diferencia entre costo y valor." }, { id: 'c', text: "El interés de una cuenta de ahorros." }, { id: 'd', text: "Un tipo de cambio extranjero." }], correct: 'b' },
    { id: 16, question: "¿Qué fue el Patrón Oro?", options: [{ id: 'a', text: "Un sistema donde cada billete era un recibo por oro real en una bóveda." }, { id: 'b', text: "Un metal usado para joyería solamente." }, { id: 'c', text: "La moneda que usaban los piratas." }, { id: 'd', text: "Un sistema inventado por Bitcoin." }], correct: 'a' },
    { id: 17, question: "¿Por qué el sistema Fiat necesita una inflación 'objetivo' del 2%?", options: [{ id: 'a', text: "Para ayudar a los pobres." }, { id: 'b', text: "Para incentivar el gasto y licuar la deuda del emisor." }, { id: 'c', text: "Porque es un número de la suerte." }, { id: 'd', text: "Para evitar que el petróleo suba." }], correct: 'b' },
    { id: 18, question: "¿Qué es la deflación?", options: [{ id: 'a', text: "Cuando los precios suben." }, { id: 'b', text: "Cuando el dinero gana poder adquisitivo (los precios bajan)." }, { id: 'c', text: "El cierre de un banco." }, { id: 'd', text: "La caída de una moneda frente al dólar." }], correct: 'b' },
    { id: 19, question: "¿Qué característica de Bitcoin resuelve el problema de la centralización bancaria?", options: [{ id: 'a', text: "Su color naranja." }, { id: 'b', text: "Su arquitectura Descentralizada y P2P." }, { id: 'c', text: "Que es muy caro." }, { id: 'd', text: "Que tiene una sede en El Salvador." }], correct: 'b' },
    { id: 20, question: "¿Cuál es el límite máximo de suministro de Bitcoin?", options: [{ id: 'a', text: "Infinito." }, { id: 'b', text: "21 millones de unidades." }, { id: 'c', text: "100 mil millones." }, { id: 'd', text: "Depende de lo que voten los bancos." }], correct: 'b' }
  ];

  // Aleatorización de 5 preguntas al montar
  React.useEffect(() => {
    const shuffled = [...QUIZ_POOL].sort(() => 0.5 - Math.random());
    setCurrentQuestions(shuffled.slice(0, 5));
  }, []);

  const checkAnswers = () => {
    let correctCount = 0;
    currentQuestions.forEach(q => {
      if (answers[q.id] === q.correct) correctCount++;
    });
    setScore((correctCount / currentQuestions.length) * 100);
  };

  const forceAnswers = () => {
    const revealed = {};
    currentQuestions.forEach(q => { revealed[q.id] = q.correct; });
    setAnswers(revealed);
    setScore(100);
  };
  
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

      {/* -------------------------------------------------------------------------------- */}
      {/* 4. QUIZ DINÁMICO DE ALTA COMPLEJIDAD (MÓDULO 1) */}
      {/* -------------------------------------------------------------------------------- */}
      <div className="flex items-center gap-4 py-8">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Evaluación Final: La Trampa Fiat</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <section>
        <Card className={`transition-all duration-700 ${score === 100 ? 'border-sol-green shadow-[0_0_30px_rgba(20,241,149,0.15)] bg-sol-green/5' : score !== null ? 'border-red-500 bg-red-500/5' : 'border-gray-800'}`}>
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8 border-b border-gray-800 pb-4">
            <div>
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter">Validación de Conocimiento Institucional</h3>
              
            </div>
            
            <div className="flex gap-3 items-center">
               <Tooltip content="Califica tus conocimientos y verifica aciertos.">
                 <Button variant="outline" size="sm" onClick={checkAnswers} disabled={Object.keys(answers).length < 5}>
                   Verificar Examen
                 </Button>
               </Tooltip>
               <Tooltip content="Audita las llaves maestras de esta evaluación financiera.">
                 <Button variant="ghost" size="sm" onClick={forceAnswers} className="text-gray-400">
                   <Eye size={18} className="mr-2"/> Revelar Respuestas
                 </Button>
               </Tooltip>
            </div>
          </div>

          <div className="space-y-10">
            {currentQuestions.map((q, index) => (
              <div key={q.id} className="space-y-4 bg-gray-900/40 p-6 rounded-2xl border border-gray-800/50">
                 <h4 className="font-bold text-gray-200 text-lg leading-relaxed">{index + 1}. {q.question}</h4>
                 <div className="space-y-3 pt-2">
                   {q.options.map((opt) => {
                     const isSelected = answers[q.id] === opt.id;
                     const isCorrect = score !== null && opt.id === q.correct;
                     const isWrong = score !== null && isSelected && opt.id !== q.correct;
                     
                     return (
                      <div 
                        key={`${q.id}-${opt.id}`} 
                        onClick={() => setAnswers({ ...answers, [q.id]: opt.id })}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          isSelected ? 'border-btc-orange bg-btc-orange/5' : 'border-gray-800 hover:border-gray-700'
                        } ${isCorrect ? 'border-sol-green bg-sol-green/10 text-sol-green' : ''} ${isWrong ? 'border-red-500 bg-red-500/10 text-red-500' : ''}`}
                      >
                         <div className="flex items-center justify-between">
                            <span className="font-medium text-sm">{opt.text}</span>
                            {isSelected && <div className="w-2 h-2 rounded-full bg-current shadow-[0_0_8px_currentColor]"></div>}
                         </div>
                      </div>
                     );
                   })}
                 </div>
              </div>
            ))}
          </div>

          {score !== null && (
             <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               className="mt-12 p-8 rounded-2xl border bg-black text-center space-y-4"
             >
                <p className="text-gray-500 uppercase font-black tracking-widest text-xs">Resultado de la Auditoría</p>
                <h2 className={`text-6xl font-black ${score >= 80 ? 'text-sol-green' : 'text-red-500'}`}>
                   {score}%
                </h2>
                <p className="max-w-md mx-auto text-gray-400 text-sm">
                   {score >= 80 
                    ? "Felicidades. Has detectado las grietas del sistema fiat. Estás listo para el estándar Bitcoin." 
                    : "Advertencia: Tu capital está en riesgo. Debes comprender mejor cómo el sistema erosiona tu trabajo."}
                </p>
             </motion.div>
          )}
        </Card>
      </section>

    </motion.div>

  );
};
