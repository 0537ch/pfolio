"use client";

import React, { useState } from 'react';
import { Button } from './Button';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialButtonProps {
  href: string;
  icon: string;
  label: string;
  target?: string;
}

export function SocialButton({ href, icon, label, target = '_blank' }: SocialButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Button
      href={href}
      target={target}
      variant="secondary"
      size="m"
      prefixIcon={icon}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        minWidth: isHovered ? '120px' : '44px', 
        transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence>
        {isHovered && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ 
              opacity: 1, 
              width: 'auto',
              transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.3, delay: 0.2 }
              }
            }}
            exit={{ 
              opacity: 0, 
              width: 0,
              transition: {
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
                opacity: { duration: 0.2 }
              }
            }}
            style={{ 
              marginLeft: '8px', 
              whiteSpace: 'nowrap',
              display: 'inline-block'
            }}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  );
}
