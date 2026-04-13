import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const langs = [
    { id: 'es', label: 'Español (ES)' },
    { id: 'en', label: 'English (EN)' },
    { id: 'pt', label: 'Português (PT)' }
  ];

  const currentLang = langs.find(l => l.id === language);

  return (
    <div className="relative inline-block w-full z-50">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-3 border border-gray-700 bg-crypto-surface-alt rounded-xl hover:border-gray-500 transition-colors"
      >
        <div className="flex items-center gap-2 text-gray-300 text-sm">
          <Globe size={18} className="text-neon-accent" />
          {currentLang?.label}
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown size={18} className="text-gray-500" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 mt-2 p-2 bg-crypto-surface-alt border border-gray-700 rounded-xl shadow-2xl flex flex-col gap-1"
          >
            {langs.map((l) => (
              <button
                key={l.id}
                onClick={() => { setLanguage(l.id); setIsOpen(false); }}
                className={`text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                  language === l.id 
                    ? 'bg-neon-accent text-crypto-bg font-bold' 
                    : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
              >
                {l.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
