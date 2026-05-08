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
