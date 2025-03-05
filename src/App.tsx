import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuizScreen } from './components/QuizScreen';
import { CompletionScreen } from './components/CompletionScreen';
import { useWebSocket } from './services/websocket';
import { useTranslation } from 'react-i18next';
import { GameState } from './types';

function App() {
  const { t } = useTranslation();
  // Get the questions array from i18n (for example, from hi or en based on the active language)
  const questions = t('questions', { returnObjects: true }) as Array<{
    text: string;
    options: string[];
    correctAnswer: number;
    hint?: string;
  }>;

  const { connect, disconnect, sendMessage } = useWebSocket();

  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1, // start at level 1
    score: 0,
    timeRemaining: 30,
    isGameStarted: false,
    isGameCompleted: false,
    // We use an extra element so that the index equals the level number
    unlockedSections: new Array(questions.length + 1).fill(false),
    retryAttempt: false,
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

  // Centralized reset function
  const resetGameState = () => {
    console.log('Resetting game state to welcome screen');
    setGameState({
      currentLevel: 1,
      score: 0,
      timeRemaining: 30,
      isGameStarted: false,
      isGameCompleted: false,
      unlockedSections: new Array(questions.length + 1).fill(false),
      retryAttempt: false,
    });
    sendMessage({ action: 'gameOver', code: 0 });
  };

  // Reset state 30 seconds after game over or completion
  useEffect(() => {
    if (gameState.isGameCompleted) {
      const timeout = setTimeout(() => {
        resetGameState();
      }, 30000);
      return () => clearTimeout(timeout);
    }
  }, [gameState.isGameCompleted]);

  const handleGameOver = () => {
    // Send a gameOver message with the current level.
    sendMessage({
      action: 'gameOver',
      level: gameState.currentLevel,
    });
    setGameState(prev => ({
      ...prev,
      isGameCompleted: true,
      retryAttempt: false,
    }));
  };

  // onAnswer is triggered from QuizScreen after the 5-second delay.
  // For correct answers, we pass finalAnswer=true so that App does not send the websocket message again.
  const handleAnswer = (isCorrect: boolean, timeRemaining: number, finalAnswer?: boolean) => {
    // For incorrect answers on the first try.
    if (!isCorrect && !gameState.retryAttempt) {
      setGameState(prev => ({
        ...prev,
        retryAttempt: true,
      }));
      sendMessage({
        action: 'incorrect',
        level: gameState.currentLevel,
      });
      return;
    }

    if (isCorrect) {
      const newUnlockedSections = [...gameState.unlockedSections];
      newUnlockedSections[gameState.currentLevel] = true;

      if (gameState.currentLevel === questions.length) {
        setGameState(prev => ({
          ...prev,
          score: prev.score + 1,
          unlockedSections: newUnlockedSections,
          retryAttempt: false,
          isGameCompleted: true,
        }));
      } else {
        setGameState(prev => ({
          ...prev,
          score: prev.score + 1,
          currentLevel: prev.currentLevel + 1,
          unlockedSections: newUnlockedSections,
          retryAttempt: false,
        }));
      }
    } else {
      // For an incorrect answer on a second try or timeout.
      handleGameOver();
    }
  };

  const handleTimeOut = () => {
    handleGameOver();
  };

  // Manual restart if the user clicks the restart button.
  const handleRestart = () => {
    resetGameState();
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
        completedAll={gameState.score === questions.length}
      />
    );
  }

  return (
    <QuizScreen
      question={questions[gameState.currentLevel - 1]}
      onAnswer={handleAnswer}
      onTimeOut={handleTimeOut}
      currentLevel={gameState.currentLevel}
      totalLevels={questions.length}
      isRetry={gameState.retryAttempt}
    />
  );
}

export default App;
