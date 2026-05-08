import { WORD_BANK } from "./constants";

export function getLevel(score: number) {
  return Math.max(1, Math.floor(score / 160) + 1);
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

export function getWordSpeed(level: number, word: string, speedMultiplier = 1) {
  return (0.07 + level * 0.014 + Math.min(0.06, word.length * 0.004)) * speedMultiplier;
}

export function getSpawnInterval(level: number, spawnMultiplier = 1) {
  return Math.max(900, (2400 - (level - 1) * 170) * spawnMultiplier);
}

export function randomWord() {
  return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}
