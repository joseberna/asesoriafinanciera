import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const Button = React.forwardRef(({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    primary: "bg-btc-orange text-white hover:bg-orange-600 shadow-[0_0_15px_rgba(247,147,26,0.4)] hover:shadow-[0_0_25px_rgba(247,147,26,0.6)]",
    secondary: "bg-crypto-surface-alt text-gray-200 border border-gray-700 hover:border-gray-500",
    outline: "border-2 border-neon-accent text-neon-accent hover:bg-neon-accent/10",
    ghost: "text-gray-400 hover:text-white hover:bg-white/5",
  };
  
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  return (
    <motion.button
      ref={ref}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
});
Button.displayName = "Button";
