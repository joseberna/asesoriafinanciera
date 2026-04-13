import React from 'react';
import { motion } from 'framer-motion';

export const ProgressBar = ({ progress, color = 'bg-neon-accent', className = '' }) => {
  return (
    <div className={`h-3 w-full bg-crypto-surface-alt rounded-full overflow-hidden border border-gray-800 ${className}`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`h-full ${color} shadow-[0_0_10px_currentColor]`}
      />
    </div>
  );
};
