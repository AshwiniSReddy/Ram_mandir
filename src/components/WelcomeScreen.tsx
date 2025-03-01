import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onStart }) => {
  const { t } = useTranslation();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative min-h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white"
      style={{
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1707333731097-57ba5329a115?q=80&w=1920")',
      }}
    >
      <LanguageToggle />
      
      <motion.h1 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        className="text-4xl md:text-6xl font-bold text-center mb-8"
      >
        {t('welcome.title')}
      </motion.h1>
      
      <motion.div 
        className="text-center mb-12 max-w-2xl px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-lg mb-4">
          {t('welcome.description')}
        </p>
        <p className="text-md opacity-90">
          {t('welcome.instructions')}
        </p>
      </motion.div>

      <motion.button
        onClick={onStart}
        className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full flex items-center gap-2 text-xl font-semibold transition-all transform hover:scale-105"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Play size={24} />
        {t('welcome.startButton')}
      </motion.button>
    </motion.div>
  );
};