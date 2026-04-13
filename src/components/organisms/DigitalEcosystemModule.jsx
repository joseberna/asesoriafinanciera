import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { 
  ShieldCheck, Landmark, Search, BookOpen, Key, Coins, AlertTriangle, CheckCircle2, Eye, Award 
} from 'lucide-react';
import { Tooltip } from '../atoms/Tooltip';
import { Button } from '../atoms/Button';
import { fetchPaxgAllocation, clearAllocationData } from '../../store/slices/paxgSlice';
import { useLanguage } from '../../context/LanguageContext';

export const DigitalEcosystemModule = () => {
  const dispatch = useDispatch();
  const { t } = useLanguage();
  
  // Estado API Redux
  const { data: paxgResults, loading: isSearching, error: reduxError } = useSelector((state) => state.paxg);
  
  const [wallet, setWallet] = useState('');
  const [localError, setLocalError] = useState('');

  // Estado Actividad Evaluatoria
  const [answers, setAnswers] = useState({ q1: null, q2: null, q3: null });
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  // Validación y Dispatch de Redux para PAXG Lookup
  const handleLookup = () => {
    // 1. Validaciones OBLIGATORIAS DE BILLETERA
    if (!wallet.trim()) {
      setLocalError('Por favor ingresa una dirección de Wallet.');
      dispatch(clearAllocationData());
      return;
    }
    const ethAddressRegex = /^0x[a-fA-F0-9]{40}$/;
    if (!ethAddressRegex.test(wallet)) {
      setLocalError('Dirección inválida. Debe ser una Ethereum Address (0x seguida de 40 caracteres hexadecimales).');
      dispatch(clearAllocationData());
      return;
    }

    setLocalError('');
    // Llamada Oficial al API vía Redux Thunk
    dispatch(fetchPaxgAllocation(wallet));
  };

  const currentError = localError || reduxError;

  // Evaluador
  const checkAnswers = () => {
    let currentScore = 0;
    if (answers.q1 === 'c') currentScore += 33.3;
    if (answers.q2 === 'a') currentScore += 33.3;
    if (answers.q3 === 'b') currentScore += 33.4;
    setScore(Math.round(currentScore));
  };

  const forceAnswers = () => {
    setAnswers({ q1: 'c', q2: 'a', q3: 'b' });
    setScore(100);
    setShowAnswers(true);
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
          <Tooltip content="Conoce la diferencia entre dinero programable del pueblo y del régimen.">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sol-green to-eth-blue inline-block cursor-help w-fit">
              Ecosistema Digital: Activos y Custodia
            </h2>
          </Tooltip>
        </div>

        {/* EDUCACIONAL: Stablecoins y CBDC */}
        <Tooltip content="Comparativa entre monedas estables descentralizadas y las CBDC controladas.">
          <Card className="border-gray-800 border-l-4 border-l-eth-blue flex flex-col md:flex-row gap-4 p-8">
            <Coins className="text-eth-blue flex-shrink-0" size={32} />
            <div className="space-y-4 w-full">
              <h3 className="text-xl font-bold text-gray-200 cursor-help">Stablecoins vs CBDC</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-crypto-surface-alt p-4 rounded-xl border border-gray-700">
                  <h4 className="font-bold text-sol-green mb-2">Stablecoins (USDT, USDC, DAI)</h4>
                  <p className="text-sm text-gray-400">
                    Criptomonedas atadas al valor del dólar (1:1). Permiten enviar dólares digitales por todo el mundo en segundos, a muy bajo costo, sorteando las fronteras bancarias tradicionales. USDC es reconocida por su total transparencia y auditorías.
                  </p>
                </div>
                <div className="bg-red-900/20 p-4 rounded-xl border border-red-900/50">
                  <h4 className="font-bold text-red-500 mb-2">CBDC (Monedas de Banco Central)</h4>
                  <p className="text-sm text-gray-400">
                    Peligro para la soberanía. Son la versión digital del dinero local pero programable por los estados. Tienen la capacidad tecnológica de implementar fechas de caducidad en tu dinero, denegar transacciones según tu huella de carbono social o rastrear absolutamente todos tus gastos.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </Tooltip>

        {/* EDUCACIONAL: Cultura de Custodia */}
         <Tooltip content="Not your keys, not your coins. El credo de Web3.">
          <Card className="border-gray-800 border-l-4 border-l-neon-accent flex gap-4 p-8">
            <Key className="text-neon-accent flex-shrink-0" size={32} />
            <div className="space-y-4">
               <h3 className="text-xl font-bold text-gray-200 cursor-help">La Cultura de la Autocustodia (12 Palabras)</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                A diferencia de un banco donde tu dinero está en sus bases de datos, aquí tú controlas el acceso criptográfico maestro: **La Frase Semilla**. Una serie de 12 a 24 palabras generadas aleatoriamente (BIP39). Quien posea esas palabras en el mundo físico, es el dueño total de los fondos en la blockchain, sin intermediarios que puedan congelar tu cuenta. **Tu memoria celular es tu banco.**
              </p>
            </div>
          </Card>
         </Tooltip>
      </section>

      {/* -----------------------------------------------------------------        {/* INTEGRACIÓN REDUX TÉCNICA: PAXG API LOOKUP REPLICA EXACTA */}
      {/* -------------------------------------------------------------------------------- */}
      <section className="space-y-8">
        <Tooltip content="Verificación de Activos de Oro consumiendo API Paxos por Redux.">
           <Card aura className="border-gray-700 bg-gray-50 text-gray-900 overflow-hidden relative font-sans">
             <div className="relative z-10 w-full p-2 md:p-6 mb-2">
               
               {/* Réplica del Header de la Imagen */}
               <h2 className="text-4xl md:text-5xl font-bold text-[#1f2937] mb-4">{t('paxg.title')}</h2>
               <p className="text-[#374151] text-lg mb-8 max-w-3xl">
                 {t('paxg.subtitle')}
               </p>
               
               {/* Input Area */}
               <div className="max-w-4xl space-y-4">
                 <div className="relative">
                   <Tooltip content="Ingresa dirección Ethereum validada por Regex (Ej. 0x5e9...)">
                     <input 
                       type="text" 
                       placeholder={t('paxg.placeholder')}
                       value={wallet}
                       onChange={(e) => setWallet(e.target.value)}
                       onKeyDown={(e) => e.key === 'Enter' && handleLookup()}
                       className={`w-full border-2 rounded-xl px-4 py-3 text-[#1f2937] bg-white outline-none transition-colors ${currentError ? 'border-red-500' : 'border-gray-400 focus:border-[#111827]'}`}
                     />
                   </Tooltip>
                 </div>
                 {currentError && (
                   <p className="text-red-500 text-sm font-medium flex items-center gap-1">
                     <AlertTriangle size={16} /> {currentError}
                   </p>
                 )}
                 <div className="pt-2">
                   <Tooltip content="Mandar petición GET (Thunk Redux)">
                     <button 
                       onClick={handleLookup} 
                       disabled={isSearching}
                       className="bg-[#0f172a] hover:bg-[#1e293b] text-white px-8 py-2.5 rounded-full font-medium transition-colors disabled:bg-gray-400"
                     >
                       {isSearching ? t('paxg.loading') : t('paxg.lookupBtn')}
                     </button>
                   </Tooltip>
                 </div>
               </div>
               

               {/* Resultado Redux JSON UI */}
               <AnimatePresence>
                 {paxgResults && (
                   <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-12 bg-[#f3f4f6] rounded-2xl p-6 md:p-8 shadow-inner overflow-hidden">
                     <h3 className="text-xl font-bold text-black mb-4">{t('paxg.reportTitle')}</h3>
                     <p className="text-black mb-6 text-sm md:text-base leading-relaxed">
                       {t('paxg.reportStart')} <strong>{paxgResults.address}</strong> {t('paxg.reportMid')} <strong>{paxgResults.balance} PAXG</strong>, {t('paxg.reportEnd')} <strong>{parseFloat(paxgResults.balance).toFixed(4)} {t('paxg.reportOz')}</strong>
                     </p>

                     {/* Inner White Box Data Grid */}
                     <div className="bg-white rounded-xl p-6 border border-gray-200 mb-8 overflow-x-auto">
                        <table className="w-full text-sm md:text-base border-separate border-spacing-y-3">
                          <tbody>
                            <tr>
                              <td className="text-gray-500">{t('paxg.owned')}</td>
                              <td className="text-right font-bold text-black">{paxgResults.bar.ownedPortion}</td>
                            </tr>
                            <tr>
                              <td className="text-gray-500">{t('paxg.serial')}</td>
                              <td className="text-right font-bold text-black">{paxgResults.bar.serialNumber}</td>
                            </tr>
                            <tr>
                              <td className="text-gray-500 flex items-start break-words whitespace-normal align-top pt-2">{t('paxg.brand').split(' ')[0]}<br/>{t('paxg.brand').split(' ').slice(1).join(' ')}</td>
                              <td className="text-right font-bold text-black max-w-[200px] md:max-w-md break-words pt-2 align-top leading-tight">
                                {paxgResults.bar.brandCode}
                              </td>
                            </tr>
                            <tr>
                              <td className="text-gray-500 pt-4">{t('paxg.gross')}</td>
                              <td className="text-right font-bold text-black pt-4">{paxgResults.bar.grossWeight}</td>
                            </tr>
                            <tr>
                              <td className="text-gray-500">{t('paxg.fineness')}</td>
                              <td className="text-right font-bold text-black">{paxgResults.bar.fineness}</td>
                            </tr>
                            <tr>
                              <td className="text-gray-500">{t('paxg.fine')}</td>
                              <td className="text-right font-bold text-black">{paxgResults.bar.fineWeight}</td>
                            </tr>
                          </tbody>
                        </table>
                     </div>

                     {/* Footnotes */}
                     <div className="text-[#374151] text-xs md:text-sm space-y-1 font-medium pb-8 border-b border-gray-300 mb-6">
                       <p>{t('paxg.note1')}</p>
                       <p>{t('paxg.note2')} <strong>{paxgResults.metadata.date}</strong></p>
                       <p>{t('paxg.note3')} <strong>{paxgResults.metadata.blockNumber}</strong></p>
                       <p>{t('paxg.note4')}</p>
                     </div>
                     <p className="text-gray-400 text-xs text-center md:text-left">{t('paxg.disclaimer')}</p>
                   </motion.div>
                 )}
               </AnimatePresence>
             </div>
           </Card>
        </Tooltip>
      </section>

      {/* -------------------------------------------------------------------------------- */}
      {/* SECCIÓN DE EVALUACIÓN INTERACTIVA */}
      {/* -------------------------------------------------------------------------------- */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Certificación de Custodia</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <section>
        <Card className={`transition-all duration-700 ${score === 100 ? 'border-sol-green shadow-[0_0_30px_rgba(20,241,149,0.15)] bg-sol-green/5' : score !== null ? 'border-red-500 bg-red-500/5' : 'border-gray-800'}`}>
          <div className="flex items-center justify-between mb-8 border-b border-gray-800 pb-4">
            <h3 className="text-xl font-bold text-white">Quiz: Autocustodia y Activos</h3>
            
            <div className="flex gap-3 items-center">
               <Tooltip content="Muestra los resultados matemáticos de tu examen.">
                 <Button variant="outline" size="sm" onClick={checkAnswers} disabled={!answers.q1 || !answers.q2 || !answers.q3}>
                   Calificar Examen
                 </Button>
               </Tooltip>
               <Tooltip content="Desbloquea las respuestas correctas.">
                 <Button variant="ghost" size="sm" onClick={forceAnswers} className="text-gray-400">
                   <Eye size={18} className="mr-2"/> Ver Respuestas
                 </Button>
               </Tooltip>
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
               <h4 className="font-bold text-gray-200">1. ¿Cuál es el mayor peligro funcional de una CBDC?</h4>
               <div className="space-y-2">
                 {[
                   { id: 'a', text: 'Que están respaldadas por oro al igual que PAXG.' },
                   { id: 'b', text: 'Que ocupan mucho espacio en disco para el usuario.' },
                   { id: 'c', text: 'Permiten censurar transacciones y programar expirabilidad en los fondos del ciudadano.' }
                 ].map((opt) => (
                   <div 
                     key={`q1-${opt.id}`} 
                     onClick={() => setAnswers({...answers, q1: opt.id})}
                     className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                       answers.q1 === opt.id ? (showAnswers && opt.id==='c' ? 'bg-sol-green/20 border-sol-green' : 'bg-neon-accent/10 border-neon-accent') : 
                       (showAnswers && opt.id==='c' ? 'bg-sol-green/20 border-sol-green' : 'bg-crypto-surface-alt border-gray-700 hover:border-gray-500')
                     }`}
                   >
                     {opt.text}
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="font-bold text-gray-200">2. Si descubren tu Frase Semilla de 12 palabras, ¿qué pueden hacer?</h4>
               <div className="space-y-2">
                 {[
                   { id: 'a', text: 'Importar la billetera desde cualquier lugar del planeta y vaciar todos los fondos instantáneamente.' },
                   { id: 'b', text: 'Nada, porque necesitarán mi contraseña tradicional y correo o SMS.' },
                   { id: 'c', text: 'Nada, porque el banco bloquea accesos en IP desconocidas.' }
                 ].map((opt) => (
                   <div 
                     key={`q2-${opt.id}`} 
                     onClick={() => setAnswers({...answers, q2: opt.id})}
                     className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                       answers.q2 === opt.id ? (showAnswers && opt.id==='a' ? 'bg-sol-green/20 border-sol-green' : 'bg-neon-accent/10 border-neon-accent') : 
                       (showAnswers && opt.id==='a' ? 'bg-sol-green/20 border-sol-green' : 'bg-crypto-surface-alt border-gray-700 hover:border-gray-500')
                     }`}
                   >
                     {opt.text}
                   </div>
                 ))}
               </div>
            </div>

            <div className="space-y-4">
               <h4 className="font-bold text-gray-200">3. ¿Cuál es el principal valor de PAXG frente al Oro Físico escondido en tu casa?</h4>
               <div className="space-y-2">
                 {[
                   { id: 'a', text: 'Ninguna, es lo mismo pero más inseguro.' },
                   { id: 'b', text: 'Permite enviarlo al otro lado del mundo en microsegundos (coste gas) con máxima liquidez y siendo auditable en blockchain.' },
                   { id: 'c', text: 'Que en PAXG tú vas personalmente a Londres a sacarlo a diario.' }
                 ].map((opt) => (
                   <div 
                     key={`q3-${opt.id}`} 
                     onClick={() => setAnswers({...answers, q3: opt.id})}
                     className={`p-4 rounded-xl border cursor-pointer transition-colors ${
                       answers.q3 === opt.id ? (showAnswers && opt.id==='b' ? 'bg-sol-green/20 border-sol-green' : 'bg-neon-accent/10 border-neon-accent') : 
                       (showAnswers && opt.id==='b' ? 'bg-sol-green/20 border-sol-green' : 'bg-crypto-surface-alt border-gray-700 hover:border-gray-500')
                     }`}
                   >
                     {opt.text}
                   </div>
                 ))}
               </div>
            </div>
          </div>

          <AnimatePresence>
            {score !== null && (
               <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="mt-8 border-t border-gray-800 pt-6">
                 {score >= 60 ? (
                   <div className="flex items-center gap-4 bg-sol-green/10 border border-sol-green/30 p-6 rounded-xl">
                     <Award className="text-sol-green" size={48} />
                     <div>
                       <h4 className="text-2xl font-bold text-sol-green">Score: {score}% - Aprobado</h4>
                       <p className="text-green-200 text-sm mt-1">Estás listo para empoderarte tecnológicamente. Tu riqueza te pertenece a ti y a nadie más.</p>
                     </div>
                   </div>
                 ) : (
                   <div className="flex items-center gap-4 bg-red-900/20 border border-red-500/30 p-6 rounded-xl">
                     <AlertTriangle className="text-red-500" size={48} />
                     <div>
                       <h4 className="text-2xl font-bold text-red-500">Score: {score}% - Falta Conocimiento</h4>
                       <p className="text-red-200 text-sm mt-1">Si operas Web3 ahora mismo estás en peligro máximo de pérdida de fondos. Repasa la teoría de soberanía. Dale a "Ver Respuestas".</p>
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
