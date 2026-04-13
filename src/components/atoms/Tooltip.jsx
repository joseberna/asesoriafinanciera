import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const Tooltip = ({ content, children, position = 'top' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [xOffset, setXOffset] = useState("-50%");
  const tooltipRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    if (isVisible && tooltipRef.current && wrapperRef.current) {
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      // Verificamos si se sale por la derecha
      if (tooltipRect.right > window.innerWidth) {
        const overflow = tooltipRect.right - window.innerWidth + 20; // 20px padding
        setXOffset(`calc(-50% - ${overflow}px)`);
      } 
      // Verificamos si se sale por la izquierda
      else if (tooltipRect.left < 0) {
        const overflow = Math.abs(tooltipRect.left) + 20;
        setXOffset(`calc(-50% + ${overflow}px)`);
      } else {
        setXOffset("-50%");
      }
    }
  }, [isVisible]);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom': return 'top-full mt-2 left-1/2';
      case 'left': return 'right-full mr-2 top-1/2 -translate-y-1/2';
      case 'right': return 'left-full ml-2 top-1/2 -translate-y-1/2';
      case 'top':
      default:
        return 'bottom-full mb-2 left-1/2';
    }
  };

  const dynamicStyles = (position === 'top' || position === 'bottom') 
      ? { transform: `translateX(${xOffset})` } 
      : {};

  return (
    <div 
      className="relative inline-flex items-center justify-center cursor-help"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      ref={wrapperRef}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            ref={tooltipRef}
            style={dynamicStyles}
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : position === 'bottom' ? -10 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`absolute z-[100] w-64 p-3 text-sm text-white bg-crypto-surface-alt border border-neon-accent/30 rounded-xl shadow-[0_0_15px_rgba(0,255,204,0.15)] ${getPositionClasses()}`}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
