export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  hint?: string;
}

export interface GameState {
  currentLevel: number;
  score: number;
  timeRemaining: number;
  isGameStarted: boolean;
  isGameCompleted: boolean;
  unlockedSections: boolean[];
  retryAttempt: boolean;
}