// import React, { useState, useEffect } from 'react';
// import { WelcomeScreen } from './components/WelcomeScreen';
// import { QuizScreen } from './components/QuizScreen';
// import { CompletionScreen } from './components/CompletionScreen';
// import { questions } from './data/questions';
// import { GameState } from './types';
// import { useWebSocket } from './services/websocket';

// function App() {
//   const { connect, disconnect, sendMessage } = useWebSocket();
//   const [gameState, setGameState] = useState<GameState>({
//     currentLevel: 0,
//     score: 0,
//     timeRemaining: 30,
//     isGameStarted: false,
//     isGameCompleted: false,
//     unlockedSections: new Array(questions.length).fill(false),
//     retryAttempt: false
//   });

//   useEffect(() => {
//     connect();
//     return () => disconnect();
//   }, [connect, disconnect]);

//   const handleStart = () => {
//     setGameState(prev => ({
//       ...prev,
//       isGameStarted: true,
//     }));
//   };

//   const handleAnswer = (isCorrect: boolean, timeRemaining: number) => {
//     if (!isCorrect && !gameState.retryAttempt) {
//       setGameState(prev => ({
//         ...prev,
//         retryAttempt: true
//       }));
//       // Send incorrect answer message to backend
//       sendMessage({
//         action: 'incorrect',
//         level: gameState.currentLevel
//       });
//       return;
//     }

//     if (isCorrect) {
//       const newUnlockedSections = [...gameState.unlockedSections];
//       newUnlockedSections[gameState.currentLevel] = true;

//       // Send displayImage message to backend
//       sendMessage({
//         action: 'displayImage',
//         level: gameState.currentLevel
//       });

//       setGameState(prev => ({
//         ...prev,
//         score: prev.score + 1,
//         currentLevel: prev.currentLevel + 1,
//         unlockedSections: newUnlockedSections,
//         isGameCompleted: prev.currentLevel + 1 === questions.length,
//         retryAttempt: false
//       }));
//     } else {
//       setGameState(prev => ({
//         ...prev,
//         isGameCompleted: true,
//         retryAttempt: false
//       }));
//       // Send game over message to backend
//       sendMessage({
//         action: 'gameOver',
//         code: 0
//       });
//     }
//   };

//   const handleTimeOut = () => {
//     setGameState(prev => ({
//       ...prev,
//       isGameCompleted: true,
//       retryAttempt: false
//     }));
//     // Send game over message to backend
//     sendMessage({
//       action: 'gameOver',
//       code: 0
//     });
//   };

//   const handleRestart = () => {
//     setGameState({
//       currentLevel: 0,
//       score: 0,
//       timeRemaining: 30,
//       isGameStarted: true,
//       isGameCompleted: false,
//       unlockedSections: new Array(questions.length).fill(false),
//       retryAttempt: false
//     });
//   };

//   if (!gameState.isGameStarted) {
//     return <WelcomeScreen onStart={handleStart} />;
//   }

//   if (gameState.isGameCompleted) {
//     return (
//       <CompletionScreen
//         score={gameState.score}
//         totalQuestions={questions.length}
//         onRestart={handleRestart}
//       />
//     );
//   }

//   return (
//     <QuizScreen
//       question={questions[gameState.currentLevel]}
//       onAnswer={handleAnswer}
//       onTimeOut={handleTimeOut}
//       currentLevel={gameState.currentLevel}
//       totalLevels={questions.length}
//       isRetry={gameState.retryAttempt}
//     />
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';
// import { WelcomeScreen } from './components/WelcomeScreen';
// import { QuizScreen } from './components/QuizScreen';
// import { CompletionScreen } from './components/CompletionScreen';
// import { questions } from './data/questions';
// import { GameState } from './types';
// import { useWebSocket } from './services/websocket';

// function App() {
//   const { connect, disconnect, sendMessage } = useWebSocket();
//   const [gameState, setGameState] = useState<GameState>({
//     currentLevel: 0,
//     score: 0,
//     timeRemaining: 30,
//     isGameStarted: false,
//     isGameCompleted: false,
//     unlockedSections: new Array(questions.length).fill(false),
//     retryAttempt: false
//   });

//   useEffect(() => {
//     connect();
//     return () => disconnect();
//   }, [connect, disconnect]);

//   const handleStart = () => {
//     setGameState(prev => ({
//       ...prev,
//       isGameStarted: true,
//     }));
//   };

//   const handleGameOver = () => {
//     sendMessage({
//       action: 'gameOver',
//       level: gameState.currentLevel
//     });
//     setGameState(prev => ({
//       ...prev,
//       isGameCompleted: true,
//       retryAttempt: false
//     }));
//   };

//   const handleAnswer = (isCorrect: boolean, timeRemaining: number) => {
//     if (!isCorrect && !gameState.retryAttempt) {
//       setGameState(prev => ({
//         ...prev,
//         retryAttempt: true
//       }));
//       // Send incorrect answer message to backend
//       sendMessage({
//         action: 'incorrect',
//         level: gameState.currentLevel
//       });
//       return;
//     }

//     if (isCorrect) {
//       const newUnlockedSections = [...gameState.unlockedSections];
//       newUnlockedSections[gameState.currentLevel] = true;

//       // Send displayImage message to backend
//       sendMessage({
//         action: 'displayImage',
//         level: gameState.currentLevel
//       });

//       if (gameState.currentLevel + 1 === questions.length) {
//         handleGameOver();
//       } else {
//         setGameState(prev => ({
//           ...prev,
//           score: prev.score + 1,
//           currentLevel: prev.currentLevel + 1,
//           unlockedSections: newUnlockedSections,
//           retryAttempt: false
//         }));
//       }
//     } else {
//       handleGameOver();
//     }
//   };

//   const handleTimeOut = () => {
//     handleGameOver();
//   };

//   const handleRestart = () => {
//     setGameState({
//       currentLevel: 0,
//       score: 0,
//       timeRemaining: 30,
//       isGameStarted: true,
//       isGameCompleted: false,
//       unlockedSections: new Array(questions.length).fill(false),
//       retryAttempt: false
//     });
//   };

//   if (!gameState.isGameStarted) {
//     return <WelcomeScreen onStart={handleStart} />;
//   }

//   if (gameState.isGameCompleted) {
//     return (
//       <CompletionScreen
//         score={gameState.score}
//         totalQuestions={questions.length}
//         onRestart={handleRestart}
//       />
//     );
//   }

//   return (
//     <QuizScreen
//       question={questions[gameState.currentLevel]}
//       onAnswer={handleAnswer}
//       onTimeOut={handleTimeOut}
//       currentLevel={gameState.currentLevel}
//       totalLevels={questions.length}
//       isRetry={gameState.retryAttempt}
//     />
//   );
// }

// export default App;



// import React, { useState, useEffect } from 'react';
// import { WelcomeScreen } from './components/WelcomeScreen';
// import { QuizScreen } from './components/QuizScreen';
// import { CompletionScreen } from './components/CompletionScreen';
// import { questions } from './data/questions';
// import { GameState } from './types';
// import { useWebSocket } from './services/websocket';

// function App() {
//   const { connect, disconnect, sendMessage } = useWebSocket();
//   const [gameState, setGameState] = useState<GameState>({
//     currentLevel: 0,
//     score: 0,
//     timeRemaining: 30,
//     isGameStarted: false,
//     isGameCompleted: false,
//     unlockedSections: new Array(questions.length).fill(false),
//     retryAttempt: false
//   });

//   useEffect(() => {
//     connect();
//     return () => disconnect();
//   }, [connect, disconnect]);

//   const handleStart = () => {
//     setGameState(prev => ({
//       ...prev,
//       isGameStarted: true,
//     }));
//   };

//   const handleGameOver = () => {
//     sendMessage({
//       action: 'gameOver',
//       level: gameState.currentLevel
//     });
//     setGameState(prev => ({
//       ...prev,
//       isGameCompleted: true,
//       retryAttempt: false
//     }));

//     // After 3 seconds, reset to start screen
//     setTimeout(() => {
//       setGameState({
//         currentLevel: 0,
//         score: 0,
//         timeRemaining: 30,
//         isGameStarted: false,
//         isGameCompleted: false,
//         unlockedSections: new Array(questions.length).fill(false),
//         retryAttempt: false
//       });
//     }, 3000);
//   };

//   const handleAnswer = (isCorrect: boolean, timeRemaining: number) => {
//     if (!isCorrect && !gameState.retryAttempt) {
//       setGameState(prev => ({
//         ...prev,
//         retryAttempt: true
//       }));
//       // Send incorrect answer message to backend
//       sendMessage({
//         action: 'incorrect',
//         level: gameState.currentLevel
//       });
//       return;
//     }

//     if (isCorrect) {
//       const newUnlockedSections = [...gameState.unlockedSections];
//       newUnlockedSections[gameState.currentLevel] = true;

//       // Send displayImage message to backend
//       sendMessage({
//         action: 'displayImage',
//         level: gameState.currentLevel
//       });

//       if (gameState.currentLevel + 1 === questions.length) {
//         handleGameOver();
//       } else {
//         setGameState(prev => ({
//           ...prev,
//           score: prev.score + 1,
//           currentLevel: prev.currentLevel + 1,
//           unlockedSections: newUnlockedSections,
//           retryAttempt: false
//         }));
//       }
//     } else {
//       handleGameOver();
//     }
//   };

//   const handleTimeOut = () => {
//     handleGameOver();
//   };

//   const handleRestart = () => {
//     setGameState({
//       currentLevel: 0,
//       score: 0,
//       timeRemaining: 30,
//       isGameStarted: false,
//       isGameCompleted: false,
//       unlockedSections: new Array(questions.length).fill(false),
//       retryAttempt: false
//     });
//   };

//   if (!gameState.isGameStarted) {
//     return <WelcomeScreen onStart={handleStart} />;
//   }

//   if (gameState.isGameCompleted) {
//     return (
//       <CompletionScreen
//         score={gameState.score}
//         totalQuestions={questions.length}
//         onRestart={handleRestart}
//       />
//     );
//   }

//   return (
//     <QuizScreen
//       question={questions[gameState.currentLevel]}
//       onAnswer={handleAnswer}
//       onTimeOut={handleTimeOut}
//       currentLevel={gameState.currentLevel}
//       totalLevels={questions.length}
//       isRetry={gameState.retryAttempt}
//     />
//   );
// }

// export default App;




import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { questions } from './data/questions';
import { GameState } from './types';
import { useWebSocket } from './services/websocket';

function App() {
  const { connect, disconnect, sendMessage } = useWebSocket();
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 0,
    score: 0,
    timeRemaining: 30,
    isGameStarted: false,
    isGameCompleted: false,
    unlockedSections: new Array(questions.length).fill(false),
    retryAttempt: false
  });

  useEffect(() => {
    connect();
    return () => disconnect();
  }, [connect, disconnect]);

  const handleStart = () => {
    setGameState(prev => ({
      ...prev,
      isGameStarted: true,
    }));
  };

  const handleGameOver = () => {
    sendMessage({
      action: 'gameOver',
      level: gameState.currentLevel
    });
    setGameState(prev => ({
      ...prev,
      isGameCompleted: true,
      retryAttempt: false
    }));

    // After 3 seconds, reset to start screen
    setTimeout(() => {
      setGameState({
        currentLevel: 0,
        score: 0,
        timeRemaining: 30,
        isGameStarted: false,
        isGameCompleted: false,
        unlockedSections: new Array(questions.length).fill(false),
        retryAttempt: false
      });
    }, 3000);
  };

  const handleAnswer = (isCorrect: boolean, timeRemaining: number) => {
    // For incorrect answers on first try
    if (!isCorrect && !gameState.retryAttempt) {
      setGameState(prev => ({
        ...prev,
        retryAttempt: true
      }));
      sendMessage({
        action: 'incorrect',
        level: gameState.currentLevel
      });
      return;
    }

    // For correct answers
    if (isCorrect) {
      sendMessage({
        action: 'displayImage',
        level: gameState.currentLevel
      });

      const newUnlockedSections = [...gameState.unlockedSections];
      newUnlockedSections[gameState.currentLevel] = true;

      // Check if this was the last question
      if (gameState.currentLevel + 1 === questions.length) {
        handleGameOver();
      } else {
        setGameState(prev => ({
          ...prev,
          score: prev.score + 1,
          currentLevel: prev.currentLevel + 1,
          unlockedSections: newUnlockedSections,
          retryAttempt: false
        }));
      }
    } else {
      // For incorrect answers on second try or timeout
      handleGameOver();
    }
  };

  const handleTimeOut = () => {
    handleGameOver();
  };

  const handleRestart = () => {
    setGameState({
      currentLevel: 0,
      score: 0,
      timeRemaining: 30,
      isGameStarted: false,
      isGameCompleted: false,
      unlockedSections: new Array(questions.length).fill(false),
      retryAttempt: false
    });
  };

  if (!gameState.isGameStarted) {
    return <WelcomeScreen onStart={handleStart} />;
  }

  if (gameState.isGameCompleted) {
    return (
      <CompletionScreen
        score={gameState.score}
        totalQuestions={questions.length}
        onRestart={handleRestart}
      />
    );
  }

  return (
    <QuizScreen
      question={questions[gameState.currentLevel]}
      onAnswer={handleAnswer}
      onTimeOut={handleTimeOut}
      currentLevel={gameState.currentLevel}
      totalLevels={questions.length}
      isRetry={gameState.retryAttempt}
    />
  );
}

export default App;