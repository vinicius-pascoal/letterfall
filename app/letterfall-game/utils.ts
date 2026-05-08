import { WORD_BANK } from "./constants";

export function getLevel(score: number) {
  return Math.max(1, Math.floor(score / 120) + 1);
}

export function getWordPoints(word: string) {
  if (word.length <= 4) {
    return 10;
  }

  if (word.length <= 7) {
    return 20;
  }

  return 30;
}

export function getWordSpeed(level: number, word: string) {
  return 0.55 + level * 0.11 + Math.min(0.35, word.length * 0.018);
}

export function getSpawnInterval(level: number) {
  return Math.max(620, 1700 - (level - 1) * 120);
}

export function randomWord() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}
