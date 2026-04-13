import React, { useState, useEffect } from 'react';
import { Reorder, motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { useLanguage } from '../../context/LanguageContext';
import { Tooltip } from '../atoms/Tooltip';
import { GripVertical, CheckCircle2, Eye } from 'lucide-react';
import { Button } from '../atoms/Button';

export const HistoryDragDrop = () => {
  const { t } = useLanguage();
  
  const [items, setItems] = useState([
    { id: 'fiat', textKey: 'historyItems.fiat', correctIndex: 3 },
    { id: 'barter', textKey: 'historyItems.barter', correctIndex: 0 },
    { id: 'bitcoin', textKey: 'historyItems.bitcoin', correctIndex: 4 },
    { id: 'shells', textKey: 'historyItems.shells', correctIndex: 1 },
    { id: 'gold', textKey: 'historyItems.gold', correctIndex: 2 }
  ]);
  
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const isCorrect = items.every((item, index) => item.correctIndex === index);
    setIsSuccess(isCorrect);
  }, [items]);

  const handleShowAnswers = () => {
    const sorted = [...items].sort((a, b) => a.correctIndex - b.correctIndex);
    setItems(sorted);
  };

  return (
    <Card aura={isSuccess} className={`transition-all duration-500 relative ${isSuccess ? 'border-sol-green/50' : ''}`}>
      <div className="flex items-center justify-between mb-6">
        <Tooltip content={t('tooltips.dragDrop') || "Arrastra y suelta para ordenar"}>
          <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-accent to-eth-blue cursor-help w-fit">
            {t('mod1.activity1Title') || "Actividad 1: Evolución del Intercambio"}
          </h3>
        </Tooltip>
        {isSuccess ? (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-sol-green">
            <CheckCircle2 size={32} />
          </motion.div>
        ) : (
          <Tooltip content="Muestra la solución automática y la retroalimentación para saltar la dificultad de la actividad." position="left">
            <Button variant="ghost" size="sm" onClick={handleShowAnswers} className="text-gray-400 border border-gray-700">
              <Eye size={18} className="mr-2" />
              Ver Respuestas
            </Button>
          </Tooltip>
        )}
      </div>
      
      <Tooltip content="La prueba consta de ordenar los tipos de dinero de peor/más antiguo a mejor/más nuevo tecnológico.">
        <p className="text-gray-400 mb-6 cursor-help w-fit">{t('mod1.activity1Desc') || "Arrastra los elementos."}</p>
      </Tooltip>

      <Reorder.Group axis="y" values={items} onReorder={setItems} className="space-y-3">
        {items.map((item) => (
          <Reorder.Item key={item.id} value={item}>
            <Tooltip content={`Elemento de la historia: ${t(item.textKey)}. Mantén click y arrastra.`} position="right">
              <div className={`flex items-center p-4 rounded-xl border cursor-grab active:cursor-grabbing backdrop-blur-md transition-colors ${
                isSuccess ? 'bg-sol-green/10 border-sol-green/30' : 'bg-crypto-surface-alt border-gray-700 hover:border-neon-accent/50'
              }`}>
                <GripVertical className="mr-4 text-gray-500" size={20} />
                <span className="font-semibold text-gray-200">{t(item.textKey)}</span>
              </div>
            </Tooltip>
          </Reorder.Item>
        ))}
      </Reorder.Group>

      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }} 
            className="mt-6 p-4 bg-sol-green/10 text-sol-green border border-sol-green/30 rounded-xl font-medium text-center"
          >
            ¡Excelente! Has entendido la evolución que da origen a la necesidad de una red descentralizada inmutable ante la corrupción del papel y la ineficiencia del trueque.
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};
