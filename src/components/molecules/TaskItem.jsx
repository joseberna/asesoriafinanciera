import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

export const TaskItem = ({ title, completed, onClick, description }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.01 }}
      className={`glass-panel cursor-pointer p-4 transition-all duration-300 ${
        completed ? 'border-sol-green/50 bg-sol-green/5' : 'hover:border-neon-accent/30'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start gap-4">
        <div className={`mt-1 ${completed ? 'text-sol-green' : 'text-gray-600'}`}>
          {completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
        </div>
        <div>
          <h4 className={`font-semibold text-lg ${completed ? 'text-gray-300 line-through' : 'text-gray-100'}`}>
            {title}
          </h4>
          {description && (
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          )}
        </div>
      </div>
    </motion.div>
  );
};
