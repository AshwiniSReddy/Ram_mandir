// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Trophy, RefreshCw } from 'lucide-react';
// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from './LanguageToggle';

// interface CompletionScreenProps {
//   score: number;
//   totalQuestions: number;
//   onRestart: () => void;
// }

// export const CompletionScreen: React.FC<CompletionScreenProps> = ({
//   score,
//   totalQuestions,
//   onRestart,
// }) => {
//   const { t } = useTranslation();

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onRestart();
//     }, 3000);

//     return () => clearTimeout(timer);
//   }, [onRestart]);

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6"
//     >
//       <LanguageToggle />

//       <motion.div
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         className="text-6xl mb-8 text-yellow-500"
//       >
//         <Trophy />
//       </motion.div>

//       <h1 className="text-4xl font-bold mb-4 text-center">
//         {t('completion.congratulations')}
//       </h1>

//       <p className="text-xl mb-8 text-center">
//         {t('completion.completed')}
//       </p>

//       <div className="text-2xl mb-12 text-center">
//         {t('completion.score')}: <span className="text-orange-500 font-bold">{score}</span> / {totalQuestions}
//       </div>

//       <motion.button
//         onClick={onRestart}
//         className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all"
//         whileHover={{ scale: 1.05 }}
//         whileTap={{ scale: 0.95 }}
//       >
//         <RefreshCw size={20} />
//         {t('completion.playAgain')}
//       </motion.button>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.5 }}
//         className="mt-12 text-center text-gray-400 max-w-md"
//       >
//         <p>
//           {t('completion.footer')}
//         </p>
//       </motion.div>
//     </motion.div>
//   );
// };


import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, RefreshCw } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';

interface CompletionScreenProps {
  score: number;
  totalQuestions: number;
  onRestart: () => void;
}

export const CompletionScreen: React.FC<CompletionScreenProps> = ({
  score,
  totalQuestions,
  onRestart,
}) => {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6"
    >
      <LanguageToggle />

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-6xl mb-8 text-yellow-500"
      >
        <Trophy />
      </motion.div>

      <h1 className="text-4xl font-bold mb-4 text-center">
        {t('completion.congratulations')}
      </h1>

      <p className="text-xl mb-8 text-center">
        {t('completion.completed')}
      </p>

      <div className="text-2xl mb-12 text-center">
        {t('completion.score')}: <span className="text-orange-500 font-bold">{score}</span> / {totalQuestions}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-12 text-center text-gray-400 max-w-md"
      >
        <p>
          {t('completion.footer')}
        </p>
      </motion.div>
    </motion.div>
  );
};