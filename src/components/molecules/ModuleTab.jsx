import React from 'react';
import { motion } from 'framer-motion';

export const ModuleTab = ({ title, isActive, onClick, icon: Icon }) => {
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 px-6 py-4 w-full text-left transition-colors duration-300 ${
        isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-white/5 border-l-4 border-neon-accent"
          initial={false}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
      <div className={`relative z-10 ${isActive ? 'text-neon-accent' : 'text-gray-600'}`}>
        {Icon && <Icon size={20} />}
      </div>
      <span className="relative z-10 font-semibold tracking-wide text-sm uppercase">
        {title}
      </span>
    </button>
  );
};
