import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { ShieldAlert, ShieldCheck, Landmark, Smartphone, Zap, BookOpen } from 'lucide-react';
import { Tooltip } from '../atoms/Tooltip';

export const DigitalEcosystemModule = () => {
  const [selectedCustody, setSelectedCustody] = useState(null);
  
  const options = [
    {
      id: 'exchange',
      title: 'Exchange Centralizado',
      icon: <Landmark size={40} />,
      status: 'danger',
      description: 'Not your keys, not your coins. El riesgo de contraparte más alto.',
    },
    {
      id: 'hotwallet',
      title: 'Hot Wallet (Phantom/Trust)',
      icon: <Smartphone size={40} />,
      status: 'warning',
      description: 'Conveniente para DeFi, pero conectado a internet permanentemente.',
    },
    {
      id: 'coldwallet',
      title: 'Hardware Wallet (Cold)',
      icon: <ShieldCheck size={40} />,
      status: 'success',
      description: 'Aislamiento offline total. Tú eres tu propio banco.',
    }
  ];

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
          <Tooltip content="Módulo sobre cómo almacenar tus criptomonedas de forma segura.">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sol-green to-eth-blue inline-block cursor-help">
              Ecosistema Digital: La Custodia
            </h2>
          </Tooltip>
        </div>

        <Card className="border-gray-800 border-l-4 border-l-eth-blue flex gap-4">
          <BookOpen className="text-eth-blue flex-shrink-0" size={24} />
          <div>
            <Tooltip content="La frase 'Not your keys, not your coins' significa que si no controlas las llaves privadas, los fondos no son tuyos.">
              <h3 className="text-xl font-bold text-gray-200 mb-2 cursor-help">El Mito del Ahorro Bancario vs Autocustodia</h3>
            </Tooltip>
            <p className="text-gray-400 leading-relaxed text-sm">
              En el sistema tradicional, el banco es dueño de tu dinero y te debe una "promesa" de pago. En Web3, si no tienes las claves criptográficas, estás corriendo el mismo riesgo. Aprender a custodiar es el paso número uno de la soberanía.
            </p>
          </div>
        </Card>
      </section>

      {/* SECCIÓN DE ACTIVIDADES */}
      <div className="flex items-center gap-4 my-8">
        <div className="h-px bg-gray-800 flex-1"></div>
        <span className="text-gray-500 text-sm font-bold uppercase tracking-wider">Simulador Práctico</span>
        <div className="h-px bg-gray-800 flex-1"></div>
      </div>

      <section>
        <Tooltip content="Haz clic en las opciones para ver sus niveles de seguridad. Elige la correcta.">
          <h3 className="text-xl font-bold text-gray-200 mb-6 cursor-help">Actividad: ¿Dónde guardarías los ahorros de toda tu vida?</h3>
        </Tooltip>

        <div className="grid md:grid-cols-3 gap-6">
          {options.map((opt) => (
            <motion.div
              key={opt.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedCustody(opt.id)}
              className={`cursor-pointer border-2 rounded-2xl p-6 transition-all duration-300 ${
                selectedCustody === opt.id 
                  ? opt.status === 'success' ? 'border-sol-green bg-sol-green/10' :
                    opt.status === 'warning' ? 'border-yellow-500 bg-yellow-500/10' :
                    'border-red-500 bg-red-500/10'
                  : 'border-gray-800 bg-crypto-surface hover:border-gray-600'
              }`}
            >
              <div className={`mb-4 ${
                opt.status === 'success' ? 'text-sol-green' : 'text-gray-400'
              }`}>
                {opt.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-100 mb-2">{opt.title}</h3>
              <p className="text-sm text-gray-500">{opt.description}</p>
            </motion.div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {selectedCustody === 'coldwallet' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="mt-8"
            >
              <Card aura className="border-neon-accent/50 text-center py-12">
                <Zap size={60} className="mx-auto text-neon-accent mb-6 animate-pulse" />
                <h3 className="text-3xl font-bold text-white mb-4 shadow-neon-accent">Soberanía Total Desbloqueada</h3>
                <p className="text-gray-300 max-w-2xl mx-auto text-lg">
                  Felicidades. Has comprendido la esencia. Con tus 12 palabras de seguridad (Semilla), tu riqueza cruza fronteras en tu mente.
                </p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

    </motion.div>
  );
};
