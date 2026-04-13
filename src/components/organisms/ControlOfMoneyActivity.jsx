import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { useLanguage } from '../../context/LanguageContext';
import { Tooltip } from '../atoms/Tooltip';
import { Building, Network, ArrowRight, Eye, CheckCircle2 } from 'lucide-react';
import { Button } from '../atoms/Button';

export const ControlOfMoneyActivity = () => {
  const { t } = useLanguage();
  const [selectedModel, setSelectedModel] = useState(null); // 'fiat' | 'crypto'
  const [showAnswer, setShowAnswer] = useState(false);

  const handleShowAnswers = () => {
    setSelectedModel('crypto');
    setShowAnswer(true);
  };

  return (
    <Card className="space-y-6 relative">
      <div className="flex items-center gap-2 justify-between">
        <Tooltip content={t('tooltips.control') || "Aprende sobre la centralización vs descentralización."}>
          <h3 className="text-xl font-bold text-gray-100 cursor-help">
            Modelos de Emisión
          </h3>
        </Tooltip>
        {!showAnswer ? (
          <Tooltip content="Elige la opción que genera libertad del poder adquisitivo o mira la solución aquí." position="left">
             <Button variant="ghost" size="sm" onClick={handleShowAnswers} className="text-gray-400 border border-gray-700">
                <Eye size={18} className="mr-2" />
                Ver Respuestas
             </Button>
          </Tooltip>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sol-green">
            <CheckCircle2 size={32} />
          </motion.div>
        )}
      </div>

      <Tooltip content="Decide con tu click el modelo que evita la hiperinflación.">
         <p className="text-gray-400 cursor-help w-fit">Selecciona un modelo para visualizar quién controla la emisión del dinero.</p>
      </Tooltip>

      <div className="grid md:grid-cols-2 gap-4 relative">
        <Tooltip content="El modelo Fiat donde la reserva fraccionaria y los políticos dictan las reglas del juego de forma unilateral." position="top">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedModel('fiat')}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-colors ${
              selectedModel === 'fiat' ? 'border-red-500 bg-red-500/10' : 'border-gray-700 bg-crypto-surface-alt hover:border-red-500/50'
            }`}
          >
            <div className="flex flex-col items-center text-center gap-3">
              <Building size={48} className={selectedModel === 'fiat' ? 'text-red-500' : 'text-gray-500'} />
              <h4 className="font-bold text-lg text-white">Sistema Fiat Centralizado</h4>
              <span className="text-sm text-gray-500">Unos pocos deciden por todos.</span>
            </div>
          </motion.div>
        </Tooltip>

        <Tooltip content="El criptoactivo descentralizado que requiere 51% de consenso y no hay CEO ni oficinas que confiscar." position="top">
          <motion.div
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedModel('crypto')}
            className={`cursor-pointer p-6 rounded-xl border-2 transition-colors ${
              selectedModel === 'crypto' ? 'border-sol-green bg-sol-green/10' : 'border-gray-700 bg-crypto-surface-alt hover:border-sol-green/50'
            } ${showAnswer && 'ring-4 ring-sol-green shadow-[0_0_20px_#14f195]'}`} // Destacar si se pide ver respuesta
          >
            <div className="flex flex-col items-center text-center gap-3">
              <Network size={48} className={selectedModel === 'crypto' ? 'text-sol-green' : 'text-gray-500'} />
              <h4 className="font-bold text-lg text-white">Red Web3 / Bitcoin</h4>
              <span className="text-sm text-gray-500">Reglas predecibles por código, no por humanos.</span>
            </div>
          </motion.div>
        </Tooltip>
      </div>

      <div className="mt-8 min-h-[150px]">
        {selectedModel === 'fiat' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-red-500/5 border border-red-500/20 rounded-xl space-y-4">
            <Tooltip content="Muestra jerárquica de cómo el de arriba absorbe riqueza del de abajo." position="top">
               <h5 className="font-bold text-red-400 text-center cursor-help w-fit mx-auto">Pirámide de Control Bancario</h5>
            </Tooltip>
            <div className="flex flex-col items-center gap-2">
              <div className="px-4 py-2 bg-red-900 border border-red-700 rounded-lg text-white font-medium">Bancos Centrales (Reserva Federal, BCE)</div>
              <ArrowRight className="rotate-90 text-red-500" size={20} />
              <div className="px-4 py-2 bg-red-900/80 border border-red-700 rounded-lg text-gray-300">Bancos Comerciales (Crean dinero vía crédito)</div>
              <ArrowRight className="rotate-90 text-red-500" size={20} />
              <div className="px-4 py-2 bg-red-900/50 border border-red-700 rounded-lg text-gray-400">Ciudadanos Comunes (Sufren la inflación)</div>
            </div>
            <p className="text-sm text-gray-400 text-center mt-4">La emisión arbitraria diluye tus ahorros sin tu consentimiento (Efecto Cantillon).</p>
          </motion.div>
        )}

        {selectedModel === 'crypto' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-6 bg-sol-green/5 border border-sol-green/20 rounded-xl space-y-4">
            <Tooltip content="Los nodos auditan y verifican que se cumplan las reglas. 1 CPU = 1 Voto o Proof of Stake." position="top">
              <h5 className="font-bold text-sol-green text-center cursor-help w-fit mx-auto">Red Distribuida de Consenso</h5>
            </Tooltip>
            <div className="flex justify-center items-center flex-wrap gap-4 pt-4">
              {[1,2,3,4,5].map(i => (
                 <Tooltip key={i} content={`Nodo verificador que mantiene la blockchain intacta. ID: ${Math.floor(Math.random() * 1000)}`} position="bottom">
                  <div className="flex items-center gap-2 p-3 bg-green-900/30 border border-sol-green/40 rounded-full cursor-help hover:bg-green-800/30">
                    <Network size={16} className="text-sol-green" />
                    <span className="text-xs text-green-300">Nodo</span>
                  </div>
                </Tooltip>
              ))}
            </div>
            <p className="text-sm text-gray-400 text-center mt-4 border-t border-sol-green/20 pt-4">
              Cada nodo verifica las transacciones según un código abierto e inmutable. Consenso 100% democrático y transparente. Matemática pura.
              {showAnswer && <span className="block mt-2 font-bold text-white">¡Respuesta Correcta! Este es el ecosistema libre de inflación.</span>}
            </p>
          </motion.div>
        )}

        {!selectedModel && (
          <div className="h-full flex items-center justify-center text-gray-600 text-sm italic">
            Esperando interacción...
          </div>
        )}
      </div>
    </Card>
  );
};
