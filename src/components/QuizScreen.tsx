// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { Timer, HelpCircle, RefreshCw, Loader2 } from 'lucide-react';
// import useSound from 'use-sound';
// import { useTranslation } from 'react-i18next';
// import { LanguageToggle } from './LanguageToggle';

// interface QuizScreenProps {
//   question: {
//     text: string;
//     options: string[];
//     correctAnswer: number;
//     hint?: string;
//   };
//   onAnswer: (isCorrect: boolean, timeRemaining: number) => void;
//   onTimeOut: () => void;
//   currentLevel: number;
//   totalLevels: number;
//   isRetry: boolean;
// }

// export const QuizScreen: React.FC<QuizScreenProps> = ({
//   question,
//   onAnswer,
//   onTimeOut,
//   currentLevel,
//   totalLevels,
//   isRetry
// }) => {
//   const { t } = useTranslation();
//   const [timeRemaining, setTimeRemaining] = useState(30);
//   const [showHint, setShowHint] = useState(false);
//   const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
//   const [isAnswerProcessing, setIsAnswerProcessing] = useState(false);
//   const [showRetryButton, setShowRetryButton] = useState(false);
//   const [waitingForBackend, setWaitingForBackend] = useState(false);
//   const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.5 });
//   const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: 0.5 });

//   useEffect(() => {
//     setTimeRemaining(30);
//     setShowHint(false);
//     setSelectedAnswer(null);
//     setIsAnswerProcessing(false);
//     setShowRetryButton(false);
//     setWaitingForBackend(false);
//   }, [question, isRetry]);

//   useEffect(() => {
//     if (timeRemaining <= 0 && !isAnswerProcessing) {
//       setIsAnswerProcessing(true);
//       onTimeOut();
//       return;
//     }

//     const timer = setInterval(() => {
//       if (!waitingForBackend) {
//         setTimeRemaining(prev => Math.max(0, prev - 1));
//       }
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeRemaining, onTimeOut, isAnswerProcessing, waitingForBackend]);

//   useEffect(() => {
//     const handleImageDisplayed = (event: CustomEvent) => {
//       if (event.detail === currentLevel) {
//         setWaitingForBackend(false);
//         onAnswer(true, timeRemaining);
//       }
//     };

//     window.addEventListener('imageDisplayed', handleImageDisplayed as EventListener);
//     return () => {
//       window.removeEventListener('imageDisplayed', handleImageDisplayed as EventListener);
//     };
//   }, [currentLevel, onAnswer, timeRemaining]);

//   const handleAnswer = async (index: number) => {
//     if (isAnswerProcessing || waitingForBackend) return;
    
//     setSelectedAnswer(index);
//     setIsAnswerProcessing(true);
    
//     const isCorrect = index === question.correctAnswer;
    
//     if (isCorrect) {
//       playCorrect();
//       setWaitingForBackend(true);
//       // Note: onAnswer will be called after receiving imageDisplayed event
//     } else {
//       playIncorrect();
//       if (isRetry) {
//         // On second wrong answer, immediately end the game
//         setTimeout(() => {
//           onAnswer(false, timeRemaining);
//         }, 500);
//       } else {
//         // On first wrong answer, show retry button for 10 seconds
//         setShowRetryButton(true);
//         const timer = setTimeout(() => {
//           if (!isRetry) {
//             onAnswer(false, timeRemaining);
//           }
//         }, 10000);
//         return () => clearTimeout(timer);
//       }
//     }
//   };

//   const handleRetry = () => {
//     setSelectedAnswer(null);
//     setIsAnswerProcessing(false);
//     setShowRetryButton(false);
//     onAnswer(false, timeRemaining);
//   };

//   return (
//     <motion.div 
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center"
//     >
//       <LanguageToggle />
      
//       <div className="w-full max-w-3xl">
//         <div className="flex justify-between items-center mb-8">
//           <div className="text-xl font-semibold">
//             {t('quiz.level')} {currentLevel + 1}/{totalLevels}
//           </div>
//           <div className="flex items-center gap-2 text-xl">
//             <Timer className="text-orange-500" />
//             <span className={timeRemaining < 10 ? 'text-red-500' : 'text-white'}>
//               {timeRemaining}{t('quiz.timeRemaining')}
//             </span>
//           </div>
//         </div>

//         <motion.div 
//           className="bg-gray-800 rounded-lg p-6 mb-8"
//           initial={{ y: 20 }}
//           animate={{ y: 0 }}
//           key={`${currentLevel}-${isRetry}`}
//         >
//           <h2 className="text-2xl font-bold mb-6">
//             {t(`questions.${currentLevel}.text`)}
//           </h2>
          
//           <div className="grid gap-4">
//             {t(`questions.${currentLevel}.options`, { returnObjects: true }).map((option: string, index: number) => (
//               <motion.button
//                 key={index}
//                 onClick={() => handleAnswer(index)}
//                 className={`p-4 rounded-lg text-left text-lg transition-all ${
//                   selectedAnswer === index
//                     ? index === question.correctAnswer
//                       ? 'bg-green-500 text-white'
//                       : 'bg-red-500 text-white'
//                     : 'bg-gray-700 hover:bg-gray-600'
//                 }`}
//                 disabled={selectedAnswer !== null || isAnswerProcessing || waitingForBackend}
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 {option}
//               </motion.button>
//             ))}
//           </div>

//           {waitingForBackend && selectedAnswer === question.correctAnswer && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-6 flex items-center justify-center text-orange-400"
//             >
//               <Loader2 className="animate-spin mr-2" />
//               <span>Waiting for temple section to illuminate...</span>
//             </motion.div>
//           )}

//           {!isRetry && showRetryButton && selectedAnswer !== null && (
//             <motion.div
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               className="mt-6 text-center"
//             >
//               <motion.button
//                 onClick={handleRetry}
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto transition-all"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 <RefreshCw size={20} />
//                 {t('quiz.tryAgain')}
//               </motion.button>
//             </motion.div>
//           )}
//         </motion.div>

//         {question.hint && (
//           <div className="text-center">
//             <motion.button
//               onClick={() => setShowHint(!showHint)}
//               className="flex items-center gap-2 mx-auto text-orange-400 hover:text-orange-300"
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               <HelpCircle size={20} />
//               {t(showHint ? 'quiz.hideHint' : 'quiz.showHint')}
//             </motion.button>
//             {showHint && (
//               <motion.p
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="mt-4 text-gray-400"
//               >
//                 {t(`questions.${currentLevel}.hint`)}
//               </motion.p>
//             )}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };





import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Timer, HelpCircle, RefreshCw, Loader2 } from 'lucide-react';
import useSound from 'use-sound';
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';
import { useWebSocket } from '../services/websocket';

interface QuizScreenProps {
  question: {
    text: string;
    options: string[];
    correctAnswer: number;
    hint?: string;
  };
  onAnswer: (isCorrect: boolean, timeRemaining: number) => void;
  onTimeOut: () => void;
  currentLevel: number;
  totalLevels: number;
  isRetry: boolean;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({
  question,
  onAnswer,
  onTimeOut,
  currentLevel,
  totalLevels,
  isRetry
}) => {
  const { t } = useTranslation();
  const { sendMessage } = useWebSocket();
  const [timeRemaining, setTimeRemaining] = useState(30);
  const [showHint, setShowHint] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerProcessing, setIsAnswerProcessing] = useState(false);
  const [showRetryButton, setShowRetryButton] = useState(false);
  const [waitingForBackend, setWaitingForBackend] = useState(false);
  const [playCorrect] = useSound('/sounds/correct.mp3', { volume: 0.5 });
  const [playIncorrect] = useSound('/sounds/incorrect.mp3', { volume: 0.5 });

  useEffect(() => {
    setTimeRemaining(30);
    setShowHint(false);
    setSelectedAnswer(null);
    setIsAnswerProcessing(false);
    setShowRetryButton(false);
    setWaitingForBackend(false);
  }, [question, isRetry]);

  useEffect(() => {
    if (timeRemaining <= 0 && !isAnswerProcessing) {
      setIsAnswerProcessing(true);
      onTimeOut();
      return;
    }

    const timer = setInterval(() => {
      if (!waitingForBackend) {
        setTimeRemaining(prev => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeRemaining, onTimeOut, isAnswerProcessing, waitingForBackend]);

  useEffect(() => {
    const handleImageDisplayed = (event: CustomEvent) => {
      console.log('Received imageDisplayed event:', event.detail, 'Current level:', currentLevel);
      if (event.detail === currentLevel) {
        setWaitingForBackend(false);
        onAnswer(true, timeRemaining);
      }
    };

    window.addEventListener('imageDisplayed', handleImageDisplayed as EventListener);
    return () => {
      window.removeEventListener('imageDisplayed', handleImageDisplayed as EventListener);
    };
  }, [currentLevel, onAnswer, timeRemaining]);

  const handleAnswer = async (index: number) => {
    if (isAnswerProcessing || waitingForBackend) return;
    
    setSelectedAnswer(index);
    setIsAnswerProcessing(true);
    
    const isCorrect = index === question.correctAnswer;
    
    if (isCorrect) {
      playCorrect();
      setWaitingForBackend(true);
      console.log('Sending displayImage message for level:', currentLevel);
      sendMessage({
        action: 'displayImage',
        level: currentLevel
      });
    } else {
      playIncorrect();
      if (!isRetry) {
        sendMessage({
          action: 'incorrect',
          level: currentLevel
        });
        setShowRetryButton(true);
        setTimeout(() => {
          if (!isRetry) {
            onAnswer(false, timeRemaining);
          }
        }, 10000);
      } else {
        setTimeout(() => {
          onAnswer(false, timeRemaining);
        }, 500);
      }
    }
  };

  const handleRetry = () => {
    setSelectedAnswer(null);
    setIsAnswerProcessing(false);
    setShowRetryButton(false);
    onAnswer(false, timeRemaining);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-900 text-white p-6 flex flex-col items-center justify-center"
    >
      <LanguageToggle />
      
      <div className="w-full max-w-3xl">
        <div className="flex justify-between items-center mb-8">
          <div className="text-xl font-semibold">
            {t('quiz.level')} {currentLevel + 1}/{totalLevels}
          </div>
          <div className="flex items-center gap-2 text-xl">
            <Timer className="text-orange-500" />
            <span className={timeRemaining < 10 ? 'text-red-500' : 'text-white'}>
              {timeRemaining}{t('quiz.timeRemaining')}
            </span>
          </div>
        </div>

        <motion.div 
          className="bg-gray-800 rounded-lg p-6 mb-8"
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          key={`${currentLevel}-${isRetry}`}
        >
          <h2 className="text-2xl font-bold mb-6">
            {t(`questions.${currentLevel}.text`)}
          </h2>
          
          <div className="grid gap-4">
            {t(`questions.${currentLevel}.options`, { returnObjects: true }).map((option: string, index: number) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`p-4 rounded-lg text-left text-lg transition-all ${
                  selectedAnswer === index
                    ? index === question.correctAnswer
                      ? 'bg-green-500 text-white'
                      : 'bg-red-500 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
                disabled={selectedAnswer !== null || isAnswerProcessing || waitingForBackend}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {waitingForBackend && selectedAnswer === question.correctAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 flex items-center justify-center text-orange-400"
            >
              <Loader2 className="animate-spin mr-2" />
              <span>Waiting for temple section to illuminate...</span>
            </motion.div>
          )}

          {showRetryButton && !isRetry && selectedAnswer !== null && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 text-center"
            >
              <motion.button
                onClick={handleRetry}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-2 mx-auto transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RefreshCw size={20} />
                {t('quiz.tryAgain')}
              </motion.button>
            </motion.div>
          )}
        </motion.div>

        {question.hint && (
          <div className="text-center">
            <motion.button
              onClick={() => setShowHint(!showHint)}
              className="flex items-center gap-2 mx-auto text-orange-400 hover:text-orange-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <HelpCircle size={20} />
              {t(showHint ? 'quiz.hideHint' : 'quiz.showHint')}
            </motion.button>
            {showHint && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-gray-400"
              >
                {t(`questions.${currentLevel}.hint`)}
              </motion.p>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};