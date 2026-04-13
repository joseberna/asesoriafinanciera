import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', aura = false, ...props }) => {
  return (
    <div 
      className={`glass-panel p-6 ${aura ? 'aura-glow' : ''} ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
};
