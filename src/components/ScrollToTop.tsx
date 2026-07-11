'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ScrollToTop() {
  const pathname = usePathname();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }

      // Show button when scrolled past 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Call handler once to initialize
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Do not render on admin panel routes
  const isAdminRoute = pathname?.startsWith('/admin');
  if (isAdminRoute) return null;

  // SVG ring dimensions
  const radius = 20;
  const circumference = 2 * Math.PI * radius; // ~125.66
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 15 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full glass shadow-lg flex items-center justify-center cursor-pointer group shadow-green-glow transition-all duration-300 focus:outline-none"
          aria-label="Voltar ao Topo"
          type="button"
        >
          {/* Progress Ring */}
          <svg className="absolute top-0 left-0 w-full h-full -rotate-90" viewBox="0 0 48 48">
            {/* Background Track */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="fill-none stroke-white/10"
              strokeWidth="2.5"
            />
            {/* Progress Bar */}
            <circle
              cx="24"
              cy="24"
              r={radius}
              className="fill-none stroke-green transition-all duration-75"
              strokeWidth="2.5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>

          {/* Arrow Icon */}
          <ChevronUp className="w-5 h-5 text-white group-hover:text-green transition-colors duration-300 relative z-10" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
