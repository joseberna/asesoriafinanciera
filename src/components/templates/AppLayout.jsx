import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageSelector } from '../molecules/LanguageSelector';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, X } from 'lucide-react';
import { Tooltip } from '../atoms/Tooltip';

export const AppLayout = ({ tabsConfig, activeTab, onTabChange, renderSidebar, children }) => {
  const { t } = useLanguage();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="h-screen w-screen overflow-hidden bg-crypto-bg text-gray-100 flex flex-col md:flex-row relative font-sans">
      {/* Background effect */}
      <div className="fixed inset-0 pointer-events-none aura-bg z-0" />
      
      {/* Botón flotante para reabrir Sidebar en PC cuando está oculta */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.button 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            onClick={() => setIsSidebarOpen(true)}
            className="hidden md:flex absolute top-6 left-6 z-50 bg-crypto-surface-alt p-3 border border-gray-700 rounded-xl hover:border-neon-accent hover:text-neon-accent transition-colors"
          >
            <Tooltip content="Mostrar menú lateral" position="right">
              <Menu size={24} className="cursor-help" />
            </Tooltip>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Sidebar/TopNav */}
      <AnimatePresence initial={false}>
        {isSidebarOpen && (
          <motion.nav 
            initial={{ width: 0, opacity: 0, x: -100 }}
            animate={{ width: 'auto', opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="w-full md:w-80 h-auto md:h-screen shrink-0 bg-crypto-surface border-r border-gray-800/50 z-20 flex flex-col shadow-2xl relative"
          >
            {/* Botón para esconder en MD+ */}
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="hidden md:block absolute top-6 right-6 text-gray-500 hover:text-red-400 transition-colors"
            >
              <Tooltip content="Ocultar menú lateral" position="left">
                <X size={20} className="cursor-help" />
              </Tooltip>
            </button>

            <div className="p-6 md:p-8 border-b border-gray-800/50 space-y-4 pt-12 md:pt-8 min-w-[320px]">
              <div className="flex items-center justify-between">
                <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-accent to-eth-blue">
                  Soberanía Financiera
                </h1>
              </div>
              <p className="text-sm text-gray-500">{t('nav.subtitle')}</p>
              <LanguageSelector />
            </div>
            
            <div className="flex-none md:flex-1 py-4 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-y-auto overflow-y-hidden md:overflow-x-hidden p-4 md:p-0 hide-scrollbar min-w-[320px]">
              {renderSidebar()}
            </div>

            <div className="hidden md:block p-8 border-t border-gray-800/50 mt-auto min-w-[320px]">
              <div className="text-xs text-gray-600 font-mono">
                JOSE FERNANDO BERNA MOLANO <br/>
                EDUCADOR BITCOIN
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 h-full overflow-y-auto overflow-x-hidden z-10 w-full p-4 sm:p-6 md:p-12 lg:px-24 xl:px-32 relative">
        <div className="max-w-4xl mx-auto pb-24">
          {children}
        </div>
      </main>
    </div>
  );
};
