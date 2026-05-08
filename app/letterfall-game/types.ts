export type FallingWord = {
  id: number;
  text: string;
  x: number;
  y: number;
  speed: number;
  points: number;
};

export type FeedbackTone = "neutral" | "success" | "danger" | "warning";

export type FeedbackState = {
  tone: FeedbackTone;
  message: string;
} | null;

export type GameStatus = "playing" | "paused" | "gameOver";

export type DifficultyKey = "casual" | "normal" | "hard" | "nightmare";

export type DifficultyPreset = {
  key: DifficultyKey;
  label: string;
  badge: string;
  description: string;
  spawningLabel: string;
  speedMultiplier: number;
  spawnMultiplier: number;
  startingLives: number;
};
