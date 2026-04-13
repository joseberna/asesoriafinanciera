import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { motion } from 'framer-motion';

export const LanguageSelector = () => {
  const { language, setLanguage } = useLanguage();

  const langs = [
    { id: 'es', label: 'ES' },
    { id: 'en', label: 'EN' },
    { id: 'pt', label: 'PT' }
  ];

  return (
    <div className="flex gap-2">
      {langs.map((l) => (
        <motion.button
          key={l.id}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLanguage(l.id)}
          className={`px-3 py-1 text-xs font-bold rounded-lg border transition-colors ${
            language === l.id 
              ? 'bg-neon-accent text-crypto-bg border-neon-accent' 
              : 'bg-transparent text-gray-500 border-gray-700 hover:text-gray-300 hover:border-gray-500'
          }`}
        >
          {l.label}
        </motion.button>
      ))}
    </div>
  );
};
