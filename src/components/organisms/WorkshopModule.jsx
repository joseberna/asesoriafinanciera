import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { TaskItem } from '../molecules/TaskItem';
import { ProgressBar } from '../atoms/ProgressBar';
import { useProgress } from '../../context/ProgressContext';
import { Download, Award, BookOpen } from 'lucide-react';
import { Button } from '../atoms/Button';
import { Tooltip } from '../atoms/Tooltip';

export const WorkshopModule = () => {
  const { tasks, progress, toggleTask } = useProgress();

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
          <Tooltip content="Módulo de ejecución práctica. Lleva a cabo los pasos reales.">
             <h2 className="text-3xl font-bold text-white inline-block cursor-help">
              Workshop Práctico
            </h2>
          </Tooltip>
        </div>

        <Card className="border-gray-800 border-l-4 border-l-neon-accent flex gap-4">
          <BookOpen className="text-neon-accent flex-shrink-0" size={24} />
          <div>
            <Tooltip content="Ejecución de la soberanía.">
              <h3 className="text-xl font-bold text-gray-200 mb-2 cursor-help">La Acción Supera a la Teoría</h3>
            </Tooltip>
            <p className="text-gray-400 leading-relaxed text-sm">
              Saber sobre descentralización y no interactuar con el setup es como leer sobre montar en bicicleta. Sigue este checklist durante la conferencia. Tu progreso se guardará. Completa todos los pasos en vivo para desbloquear los recursos exclusivos que preparamos para ti.
            </p>
          </div>
        </Card>
      </section>

      {/* SECCIÓN PRÁCTICA */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Checklist Interactivo</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <section>
        <Card className="space-y-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-400 uppercase tracking-wider">Progreso de Soberanía</span>
            <span className="text-neon-accent font-bold">{progress}%</span>
          </div>
          
          <Tooltip content="Barra de avance. Llegar al 100% desbloquea un super regalo.">
            <div className="cursor-help py-2">
              <ProgressBar progress={progress} />
            </div>
          </Tooltip>

          <div className="space-y-4 mt-8">
            <Tooltip content="Clic para marcar como completado.">
              <div className="w-full">
                <TaskItem 
                  title="Soberanía Cripto: Crear Billetera y Resguardar Semilla"
                  description="Instala Trust Wallet, Phantom o usa tu Trezor. Anota las 12 palabras en papel, jamás en la nube."
                  completed={tasks.seedCreated}
                  onClick={() => toggleTask('seedCreated')}
                />
              </div>
            </Tooltip>
            
            <Tooltip content="Clic para marcar como completado.">
              <div className="w-full">
                <TaskItem 
                  title="Puerta de Enlace (On-Ramp): Registro y KYC"
                  description="Crea tu cuenta en Binance o Bitget y verifica tu identidad (KYC) para conectar tu banco fiat."
                  completed={tasks.kycVerified}
                  onClick={() => toggleTask('kycVerified')}
                />
              </div>
            </Tooltip>

            <Tooltip content="Clic para marcar como completado.">
              <div className="w-full">
                <TaskItem 
                  title="Setup de Tracking: TradingView"
                  description="Abre TradingView, busca BTC/USDT y añade 2 indicadores: RSI (Fuerza Relativa) y Media Móvil de 200 Periodos."
                  completed={tasks.rsiConfigured}
                  onClick={() => toggleTask('rsiConfigured')}
                />
              </div>
            </Tooltip>

            <Tooltip content="Clic para marcar como completado.">
              <div className="w-full">
                 <TaskItem 
                  title="Bonus Analítico: Entender Polymarket"
                  description="Accede a Polymarket y revisa un mercado de predicción. Entiende qué opina el 'dinero inteligente' apostando."
                  completed={tasks.polymarketRead}
                  onClick={() => toggleTask('polymarketRead')}
                />
              </div>
             </Tooltip>
          </div>
        </Card>

        <AnimatePresence>
          {progress === 100 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-center mt-10"
            >
              <Card aura className="border-neon-accent bg-neon-accent/5 text-center flex flex-col items-center p-10 w-full relative overflow-hidden">
                <motion.div 
                  className="absolute inset-0 bg-neon-accent/10"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <Award size={64} className="text-neon-accent mb-4 drop-shadow-[0_0_15px_rgba(0,255,204,0.8)] relative z-10" />
                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">¡Nivel Experto Desbloqueado!</h3>
                <p className="text-gray-400 mb-8 max-w-lg mx-auto relative z-10">
                  Has completado la transformación. Ahora tienes las herramientas y la mentalidad. 
                  Descarga tu tracker de DCA y empoderate financieramente; ese es el verdadero código de riqueza.
                </p>
                <div className="relative z-10">
                  <Tooltip content="Descarga tu archivo Excel interactivo." position="bottom">
                    <Button variant="outline" size="lg" className="w-full sm:w-auto px-12">
                      <Download className="mr-3" size={20} />
                      Descargar Tracker DCA (Excel)
                    </Button>
                  </Tooltip>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </motion.div>
  );
};
